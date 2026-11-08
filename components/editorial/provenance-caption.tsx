export function ProvenanceCaption({ text }: { text: string }) {
  return (
    <p className="media-caption provenance-caption" aria-hidden="false">
      {text}
    </p>
  );
}
