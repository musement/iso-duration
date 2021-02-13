import config from "../config";

const mocks = {
  fakeEnglishConfig: {
    weeks: "bar",
  },
  fakePolishConfig: {
    weeks: "bar bar",
  },
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
    describe("when a fallback locale is given", () => {
      it("should provided the fallback locales with getLangConfig", () => {
        config.setLocales({}, { fallbackLocale: "en" });
        expect(config.getLangConfig("not_added_locale")).toEqual(
          mocks.fakeEnglishConfig
        );
      });
    });

    describe("when a fallback locale is not given", () => {
      it("should throw an error", () => {
        config.setLocales({}, { fallbackLocale: undefined } as any);
        expect(() => config.getLangConfig("not_added_locale")).toThrow(Error);
      });
    });

    describe("when a fallback locale is not valid", () => {
      it("should throw an error", () => {
        config.setLocales({}, { fallbackLocale: "not_valid" });
        expect(() => config.getLangConfig("not_added_locale")).toThrow(Error);
      });
    });
  });
});
