function decodeJWT(token) {
  const [header, payload, signature] = token.split(".");
  if (!header || !payload || !signature) {
    throw new Error("Invalid JWT");
  }

  const decodeBase64Url = (str) => {
    const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
    const paddedBase64 = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    return JSON.parse(atob(paddedBase64));
  };

  const decodedHeader = decodeBase64Url(header);
  const decodedPayload = decodeBase64Url(payload);

  return {
    header: decodedHeader,
    payload: decodedPayload,
    signature: signature,
  };
}

export default decodeJWT;
