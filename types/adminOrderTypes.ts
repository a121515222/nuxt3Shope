export interface AdminOrder {
  id: number;
  user: {
    name: string;
    email: string;
    tel: string;
    address: string;
  };
  products: AdminOrderProduct;
  total: number;
  is_paid: boolean;
  create_at: number;
  num: number;
}
export interface AdminOrderProduct {
  products: {
    [key: string]: {
      id: number;
      product_id: number;
      qty: number;
      total: number;
      final_total: number;
      product: {
        id: number;
        title: string;
        category: string;
        content: string;
        description: string;
        imageUrl: string;
        imagesUrl: string[];
        origin_price: number;
        price: number;
        unit: string;
        is_enabled: number;
      };
    };
  };
}
export interface FetchAdminOrder {
  success: boolean;
  orders: AdminOrder[];
  pagination: {
    total_pages: number;
    current_page: number;
    has_pre: boolean;
    has_next: boolean;
  };
  messages: string[];
}
// {
//   create_at: 1682002358,
//   id: "-NTU8n28E3TlCg19it7D",
//   is_paid: false,
//   products: {
//     "-NTU8n3dNxThyMHwRB3m": {
//       final_total: 130,
//       id: "-NTU8n3dNxThyMHwRB3m",
//       product: {
//         category: "水果",
//         content: "百香果",
//         description:
//           "<p>百香果是台灣常見的水果之一，果汁中主要色素種類為類胡蘿蔔素，富含蛋白質、類黃酮素、礦物質及維生素等營養。 由雜交法孕育而成的台農1號百香果，果實飽滿多汁、香氣濃郁，成熟外觀為帶斑點的紫紅色。 口味偏酸適合熬製成果醬或入菜及飲調混合搭配使用，喜歡偏酸百香果的您不能錯過。</p>",
//         id: "-MyQ40ak8euK340yJQyS",
//         imageUrl:
//           "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650721805853.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bTpk6PeqnDKYpOTJZXPkOOGExdTrRCBPc03j9wWaMhKogb%2F8kkEHwQof0TgtxySvohkhTYxIcNmef1BdYA%2F6zpg2sRCaJ%2BDXlA%2FadQESmYA6HN%2BveVsEfKN1jkS%2F9fkckzvk3e3zrwVPLgeAvv9NdQSLHMGMU1uJ8Wc%2FomyCHpxL2dvGDgYP5W7f8gAof%2FNO7s9JhD85Dy3LJ1Sgzko5Jv6NsSF3UlJIQ6CbsMfeIqaUNWd3fVZGaq%2BX5HzwTWyTQ8nuLhFVxWtdPreXCzSNQqg3DdpdGP05uLlGq7JXeVex23JaZmnc0fQGqdw6wze3681v3ZUqCwvW7S6rOrbduQ%3D%3D",
//         imagesUrl: [
//           "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980563316.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aU%2FksgAQzpfKum95ojGSBdGL5%2B6AuTVjgmnz3VT6U8b13yhohs6dYPWkthkwcNvV6Y7GmA0pevMhxhXhunn6rjDiHEs%2FQxxMw%2FU2nfh6teNT5QUS805La4ZShcHFxPaT5LDZIy49G3Ufn7rKrDm1rOXIH%2Fr7%2FoBanaUhABlY2dr7q8Ph4P%2F6usfxgcAvCrI9KRDVDQW7eHpDQu0u6Ikpgc4cZWtKPsEsuDWc0OXl7qMYn5WmzxtDDs5sXdu8r0GzMirTsWGvg6w6sgG7dXT%2FJDwuPSlflvW0l3cwkHrFGFptcFq9OjugpcgyRCBzJ%2FIrVN2c0%2F55JASHo1z9syVweA%3D%3D",
//           "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980587360.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pFfoyTBjYgeeR8JwPvaKgrTsOnDPSxzbwPwLS%2BbNKv8vLWzLGHMeCLoD1DyDWCnM6B6EgSakrOsPeyKv3mLFAnUe6rdhn1y1QJjZItFPowY0LNm6WKzv3OPrwQZPDBkwiytVnGI3kLPeM2VMgAEJ6NnE4DrdD4NKeMFMW1BAzTPe6By8FK9UBiMSwexbX9ywKxFbRZk2tOHSC0r3gYqea3WQloCBiWyicKaIK%2BPg%2BKXsBDtMJA7cD9iFPoPk1sT00eWD%2Bp2XLm00GPAJsuJw53RUoigIvVUhF6qJbWil5Gq%2FCEKwJdhDbHE5Jacqjnxy%2FFCZQzb91rkjKuKezE8xSw%3D%3D",
//           "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980595941.JPG?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hFK1Z6C6LU235M0Q3R5jHW98bET%2B6oEr%2Fyh4YUTp8KDMvBC%2FJgVkI4Xo7JVSe9%2FwuaM95N42dOWhq3gs1gSJ%2F6G0uEGcugqGbf7G0WMb%2Fs8cCs7kFWIkq%2FVmmht2L5RIiYLaxJPUp8uUBeFDh34vqJi%2FFpLEVC4XESDowb4v9dTgcLtUsRVXLYRFRcCI3wFopXQ1ltlQh20KQC3IehlArqW1Mx4kXEoHCEcMgiHaZNt9iIJ7ZUTcA6qj2D43xuw%2B%2FKHFMV%2F5%2F3aiQAArj2MIfmTBDdtSE%2FYToVV1IAZiicFhHSk9NuQDOF9dcK4WQ4LkUKDAO5D0ym0vJCbvcDmgQQ%3D%3D",
//           "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980606382.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XQPa%2BN4P8vj41fxZDFRX0uoFnD7yQwtt0smIaEX4B5Xs2g3JfDj1XWa8AFw5ZJvzCvwS%2FVzN361qNY9y7gW%2By4jzqWDIEt1TGgQKYuu6m73CuiZCNWxlAVjHE%2ByGsvnruxS2R%2FxUgQhAZpvgKdeuzasKXq42R92BSQDOhCDSbtvnjSi1Sm69d2huQcREQ1SvgJ8AUHTYxY%2FL02Fh978Xh7KEBeBvR5smADb1%2BTJKAeCZ93Q3lT1ZsyJpcI5spm3CbncNdD1VHV5akcyGWERJfqlV2GYD3SO7e17jY4Hl4XoKmKSuZaKipUfqKl8EV8kfVwMkYWJX1iT5sllezSidrQ%3D%3D"
//         ],
//         is_enabled: 1,
//         origin_price: 130,
//         price: 130,
//         title: "台農1號百香果",
//         unit: "台斤"
//       },
//       product_id: "-MyQ40ak8euK340yJQyS",
//       qty: 1,
//       total: 130
//     }
//   },
//   total: 130,
//   user: {
//     address: "123",
//     email: "aaa@gmail.com",
//     name: "John888",
//     tel: "0912312313"
//   },
//   num: 1
// },
