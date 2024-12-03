/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

import { SidebarsConfig } from "@docusaurus/plugin-content-docs";
import openapiSidebar from "./docs/openapi/sidebar";

// This reorders the docs to be in the order of get, post, put, delete
function reorderSidebar(sidebar) {
  const methodOrder = ["get", "post", "put", "delete"];

  sidebar.forEach(category => {
    if (category.items) {
      category.items.sort((a, b) => {
        const methodA = a.className.split(' ')[1].toLowerCase();
        const methodB = b.className.split(' ')[1].toLowerCase();

        const indexA = methodOrder.indexOf(methodA);
        const indexB = methodOrder.indexOf(methodB);

        if (indexA === -1 && indexB === -1) return 0;
        if (indexA === -1) return 1;
        if (indexB === -1) return -1;

        return indexA - indexB;
      });
    }
  });

  return sidebar;
}

const sidebars: SidebarsConfig = {
  sidebar: [
    { type: "autogenerated", dirName: "." },
    {
      "OpenAPI Documentation": reorderSidebar(openapiSidebar),
    },
  ],
};

export default sidebars;