//! A gallery entry's front matter: its store, share-link keys and thumbnail
//! path (`lib/gallery.ts` `galleryEntrySchema` validates the rest).

use std::collections::BTreeMap;
use std::path::Path;

use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Entry {
    /// The file's name without `.mdx`.
    #[serde(skip)]
    pub key: String,
    store: String,
    /// Share-link keys applied after `src`.
    #[serde(default)]
    open: BTreeMap<String, String>,
    /// Path under `public/`, such as `/gallery/seasfire.webp`.
    pub thumbnail: Option<String>,
}

impl Entry {
    /// The share link's query, encoded as `octantLink` encodes it
    /// (`URLSearchParams`); Octant reads what follows the `?`.
    pub fn link(&self) -> String {
        let mut query = form_urlencoded::Serializer::new(String::new());
        query.append_pair("src", &self.store);
        query.extend_pairs(&self.open);
        format!("?{}", query.finish())
    }

    /// Where the thumbnail goes: its `thumbnail`, else `/gallery/<key>.webp`.
    pub fn thumbnail(&self) -> String {
        let default = || format!("/gallery/{}.webp", self.key);
        self.thumbnail.clone().unwrap_or_else(default)
    }
}

/// The entries in `dir` named by `keys` (all of them when empty), by name.
pub fn read_all(dir: &Path, keys: &[String]) -> Result<Vec<Entry>, String> {
    let listing = std::fs::read_dir(dir).map_err(|e| format!("{}: {e}", dir.display()))?;
    let mut entries = Vec::new();
    for path in listing.filter_map(|f| f.ok()).map(|f| f.path()) {
        let Some(key) = path.file_stem().and_then(|s| s.to_str()) else {
            continue;
        };
        let wanted = keys.is_empty() || keys.iter().any(|k| k == key);
        if path.extension().is_some_and(|e| e == "mdx") && wanted {
            entries.push(read(&path, key)?);
        }
    }
    if let Some(missing) = keys.iter().find(|k| !entries.iter().any(|e| &e.key == *k)) {
        return Err(format!("no entry content/gallery/{missing}.mdx"));
    }
    entries.sort_by(|a, b| a.key.cmp(&b.key));
    Ok(entries)
}

fn read(path: &Path, key: &str) -> Result<Entry, String> {
    let name = path.display();
    let text = std::fs::read_to_string(path).map_err(|e| format!("{name}: {e}"))?;
    let yaml = front_matter(&text).ok_or(format!("{name}: no front matter"))?;
    let mut entry: Entry = serde_yaml_ng::from_str(yaml).map_err(|e| format!("{name}: {e}"))?;
    entry.key = key.to_string();
    Ok(entry)
}

/// The YAML between the opening `---` line and the next.
fn front_matter(text: &str) -> Option<&str> {
    let rest = text.strip_prefix("---")?;
    let end = rest.find("\n---")?;
    Some(&rest[..end])
}

#[cfg(test)]
mod tests {
    use super::*;

    const MDX: &str = "---\ntitle: \"A\"\nstore: https://x.org/a.zarr\nopen:\n  \"var\": \"t2m\"\n  \"time\": \"#2\"\n---\n\nBody.\n";

    #[test]
    fn front_matter_reads_into_a_link_and_a_default_thumbnail() {
        let yaml = front_matter(MDX).unwrap_or_default();
        let entry: Result<Entry, _> = serde_yaml_ng::from_str(yaml);
        let Ok(mut entry) = entry else {
            panic!("{entry:?}");
        };
        entry.key = "a".into();
        assert_eq!(
            entry.link(),
            "?src=https%3A%2F%2Fx.org%2Fa.zarr&time=%232&var=t2m"
        );
        assert_eq!(entry.thumbnail(), "/gallery/a.webp");
    }
}
