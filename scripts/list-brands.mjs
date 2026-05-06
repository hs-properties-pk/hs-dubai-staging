import { offPlanListings } from "../data/off-plan-data.js";
import { communityListings } from "../data/community-data.js";

function slugify(name) {
  if (!name || typeof name !== "string") return "";
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

const map = new Map();
for (const p of offPlanListings) {
  if (!p.brand) continue;
  if (!map.has(p.brand)) map.set(p.brand, { offPlan: 0, comm: 0 });
  map.get(p.brand).offPlan += 1;
}
for (const c of communityListings) {
  if (!c.brand) continue;
  if (!map.has(c.brand)) map.set(c.brand, { offPlan: 0, comm: 0 });
  map.get(c.brand).comm += 1;
}

const rows = [...map.entries()]
  .map(([name, o]) => ({
    name,
    slug: slugify(name),
    offPlanCount: o.offPlan,
    communityCount: o.comm,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

console.log(JSON.stringify(rows, null, 2));
console.error("Count:", rows.length);
