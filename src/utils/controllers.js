"use server";

import { revalidateTag } from "next/cache";

export async function addLink(link) {
  await fetch("http://localhost:3000/api/v1/links", {
    method: "POST",
    body: JSON.stringify({ link: link }),
  });

  revalidateTag("link");
}

export async function deleteLink(id) {
  await fetch(`http://localhost:3000/api/v1/links/${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
  });

  revalidateTag("link");
}

export async function editLink(id, newLink) {
  await fetch(`http://localhost:3000/api/v1/links/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ link: newLink }),
  });
  revalidateTag("link");
}
