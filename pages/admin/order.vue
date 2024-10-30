<script lang="ts" setup>
const isLoading = ref(false);
const postId = ref("");
const orders = ref([
  {
    create_at: 1682002358,
    id: "-NTU8n28E3TlCg19it7D",
    is_paid: false,
    products: {
      "-NTU8n3dNxThyMHwRB3m": {
        final_total: 130,
        id: "-NTU8n3dNxThyMHwRB3m",
        product: {
          category: "水果",
          content: "百香果",
          description:
            "<p>百香果是台灣常見的水果之一，果汁中主要色素種類為類胡蘿蔔素，富含蛋白質、類黃酮素、礦物質及維生素等營養。 由雜交法孕育而成的台農1號百香果，果實飽滿多汁、香氣濃郁，成熟外觀為帶斑點的紫紅色。 口味偏酸適合熬製成果醬或入菜及飲調混合搭配使用，喜歡偏酸百香果的您不能錯過。</p>",
          id: "-MyQ40ak8euK340yJQyS",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650721805853.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bTpk6PeqnDKYpOTJZXPkOOGExdTrRCBPc03j9wWaMhKogb%2F8kkEHwQof0TgtxySvohkhTYxIcNmef1BdYA%2F6zpg2sRCaJ%2BDXlA%2FadQESmYA6HN%2BveVsEfKN1jkS%2F9fkckzvk3e3zrwVPLgeAvv9NdQSLHMGMU1uJ8Wc%2FomyCHpxL2dvGDgYP5W7f8gAof%2FNO7s9JhD85Dy3LJ1Sgzko5Jv6NsSF3UlJIQ6CbsMfeIqaUNWd3fVZGaq%2BX5HzwTWyTQ8nuLhFVxWtdPreXCzSNQqg3DdpdGP05uLlGq7JXeVex23JaZmnc0fQGqdw6wze3681v3ZUqCwvW7S6rOrbduQ%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980563316.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aU%2FksgAQzpfKum95ojGSBdGL5%2B6AuTVjgmnz3VT6U8b13yhohs6dYPWkthkwcNvV6Y7GmA0pevMhxhXhunn6rjDiHEs%2FQxxMw%2FU2nfh6teNT5QUS805La4ZShcHFxPaT5LDZIy49G3Ufn7rKrDm1rOXIH%2Fr7%2FoBanaUhABlY2dr7q8Ph4P%2F6usfxgcAvCrI9KRDVDQW7eHpDQu0u6Ikpgc4cZWtKPsEsuDWc0OXl7qMYn5WmzxtDDs5sXdu8r0GzMirTsWGvg6w6sgG7dXT%2FJDwuPSlflvW0l3cwkHrFGFptcFq9OjugpcgyRCBzJ%2FIrVN2c0%2F55JASHo1z9syVweA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980587360.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pFfoyTBjYgeeR8JwPvaKgrTsOnDPSxzbwPwLS%2BbNKv8vLWzLGHMeCLoD1DyDWCnM6B6EgSakrOsPeyKv3mLFAnUe6rdhn1y1QJjZItFPowY0LNm6WKzv3OPrwQZPDBkwiytVnGI3kLPeM2VMgAEJ6NnE4DrdD4NKeMFMW1BAzTPe6By8FK9UBiMSwexbX9ywKxFbRZk2tOHSC0r3gYqea3WQloCBiWyicKaIK%2BPg%2BKXsBDtMJA7cD9iFPoPk1sT00eWD%2Bp2XLm00GPAJsuJw53RUoigIvVUhF6qJbWil5Gq%2FCEKwJdhDbHE5Jacqjnxy%2FFCZQzb91rkjKuKezE8xSw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980595941.JPG?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hFK1Z6C6LU235M0Q3R5jHW98bET%2B6oEr%2Fyh4YUTp8KDMvBC%2FJgVkI4Xo7JVSe9%2FwuaM95N42dOWhq3gs1gSJ%2F6G0uEGcugqGbf7G0WMb%2Fs8cCs7kFWIkq%2FVmmht2L5RIiYLaxJPUp8uUBeFDh34vqJi%2FFpLEVC4XESDowb4v9dTgcLtUsRVXLYRFRcCI3wFopXQ1ltlQh20KQC3IehlArqW1Mx4kXEoHCEcMgiHaZNt9iIJ7ZUTcA6qj2D43xuw%2B%2FKHFMV%2F5%2F3aiQAArj2MIfmTBDdtSE%2FYToVV1IAZiicFhHSk9NuQDOF9dcK4WQ4LkUKDAO5D0ym0vJCbvcDmgQQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980606382.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XQPa%2BN4P8vj41fxZDFRX0uoFnD7yQwtt0smIaEX4B5Xs2g3JfDj1XWa8AFw5ZJvzCvwS%2FVzN361qNY9y7gW%2By4jzqWDIEt1TGgQKYuu6m73CuiZCNWxlAVjHE%2ByGsvnruxS2R%2FxUgQhAZpvgKdeuzasKXq42R92BSQDOhCDSbtvnjSi1Sm69d2huQcREQ1SvgJ8AUHTYxY%2FL02Fh978Xh7KEBeBvR5smADb1%2BTJKAeCZ93Q3lT1ZsyJpcI5spm3CbncNdD1VHV5akcyGWERJfqlV2GYD3SO7e17jY4Hl4XoKmKSuZaKipUfqKl8EV8kfVwMkYWJX1iT5sllezSidrQ%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 130,
          price: 130,
          title: "台農1號百香果",
          unit: "台斤"
        },
        product_id: "-MyQ40ak8euK340yJQyS",
        qty: 1,
        total: 130
      }
    },
    total: 130,
    user: {
      address: "123",
      email: "aaa@gmail.com",
      name: "John888",
      tel: "0912312313"
    },
    num: 1
  },
  {
    create_at: 1682002335,
    id: "-NTU8hO7hkZSl08BeuEV",
    is_paid: false,
    products: {
      "-NTU8hPQTWgg8Hkf1Y0v": {
        final_total: 60,
        id: "-NTU8hPQTWgg8Hkf1Y0v",
        product: {
          category: "蔬菜",
          content: "四季豆的一種，因外型扭曲又稱醜豆",
          description:
            "<p>『凡人不可貌相，海水不可斗量』用這句話來形容生長凌亂隨意、毫無美感可言的醜豆是最為貼近的。 長相歪曲又凹醜的醜豆擁有鉀、鈣、膳食纖維等營養素。常見於一般日常料理，可炒、可燙、可涼拌，具有清甜爽脆的口感。屬於低卡高纖可提升飽足感的蔬菜豆一族，適合減重忌口的您！</p>",
          id: "-MyQ6IsJkootRSjOuN43",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650722111688.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ABcTor6UNVPu4jNX7OzFTohy1tHIlAMTwpjvQCnFeCvpo1L8NcV8HkStuZkr%2FmAlVY52XHWc53fd%2Fxdd06yxqXS5%2FRqiQHXnU4hEwugR%2FxZIhXqctxHBKozkgBOmqOMMTu3aCt3OUWhdviWkAbtc3Pqn9ohB3tfvtLviosFjxjcMwh5iAnaz4eBD5ccp3LYyxkvyJf264rLQG2uDQZr%2FlyUPcJC%2Fi5Hz%2FnXIkDL9pkHkOFqd1Ce%2B%2Bvk983K6O8BkB%2FlFO6ZOz2I%2Fx%2BmDPKt%2FFIQTFePL%2BxNTfvB98ShKvKl2dWbEwEB%2FHv5pGpNGbBFBdkzWFZIGPQPVhpJQC9qyiw%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980489091.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=D%2Bi4Rlo4WkJzjjqgik4A%2BLJiBQ0%2BlyGJZXQ2pUau6LJXCczdeZmDhKf8j2Y05vIeKg44kTCC5VxoMDqy3up7MyRI5NTryCiYlwetMSKRG6UUKFycF0SPnx3O0kKoRj0UeYbqvC6YHZG5qVF11V%2F01nTSGl%2F7zBA052XKYFo%2FiAKawOhYsMs9rfJDfIjZ%2BSW4z9trqh%2BskuCJzrXHvx6KyW8xFakMBuLvOJV7YPTlAuBOfZ6IpIV83AuXN5eWpYh1N%2BGQtwiNagUNom5ke%2BpCKR2Sy9chlz8kLRi8rcpOTC9kEqk5GbcXWi6gT4SSVyg9UV5n0tDXFp2mxLZNLZ0FmQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980508405.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VuNXv3H4pvpMFlWQrm7IuxmvXH9XX2S9kXkwinl3nzzc3e8J51ygRV4mpbJR0Xf3BX%2B35rMCtBBiYBnYiWUYWnJ8i8JnogWrVC3de1JzSvFB4k1RA8LqHS3%2BxayzuIOjXxyQvFET2XfTwHxQTUjNmFlX6uQG3a0HJqz937frDhgYu26dT%2FaJk8Qae4eWo8lfkyfkORCbQU%2Bc1z10QfVgOAYtGkaWEtOtdkxXFXMB58OcKUZO5Ij%2FUrTHAvcpWVa4O%2FxdUdetQMhHrK%2BAgsVHCOF16Rkc%2FqpjnBOahvO3iJEYoQbxIbLj14GPWHuQtPsSu8eORUXPhLPUj6dJ9md6Kg%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980521425.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ekx6UG3P8ceKNX3jivzDdoxL22wrzWlBfH4XQVLD3lW6b%2FuE2raQZdWhRn4A471%2BkSTh4NFR%2FZehKktGAMcEVFDs5h8vSHwx8r3IgwnlMzCopNeSWG54%2BImpdi70FNZXRMaCKSyE7oVZdN7y%2BS8zkuGne%2Bceeaz7mCdf25rRdNBYlZzEreYa2EZa0hOuIBYpOwRGGMxsacI0%2BztySvryRSJV8WgsBG82CN1LYgNi6GBQypJp9WtsVI2tdzSKf4qAU2d5Lo5WCm7ae%2BRGlQMEPkwb0HRPM5lNOYQI4TX6nk8Jyk5vzAVP5UHjUDfwSBIwGhujWq3fniuzNymzyGAVhA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 60,
          price: 60,
          title: "醜豆",
          unit: "台斤"
        },
        product_id: "-MyQ6IsJkootRSjOuN43",
        qty: 1,
        total: 60
      }
    },
    total: 60,
    user: {
      address: "123",
      email: "aaa@gmail.com",
      name: "John888999999999",
      tel: "0912312313"
    },
    num: 2
  },
  {
    create_at: 1682002093,
    id: "-NTU7mH1sb2AyrNwvRFg",
    is_paid: false,
    products: {
      "-NTU7mILln4LuApad02G": {
        final_total: 130,
        id: "-NTU7mILln4LuApad02G",
        product: {
          category: "水果",
          content: "百香果",
          description:
            "<p>百香果是台灣常見的水果之一，果汁中主要色素種類為類胡蘿蔔素，富含蛋白質、類黃酮素、礦物質及維生素等營養。 由雜交法孕育而成的台農1號百香果，果實飽滿多汁、香氣濃郁，成熟外觀為帶斑點的紫紅色。 口味偏酸適合熬製成果醬或入菜及飲調混合搭配使用，喜歡偏酸百香果的您不能錯過。</p>",
          id: "-MyQ40ak8euK340yJQyS",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650721805853.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bTpk6PeqnDKYpOTJZXPkOOGExdTrRCBPc03j9wWaMhKogb%2F8kkEHwQof0TgtxySvohkhTYxIcNmef1BdYA%2F6zpg2sRCaJ%2BDXlA%2FadQESmYA6HN%2BveVsEfKN1jkS%2F9fkckzvk3e3zrwVPLgeAvv9NdQSLHMGMU1uJ8Wc%2FomyCHpxL2dvGDgYP5W7f8gAof%2FNO7s9JhD85Dy3LJ1Sgzko5Jv6NsSF3UlJIQ6CbsMfeIqaUNWd3fVZGaq%2BX5HzwTWyTQ8nuLhFVxWtdPreXCzSNQqg3DdpdGP05uLlGq7JXeVex23JaZmnc0fQGqdw6wze3681v3ZUqCwvW7S6rOrbduQ%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980563316.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aU%2FksgAQzpfKum95ojGSBdGL5%2B6AuTVjgmnz3VT6U8b13yhohs6dYPWkthkwcNvV6Y7GmA0pevMhxhXhunn6rjDiHEs%2FQxxMw%2FU2nfh6teNT5QUS805La4ZShcHFxPaT5LDZIy49G3Ufn7rKrDm1rOXIH%2Fr7%2FoBanaUhABlY2dr7q8Ph4P%2F6usfxgcAvCrI9KRDVDQW7eHpDQu0u6Ikpgc4cZWtKPsEsuDWc0OXl7qMYn5WmzxtDDs5sXdu8r0GzMirTsWGvg6w6sgG7dXT%2FJDwuPSlflvW0l3cwkHrFGFptcFq9OjugpcgyRCBzJ%2FIrVN2c0%2F55JASHo1z9syVweA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980587360.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pFfoyTBjYgeeR8JwPvaKgrTsOnDPSxzbwPwLS%2BbNKv8vLWzLGHMeCLoD1DyDWCnM6B6EgSakrOsPeyKv3mLFAnUe6rdhn1y1QJjZItFPowY0LNm6WKzv3OPrwQZPDBkwiytVnGI3kLPeM2VMgAEJ6NnE4DrdD4NKeMFMW1BAzTPe6By8FK9UBiMSwexbX9ywKxFbRZk2tOHSC0r3gYqea3WQloCBiWyicKaIK%2BPg%2BKXsBDtMJA7cD9iFPoPk1sT00eWD%2Bp2XLm00GPAJsuJw53RUoigIvVUhF6qJbWil5Gq%2FCEKwJdhDbHE5Jacqjnxy%2FFCZQzb91rkjKuKezE8xSw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980595941.JPG?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hFK1Z6C6LU235M0Q3R5jHW98bET%2B6oEr%2Fyh4YUTp8KDMvBC%2FJgVkI4Xo7JVSe9%2FwuaM95N42dOWhq3gs1gSJ%2F6G0uEGcugqGbf7G0WMb%2Fs8cCs7kFWIkq%2FVmmht2L5RIiYLaxJPUp8uUBeFDh34vqJi%2FFpLEVC4XESDowb4v9dTgcLtUsRVXLYRFRcCI3wFopXQ1ltlQh20KQC3IehlArqW1Mx4kXEoHCEcMgiHaZNt9iIJ7ZUTcA6qj2D43xuw%2B%2FKHFMV%2F5%2F3aiQAArj2MIfmTBDdtSE%2FYToVV1IAZiicFhHSk9NuQDOF9dcK4WQ4LkUKDAO5D0ym0vJCbvcDmgQQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980606382.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XQPa%2BN4P8vj41fxZDFRX0uoFnD7yQwtt0smIaEX4B5Xs2g3JfDj1XWa8AFw5ZJvzCvwS%2FVzN361qNY9y7gW%2By4jzqWDIEt1TGgQKYuu6m73CuiZCNWxlAVjHE%2ByGsvnruxS2R%2FxUgQhAZpvgKdeuzasKXq42R92BSQDOhCDSbtvnjSi1Sm69d2huQcREQ1SvgJ8AUHTYxY%2FL02Fh978Xh7KEBeBvR5smADb1%2BTJKAeCZ93Q3lT1ZsyJpcI5spm3CbncNdD1VHV5akcyGWERJfqlV2GYD3SO7e17jY4Hl4XoKmKSuZaKipUfqKl8EV8kfVwMkYWJX1iT5sllezSidrQ%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 130,
          price: 130,
          title: "台農1號百香果",
          unit: "台斤"
        },
        product_id: "-MyQ40ak8euK340yJQyS",
        qty: 1,
        total: 130
      }
    },
    total: 130,
    user: {
      address: "123",
      email: "text@gmail.com",
      name: "John",
      tel: "0912312313"
    },
    num: 3
  },
  {
    create_at: 1682001948,
    id: "-NTU7DzqZagx4saEG-fW",
    is_paid: false,
    products: {
      "-NTU7E0A-GGmlqMAlHnE": {
        final_total: 60,
        id: "-NTU7E0A-GGmlqMAlHnE",
        product: {
          category: "蔬菜",
          content: "四季豆的一種，因外型扭曲又稱醜豆",
          description:
            "<p>『凡人不可貌相，海水不可斗量』用這句話來形容生長凌亂隨意、毫無美感可言的醜豆是最為貼近的。 長相歪曲又凹醜的醜豆擁有鉀、鈣、膳食纖維等營養素。常見於一般日常料理，可炒、可燙、可涼拌，具有清甜爽脆的口感。屬於低卡高纖可提升飽足感的蔬菜豆一族，適合減重忌口的您！</p>",
          id: "-MyQ6IsJkootRSjOuN43",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650722111688.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ABcTor6UNVPu4jNX7OzFTohy1tHIlAMTwpjvQCnFeCvpo1L8NcV8HkStuZkr%2FmAlVY52XHWc53fd%2Fxdd06yxqXS5%2FRqiQHXnU4hEwugR%2FxZIhXqctxHBKozkgBOmqOMMTu3aCt3OUWhdviWkAbtc3Pqn9ohB3tfvtLviosFjxjcMwh5iAnaz4eBD5ccp3LYyxkvyJf264rLQG2uDQZr%2FlyUPcJC%2Fi5Hz%2FnXIkDL9pkHkOFqd1Ce%2B%2Bvk983K6O8BkB%2FlFO6ZOz2I%2Fx%2BmDPKt%2FFIQTFePL%2BxNTfvB98ShKvKl2dWbEwEB%2FHv5pGpNGbBFBdkzWFZIGPQPVhpJQC9qyiw%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980489091.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=D%2Bi4Rlo4WkJzjjqgik4A%2BLJiBQ0%2BlyGJZXQ2pUau6LJXCczdeZmDhKf8j2Y05vIeKg44kTCC5VxoMDqy3up7MyRI5NTryCiYlwetMSKRG6UUKFycF0SPnx3O0kKoRj0UeYbqvC6YHZG5qVF11V%2F01nTSGl%2F7zBA052XKYFo%2FiAKawOhYsMs9rfJDfIjZ%2BSW4z9trqh%2BskuCJzrXHvx6KyW8xFakMBuLvOJV7YPTlAuBOfZ6IpIV83AuXN5eWpYh1N%2BGQtwiNagUNom5ke%2BpCKR2Sy9chlz8kLRi8rcpOTC9kEqk5GbcXWi6gT4SSVyg9UV5n0tDXFp2mxLZNLZ0FmQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980508405.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VuNXv3H4pvpMFlWQrm7IuxmvXH9XX2S9kXkwinl3nzzc3e8J51ygRV4mpbJR0Xf3BX%2B35rMCtBBiYBnYiWUYWnJ8i8JnogWrVC3de1JzSvFB4k1RA8LqHS3%2BxayzuIOjXxyQvFET2XfTwHxQTUjNmFlX6uQG3a0HJqz937frDhgYu26dT%2FaJk8Qae4eWo8lfkyfkORCbQU%2Bc1z10QfVgOAYtGkaWEtOtdkxXFXMB58OcKUZO5Ij%2FUrTHAvcpWVa4O%2FxdUdetQMhHrK%2BAgsVHCOF16Rkc%2FqpjnBOahvO3iJEYoQbxIbLj14GPWHuQtPsSu8eORUXPhLPUj6dJ9md6Kg%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980521425.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ekx6UG3P8ceKNX3jivzDdoxL22wrzWlBfH4XQVLD3lW6b%2FuE2raQZdWhRn4A471%2BkSTh4NFR%2FZehKktGAMcEVFDs5h8vSHwx8r3IgwnlMzCopNeSWG54%2BImpdi70FNZXRMaCKSyE7oVZdN7y%2BS8zkuGne%2Bceeaz7mCdf25rRdNBYlZzEreYa2EZa0hOuIBYpOwRGGMxsacI0%2BztySvryRSJV8WgsBG82CN1LYgNi6GBQypJp9WtsVI2tdzSKf4qAU2d5Lo5WCm7ae%2BRGlQMEPkwb0HRPM5lNOYQI4TX6nk8Jyk5vzAVP5UHjUDfwSBIwGhujWq3fniuzNymzyGAVhA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 60,
          price: 60,
          title: "醜豆",
          unit: "台斤"
        },
        product_id: "-MyQ6IsJkootRSjOuN43",
        qty: 1,
        total: 60
      }
    },
    total: 60,
    user: {
      address: "123",
      email: "aaa@gmail.com",
      name: "sdf",
      tel: "0912312313"
    },
    num: 4
  },
  {
    create_at: 1682001547,
    id: "-NTU5gw5CCz4oPNSohvc",
    is_paid: false,
    products: {
      "-NTU5gxTgwSLuB8xRxlY": {
        final_total: 60,
        id: "-NTU5gxTgwSLuB8xRxlY",
        product: {
          category: "蔬菜",
          content: "四季豆的一種，因外型扭曲又稱醜豆",
          description:
            "<p>『凡人不可貌相，海水不可斗量』用這句話來形容生長凌亂隨意、毫無美感可言的醜豆是最為貼近的。 長相歪曲又凹醜的醜豆擁有鉀、鈣、膳食纖維等營養素。常見於一般日常料理，可炒、可燙、可涼拌，具有清甜爽脆的口感。屬於低卡高纖可提升飽足感的蔬菜豆一族，適合減重忌口的您！</p>",
          id: "-MyQ6IsJkootRSjOuN43",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650722111688.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ABcTor6UNVPu4jNX7OzFTohy1tHIlAMTwpjvQCnFeCvpo1L8NcV8HkStuZkr%2FmAlVY52XHWc53fd%2Fxdd06yxqXS5%2FRqiQHXnU4hEwugR%2FxZIhXqctxHBKozkgBOmqOMMTu3aCt3OUWhdviWkAbtc3Pqn9ohB3tfvtLviosFjxjcMwh5iAnaz4eBD5ccp3LYyxkvyJf264rLQG2uDQZr%2FlyUPcJC%2Fi5Hz%2FnXIkDL9pkHkOFqd1Ce%2B%2Bvk983K6O8BkB%2FlFO6ZOz2I%2Fx%2BmDPKt%2FFIQTFePL%2BxNTfvB98ShKvKl2dWbEwEB%2FHv5pGpNGbBFBdkzWFZIGPQPVhpJQC9qyiw%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980489091.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=D%2Bi4Rlo4WkJzjjqgik4A%2BLJiBQ0%2BlyGJZXQ2pUau6LJXCczdeZmDhKf8j2Y05vIeKg44kTCC5VxoMDqy3up7MyRI5NTryCiYlwetMSKRG6UUKFycF0SPnx3O0kKoRj0UeYbqvC6YHZG5qVF11V%2F01nTSGl%2F7zBA052XKYFo%2FiAKawOhYsMs9rfJDfIjZ%2BSW4z9trqh%2BskuCJzrXHvx6KyW8xFakMBuLvOJV7YPTlAuBOfZ6IpIV83AuXN5eWpYh1N%2BGQtwiNagUNom5ke%2BpCKR2Sy9chlz8kLRi8rcpOTC9kEqk5GbcXWi6gT4SSVyg9UV5n0tDXFp2mxLZNLZ0FmQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980508405.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VuNXv3H4pvpMFlWQrm7IuxmvXH9XX2S9kXkwinl3nzzc3e8J51ygRV4mpbJR0Xf3BX%2B35rMCtBBiYBnYiWUYWnJ8i8JnogWrVC3de1JzSvFB4k1RA8LqHS3%2BxayzuIOjXxyQvFET2XfTwHxQTUjNmFlX6uQG3a0HJqz937frDhgYu26dT%2FaJk8Qae4eWo8lfkyfkORCbQU%2Bc1z10QfVgOAYtGkaWEtOtdkxXFXMB58OcKUZO5Ij%2FUrTHAvcpWVa4O%2FxdUdetQMhHrK%2BAgsVHCOF16Rkc%2FqpjnBOahvO3iJEYoQbxIbLj14GPWHuQtPsSu8eORUXPhLPUj6dJ9md6Kg%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980521425.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ekx6UG3P8ceKNX3jivzDdoxL22wrzWlBfH4XQVLD3lW6b%2FuE2raQZdWhRn4A471%2BkSTh4NFR%2FZehKktGAMcEVFDs5h8vSHwx8r3IgwnlMzCopNeSWG54%2BImpdi70FNZXRMaCKSyE7oVZdN7y%2BS8zkuGne%2Bceeaz7mCdf25rRdNBYlZzEreYa2EZa0hOuIBYpOwRGGMxsacI0%2BztySvryRSJV8WgsBG82CN1LYgNi6GBQypJp9WtsVI2tdzSKf4qAU2d5Lo5WCm7ae%2BRGlQMEPkwb0HRPM5lNOYQI4TX6nk8Jyk5vzAVP5UHjUDfwSBIwGhujWq3fniuzNymzyGAVhA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 60,
          price: 60,
          title: "醜豆",
          unit: "台斤"
        },
        product_id: "-MyQ6IsJkootRSjOuN43",
        qty: 1,
        total: 60
      },
      "-NTU5gxTgwSLuB8xRxlZ": {
        final_total: 130,
        id: "-NTU5gxTgwSLuB8xRxlZ",
        product: {
          category: "水果",
          content: "百香果",
          description:
            "<p>百香果是台灣常見的水果之一，果汁中主要色素種類為類胡蘿蔔素，富含蛋白質、類黃酮素、礦物質及維生素等營養。 由雜交法孕育而成的台農1號百香果，果實飽滿多汁、香氣濃郁，成熟外觀為帶斑點的紫紅色。 口味偏酸適合熬製成果醬或入菜及飲調混合搭配使用，喜歡偏酸百香果的您不能錯過。</p>",
          id: "-MyQ40ak8euK340yJQyS",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650721805853.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bTpk6PeqnDKYpOTJZXPkOOGExdTrRCBPc03j9wWaMhKogb%2F8kkEHwQof0TgtxySvohkhTYxIcNmef1BdYA%2F6zpg2sRCaJ%2BDXlA%2FadQESmYA6HN%2BveVsEfKN1jkS%2F9fkckzvk3e3zrwVPLgeAvv9NdQSLHMGMU1uJ8Wc%2FomyCHpxL2dvGDgYP5W7f8gAof%2FNO7s9JhD85Dy3LJ1Sgzko5Jv6NsSF3UlJIQ6CbsMfeIqaUNWd3fVZGaq%2BX5HzwTWyTQ8nuLhFVxWtdPreXCzSNQqg3DdpdGP05uLlGq7JXeVex23JaZmnc0fQGqdw6wze3681v3ZUqCwvW7S6rOrbduQ%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980563316.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aU%2FksgAQzpfKum95ojGSBdGL5%2B6AuTVjgmnz3VT6U8b13yhohs6dYPWkthkwcNvV6Y7GmA0pevMhxhXhunn6rjDiHEs%2FQxxMw%2FU2nfh6teNT5QUS805La4ZShcHFxPaT5LDZIy49G3Ufn7rKrDm1rOXIH%2Fr7%2FoBanaUhABlY2dr7q8Ph4P%2F6usfxgcAvCrI9KRDVDQW7eHpDQu0u6Ikpgc4cZWtKPsEsuDWc0OXl7qMYn5WmzxtDDs5sXdu8r0GzMirTsWGvg6w6sgG7dXT%2FJDwuPSlflvW0l3cwkHrFGFptcFq9OjugpcgyRCBzJ%2FIrVN2c0%2F55JASHo1z9syVweA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980587360.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pFfoyTBjYgeeR8JwPvaKgrTsOnDPSxzbwPwLS%2BbNKv8vLWzLGHMeCLoD1DyDWCnM6B6EgSakrOsPeyKv3mLFAnUe6rdhn1y1QJjZItFPowY0LNm6WKzv3OPrwQZPDBkwiytVnGI3kLPeM2VMgAEJ6NnE4DrdD4NKeMFMW1BAzTPe6By8FK9UBiMSwexbX9ywKxFbRZk2tOHSC0r3gYqea3WQloCBiWyicKaIK%2BPg%2BKXsBDtMJA7cD9iFPoPk1sT00eWD%2Bp2XLm00GPAJsuJw53RUoigIvVUhF6qJbWil5Gq%2FCEKwJdhDbHE5Jacqjnxy%2FFCZQzb91rkjKuKezE8xSw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980595941.JPG?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hFK1Z6C6LU235M0Q3R5jHW98bET%2B6oEr%2Fyh4YUTp8KDMvBC%2FJgVkI4Xo7JVSe9%2FwuaM95N42dOWhq3gs1gSJ%2F6G0uEGcugqGbf7G0WMb%2Fs8cCs7kFWIkq%2FVmmht2L5RIiYLaxJPUp8uUBeFDh34vqJi%2FFpLEVC4XESDowb4v9dTgcLtUsRVXLYRFRcCI3wFopXQ1ltlQh20KQC3IehlArqW1Mx4kXEoHCEcMgiHaZNt9iIJ7ZUTcA6qj2D43xuw%2B%2FKHFMV%2F5%2F3aiQAArj2MIfmTBDdtSE%2FYToVV1IAZiicFhHSk9NuQDOF9dcK4WQ4LkUKDAO5D0ym0vJCbvcDmgQQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980606382.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XQPa%2BN4P8vj41fxZDFRX0uoFnD7yQwtt0smIaEX4B5Xs2g3JfDj1XWa8AFw5ZJvzCvwS%2FVzN361qNY9y7gW%2By4jzqWDIEt1TGgQKYuu6m73CuiZCNWxlAVjHE%2ByGsvnruxS2R%2FxUgQhAZpvgKdeuzasKXq42R92BSQDOhCDSbtvnjSi1Sm69d2huQcREQ1SvgJ8AUHTYxY%2FL02Fh978Xh7KEBeBvR5smADb1%2BTJKAeCZ93Q3lT1ZsyJpcI5spm3CbncNdD1VHV5akcyGWERJfqlV2GYD3SO7e17jY4Hl4XoKmKSuZaKipUfqKl8EV8kfVwMkYWJX1iT5sllezSidrQ%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 130,
          price: 130,
          title: "台農1號百香果",
          unit: "台斤"
        },
        product_id: "-MyQ40ak8euK340yJQyS",
        qty: 1,
        total: 130
      }
    },
    total: 190,
    user: {
      address: "123",
      email: "aaa@gmail.com",
      name: "John888999999999",
      tel: "0927173739"
    },
    num: 5
  },
  {
    create_at: 1682001404,
    id: "-NTU598ck0PV6K-eU-qp",
    is_paid: false,
    products: {
      "-NTU59AcBhq5gJFcUvOV": {
        final_total: 130,
        id: "-NTU59AcBhq5gJFcUvOV",
        product: {
          category: "水果",
          content: "百香果",
          description:
            "<p>百香果是台灣常見的水果之一，果汁中主要色素種類為類胡蘿蔔素，富含蛋白質、類黃酮素、礦物質及維生素等營養。 由雜交法孕育而成的台農1號百香果，果實飽滿多汁、香氣濃郁，成熟外觀為帶斑點的紫紅色。 口味偏酸適合熬製成果醬或入菜及飲調混合搭配使用，喜歡偏酸百香果的您不能錯過。</p>",
          id: "-MyQ40ak8euK340yJQyS",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650721805853.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=bTpk6PeqnDKYpOTJZXPkOOGExdTrRCBPc03j9wWaMhKogb%2F8kkEHwQof0TgtxySvohkhTYxIcNmef1BdYA%2F6zpg2sRCaJ%2BDXlA%2FadQESmYA6HN%2BveVsEfKN1jkS%2F9fkckzvk3e3zrwVPLgeAvv9NdQSLHMGMU1uJ8Wc%2FomyCHpxL2dvGDgYP5W7f8gAof%2FNO7s9JhD85Dy3LJ1Sgzko5Jv6NsSF3UlJIQ6CbsMfeIqaUNWd3fVZGaq%2BX5HzwTWyTQ8nuLhFVxWtdPreXCzSNQqg3DdpdGP05uLlGq7JXeVex23JaZmnc0fQGqdw6wze3681v3ZUqCwvW7S6rOrbduQ%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980563316.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aU%2FksgAQzpfKum95ojGSBdGL5%2B6AuTVjgmnz3VT6U8b13yhohs6dYPWkthkwcNvV6Y7GmA0pevMhxhXhunn6rjDiHEs%2FQxxMw%2FU2nfh6teNT5QUS805La4ZShcHFxPaT5LDZIy49G3Ufn7rKrDm1rOXIH%2Fr7%2FoBanaUhABlY2dr7q8Ph4P%2F6usfxgcAvCrI9KRDVDQW7eHpDQu0u6Ikpgc4cZWtKPsEsuDWc0OXl7qMYn5WmzxtDDs5sXdu8r0GzMirTsWGvg6w6sgG7dXT%2FJDwuPSlflvW0l3cwkHrFGFptcFq9OjugpcgyRCBzJ%2FIrVN2c0%2F55JASHo1z9syVweA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980587360.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=pFfoyTBjYgeeR8JwPvaKgrTsOnDPSxzbwPwLS%2BbNKv8vLWzLGHMeCLoD1DyDWCnM6B6EgSakrOsPeyKv3mLFAnUe6rdhn1y1QJjZItFPowY0LNm6WKzv3OPrwQZPDBkwiytVnGI3kLPeM2VMgAEJ6NnE4DrdD4NKeMFMW1BAzTPe6By8FK9UBiMSwexbX9ywKxFbRZk2tOHSC0r3gYqea3WQloCBiWyicKaIK%2BPg%2BKXsBDtMJA7cD9iFPoPk1sT00eWD%2Bp2XLm00GPAJsuJw53RUoigIvVUhF6qJbWil5Gq%2FCEKwJdhDbHE5Jacqjnxy%2FFCZQzb91rkjKuKezE8xSw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980595941.JPG?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hFK1Z6C6LU235M0Q3R5jHW98bET%2B6oEr%2Fyh4YUTp8KDMvBC%2FJgVkI4Xo7JVSe9%2FwuaM95N42dOWhq3gs1gSJ%2F6G0uEGcugqGbf7G0WMb%2Fs8cCs7kFWIkq%2FVmmht2L5RIiYLaxJPUp8uUBeFDh34vqJi%2FFpLEVC4XESDowb4v9dTgcLtUsRVXLYRFRcCI3wFopXQ1ltlQh20KQC3IehlArqW1Mx4kXEoHCEcMgiHaZNt9iIJ7ZUTcA6qj2D43xuw%2B%2FKHFMV%2F5%2F3aiQAArj2MIfmTBDdtSE%2FYToVV1IAZiicFhHSk9NuQDOF9dcK4WQ4LkUKDAO5D0ym0vJCbvcDmgQQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980606382.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XQPa%2BN4P8vj41fxZDFRX0uoFnD7yQwtt0smIaEX4B5Xs2g3JfDj1XWa8AFw5ZJvzCvwS%2FVzN361qNY9y7gW%2By4jzqWDIEt1TGgQKYuu6m73CuiZCNWxlAVjHE%2ByGsvnruxS2R%2FxUgQhAZpvgKdeuzasKXq42R92BSQDOhCDSbtvnjSi1Sm69d2huQcREQ1SvgJ8AUHTYxY%2FL02Fh978Xh7KEBeBvR5smADb1%2BTJKAeCZ93Q3lT1ZsyJpcI5spm3CbncNdD1VHV5akcyGWERJfqlV2GYD3SO7e17jY4Hl4XoKmKSuZaKipUfqKl8EV8kfVwMkYWJX1iT5sllezSidrQ%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 130,
          price: 130,
          title: "台農1號百香果",
          unit: "台斤"
        },
        product_id: "-MyQ40ak8euK340yJQyS",
        qty: 1,
        total: 130
      },
      "-NTU59Ad5OD7WO6WowPp": {
        final_total: 60,
        id: "-NTU59Ad5OD7WO6WowPp",
        product: {
          category: "蔬菜",
          content: "四季豆的一種，因外型扭曲又稱醜豆",
          description:
            "<p>『凡人不可貌相，海水不可斗量』用這句話來形容生長凌亂隨意、毫無美感可言的醜豆是最為貼近的。 長相歪曲又凹醜的醜豆擁有鉀、鈣、膳食纖維等營養素。常見於一般日常料理，可炒、可燙、可涼拌，具有清甜爽脆的口感。屬於低卡高纖可提升飽足感的蔬菜豆一族，適合減重忌口的您！</p>",
          id: "-MyQ6IsJkootRSjOuN43",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650722111688.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ABcTor6UNVPu4jNX7OzFTohy1tHIlAMTwpjvQCnFeCvpo1L8NcV8HkStuZkr%2FmAlVY52XHWc53fd%2Fxdd06yxqXS5%2FRqiQHXnU4hEwugR%2FxZIhXqctxHBKozkgBOmqOMMTu3aCt3OUWhdviWkAbtc3Pqn9ohB3tfvtLviosFjxjcMwh5iAnaz4eBD5ccp3LYyxkvyJf264rLQG2uDQZr%2FlyUPcJC%2Fi5Hz%2FnXIkDL9pkHkOFqd1Ce%2B%2Bvk983K6O8BkB%2FlFO6ZOz2I%2Fx%2BmDPKt%2FFIQTFePL%2BxNTfvB98ShKvKl2dWbEwEB%2FHv5pGpNGbBFBdkzWFZIGPQPVhpJQC9qyiw%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980489091.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=D%2Bi4Rlo4WkJzjjqgik4A%2BLJiBQ0%2BlyGJZXQ2pUau6LJXCczdeZmDhKf8j2Y05vIeKg44kTCC5VxoMDqy3up7MyRI5NTryCiYlwetMSKRG6UUKFycF0SPnx3O0kKoRj0UeYbqvC6YHZG5qVF11V%2F01nTSGl%2F7zBA052XKYFo%2FiAKawOhYsMs9rfJDfIjZ%2BSW4z9trqh%2BskuCJzrXHvx6KyW8xFakMBuLvOJV7YPTlAuBOfZ6IpIV83AuXN5eWpYh1N%2BGQtwiNagUNom5ke%2BpCKR2Sy9chlz8kLRi8rcpOTC9kEqk5GbcXWi6gT4SSVyg9UV5n0tDXFp2mxLZNLZ0FmQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980508405.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=VuNXv3H4pvpMFlWQrm7IuxmvXH9XX2S9kXkwinl3nzzc3e8J51ygRV4mpbJR0Xf3BX%2B35rMCtBBiYBnYiWUYWnJ8i8JnogWrVC3de1JzSvFB4k1RA8LqHS3%2BxayzuIOjXxyQvFET2XfTwHxQTUjNmFlX6uQG3a0HJqz937frDhgYu26dT%2FaJk8Qae4eWo8lfkyfkORCbQU%2Bc1z10QfVgOAYtGkaWEtOtdkxXFXMB58OcKUZO5Ij%2FUrTHAvcpWVa4O%2FxdUdetQMhHrK%2BAgsVHCOF16Rkc%2FqpjnBOahvO3iJEYoQbxIbLj14GPWHuQtPsSu8eORUXPhLPUj6dJ9md6Kg%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980521425.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ekx6UG3P8ceKNX3jivzDdoxL22wrzWlBfH4XQVLD3lW6b%2FuE2raQZdWhRn4A471%2BkSTh4NFR%2FZehKktGAMcEVFDs5h8vSHwx8r3IgwnlMzCopNeSWG54%2BImpdi70FNZXRMaCKSyE7oVZdN7y%2BS8zkuGne%2Bceeaz7mCdf25rRdNBYlZzEreYa2EZa0hOuIBYpOwRGGMxsacI0%2BztySvryRSJV8WgsBG82CN1LYgNi6GBQypJp9WtsVI2tdzSKf4qAU2d5Lo5WCm7ae%2BRGlQMEPkwb0HRPM5lNOYQI4TX6nk8Jyk5vzAVP5UHjUDfwSBIwGhujWq3fniuzNymzyGAVhA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 60,
          price: 60,
          title: "醜豆",
          unit: "台斤"
        },
        product_id: "-MyQ6IsJkootRSjOuN43",
        qty: 1,
        total: 60
      },
      "-NTU59Ad5OD7WO6WowPq": {
        final_total: 85,
        id: "-NTU59Ad5OD7WO6WowPq",
        product: {
          category: "水果",
          content: "聖女番茄",
          description:
            "<p>冬季限定！ 色澤亮麗鮮紅、外型小巧，因薄皮多汁顯得嬌嫩無比而得名『玉女』。 與橙蜜香小番茄相比口味偏酸甜。不論直接洗淨食用或是輕食涼拌、醃製、燉煮都極度百搭！ 歡迎選購為每日的餐飲生活增添各種趣味性。</p>",
          id: "-MyQC-PVT-TALeYLkVCB",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650722977833.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZF4pvsRS8Drb81%2BLVaw277wL0SMHzP%2Fj2Q0L7EvUzzfJuZipW2OLOi20TQkvFNDHVl7sLE38jsBj6WjL7zPaboCw8D0TD1XxpKj5o2JBHP2HeLF%2BStV6rKcCy0ZJBkV%2Fe6i5MWVBo0rfUbKfMWBuDafVCvzVtubVbz%2FoFwrgDQ86knDbNiQC5I%2BeJVzf17ICj8%2FdXYa1B0FY2xuQdoB%2B2HEZnUuqtVndsit1Ed734eNvgqNPDsQK3JBIF5xRu%2BZtTsfCYk4F4tiV3nqjJJv9iIEZ7jWSECX4J1Xp28mQaYnv6kxTsyNzhJGfHsgqYTzvx10702qXOAevWXj2hFXbVg%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980432907.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OpUrbTzmwxY6jUC5HB5fEcbJvrJOzAuHERRCtH88yAM6OKzu33BU3O6KwC6B7BHap%2BubBvAxgwgsF0%2FDczYpPWzFxFJJ0%2Fm6Hk1U1ny8aLaWPTkATnNBYcKsDGuYT9qzY8Cp9aecFhK%2BR5MQLpsthyzFLQpgBm66jdT5K16W7zvdsn29odIcsCsJTeMaCVcYa%2BTDRq4RciOYU19UaXO7AURffqOdLBOpVaHy2pQoK5RRwOP5LA0v%2By68q%2BiBg06%2FP%2FhexrI3ZI1BC6OeWrTi0Ec1tXo5HTMoiXPeLV%2FQyTo1v5dWRoVwNBzLcqLsSZ7ulnk4pQ2XAxS1uMnurFwSQw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980453538.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jViKXPAAiMuZn5lo%2BEQVNON9TZ5K7AV%2FdgdpxQgQiA7zvqfclEbfk7rZ1UR2RMMHlFoJ8yoNLYQeF5kXyCM%2FABTttEabnV5Gosns79BGGYdDAD6PN2uzlRoBQzdg%2FqGBRx1mmvxbA8rlmcbgsTjQlbPRlSKD3%2FUZIP0zib%2Bv9kRpg8VvziimUNSyMUfr4o9JfiJEYcqfNMjjgOSMuqiaFCl2XfHoSHfc1KhyYVyfcCIOqsbQhQ%2BPyTXLuXdS3KLaken53e3WI5eOyzAw0bswfeAZ2NLHim9We7DT%2BBF1o0tB9chmknG%2BM%2FpUJVc0kGIWS37k3v0yCIkGFrO5huQ3vA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 85,
          price: 85,
          title: "玉女小番茄",
          unit: "台斤"
        },
        product_id: "-MyQC-PVT-TALeYLkVCB",
        qty: 1,
        total: 85
      }
    },
    total: 275,
    user: {
      address: "123",
      email: "aaa@gmail.com",
      name: "John改",
      tel: "0912312313"
    },
    num: 6
  },
  {
    create_at: 1682001285,
    id: "-NTU4h1TdU-1FZTjZJX-",
    is_paid: false,
    products: {
      "-NTU4h2px6zW3-hhnMHX": {
        final_total: 220,
        id: "-NTU4h2px6zW3-hhnMHX",
        product: {
          category: "水果",
          content: "小番茄",
          description:
            "<p>冬季限定！ 相較於玉女小番茄的薄皮多汁酸味重；色澤暖亮橘黃的橙蜜香小番茄皮厚肉Ｑ口感細緻，並帶有淡淡的橙香味，適合怕酸的您來細細品嘗。</p>",
          id: "-MyQDVbHoKuxJxHo48Jf",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650723375680.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=lMP2V4MGf5pUEwQqoUGTw%2B2yx1M%2FNLGYVZwFHWfMcpkUZd4xRxGFHl1X22rJmoOhsUsSU%2BQCGbJ6YgRTj3VLEMYfFI9MKAT2fr9yzV5GJF7xRhvKvAwaaEszJDpiMbs2tjxuGgAZEKPC%2BawQxtjcN92tkjP5UydgXV54fn2KCDBF5wi%2FBZ1VatI0RYHTP1k7t9nFtnX5n9gSl%2BBPPzfhfUZPT4wFZ3AXP83uWtxdkjmo5OR02CMnH%2Fo5Ms892yAWwS%2BKEME7uB9oE7F5SeTJPg1ksHEgsiy1DgEzV9fUaqrC61bPHB2dgxcRokzLtk7T6h2AyWTrP%2BbwFra3K8QTWw%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980385105.JPG?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=D90ZpDj1DZnYIxUWKMDq0JN6bb%2FHRDZEAECBHTMUvNDOwHl9IOhDsA71mwTFV5WqYi%2BJ58UBRh9HUpCn5xWQAd9PEFMPYlasOlM25YrodXEh7jFHzyiJMIHNFaYQeDxoZr5cr6RUYy2xBHMvcG6KBDd1Ogu5%2FEOR7VKj3hUyDc6ZCtlUa42OBHn0Pa99o50UjU5MP6bomvIAXdhSfibxTbQ%2Fc2uUA669QoPJGoSTb3rAhro0KNLEx4kOb04z4zTCstrW7kw%2FJfAmxrugLbJotzxQBam960lu2o0nNaMTdBAlbhX7vluxqZfoZrYCzIqaeew7iD2ASUU5z%2FV%2FrORKBw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980408378.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gtfLHblYKHtQ4KDL4th3pwtIioEzbryFEMpM23ET7Ncwo68lF9UUU22L8xNhwNvFJ1zgChnaTS%2Bzzt425oaRY58tWmpqbJlpA%2FKM5iOxmbpnOVcKH1t%2FVHiU4h2GugBByLgVCDyTY1c9annTzeskPVHqnzXBFuOO8ehKvsZOL%2Bgmc5liAK9Gfe1OpJ8SJ4c39eZC%2FUA8WUJAbvflruNW1Su7%2FpaQz%2FB3uZgbh9kr2K7scxABIengpLohUlFORJvxxRVhFLWIH7RvRbMsB8BPIBvT6fD%2BXEEzS0YBbMw5OcHKcVgrP%2BumWaIKDU3M6HoVCxeo%2BndBqanAOtpo%2FkKQpA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 220,
          price: 220,
          title: "橙蜜香番茄",
          unit: "台斤"
        },
        product_id: "-MyQDVbHoKuxJxHo48Jf",
        qty: 1,
        total: 220
      },
      "-NTU4h2px6zW3-hhnMHY": {
        final_total: 85,
        id: "-NTU4h2px6zW3-hhnMHY",
        product: {
          category: "水果",
          content: "聖女番茄",
          description:
            "<p>冬季限定！ 色澤亮麗鮮紅、外型小巧，因薄皮多汁顯得嬌嫩無比而得名『玉女』。 與橙蜜香小番茄相比口味偏酸甜。不論直接洗淨食用或是輕食涼拌、醃製、燉煮都極度百搭！ 歡迎選購為每日的餐飲生活增添各種趣味性。</p>",
          id: "-MyQC-PVT-TALeYLkVCB",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650722977833.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZF4pvsRS8Drb81%2BLVaw277wL0SMHzP%2Fj2Q0L7EvUzzfJuZipW2OLOi20TQkvFNDHVl7sLE38jsBj6WjL7zPaboCw8D0TD1XxpKj5o2JBHP2HeLF%2BStV6rKcCy0ZJBkV%2Fe6i5MWVBo0rfUbKfMWBuDafVCvzVtubVbz%2FoFwrgDQ86knDbNiQC5I%2BeJVzf17ICj8%2FdXYa1B0FY2xuQdoB%2B2HEZnUuqtVndsit1Ed734eNvgqNPDsQK3JBIF5xRu%2BZtTsfCYk4F4tiV3nqjJJv9iIEZ7jWSECX4J1Xp28mQaYnv6kxTsyNzhJGfHsgqYTzvx10702qXOAevWXj2hFXbVg%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980432907.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OpUrbTzmwxY6jUC5HB5fEcbJvrJOzAuHERRCtH88yAM6OKzu33BU3O6KwC6B7BHap%2BubBvAxgwgsF0%2FDczYpPWzFxFJJ0%2Fm6Hk1U1ny8aLaWPTkATnNBYcKsDGuYT9qzY8Cp9aecFhK%2BR5MQLpsthyzFLQpgBm66jdT5K16W7zvdsn29odIcsCsJTeMaCVcYa%2BTDRq4RciOYU19UaXO7AURffqOdLBOpVaHy2pQoK5RRwOP5LA0v%2By68q%2BiBg06%2FP%2FhexrI3ZI1BC6OeWrTi0Ec1tXo5HTMoiXPeLV%2FQyTo1v5dWRoVwNBzLcqLsSZ7ulnk4pQ2XAxS1uMnurFwSQw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980453538.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=jViKXPAAiMuZn5lo%2BEQVNON9TZ5K7AV%2FdgdpxQgQiA7zvqfclEbfk7rZ1UR2RMMHlFoJ8yoNLYQeF5kXyCM%2FABTttEabnV5Gosns79BGGYdDAD6PN2uzlRoBQzdg%2FqGBRx1mmvxbA8rlmcbgsTjQlbPRlSKD3%2FUZIP0zib%2Bv9kRpg8VvziimUNSyMUfr4o9JfiJEYcqfNMjjgOSMuqiaFCl2XfHoSHfc1KhyYVyfcCIOqsbQhQ%2BPyTXLuXdS3KLaken53e3WI5eOyzAw0bswfeAZ2NLHim9We7DT%2BBF1o0tB9chmknG%2BM%2FpUJVc0kGIWS37k3v0yCIkGFrO5huQ3vA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 85,
          price: 85,
          title: "玉女小番茄",
          unit: "台斤"
        },
        product_id: "-MyQC-PVT-TALeYLkVCB",
        qty: 1,
        total: 85
      },
      "-NTU4h2qLStlZiqj1whs": {
        final_total: 2000,
        id: "-NTU4h2qLStlZiqj1whs",
        product: {
          category: "精油",
          content: "茶樹精油-單瓶裝100ml",
          description:
            "被當地原住民視為『自然界最萬能的治療者』— 澳洲茶樹，數百年來在天然療法中佔有一席之地。有防蚊、舒緩、消炎、殺菌等作用。\n\n純粹無添加多餘物質的天然精油，一次購買大瓶裝更優惠。",
          id: "-MyQPPCXglvEk-DAd7wx",
          imageUrl: "https://upload.cc/i1/2022/03/18/ZPyfCm.jpg",
          imagesUrl: [
            "https://upload.cc/i1/2022/03/18/a4y2jS.jpg",
            "https://upload.cc/i1/2022/03/18/Huk65R.jpg"
          ],
          is_enabled: 1,
          origin_price: 2000,
          price: 2000,
          title: "澳洲茶樹精油-100ml",
          unit: "瓶"
        },
        product_id: "-MyQPPCXglvEk-DAd7wx",
        qty: 1,
        total: 2000
      },
      "-NTU4h2qLStlZiqj1wht": {
        final_total: 200,
        id: "-NTU4h2qLStlZiqj1wht",
        product: {
          category: "精油",
          content: "澳洲茶樹精油-單瓶裝5ml",
          description:
            "<p>被當地原住民視為『自然界最萬能的治療者』— 澳洲茶樹，數百年來在天然療法中佔有一席之地。有防蚊、舒緩、消炎、殺菌等作用。 純粹無添加多餘物質的天然精油，小瓶裝5ml方便隨身攜帶。</p>",
          id: "-MyQOc_ZlhDQDBJDIEG1",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980175616.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fZoOoMuXsdEZw4rVAG1rNM2XTpOnTvqY65FzF%2BvWL6v2Xau%2FG%2BfifaetqEX84VIAnvuFdkDKf0KnrxHkdPEBPe2DmaK7aLgGZnB%2BwVe8QO8%2FZ1TWkBTb%2F%2FC39bdyinaa9T9oWJYO68te9SEnb6KVv9YU2HRYeeyLqIc%2B4Dtgig70xNsOtQD9KKcJ7mleMnW0aCYre7afOikzmhZiWKlRE9hlAQMh94FUC9WCafR1Oh0SgEnMxNqoWL5a0MRsvAYSZXDYOIl7MmSIvfpDa5myNMCE2VdmZ0zEWLgzGnnHefgdy4jU673QCcCqVA61ucKJUZVXR%2Fus28AJJTGyCMknOg%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980230759.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qG%2B5r7xTv5XDozEHc6wBFaEwVOYghM%2BIviUt0PS%2BCktLnONArXWcjI1c7ZSFFgZ1qM%2FTbM1kge%2BydBMK8Wpot%2FExSUBffgtkPeVnS9rBHbeEcGVIBLsz2BeNXtJCAfTBwQrcwQ1CrlHB75llUHK5I91fu34%2BYGFE9cAf9i2IvsAxb9XFaJN9Cxna7N8mPRsqqB%2BwTy8eWrKN8ojVoToi4WzbEe%2Fk6uTrSlMALuIf3QWFJcMEMxsSptK%2BCFlKCLbHfr90WkWgFtTuu15A%2BM%2BdqjZNIekIpvLXBuG9aXBwY11jWhgqsxM2Z5USXOo0%2FGuYb4Ab3YMnwp2qw5fS0rDw6w%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980245544.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aufcZ33IL4RB5BSE5kgvHRJeYFBd4hvQMbRR9OYv92itFIjHz%2B%2BctwqqsM4WXoX84YUh6%2FdhLhyzn2kha6%2FWwFF%2Bai59wq5sAVHhJsP8LHDQ4CFUcLUafF2u98hnzYqqzoYzapaAe%2FGT%2FTuW6N%2BUNaows%2BpHfDVFdoNbUbDeyW%2Bm8%2BbiEailHe0nelqRSUKf0bvJry9uUpvIsppKdFQZGEolDQCBL11i7NcuUvwKBCdyVOHWbS7uDt4ULhXlwIzGztux9O%2Fng9eV2JPzGzeX1tT3L%2FcTcwKu%2BUthuRyhkx4CJEe%2BO1dyNX3FSoUBiRQt0BNtLnbuhofwDHJZ%2F0WTvA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 200,
          price: 200,
          title: "澳洲茶樹精油-5ml",
          unit: "瓶"
        },
        product_id: "-MyQOc_ZlhDQDBJDIEG1",
        qty: 1,
        total: 200
      },
      "-NTU4h2qLStlZiqj1whu": {
        final_total: 150,
        id: "-NTU4h2qLStlZiqj1whu",
        product: {
          category: "水果",
          content: "火龍果",
          description:
            "<p>原產自中南美洲且有『神聖之果』美譽的火龍果在引進台灣後經過不斷地改良調整，幾乎一年四季都能見到它的身影。 低卡高營養價值的火龍果富含水溶性膳食纖維及鎂、鐵、鋅、磷等礦物質與花青素。但因糖分偏高，因此須注意食用量避免過度攝取。</p>",
          id: "-MyUNX72iIsmfdx_2xZF",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724854450.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=TsvnPJ64c3CD%2Fwd4NXwM1S1nk9d%2BGLsR0l%2FJGRRWQXJhfpvKpHlhYfrh2OfoS6ep5q44niwKY9qD8vCFvBA%2FLS9LHrsJk0u7BCVDMAJ3AtI%2B3OakP%2BuNDq1BAd0OmK8zhMI6ztEx%2FwJn3RQflmHWTwBdiWzspm1rFbP96TBSIac9c2CeH5vY5UZw%2BTlEoL0NsfygwdX5FszGvFdVk3dqKTJM9hud%2BZPYv%2BdJM3SqHrYgu6uLwbCQXEjSjWQt28oct1PmsYhlkXDLduX7%2Fwj09ooNowjEjgBgQBMuxmCESPTwP85FI3BfRWkWhJuMHVvf4Jd4pUH4kTGpvu2fFM9crw%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979656719.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hpSq49gCbU%2BirKkKeQXBzYELePPGpF2M%2BYjwvUnWLSAkhju%2FOapC0iKXao%2B%2BTKR6MeXLjKyVNb24D37odIFbfMuVaZs4%2FilN%2BT8r81XbafHkiPqHP9%2F1M5w%2FvbbINKmZsX%2BekcPQwl7IE1%2BaAkHQxQknAmFW46bfSij7iahn0M5jwMc%2FjVLDmZE%2FCnxN1Rkn%2BqFA9jf6790uSyyMxC4pT7rXPLZWrjUhXC2AvCkUg906oJUZrSUGP58yexKTZQ96MKLKJ3WBmQD7b%2BnYaGiIAPaF%2BnTxXekkM8%2Fkdo4d9jnWiWdxZqAkDAtt%2Bz4PANS2AISU%2FB67bYHcKkk%2Bds6VcA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979692817.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=V9dud%2B5F7lhgGU0XIcYsVB2tB5P0G5geuqDgzk4vxxb2SBLkjINH7ZgYRfJdO%2FEWAgiJd%2Fxxe7F9AbhigcqETbZOIOnRGwKOsfRMvjXyugVXj4%2FS1fzS2GsqMr63hxjz9BbxHQKxu2AsvwrTysma3ydHjSN1vT2kBcgJOYxgnZIC8fo3o957RuIEJ13rDArZL1PpsN%2Blv7H%2FDgbNrRs5VK7wfi3yrSn%2BUlIWSXSYb4k3kUtzcWlfKqiAPEGmWJWC3Sdlp0tVWATZN58HMUVboRtmKmrneZNenvHSo38GUKz8br9W%2Bzr7xRauynsFBHF%2FoitoC9k%2BsK7MCGSJwTKlpA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979730437.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KdAypjFlSi7n%2BJOguTCtOn6hWoqJqUSBSeWob6xmZYKVQ9YKFusPGd4A%2Fiyv2ljwfbrO6xN%2FD0OhCinxPteWzeF%2Ft7KstmyZ3cwTzpX%2FRAhmbGDhVeHeRlRK%2BhR8eO0vl9QqGKEJVL3gXHaisPpC81PLqt5lWD4QpTEuCKBrfzKXam%2FdYT%2FaotEAYrD%2BIxIBe42dxZUSh2aHULnrvxQ5km%2BLx8EFciyuV5LS65xUnpgWTdA6zUM0M3DdA2MdCwvUNUnBicVuz6CRWn2nejHEsuX9TsQW8o1b5fSwXJ3zKfl4TzpVYxu191V40EbbjQvf66mx0lustKio5xddgr6mrA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724983991.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mTPFzo3yKwO2L%2BhT7fmJABO%2Byp%2BAVp%2F5JsADLAXPN%2Bez0qWzSfgs2FAX6lwUWnzh35rSqWq7llLO1Xc7V%2BEygKZ9HxWSVuCllykSD0nHAuXSFuNV%2BMM9yiDkWkH9H4UYNEDlFi1Aa7Kk%2FAVKrPWOaTT2LpTqwE47HomsdT3o29%2BjkSmIzqLqkMjzOiO%2BE9Z%2F%2FxCbe%2F6kiV4vqylpuKzX8PjZfTdddF9rw68Yv5gK4c5Ef5E8arjnN5wOBEFU9XX7liGkEMbjGg2oZmpIODqot9b9Q3UTS8ndEamw1s0KM7JFf%2BqVHyJSBGh3PbkILPHr2hXz9QXpLBKH4u1rhexCWQ%3D%3D"
          ],
          is_enabled: 4,
          origin_price: 154,
          price: 150,
          title: "紅肉-火龍果",
          unit: "台斤"
        },
        product_id: "-MyUNX72iIsmfdx_2xZF",
        qty: 1,
        total: 150
      },
      "-NTU4h2rnYEcvRVwifz5": {
        final_total: 120,
        id: "-NTU4h2rnYEcvRVwifz5",
        product: {
          category: "水果",
          content: "木瓜",
          description:
            "<p>號稱『萬壽果』的紅木瓜富含維生素、礦物質和葉酸等營養成分。 切塊即可享受香甜好滋味，不單能夠美膚也能協助調節免疫系統，老少咸宜，孕媽咪也可以享用！ 但由於含有β胡蘿蔔素，若過量攝取容易導致皮膚色素沉澱而暫時性的變黃，減少食用一陣子後，膚色會逐漸恢復到原有狀態。</p>",
          id: "-MyUBdrDIIoOG5IU4713",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724521950.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Mn2CEG8bsWceRqgfsdlBynFY8mUC1YeVAJmAlZVAR48KzBX9M2Rva%2BzWEIbijIchxaiCIn56586I39HfXz5GfzD84Rl8Tq83TRaYe3z9o5Tb2%2FYbXBBFZbU8sqU4NTGG6tcez6MXIj6U868HCD%2BPltaIoMdET7w26TTMpRI1YR4DpS0YtSNtI0EnpOUhojjV%2BE764TDuGChhltaMPMKpkXFO1aE7aBX2UBzrIbQJW2I2ahYkO%2Bpl2NzatlMjs6eXcb8IH9y3Bg6jaPaASEmilUrOWC8MJImgQM5BGYRC9KggHN%2BEs90BsPqmDGYT1OqZBVwszLp0wtZL%2FQMyW9x%2BXg%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979813040.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZgnAuGhpG9eF9ZxY9QUb%2BVoXY%2F9TG0PKo7H4kc%2FKEoEMSftNJy5x43lv14vPVkMFBY%2FXnbocgYWSUaVLAGZyMQ%2FalA%2BCQBcxDQyy9T9c1624%2Fplbmws7Wy8yRR%2FF%2BDtUiDjAKdJ7VLsc%2FS1%2FvfNlArW1WIndrVVu6UUGjgpR7YUZcW7uIJOfslTmFl5ZEVVHWjmz38Z3Kt0y8Yp5Ikn%2F9jw1ONjKkJy0VQpzB35WGb3wdk3uRHVNHJLE6UfRirysj4jJRfkigN7AHHt4Ja6blUZsvWvmq9VtToflpflkqYbx3jOlV5ck48KhAkOfqSfOSbOsVhDXUSi09P8PLW8JPw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979795058.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OhHumqJMVPUi2R3xGYtvkNYRvo7B0vSjVou0C6mK4STzwIS%2FUahgDszkKKV%2FBI2yfgrY%2FaGT16KYRmKvAX9m9%2ByEvmEMjh%2FyMnTWXg61OrAx0S%2BEH2zRaGKmzYqZuGZjzsHsEoIEnPtgybuXdzJFJ8VWwxxexZX69uxEr4kqPw%2FdJnJirfjBSht3%2F1zplxXSF5qiV6LGGEbeC%2F%2B1mp5%2FEDbuH9eGc62iVnV0CFTyIWDumCJmGEh1c1SIjpeMD0JiBNVZ3N2mZm0VRikLDobphL4suqqdJDaq%2BT0pIV48f2XIlFWqj27CLP2VCJq%2BcbxFE0W6eGMzOVrOvlIs1Yppww%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 120,
          price: 120,
          title: "在欉紅木瓜",
          unit: "台斤"
        },
        product_id: "-MyUBdrDIIoOG5IU4713",
        qty: 1,
        total: 120
      }
    },
    total: 2775,
    user: {
      address: "123",
      email: "aaa@gmail.com",
      name: "sdf",
      tel: "0912312313"
    },
    num: 7
  },
  {
    create_at: 1682001193,
    id: "-NTU4Li5YSeu-3rPtC7p",
    is_paid: false,
    message: "0000000000000000000000000000",
    products: {
      "-NTU4LjQh5zMMgPsfwZ6": {
        final_total: 200,
        id: "-NTU4LjQh5zMMgPsfwZ6",
        product: {
          category: "精油",
          content: "澳洲茶樹精油-單瓶裝5ml",
          description:
            "<p>被當地原住民視為『自然界最萬能的治療者』— 澳洲茶樹，數百年來在天然療法中佔有一席之地。有防蚊、舒緩、消炎、殺菌等作用。 純粹無添加多餘物質的天然精油，小瓶裝5ml方便隨身攜帶。</p>",
          id: "-MyQOc_ZlhDQDBJDIEG1",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980175616.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fZoOoMuXsdEZw4rVAG1rNM2XTpOnTvqY65FzF%2BvWL6v2Xau%2FG%2BfifaetqEX84VIAnvuFdkDKf0KnrxHkdPEBPe2DmaK7aLgGZnB%2BwVe8QO8%2FZ1TWkBTb%2F%2FC39bdyinaa9T9oWJYO68te9SEnb6KVv9YU2HRYeeyLqIc%2B4Dtgig70xNsOtQD9KKcJ7mleMnW0aCYre7afOikzmhZiWKlRE9hlAQMh94FUC9WCafR1Oh0SgEnMxNqoWL5a0MRsvAYSZXDYOIl7MmSIvfpDa5myNMCE2VdmZ0zEWLgzGnnHefgdy4jU673QCcCqVA61ucKJUZVXR%2Fus28AJJTGyCMknOg%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980230759.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=qG%2B5r7xTv5XDozEHc6wBFaEwVOYghM%2BIviUt0PS%2BCktLnONArXWcjI1c7ZSFFgZ1qM%2FTbM1kge%2BydBMK8Wpot%2FExSUBffgtkPeVnS9rBHbeEcGVIBLsz2BeNXtJCAfTBwQrcwQ1CrlHB75llUHK5I91fu34%2BYGFE9cAf9i2IvsAxb9XFaJN9Cxna7N8mPRsqqB%2BwTy8eWrKN8ojVoToi4WzbEe%2Fk6uTrSlMALuIf3QWFJcMEMxsSptK%2BCFlKCLbHfr90WkWgFtTuu15A%2BM%2BdqjZNIekIpvLXBuG9aXBwY11jWhgqsxM2Z5USXOo0%2FGuYb4Ab3YMnwp2qw5fS0rDw6w%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980245544.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aufcZ33IL4RB5BSE5kgvHRJeYFBd4hvQMbRR9OYv92itFIjHz%2B%2BctwqqsM4WXoX84YUh6%2FdhLhyzn2kha6%2FWwFF%2Bai59wq5sAVHhJsP8LHDQ4CFUcLUafF2u98hnzYqqzoYzapaAe%2FGT%2FTuW6N%2BUNaows%2BpHfDVFdoNbUbDeyW%2Bm8%2BbiEailHe0nelqRSUKf0bvJry9uUpvIsppKdFQZGEolDQCBL11i7NcuUvwKBCdyVOHWbS7uDt4ULhXlwIzGztux9O%2Fng9eV2JPzGzeX1tT3L%2FcTcwKu%2BUthuRyhkx4CJEe%2BO1dyNX3FSoUBiRQt0BNtLnbuhofwDHJZ%2F0WTvA%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 200,
          price: 200,
          title: "澳洲茶樹精油-5ml",
          unit: "瓶"
        },
        product_id: "-MyQOc_ZlhDQDBJDIEG1",
        qty: 1,
        total: 200
      },
      "-NTU4LjQh5zMMgPsfwZ7": {
        final_total: 2000,
        id: "-NTU4LjQh5zMMgPsfwZ7",
        product: {
          category: "精油",
          content: "茶樹精油-單瓶裝100ml",
          description:
            "被當地原住民視為『自然界最萬能的治療者』— 澳洲茶樹，數百年來在天然療法中佔有一席之地。有防蚊、舒緩、消炎、殺菌等作用。\n\n純粹無添加多餘物質的天然精油，一次購買大瓶裝更優惠。",
          id: "-MyQPPCXglvEk-DAd7wx",
          imageUrl: "https://upload.cc/i1/2022/03/18/ZPyfCm.jpg",
          imagesUrl: [
            "https://upload.cc/i1/2022/03/18/a4y2jS.jpg",
            "https://upload.cc/i1/2022/03/18/Huk65R.jpg"
          ],
          is_enabled: 1,
          origin_price: 2000,
          price: 2000,
          title: "澳洲茶樹精油-100ml",
          unit: "瓶"
        },
        product_id: "-MyQPPCXglvEk-DAd7wx",
        qty: 1,
        total: 2000
      },
      "-NTU4LjRiGseCBNVLQ9W": {
        final_total: 120,
        id: "-NTU4LjRiGseCBNVLQ9W",
        product: {
          category: "水果",
          content: "木瓜",
          description:
            "<p>號稱『萬壽果』的紅木瓜富含維生素、礦物質和葉酸等營養成分。 切塊即可享受香甜好滋味，不單能夠美膚也能協助調節免疫系統，老少咸宜，孕媽咪也可以享用！ 但由於含有β胡蘿蔔素，若過量攝取容易導致皮膚色素沉澱而暫時性的變黃，減少食用一陣子後，膚色會逐漸恢復到原有狀態。</p>",
          id: "-MyUBdrDIIoOG5IU4713",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724521950.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Mn2CEG8bsWceRqgfsdlBynFY8mUC1YeVAJmAlZVAR48KzBX9M2Rva%2BzWEIbijIchxaiCIn56586I39HfXz5GfzD84Rl8Tq83TRaYe3z9o5Tb2%2FYbXBBFZbU8sqU4NTGG6tcez6MXIj6U868HCD%2BPltaIoMdET7w26TTMpRI1YR4DpS0YtSNtI0EnpOUhojjV%2BE764TDuGChhltaMPMKpkXFO1aE7aBX2UBzrIbQJW2I2ahYkO%2Bpl2NzatlMjs6eXcb8IH9y3Bg6jaPaASEmilUrOWC8MJImgQM5BGYRC9KggHN%2BEs90BsPqmDGYT1OqZBVwszLp0wtZL%2FQMyW9x%2BXg%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979813040.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZgnAuGhpG9eF9ZxY9QUb%2BVoXY%2F9TG0PKo7H4kc%2FKEoEMSftNJy5x43lv14vPVkMFBY%2FXnbocgYWSUaVLAGZyMQ%2FalA%2BCQBcxDQyy9T9c1624%2Fplbmws7Wy8yRR%2FF%2BDtUiDjAKdJ7VLsc%2FS1%2FvfNlArW1WIndrVVu6UUGjgpR7YUZcW7uIJOfslTmFl5ZEVVHWjmz38Z3Kt0y8Yp5Ikn%2F9jw1ONjKkJy0VQpzB35WGb3wdk3uRHVNHJLE6UfRirysj4jJRfkigN7AHHt4Ja6blUZsvWvmq9VtToflpflkqYbx3jOlV5ck48KhAkOfqSfOSbOsVhDXUSi09P8PLW8JPw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979795058.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=OhHumqJMVPUi2R3xGYtvkNYRvo7B0vSjVou0C6mK4STzwIS%2FUahgDszkKKV%2FBI2yfgrY%2FaGT16KYRmKvAX9m9%2ByEvmEMjh%2FyMnTWXg61OrAx0S%2BEH2zRaGKmzYqZuGZjzsHsEoIEnPtgybuXdzJFJ8VWwxxexZX69uxEr4kqPw%2FdJnJirfjBSht3%2F1zplxXSF5qiV6LGGEbeC%2F%2B1mp5%2FEDbuH9eGc62iVnV0CFTyIWDumCJmGEh1c1SIjpeMD0JiBNVZ3N2mZm0VRikLDobphL4suqqdJDaq%2BT0pIV48f2XIlFWqj27CLP2VCJq%2BcbxFE0W6eGMzOVrOvlIs1Yppww%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 120,
          price: 120,
          title: "在欉紅木瓜",
          unit: "台斤"
        },
        product_id: "-MyUBdrDIIoOG5IU4713",
        qty: 1,
        total: 120
      },
      "-NTU4LjRiGseCBNVLQ9X": {
        final_total: 150,
        id: "-NTU4LjRiGseCBNVLQ9X",
        product: {
          category: "水果",
          content: "火龍果",
          description:
            "<p>原產自中南美洲且有『神聖之果』美譽的火龍果在引進台灣後經過不斷地改良調整，幾乎一年四季都能見到它的身影。 低卡高營養價值的火龍果富含水溶性膳食纖維及鎂、鐵、鋅、磷等礦物質與花青素。但因糖分偏高，因此須注意食用量避免過度攝取。</p>",
          id: "-MyUNX72iIsmfdx_2xZF",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724854450.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=TsvnPJ64c3CD%2Fwd4NXwM1S1nk9d%2BGLsR0l%2FJGRRWQXJhfpvKpHlhYfrh2OfoS6ep5q44niwKY9qD8vCFvBA%2FLS9LHrsJk0u7BCVDMAJ3AtI%2B3OakP%2BuNDq1BAd0OmK8zhMI6ztEx%2FwJn3RQflmHWTwBdiWzspm1rFbP96TBSIac9c2CeH5vY5UZw%2BTlEoL0NsfygwdX5FszGvFdVk3dqKTJM9hud%2BZPYv%2BdJM3SqHrYgu6uLwbCQXEjSjWQt28oct1PmsYhlkXDLduX7%2Fwj09ooNowjEjgBgQBMuxmCESPTwP85FI3BfRWkWhJuMHVvf4Jd4pUH4kTGpvu2fFM9crw%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979656719.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hpSq49gCbU%2BirKkKeQXBzYELePPGpF2M%2BYjwvUnWLSAkhju%2FOapC0iKXao%2B%2BTKR6MeXLjKyVNb24D37odIFbfMuVaZs4%2FilN%2BT8r81XbafHkiPqHP9%2F1M5w%2FvbbINKmZsX%2BekcPQwl7IE1%2BaAkHQxQknAmFW46bfSij7iahn0M5jwMc%2FjVLDmZE%2FCnxN1Rkn%2BqFA9jf6790uSyyMxC4pT7rXPLZWrjUhXC2AvCkUg906oJUZrSUGP58yexKTZQ96MKLKJ3WBmQD7b%2BnYaGiIAPaF%2BnTxXekkM8%2Fkdo4d9jnWiWdxZqAkDAtt%2Bz4PANS2AISU%2FB67bYHcKkk%2Bds6VcA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979692817.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=V9dud%2B5F7lhgGU0XIcYsVB2tB5P0G5geuqDgzk4vxxb2SBLkjINH7ZgYRfJdO%2FEWAgiJd%2Fxxe7F9AbhigcqETbZOIOnRGwKOsfRMvjXyugVXj4%2FS1fzS2GsqMr63hxjz9BbxHQKxu2AsvwrTysma3ydHjSN1vT2kBcgJOYxgnZIC8fo3o957RuIEJ13rDArZL1PpsN%2Blv7H%2FDgbNrRs5VK7wfi3yrSn%2BUlIWSXSYb4k3kUtzcWlfKqiAPEGmWJWC3Sdlp0tVWATZN58HMUVboRtmKmrneZNenvHSo38GUKz8br9W%2Bzr7xRauynsFBHF%2FoitoC9k%2BsK7MCGSJwTKlpA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979730437.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=KdAypjFlSi7n%2BJOguTCtOn6hWoqJqUSBSeWob6xmZYKVQ9YKFusPGd4A%2Fiyv2ljwfbrO6xN%2FD0OhCinxPteWzeF%2Ft7KstmyZ3cwTzpX%2FRAhmbGDhVeHeRlRK%2BhR8eO0vl9QqGKEJVL3gXHaisPpC81PLqt5lWD4QpTEuCKBrfzKXam%2FdYT%2FaotEAYrD%2BIxIBe42dxZUSh2aHULnrvxQ5km%2BLx8EFciyuV5LS65xUnpgWTdA6zUM0M3DdA2MdCwvUNUnBicVuz6CRWn2nejHEsuX9TsQW8o1b5fSwXJ3zKfl4TzpVYxu191V40EbbjQvf66mx0lustKio5xddgr6mrA%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724983991.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=mTPFzo3yKwO2L%2BhT7fmJABO%2Byp%2BAVp%2F5JsADLAXPN%2Bez0qWzSfgs2FAX6lwUWnzh35rSqWq7llLO1Xc7V%2BEygKZ9HxWSVuCllykSD0nHAuXSFuNV%2BMM9yiDkWkH9H4UYNEDlFi1Aa7Kk%2FAVKrPWOaTT2LpTqwE47HomsdT3o29%2BjkSmIzqLqkMjzOiO%2BE9Z%2F%2FxCbe%2F6kiV4vqylpuKzX8PjZfTdddF9rw68Yv5gK4c5Ef5E8arjnN5wOBEFU9XX7liGkEMbjGg2oZmpIODqot9b9Q3UTS8ndEamw1s0KM7JFf%2BqVHyJSBGh3PbkILPHr2hXz9QXpLBKH4u1rhexCWQ%3D%3D"
          ],
          is_enabled: 4,
          origin_price: 154,
          price: 150,
          title: "紅肉-火龍果",
          unit: "台斤"
        },
        product_id: "-MyUNX72iIsmfdx_2xZF",
        qty: 1,
        total: 150
      }
    },
    total: 2470,
    user: {
      address: "123改",
      email: "aaa@gmail.com",
      name: "John888999999999",
      tel: "0927173739"
    },
    num: 8
  },
  {
    create_at: 1682001034,
    id: "-NTU3jkXnYCVv6NMBRVz",
    is_paid: false,
    message: "11188513232",
    products: {
      "-NTU3jlsmZmJmwMZabiK": {
        final_total: 150,
        id: "-NTU3jlsmZmJmwMZabiK",
        product: {
          category: "蛋",
          content: "雞蛋",
          description:
            "<p>每日收穫兩次的放養雞蛋，蛋黃圓潤飽滿風味濃郁、蛋白稠而不稀，適合做成大人小孩都愛的溏心蛋。喜歡吃雞蛋的你不可錯過。</p>",
          id: "-MyQKzIHcfUtQh3OrYPR",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724058473.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fi4L81wG7KhRjENCvLZEjxSHuyr44twNrGGT6R%2BGcWvS7hpdXIkPzweEuQLmKgEeABibnkIyCYBVrxHxsLxBNSn8rToho%2FzmjXkv%2BopZONDigoSVWBv1xtJo8KRKxUw7OvbrhVpUsG4O7PLS5Wb%2FBcnU%2B%2FqP0y3HR584LCCGoTTIezo3lJvLErFN4AsihxLoGmNUkuvtwMDpsbQTU5L2kA4S4dhXHrBJ4OSMY%2BaaysmUnMCGsNKP4eGEoXu3ue5zNlaNObiiAwsMgCI4culH0SrzCzbZD3VWEBXtnd7spUpApYjR52a0Tp8bd5BPfXwMKRRG5ZOdNVNL5uDQ1xMLVA%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980300292.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=dRXHw18tvcvE1IZgUSiYlY1WwtZ9YqvD9aOBCrA7Ks%2FOQmlNrA1IAFM1l3H6KXnHPoXQBAN4FOeM7qea4DEyMh4dPo12yzoEFNjI8QdCwd%2FYMIvOtyoIg2EsDKylPI9JC2uwuMSK42Sal%2FxW0kxU6lXms1o%2Bu1TzS9wqYnnIrCm0S%2FULtS5H7xHYISH8h5n5u4FSFt%2BEOFUwUbqfxrRJ%2BCnZe0XyW6zza9xlYKD0VXridUDyYBpvXx527KYgi%2B%2FUAuNcI3CsUkVDoIvAXSTxoD938tHT%2BlA3NAxEc79pyqAkYwA1N8JhyzlOolh2zMzFk2gbR1qI5hJC7NR6k8QItw%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980287761.JPG?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZcXuFXeaIzwT9GRfhpKVShljPHOpBcecdkYCci7kWwURP9p58n6gg3iEl5uAgdUPAFQsPRjwiprk3Hv4ZnQxHxEv4Je6K81yXbzgdMUMni1fxB3nJuCW3kNREF1RLFpTTBJMgj9n7Em9BouXzdDH5wO0Absorc7mFCWLhyEJtHcm6ISCEqBLhmaB0xodqIU6%2Bw3OtdmQ%2FtU78%2BMnFQ6%2Fo8suTuj8Ft3GLaV6uHqJu5cVCPdYa8f8oTx3UKRA7sN5gSV2GlryhSdhcwkhtOfexVnXAVeKfgFoEgoEE31PP5e0C6VcJwhCA%2Fe2iYxrIlF2fzoOlNKDSsMnRo0wRew%2Baw%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 150,
          price: 150,
          title: "放養雞蛋",
          unit: "台斤"
        },
        product_id: "-MyQKzIHcfUtQh3OrYPR",
        qty: 1,
        total: 150
      }
    },
    total: 150,
    user: {
      address: "123",
      email: "aaa@gmail.com",
      name: "sdf",
      tel: "0912312313"
    },
    num: 9
  },
  {
    create_at: 1682000940,
    id: "-NTU3NtJ8iaMniYHGR8b",
    is_paid: true,
    message: "77777777777777777777777777777",
    paid_date: 1682000945,
    products: {
      "-NTU3NudELnclUCPx8Rd": {
        final_total: 20,
        id: "-NTU3NudELnclUCPx8Rd",
        product: {
          category: "蔬菜",
          content: "九層塔",
          description:
            "<p>九層塔顧名思義因花序外觀反覆重疊直上如高塔狀而得名。 擁有維生素、蛋白質、礦物質等。現代研究發現，九層塔活性成分以黃酮類為主，有增強胃黏膜作用，可預防胃潰瘍。同時含有酚類因此容易氧化變黑腐壞，需盡快食用完畢。 紅莖九層塔風味較綠莖九層塔濃厚，適合暴香或喜歡重風味的您。</p>",
          id: "-MyQIckZbv1cqR74yYYS",
          imageUrl:
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650723718466.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ByYm2%2BBiP0svH42WPydf91%2FC%2B2zZvv6F%2BP8U9e5ON%2FNJhO3zq8AJJ4%2BZNBWRBR6FcMtToE5qunHuduV2jvsYicfON1hu9VKLTd1qMAtKtvy5e%2BbE6%2BSlHH1rMmPxqUbQ147dZUWlteHb%2FK4LUyw8mCNz9xDO%2BWsaQZaIrXzT0C1dh2pUcbYb2N%2FiSn9eNw1iBmp1AyyWfDVx4r6TszFeq40VI5tg6TjH%2BKeBmgeQDTsfto0Mt8aVqddVqyFGI4CZdGMpcD%2BG2WMNjTS0JYLAiGK%2FExNfQafGqtO6WA5hPgzu%2B7ZsrzHHZgWXEd8p3BlHZHpP%2BCIeMm5zdt9gEVTFBg%3D%3D",
          imagesUrl: [
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980338818.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=W07Dlpbocl4cjrSLkulpvLV8EQ3xB%2FuI%2Fs8lK41YRg7JZigEPs5bwmNzU7ITBZa3ksvDSvblFKUZXxvA3zChQP40LF0EpSiDAfONJnIUL8V5O860B3sYsu3gunRa4kuF%2FtNftdoSEED3K9rSFvDAxVuUxQY1h6HQC1f6952PO8AAUlD6rFK3ieBMpgF2LJIdcRVW0plknj0G4WpnYCoxDopvfZWpXa8rJq6wNw6PSRDNEImeHba6S7eshk%2FdgAVC4dRAJIqRA%2FUNkwI9cAm6PM8wN%2BjUoYp%2BN28fs8YH22aPYhuhGnAppzeE%2BUGhacdMEcZ9iFEJRNqAKJriLo1Z%2BQ%3D%3D",
            "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980356710.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HcpMub%2Bok%2FDv%2Fr3xSKwxmOFWhZS7EQy21EU%2FHvzi7wHkq38PmkLj%2FKX3CT6DUeHB8Z%2FSAG6VVwW1ig%2FcmGcU%2FzsLKRr7H7FaZQa4KRh2cm9126tpk%2FoNop7Td2JYYV2r97odMjTpg2uclP7yOELG%2FlZBOvgtR%2FRoPECRlkScJkTcy1yKPc0B8aaVzFcDv2Vw5kt48u%2BZdkP%2FhSjUxim38KmHs4P0ycf3pEhjU52rDquXkgPxHTfsyOz5rcsfPPYI5nRZR1Og8BdkbZ3SnA%2BbEBjKRPXIn4JTbGG7yQuK6xU%2BNSqexcvEHCNQKTt44w7NJIufGZeBtc7h0hJEf3fvCQ%3D%3D"
          ],
          is_enabled: 1,
          origin_price: 20,
          price: 20,
          title: "紅莖九層塔",
          unit: "100克"
        },
        product_id: "-MyQIckZbv1cqR74yYYS",
        qty: 1,
        total: 20
      }
    },
    total: 20,
    user: {
      address: "1237964555555",
      email: "aaa@gmail.com",
      name: "John888",
      tel: "0927173739"
    },
    num: 10
  }
]);
const deleteOrder = () => {
  console.log("deleteOrder");
};
const paginationData = ref();
const handleChangePage = async (page: number) => {
  console.log("handleChangePage", page);
};
</script>
<template>
  <div class="container mx-auto px-4 bg-gray-300 dark:bg-gray-800">
    <div class="py-5">
      <h2 class="text-2xl font-bold mb-4 text-gray-900 dark:text-white">訂單管理</h2>
      <div class="py-3">
        <div id="orderManager" data-accordion="collapse">
          <div
            v-for="(item, index) in orders"
            :key="item.id + index"
            class="border border-gray-200 rounded-lg mb-2 bg-gray-200 dark:bg-gray-800 dark:border-gray-800"
          >
            <!-- Accordion Header -->
            <h2 :id="`accordion-heading-${item.id}`">
              <button
                type="button"
                class="flex items-center justify-between w-full p-5 font-medium text-gray-500 bg-gray-200 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-300 gap-3"
                :class="[
                  index === 0 ? 'rounded-t-lg ' : '',
                  postId === item.id ? 'bg-gray-400 dark:bg-gray-900' : ''
                ]"
                @click="postId = item.id"
                :data-accordion-target="`#accordion-body-${item.id}`"
                :aria-expanded="index === 0"
                :aria-controls="`accordion-body-${item.id}`"
              >
                <span>訂單編號{{ item.id }}</span>
                <svg
                  data-accordion-icon
                  class="w-3 h-3 shrink-0 transition-transform text-gray-600 dark:text-gray-400"
                  :class="{ 'rotate-180': index === 0 }"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </h2>

            <!-- Accordion Content -->
            <div
              :id="`accordion-body-${item.id}`"
              :class="{ hidden: index !== 0 }"
              :aria-labelledby="`accordion-heading-${item.id}`"
            >
              <div
                class="p-5 border-t border-gray-200 dark:border-gray-600 bg-gray-200 dark:bg-gray-600"
              >
                <!-- Card Content -->
                <div class="bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                  <div class="bg-primary text-white p-4 rounded-t-lg">訂單內容</div>
                  <div class="p-4">
                    <div class="grid grid-cols-12 gap-4">
                      <!-- Customer Info -->
                      <div class="col-span-12 lg:col-span-5">
                        <h5 class="text-lg font-semibold mb-5 text-gray-900 dark:text-white">
                          客戶資料
                        </h5>

                        <table class="w-full pt-2">
                          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 w-24 text-gray-700 dark:text-gray-300">姓名</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.name }}
                              </td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">住址</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.address }}
                              </td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">電話</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.tel }}
                              </td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">E-mail</th>
                              <td class="py-2 text-gray-900 dark:text-white">
                                {{ item.user.email }}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <!-- Order Details -->
                      <div class="col-span-12 lg:col-span-6">
                        <div class="flex justify-between items-center mb-3 w-full">
                          <h5 class="text-lg font-semibold text-gray-900 dark:text-white">
                            訂單細節
                          </h5>
                          <button
                            class="px-4 py-2 text-sm border border-red-300 dark:border-red-600 rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-red-100 dark:hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="isLoading"
                            @click="
                              postId = item.id;
                              deleteOrder();
                            "
                          >
                            刪除訂單
                          </button>
                        </div>
                        <table class="w-full">
                          <tbody class="divide-y divide-gray-200 dark:divide-gray-600">
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 w-24 text-gray-700 dark:text-gray-300">訂單編號</th>
                              <td class="py-2 text-gray-900 dark:text-white">{{ item.id }}</td>
                              <td class="py-2 text-gray-700 dark:text-gray-300">修改付款狀態</td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">下單時間</th>
                              <td
                                class="py-2 text-gray-900 dark:text-white"
                                v-timeFormat="item.create_at"
                              ></td>
                              <td class="py-2"></td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">付款時間</th>
                              <td
                                class="py-2 text-gray-900 dark:text-white"
                                v-timeFormat="item.paid_date"
                              ></td>
                              <td class="py-2"></td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">付款狀態</th>
                              <td
                                :class="{
                                  'text-green-500 dark:text-green-400': item.is_paid,
                                  'text-red-500 dark:text-red-400': !item.is_paid
                                }"
                              >
                                {{ item.is_paid ? "已付款" : "未付款" }}
                              </td>
                              <td class="py-2">
                                <label class="inline-flex items-center cursor-pointer">
                                  <input
                                    type="checkbox"
                                    value=""
                                    class="sr-only peer"
                                    v-model="item.is_paid"
                                  />
                                  <div
                                    class="relative w-11 h-6 bg-gray-500 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-primary rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-500 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
                                  ></div>
                                  <span
                                    class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                                  ></span>
                                </label>
                              </td>
                            </tr>
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-500">
                              <th class="py-2 text-gray-700 dark:text-gray-300">總金額</th>
                              <td class="py-2 text-gray-900 dark:text-white">{{ item.total }}</td>
                              <td class="py-2"></td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <!-- Product List -->
                      <div class="col-span-12">
                        <h5 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
                          產品清單
                        </h5>
                        <div class="flex flex-col overflow-x-auto">
                          <table class="min-w-full table-auto">
                            <thead>
                              <tr
                                class="border-b border-gray-700 bg-gray-200 dark:bg-gray-800 dark:border-gray-100 bg-gray-100 dark:bg-gray-700 dark:text-white"
                              >
                                <th scope="col" class="px-4 py-2"></th>
                                <th scope="col" class="px-4 py-2 text-left">商品名稱</th>
                                <th scope="col" class="px-4 py-2 text-left">總價格</th>
                                <th scope="col" class="px-4 py-2 text-left">數量</th>
                                <th scope="col" class="px-4 py-2 text-left">單價</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="(key, index) in Object.keys(item.products)"
                                :key="key"
                                :class="
                                  index % 2 === 0
                                    ? 'bg-gray-100 dark:bg-gray-700'
                                    : 'bg-gray-200 dark:bg-gray-800'
                                "
                              >
                                <td class="px-4 py-2">
                                  <img
                                    :src="
                                      item.products[key]?.product?.imageUrl ||
                                      '/defaultImg/image-1@2x.jpg'
                                    "
                                    class="max-w-12 max-h-8 object-cover"
                                  />
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{ item.products[key]?.product?.title }}
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{ item.products[key]?.final_total }}
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{ item.products[key]?.qty }}
                                </td>
                                <td class="px-4 py-2 text-gray-900 dark:text-gray-100">
                                  {{
                                    item.products[key]?.product?.origin_price >
                                    item.products[key]?.product?.price
                                      ? item.products[key]?.product?.origin_price
                                      : item.products[key]?.product?.price
                                  }}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Pagination :pagination="paginationData" @changePage="handleChangePage" />
</template>
<style></style>
