import * as Dataframe from "../../../src/util/dataframe";

describe("Dataframe column histogram", () => {
  test("categorical by categorical", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("cat").histogram(df.col("name"));
    expect(h1).toMatchObject(
      new Map([
        ["n1", new Map([["c1", 1]])],
        ["n2", new Map([["c2", 1]])],
        ["n3", new Map([["c3", 1]])]
      ])
    );
    // memoized?
    expect(df.col("cat").histogram(df.col("name"))).toMatchObject(h1);
  });

  test("continuous by categorical", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("value").histogram(3, [0, 2], df.col("name"));
    expect(h1).toMatchObject(
      new Map([["n1", [1, 0, 0]], ["n2", [0, 1, 0]], ["n3", [0, 0, 1]]])
    );
    // memoized?
    expect(df.col("value").histogram(3, [0, 2], df.col("name"))).toMatchObject(
      h1
    );
  });

  test("categorical", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("cat").histogram();
    expect(h1).toMatchObject(new Map([["c1", 1], ["c2", 1], ["c3", 1]]));
    // memoized?
    expect(df.col("value").histogram(3, [0, 2])).toMatchObject(h1);
  });

  test("continuous", () => {
    const df = new Dataframe.Dataframe(
      [3, 3],
      [["n1", "n2", "n3"], ["c1", "c2", "c3"], new Int32Array([0, 1, 2])],
      null,
      new Dataframe.KeyIndex(["name", "cat", "value"])
    );

    const h1 = df.col("value").histogram(3, [0, 2]);
    expect(h1).toMatchObject([1, 1, 1]);
    // memoized?
    expect(df.col("value").histogram(3, [0, 2])).toMatchObject(h1);
  });
});