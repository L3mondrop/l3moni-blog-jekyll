---
layout: post
title:  "Simple Load Testing in Azure DevOps pipeline with k6.js"
categories: azure
hidden: false
---

Simppeliä kuormitustestausta suoraan Azure DevOpsin pipelinessa k6.js:n avulla

[k6.js](https://k6.io/) on javascriptiin pohjautuva kirjasto, jolla on helppo rakentaa omia kuormitustestejä. Vaikka omien testien ajaminen onkin tuotu Azure DevOpsiin suoraan marketplacen kautta - [k6 Load Testing - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=k6.k6-load-test), koin että olisi mukava katsoa miten kyseisen työkalun saa pyörähtämään myös suoraan build agentille asennettuna.

Rakennan tällä hetkellä itselleni simppeliä blogia jota tarjoillaan tällä hetkellä sekä previewissä olevan [Azure Static Web Appsin](https://azure.microsoft.com/en-us/services/app-service/static/), sekä minun pienen AKS klusterin kautta joten halusin katsoa kuinka ne pärjäävät kuormituksen alla.

Käytin testissäni seuraavanlaista koodia:

import http from &#39;k6/http&#39;;

import { check, sleep } from &#39;k6&#39;;

// Generoidaan 40 sekuntin ajan kuormitusta eri virtuaalikäyttäjien määrillä

export let options = {

  stages: [

    { duration: &#39;10s&#39;, target: 100},

    { duration: &#39;10s&#39;, target: 50},

    { duration: &#39;10s&#39;, target: 25},

    { duration: &#39;10s&#39;, target: 10},

  ],

};

export default function () {

  // \_\_ENV.URLin avulla voidaan tuoda haluttu ip / dns osoite ulkopuolelta, esim. Azure DevOpsista

  let res = http.get(\_\_ENV.URL);

  check(res, {&#39;status was 200&#39;: (r) =\&gt; r.status == 200});

  sleep(1);

}

Kuva 1. – Testaus scriptini jota ajetaan build agentissa tai vaikka lokaalilla koneella

Azure DevOpsin puolella minulla on seuraavanlainen Release pipeline:

1. &quot;Rakennetaan staattisesta web sovelluksesta uusi kontin image &quot;latest&quot; tagilla/versiolla ja viedään se Azure Container Registryyn&quot; -\&gt;
  - Tämä tehdään siksi että Kuberneteksessä voidaan pakottaa uuden imagen lataus helposti asetuksella &quot;imagePullPolicy: Always, mutta se toimii vain jos käytetään imagessa latest tagia.
  - Versionhallinnan takia kontin imagesta on jo aikaisemmin myös rakennettu samaan ACR ympäristöön toisella tagilla/versiolla esim. &quot;0.0.1&quot;
2. &quot;Kubectl Apply komennolla pakoitetaan AKS lataamaan äsken luotu uusi latest image ajoon&quot;
  - Koska kyseessä on vain minun blogi, ei tällä hetkellä ole käytössä mitään staging/production käytäntöä
3. &quot;Asennetaan build agentille k6.js, sekä ajetaan build artifactien mukana kulkeva, alunperin repositorystä lähtevä k6 testaus scripti&quot;

![](RackMultipart20210121-4-17bv2rc_html_c707f80f215a3488.png)

Kuva 2. k6.js:n asennus build agentille (seuraa suoraa asennusohjetta k6.iosta)

![](RackMultipart20210121-4-17bv2rc_html_d3ea31dacfa3b3f9.png)

Kuva 3. Oikean työhakemiston määrittäminen (build artifact) sekä muuttujan määrittely k6 kutsun yhteydessä.

![](RackMultipart20210121-4-17bv2rc_html_61e55071c9b806b3.png)

Kuva 4. Build agentin logeista löytyvä testitulos – testin mukaan AKS podi selvisi staattisesta websovellustyökuormasta oikein hienosti.

Vaikka k6.js oli minulle vain nimellisesti tuttu aikaisemmin, ei testaustyökaluun tutustumiseen, skriptin rakentamiseen ja toteuttamiseen Azure DevOpsin pipelinessa mennyt kaiken kaikkiaan kuin n. 1h

Kooditerveisin! - Mikko Kasanen, Cloud Solution Architect App Dev