/**
 * Splits nested `breadcrumb` into a separate @graph node so types like Article
 * or Service do not carry an invalid `breadcrumb` property in one object.
 */
export function articleGraphJsonLd(nodeWithBreadcrumb) {
  if (!nodeWithBreadcrumb) return null;
  const { breadcrumb, ...rest } = nodeWithBreadcrumb;
  const { "@context": _context, ...entity } = rest;
  const graph = breadcrumb ? [entity, breadcrumb] : [entity];
  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
