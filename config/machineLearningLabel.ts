export default function checkLabel() {
  const label = ["barong", "bujuh", "dalem", "keras", "sidakarya", "tua"];
  const listCategoryData = [
    {
      name: "Topeng Barong",
      imageUrl:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2021/7/24/a22081c3-d801-4fbf-ba5f-e4c055172401.jpg",
      author: "Team Maskology",
      source: "Wikipedia",
      detail: "Lorem ipsum dolor sit amet",
      tags: "barong",
    },
    {
      name: "Topeng Bujuh",
      imageUrl:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//85/MTA-8114060/seni-id_bujuh_mask_-topeng_bujuh-_full03_bpn7mcjv.jpg",
      author: "Team Maskology",
      source: "Wikipedia",
      detail: "Lorem ipsum dolor sit amet",
      tags: "bujuh",
    },
    {
      name: "Topeng Dalem",
      imageUrl:
        "https://s1.bukalapak.com/img/6639579911/large/topeng_dalem_arsa_wijaya.jpg",
      author: "Team Maskology",
      source: "Wikipedia",
      detail: "Lorem ipsum dolor sit amet",
      tags: "dalem",
    },
    {
      name: "Topeng Keras",
      imageUrl:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//95/MTA-8114486/seni-id_keras_mask_-topeng_keras-_full05_c2qw3616.jpg",
      author: "Team Maskology",
      source: "Wikipedia",
      detail: "Lorem ipsum dolor sit amet",
      tags: "keras",
    },
    {
      name: "Topeng Sidakarya",
      imageUrl:
        "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2020/6/28/f5ccbabc-ad88-40c8-a12a-e2b7424979d9.jpg",
      author: "Team Maskology",
      source: "Wikipedia",
      detail: "Lorem ipsum dolor sit amet",
      tags: "sidakarya",
    },
    {
      name: "Topeng Tua",
      imageUrl:
        "https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//93/MTA-8115663/seni-id_tua_mask_-topeng_tua-_full01_scte098m.jpg",
      author: "Team Maskology",
      source: "Wikipedia",
      detail: "Lorem ipsum dolor sit amet",
      tags: "tua",
    },
  ];
  let labelCount: number = 0;

  listCategoryData.forEach((list) => {
    label.forEach((label) => {
      if (list.tags === label) {
        labelCount++;
      }
    });
  });

  if (labelCount === label.length) {
    return {
      label,
      listCategoryData,
    };
  } else {
    throw new Error(
      "Label and List Tags is not same, please check the label config"
    );
  }
}
