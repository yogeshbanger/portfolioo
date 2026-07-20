import { useEffect } from "react";

/**
 * SEO — drop this at the top of every page component.
 * No extra dependency required (no react-helmet). Just sets
 * document.title + meta tags on mount, and restores nothing on
 * unmount since the next page will overwrite them anyway.
 *
 * Usage:
 * <SEO
 *   title="Projects | Yogesh Banger"
 *   description="Frontend projects built by Yogesh Banger using React.js and Tailwind CSS."
 *   keywords="Yogesh Banger, React projects, MigrationHub, Portfolio"
 * />
 */
function setMeta(name, content, attr = "name") {
  if (!content) return;
  let tag = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

export default function SEO({
  title = "Yogesh Banger  | Full Stack Developer",
  description = "Yogesh Banger — BCA student and full stack developer specializing in React.js, Tailwind CSS, Node.js and MongoDB.",
  keywords = "Yogesh Banger, Full Stack Developer, React Developer, BCA Student, Portfolio",
  url,
  image = "/imges/profile.png",
}) {
  useEffect(() => {
    document.title = title;

    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("author", "Yogesh Banger");
    setMeta("robots", "index, follow");

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", "website", "property");
    setMeta("og:image", image, "property");
    if (url) setMeta("og:url", url, "property");

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    // Canonical
    if (url) {
      let link = document.head.querySelector('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", url);
    }
  }, [title, description, keywords, url, image]);

  return null;
}