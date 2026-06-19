// Renders a real HTML comment into the page source (JSX {/* */} comments are
// stripped at build and never reach the DOM — this injects an actual <!-- -->).
// Invisible to users; a quiet signature for anyone who views source.
// Drop <BuildCredit /> once in the root layout, inside <body>.

const CREDIT = `
  ┌─────────────────────────────────────────────┐
  │  MHD Custom — designed & built by Sqysh       │
  │  https://sqysh.io                             │
  └─────────────────────────────────────────────┘
`;

export default function BuildCredit() {
  return <div dangerouslySetInnerHTML={{ __html: `<!--${CREDIT}-->` }} />;
}
