// import testJson from "/submit-manifest.json";

export const Config = {
  /** read and return the decision tree from a json file */
  readTree: async () => {
    const foo = await fetch("/submit-manifest.json");
    console.log(foo.json());
    return foo;
  },
};
