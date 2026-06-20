import { getActor } from "../actions/user/getActor";

export async function requireAdmin() {
  const actor = await getActor();
  if (!actor || (actor.role !== "ADMIN" && actor.role !== "SUPER_USER")) {
    return null;
  }
  return actor;
}
