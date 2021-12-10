describe("should render home page", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("#main").should("exist");
  });
});
describe("should render about page", () => {
  it("renders correctly", () => {
    cy.visit("/about");
    cy.get("#aboutwrapper").should("exist");
  });
});
describe("should render contact page", () => {
  it("renders correctly", () => {
    cy.visit("/contact");
    cy.get("#contact").should("exist");
  });
});
describe("should route to home page", () => {
  it("routes correctly", () => {
    cy.visit("/contact");
    cy.get("#homelink").click();
    cy.get("#main").should("exist");
  });
});
describe("should route to about page", () => {
  it("routes correctly", () => {
    cy.visit("/");
    cy.get("#aboutlink").click();
    cy.get("#aboutwrapper").should("exist");
  });
});
describe("should route to contact page", () => {
  it("routes correctly", () => {
    cy.visit("/");
    cy.get("#contactlink").click();
    cy.get("#contact").should("exist");
  });
});

describe("should render burger when viewport shrinks", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.viewport(550, 750);
    cy.get("#burger").should("exist");
  });
});
describe("should render menu when burger is clicked", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.viewport(550, 750);
    cy.get("#burger").click();
    cy.get("#burgercontactlink").should("exist");
  });
});
describe("should route to contact through burger", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.viewport(550, 750);
    cy.get("#burger").click();
    cy.get("#burgercontactlink").click();
    cy.get("#contact").should("exist");
  });
});
describe("should route to about through burger", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.viewport(550, 750);
    cy.get("#burger").click();
    cy.get("#burgeraboutlink").click();
    cy.get("#aboutwrapper").should("exist");
  });
});
describe("should route to home through burger", () => {
  it("renders correctly", () => {
    cy.visit("/contact");
    cy.viewport(550, 750);
    cy.get("#burger").click();
    cy.get("#burgerhomelink").click();
    cy.get("#main").should("exist");
  });
});

describe("should route to privacy page", () => {
  it("renders correctly", () => {
    cy.visit("/");
    cy.get("#privacylink").click();
    cy.get("#privacy").should("exist");
  });
});
describe("should give error if contact form has no input", () => {
  it("give error correctly", () => {
    cy.visit("/contact");
    cy.get("#submitButton").click();
    cy.contains("Enter all fields!").should("exist");
  });
});

describe("should give email sent if contact form has input", () => {
  it("render email sent", () => {
    cy.visit("/contact");
    cy.get("#nameInput").type('Josh');
    cy.get("#emailInput").type('Josh');
    cy.get("#messageInput").type('Josh');
    cy.get("#submitButton").click();
    cy.contains("Email Sent!").should("exist");
  });
});
describe("should login after a submit and allow posts", () => {
  it("logs in and allows a post", () => {
    cy.visit("/login");
    cy.get("#nameInput").type('Josh');
    cy.get("#passwordInput").type('1234');
    cy.get("#loginButton").click();
    cy.get("#postslink").should("exist");
    cy.get("#postslink").click();
    cy.get("#addpostInput").type('test');
    cy.get("#addpostButton").click();
    cy.contains("test").should("exist");
    cy.contains("Josh4").should("exist");
  });
});

describe("should route to posts through burger", () => {
  it("renders correctly", () => {
    cy.viewport(550, 750);
    cy.get("#burger").click();
    cy.get("#burgerpostslink").click();
    cy.get("#addpostInput").should("exist");
  });
});