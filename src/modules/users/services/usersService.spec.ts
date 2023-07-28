import { DefaultResponse } from "../../../global/DefaultResponse";
import { InMemoryUsersRepository } from "../../../test/inMemoryRepositories/in-memory-users-repository";
import { UsersService } from "./UsersService";

let usersRepository: InMemoryUsersRepository;
let sut: UsersService;

describe("Create User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UsersService(usersRepository);
  });

  it("should be able to create an user", async () => {
    let user = await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    expect(user.user_name).toEqual("Marquelo");
    expect(user.email).toEqual("marquelo@gmail.com");
    expect(usersRepository.items).length(1);
  });

  it("should not be able to create an user with the same email", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    expect(async () => {
      await sut.create("Thiken", "12345", "marquelo@gmail.com");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Find User by email", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UsersService(usersRepository);
  });

  it("should be able to find an user by email", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    let user = await sut.findByEmail("marquelo@gmail.com");

    expect(user.user_name).toEqual("Marquelo");
    expect(user.email).toEqual("marquelo@gmail.com");
  });

  it("should not be able to find an user with an inexistent email", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    expect(async () => {
      await sut.findByEmail("naoexiste@gmail.com");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Delete User by email", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UsersService(usersRepository);
  });

  it("should be able to delete an user by email", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    await sut.deleteByEmail("marquelo@gmail.com");

    expect(usersRepository.items).length(0);
  });

  it("should not be able to delete an user with an inexistent email", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    expect(async () => {
      await sut.deleteByEmail("naoexiste@gmail.com");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Update user", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UsersService(usersRepository);
  });

  it("should be able to update an user", async () => {
    let user = await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    let userUpdated = await sut.update(
      user.user_id,
      "Chigo",
      "54321",
      "chigo@gmail.com"
    );

    expect(userUpdated.user_name).toEqual("Chigo");
    expect(userUpdated.email).toEqual("chigo@gmail.com");
    expect(usersRepository.items).length(1);
  });

  it("should not be able to update a nonexistent user", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    expect(async () => {
      await sut.update("banana", "Chigo", "54321", "chigo@gmail.com");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UsersService(usersRepository);
  });

  it("should be able to authenticate an user", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");
    let userAuthenticated = await sut.authenticate(
      "marquelo@gmail.com",
      "12345"
    );

    expect(userAuthenticated).toEqual(
      expect.objectContaining({
        user: { user_name: "Marquelo", email: "marquelo@gmail.com" },
        token: userAuthenticated.token,
      })
    );
  });

  it("should not be able to authenticate an user with the same email", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    expect(async () => {
      await sut.authenticate("chiago@gmail.com", "12345", );
    }).rejects.toBeInstanceOf(DefaultResponse);
  });

  it("should not be able to authenticate an user with incorrect password", async () => {
    await sut.create("Marquelo", "12345", "marquelo@gmail.com");

    expect(async () => {
      await sut.authenticate("marquelo@gmail.com", "54321");
    }).rejects.toBeInstanceOf(DefaultResponse);
  });
});
