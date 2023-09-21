import request from "supertest";
import { app } from "../index";

describe("Tests pour les routes de l'API", () => {
  beforeEach(() => {});

  afterEach(() => {});

  it("Devrait obtenir tous les produits", (done) => {
    request(app)
      .get("/products")
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.an("array");
        done();
      });
  });

  it("Devrait obtenir un produit par ID", (done) => {
    const productId = "votre_id_de_test_valide";

    request(app)
      .get(`/products/${productId}`)
      .expect(200)
      .expect("Content-Type", /json/)
      .end((err, res) => {
        if (err) return done(err);
        res.body.should.be.an("object");
        res.body.should.have.property("_id", productId);
        done();
      });
  });
});
