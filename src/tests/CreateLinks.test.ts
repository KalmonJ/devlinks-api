import { CreateLink } from "../core/use-cases/CreateLink";
import { LinkInMemoryRepository } from "../infra/repositories/LinkInMemoryRepository";

describe("CreateLink use case test", () => {
  test("Should create a link", async () => {
    const input = {
      links: [
        {
          platform: "youtube",
          link: "https://youtube.com/dev",
        },
      ],
    };

    const linkRepository = new LinkInMemoryRepository();
    const spy = jest.spyOn(linkRepository, "create");
    const createLink = new CreateLink(linkRepository);
    await createLink.execute(input);
    expect(spy).toBeCalledTimes(1);
    expect(linkRepository.links.length).toBe(1);
  });

  test("An error should appear if an invalid link was passed", () => {
    const input = {
      links: [
        {
          platform: "youtube",
          link: "http://youtube.com/dev",
        },
      ],
    };

    const linkRepository = new LinkInMemoryRepository();
    const createLink = new CreateLink(linkRepository);
    expect(createLink.execute(input)).rejects.toThrowError("Invalid link");
  });
});
