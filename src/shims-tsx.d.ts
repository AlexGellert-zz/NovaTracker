import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}

// This will allow you to load `.json` files from disk

declare module "*.json"
{ const value: any;
  export default value;
}

// This will allow you to load JSON from remote URL responses

declare module "json!*"
{ const value: any;
  export default value;
}