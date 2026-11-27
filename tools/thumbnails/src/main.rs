//! Gallery thumbnails: each entry of `content/gallery/*.mdx` opened in
//! Octant from its share link (`octant --snapshot`, the link "Open in
//! Octant" opens) and saved as an 800x450 WebP where its `thumbnail` points,
//! with its axes and colorbar. A convenience: any 800x450 WebP will do.
//!
//! ```text
//! cargo run --release --manifest-path tools/thumbnails/Cargo.toml -- \
//!     [--octant <path>] [--no-colorbar] [--no-axes] [<entry> ...]
//! ```
//!
//! No entry names every entry. Octant comes from `PATH` unless `--octant`
//! names a build; `--no-colorbar` and `--no-axes` go to Octant as they are.
//! Exits with 1 when any entry failed, after trying them all.

mod entry;

use std::io::Write;
use std::path::{Path, PathBuf};
use std::process::{Command, ExitCode};

use entry::Entry;

const USAGE: &str = "usage: thumbnails [--octant <path>] [--no-colorbar] [--no-axes] [<entry> ...]";
/// The thumbnail's pixels, as the gallery's cards show them.
const SIZE: &str = "800x450";
/// Lossy WebP quality: about 30 KB a thumbnail.
const QUALITY: f32 = 80.0;

fn main() -> ExitCode {
    let mut octant = String::from("octant");
    let mut keys = Vec::new();
    // Passed on to `octant --snapshot`.
    let mut hide = Vec::new();
    let mut args = std::env::args().skip(1);
    while let Some(arg) = args.next() {
        match arg.as_str() {
            "--octant" => match args.next() {
                Some(path) => octant = path,
                None => return usage("--octant needs a path"),
            },
            "--no-colorbar" | "--no-axes" => hide.push(arg),
            "-h" | "--help" => return usage(""),
            _ => keys.push(arg),
        }
    }
    let root = Path::new(env!("CARGO_MANIFEST_DIR")).join("../..");
    let entries = match entry::read_all(&root.join("content/gallery"), &keys) {
        Ok(entries) => entries,
        Err(why) => return usage(&why),
    };
    let mut failed = Vec::new();
    for entry in &entries {
        print!("{} ... ", entry.key);
        let _ = std::io::stdout().flush();
        match shoot(&octant, &hide, &root, entry) {
            Ok(note) => println!("{note}"),
            Err(why) => {
                println!("failed");
                failed.push((&entry.key, why));
            }
        }
    }
    println!(
        "{} saved, {} failed",
        entries.len() - failed.len(),
        failed.len()
    );
    for (key, why) in &failed {
        println!("  {key}: {why}");
    }
    ExitCode::from(u8::from(!failed.is_empty()))
}

/// Prints `why` (when any) and the usage; exit code 2.
fn usage(why: &str) -> ExitCode {
    if !why.is_empty() {
        eprintln!("thumbnails: {why}");
    }
    eprintln!("{USAGE}");
    ExitCode::from(2)
}

/// Captures `entry` with Octant and writes its WebP; what was saved.
fn shoot(octant: &str, hide: &[String], root: &Path, entry: &Entry) -> Result<String, String> {
    let thumbnail = entry.thumbnail();
    if !thumbnail.ends_with(".webp") {
        return Err(format!("thumbnail {thumbnail} is not a .webp"));
    }
    let png = std::env::temp_dir().join(format!("octant-thumbnail-{}.png", entry.key));
    let output = Command::new(octant)
        .arg("--snapshot")
        .arg(&png)
        .args(["--size", SIZE])
        .args(hide)
        .arg(entry.link())
        .output()
        .map_err(|e| format!("cannot run {octant}: {e}"))?;
    if !output.status.success() {
        return Err(octant_reason(&output.stderr));
    }
    let image = image::open(&png).map_err(|e| format!("reading {}: {e}", png.display()));
    let _ = std::fs::remove_file(&png);
    let image = image?.to_rgba8();
    let webp = webp::Encoder::from_rgba(&image, image.width(), image.height()).encode(QUALITY);
    let dest: PathBuf = root.join("public").join(thumbnail.trim_start_matches('/'));
    std::fs::write(&dest, &*webp).map_err(|e| format!("writing {}: {e}", dest.display()))?;
    Ok(match entry.thumbnail.is_none() {
        true => format!("{thumbnail} (add `thumbnail: {thumbnail}` to its entry)"),
        false => thumbnail,
    })
}

/// Octant's own lines on stderr (`octant: ...`), else its last line.
fn octant_reason(stderr: &[u8]) -> String {
    let text = String::from_utf8_lossy(stderr);
    let own: Vec<&str> = text.lines().filter(|l| l.starts_with("octant:")).collect();
    match (own.is_empty(), text.lines().last()) {
        (false, _) => own.join("; "),
        (true, Some(last)) => last.to_string(),
        (true, None) => "octant failed without a message".into(),
    }
}
