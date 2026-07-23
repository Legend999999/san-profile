const blockedHosts = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"]);

function isPrivateIPv4(hostname: string) {
  const parts = hostname.split(".").map((part) => Number(part));
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part))) {
    return false;
  }
  const [a, b] = parts;
  return (
    a === 10 ||
    a === 127 ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 169 && b === 254) ||
    a === 0
  );
}

export function validatePublicWebsiteUrl(value: string) {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("URL ـی وێبسایتێکی دروست بنووسە.");
  }

  if (!["https:", "http:"].includes(url.protocol)) {
    throw new Error("تەنها URL ـی http و https ڕێگەپێدراون.");
  }

  const hostname = url.hostname.toLowerCase();
  if (
    blockedHosts.has(hostname) ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal") ||
    hostname === "metadata.google.internal" ||
    hostname === "169.254.169.254" ||
    isPrivateIPv4(hostname)
  ) {
    throw new Error("URL ـی ناوخۆیی، localhost، تۆڕی تایبەت و metadata بلۆک کراون.");
  }

  url.username = "";
  url.password = "";
  return url.toString();
}

export function isProbablyEmbeddable(url: string) {
  return !/github\.com|vercel\.app\/login|accounts\.google\.com/i.test(url);
}
