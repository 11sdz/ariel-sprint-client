import { members } from "../../pages/Members/members";

export const filterGroups = () => {
    const groups = Array.from(
      new Set(members.flatMap(member => member.groups || []))
    );
    return groups;
  };
  