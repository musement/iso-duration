import config from "../config";

const mocks = {
  fakeEnglishConfig: {
    foo: "bar"
  },
  fakePolishConfig: {
    foo: "bar bar"
  }
};
describe("config", () => {
  describe("when new locales are added", () => {
    const fakeLocalesConfig: any = { en: mocks.fakeEnglishConfig };
    config.setLocales(fakeLocalesConfig);

    it("should provided those locales with getLangConfig", () => {
      expect(config.getLangConfig("en")).toEqual(mocks.fakeEnglishConfig);
    });
  });

  describe("when another locales are added", () => {
    const fakeLocalesConfig: any = { pl: mocks.fakePolishConfig };
    config.setLocales(fakeLocalesConfig);

    it("should provided those locales with getLangConfig", () => {
      expect(config.getLangConfig("en")).toEqual(mocks.fakeEnglishConfig);
      expect(config.getLangConfig("pl")).toEqual(mocks.fakePolishConfig);
    });
  });

  describe("when locales is not available", () => {
    it("should throw an error", () => {
      expect(() => config.getLangConfig("not_added_locale")).toThrow(Error);
    });
  });
});
