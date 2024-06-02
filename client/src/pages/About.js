import React from "react";
import Layout from "./../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - Ecommer app"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2">
          Bienvenue sur Diamarket, votre plateforme de vente en ligne internationale de confiance. En regroupant une multitude de marketplaces dans de nombreux pays, Diamarket offre aux utilisateurs une opportunité unique de vendre leurs produits à une audience mondiale. Que vous soyez un petit artisan ou une grande entreprise, notre plateforme vous permet de présenter vos articles à des millions de clients potentiels et de les livrer partout dans le monde. Avec Diamarket, élargissez vos horizons et faites prospérer votre commerce à l'échelle globale. Rejoignez-nous dès aujourd'hui et découvrez un monde de possibilités.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
