<script lang="ts" setup>
import { type Product } from "@/types/productTypes";
const productDataList: Product[] = [
  {
    category: "水果",
    content: "百香果",
    description:
      "百香果是台灣常見的水果之一，果汁中主要色素種類為類胡蘿蔔素，富含蛋白質、類黃酮素、礦物質及維生素等營養。 由雜交法孕育而成的台農1號百香果，果實飽滿多汁、香氣濃郁，成熟外觀為帶斑點的紫紅色。 口味偏酸適合熬製成果醬或入菜及飲調混合搭配使用，喜歡偏酸百香果的您不能錯過。",
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
  {
    category: "蔬菜",
    content: "四季豆的一種，因外型扭曲又稱醜豆",
    description:
      "『凡人不可貌相，海水不可斗量』用這句話來形容生長凌亂隨意、毫無美感可言的醜豆是最為貼近的。 長相歪曲又凹醜的醜豆擁有鉀、鈣、膳食纖維等營養素。常見於一般日常料理，可炒、可燙、可涼拌，具有清甜爽脆的口感。屬於低卡高纖可提升飽足感的蔬菜豆一族，適合減重忌口的您！",
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
  {
    category: "水果",
    content: "聖女番茄",
    description:
      "冬季限定！ 色澤亮麗鮮紅、外型小巧，因薄皮多汁顯得嬌嫩無比而得名『玉女』。 與橙蜜香小番茄相比口味偏酸甜。不論直接洗淨食用或是輕食涼拌、醃製、燉煮都極度百搭！ 歡迎選購為每日的餐飲生活增添各種趣味性。",
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
  {
    category: "水果",
    content: "小番茄",
    description:
      "冬季限定！ 相較於玉女小番茄的薄皮多汁酸味重；色澤暖亮橘黃的橙蜜香小番茄皮厚肉Ｑ口感細緻，並帶有淡淡的橙香味，適合怕酸的您來細細品嘗。",
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
  {
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
  {
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
  {
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
  {
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
  {
    category: "精油",
    content: "澳洲茶樹精油套組-100ml*1 5ml*3",
    description:
      "<p>被當地原住民視為『自然界最萬能的治療者』— 澳洲茶樹，數百年來在天然療法中佔有一席之地。有防蚊、舒緩、消炎、殺菌等作用。 純粹無添加多餘物質的天然精油，本套組可以滿足想隨身攜帶精油又想要優惠的你，誰說有一好沒兩好呢?</p>",
    id: "-MyQQ7l5uL7Heq32lLky",
    imageUrl:
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980004174.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=cJal%2BTpeZK%2F9i5eZM6bszyXHrfG7bwx4THetJDWw25ZyQyp0CtT4znMQGFmsvbkLiUVbA1e9Tu91vxRCtLtucPpdP5PXup7JuVPCP3mdArsDRcq3El5064WyqAYWrn3MD6qk9OJwLC3GQGL%2FXmPEHIzO1G3TLFuLfUEw8VR%2Fvy16s%2FTxeaxTcarlNMnKf8wAEwXUUZnj7TaMDiUV4%2F7FyribTv1FinnsruckxiEqEkNdn6dQovaHRZSc8KIvEt390k0pcPq2Ep3%2Be%2FZLZIMHGzzaomJiTuAnbbip4S3VG4SFBBtLydQqetxflSTxC06aEUB6j85bQwBGT5Mc9oqsLw%3D%3D",
    imagesUrl: [
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980038163.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=gLP69IvXg9Mqsnxb9dqcYCytoNCmMiH3elIdC5OLzrqXollUZpBUrMujNdsDS7Usw1%2FVRrDk4A38XpN3XCXMV%2BljDiQYOMcEnB2Pz1YQZvUwwygFn2zeKubVBxGCSPGOBcAYHht1TRGcfEOsosYtNw8LZHg5AoukwVvlBM0IoWsPQXI5aA%2FmZmCInaIEbaeZIBGPeTkgtfVZr9E37nw3%2FK4GTlTa%2B075QAw3PEIG3QgxZ3%2FD7ABNi9E5tV4ajS4TT%2BAhUWp572mheXf8kmxv3yb5A1pw8r9qGo5WRol2W9NgAw%2By50MsVW4geO%2F7aSJyWd%2BHx8T3bIpCMNP63Hg4FA%3D%3D",
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659980060395.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=TqyuD6SA%2BNTF16I29%2B%2BU%2BRc%2By%2FtkmHlOCoX1ngvyK9jf8WXbZVgCAWvA9bwR%2FzLG2%2BCddJL84ds4WzMcw87%2BRN%2BYPwPmgzv%2B3M6ZtFr9PYHRNQ7jMm1JGHjmZPNviFuX1BJ0l6%2BjrDosoi6SaGOw95A9b7kNFbneYslXGWgvBIjGuQVuf6IUEiuAkTc568mxCCsVKBb49l8mLJwNgANfCN4yLhoNJ4Rv08OySZj%2BFSRpa3QHsNXUZgq3Ti00dZQa%2FT4lXRk38M2bTOoFgxeIGGR4yg8UfkOxEthWjubS%2BhwVIeMdRWbNdkknfbaHeECCX1NyUZyR8nPVTMU0eXiyHg%3D%3D"
    ],
    is_enabled: 1,
    origin_price: 2500,
    price: 2500,
    title: "澳洲茶樹精油套組",
    unit: "套"
  },
  {
    category: "蔬菜",
    content: "新鮮朝天椒-100g",
    description:
      "<p>現今身影遍佈世界各地、唾手可得的辣椒，在遙遠的過去可是堪比黃金甚至更甚。 辣椒的品種眾多，果實向上生長者，稱其為「朝天椒」，辣性較強，適合採摘長度約6～8公分，是台灣辣味料理首選角色。 不論煮湯、爆炒、入醬或是做成剝皮辣椒食用都各有擁護者。</p>",
    id: "-MyU8Y02a8Zl7SmTEnFr",
    imageUrl:
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724378580.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=P8Qx%2F%2F3Mm9wuL6HHbkp2%2F88NndwP1VApUC9PoTatl4LjoRjH6yN3PziWXrDFtsKQKaz3shE7fpFkgM%2FRB8Tr%2BUyA6z5GEv8aH4fSQDoDctp53L1Z%2Fsr%2FwghSzgD2LxZ8BfzkvfozbCKIsVJwOSmia2gnDw8%2Fdyt%2B5sG%2FwN7GRBEPjfg8orQ2IAh5A%2BfXavVYAYQBxM0Lwu5aqJYj9Tvl6ZjPdZla7ZGuWnKFMpMgZUOZGID7bhit30HKvDvnuX3Nnm%2F1k4h60pjZi7%2FQmp6ntHtwr%2Bgv4DWRD9Ki5TUDNMSAZclP%2BwJhVqTnSv4%2Bw1%2BmAlW6MloyTAZnbip%2F1Mj%2F4g%3D%3D",
    imagesUrl: [
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979869117.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=H4xdG5XR8%2FriCh3uDaMcJqZE37JtIjB274%2FQp%2Fe85SO7Epb7OEXuqRKgUoiPaxyoLJPGBiakaZBAamAn8tOfpm8Pmf7AeBTYUFpcobMK6vMZ1lspD9RzROP8AVOmy2PEr30c3lTZLspjVNpBzrZbdNXQYHeBpMEwUwgmGV97cejIsrvSYUWiVPVjymoKJqFjqMZSGTqxRNpdFuLWjs%2B%2FDQGL5sCBGu%2F8sX3O9eNV2sUFobSC3Ll421JomnLKtPk21SrRUD95tNUVz5I2B2G5Qe08miTU1FXOYt1i8A7AegNUZxYkU24jLSGUVDN9pJdSRmgA7LwtcOCLHAicyHVRkg%3D%3D",
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1659979905836.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Ls1Jng4b%2Bojkg6gR5AQNAAAOWFFwmZeCGqwJa0NwC%2BN2A9y1Sx5X7CLNwEqlnjYIVeG4w4Qz%2FFk05HYu2hbdroobc6HpdRfed%2BNhO5AC4diPEeNNWzncEfGKlnRCTiCqvehvm4p5iipMg%2Bu1qFhfo5FhCyiW27vYq1V%2B1t9nRQrrG5AfJz3l8P37kjgYClkZQNsbQ4D5k8ISEqjXDIQdi6XBYWfmsl8akmRDkZLinJoKi4beMFO0mFZAmEGmSRjRDaUrjKzRzUSG54nX1Spyt%2BhJpgq0oewgMeKgWTEMi%2F%2BHXXqKjGtROzZsDymG6cwmfZNX3QDevM1OY0RPAIbH0w%3D%3D"
    ],
    is_enabled: 1,
    origin_price: 50,
    price: 50,
    title: "朝天椒",
    unit: "袋"
  },
  {
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
  {
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
  {
    category: "蔬菜",
    content: "百香果sdf",
    description: "<p>test</p>",
    id: "-NTnRuf3WegHSPnvuijy",
    imageUrl:
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724854450.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=TsvnPJ64c3CD%2Fwd4NXwM1S1nk9d%2BGLsR0l%2FJGRRWQXJhfpvKpHlhYfrh2OfoS6ep5q44niwKY9qD8vCFvBA%2FLS9LHrsJk0u7BCVDMAJ3AtI%2B3OakP%2BuNDq1BAd0OmK8zhMI6ztEx%2FwJn3RQflmHWTwBdiWzspm1rFbP96TBSIac9c2CeH5vY5UZw%2BTlEoL0NsfygwdX5FszGvFdVk3dqKTJM9hud%2BZPYv%2BdJM3SqHrYgu6uLwbCQXEjSjWQt28oct1PmsYhlkXDLduX7%2Fwj09ooNowjEjgBgQBMuxmCESPTwP85FI3BfRWkWhJuMHVvf4Jd4pUH4kTGpvu2fFM9crw%3D%3D",
    imagesUrl: [
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724378580.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=P8Qx%2F%2F3Mm9wuL6HHbkp2%2F88NndwP1VApUC9PoTatl4LjoRjH6yN3PziWXrDFtsKQKaz3shE7fpFkgM%2FRB8Tr%2BUyA6z5GEv8aH4fSQDoDctp53L1Z%2Fsr%2FwghSzgD2LxZ8BfzkvfozbCKIsVJwOSmia2gnDw8%2Fdyt%2B5sG%2FwN7GRBEPjfg8orQ2IAh5A%2BfXavVYAYQBxM0Lwu5aqJYj9Tvl6ZjPdZla7ZGuWnKFMpMgZUOZGID7bhit30HKvDvnuX3Nnm%2F1k4h60pjZi7%2FQmp6ntHtwr%2Bgv4DWRD9Ki5TUDNMSAZclP%2BwJhVqTnSv4%2Bw1%2BmAlW6MloyTAZnbip%2F1Mj%2F4g%3D%3D"
    ],
    is_enabled: 2,
    origin_price: 55555,
    price: 55555,
    title: "52421",
    unit: "套"
  },
  {
    category: "水果",
    content: "澳洲茶樹精油套組-100ml*1 5ml*3",
    description: "<p>1233333333</p>",
    id: "-NTnSDdO9_BLhcK5f3Yr",
    imageUrl:
      "https://storage.googleapis.com/vue-course-api.appspot.com/chun-chia/1650724854450.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=TsvnPJ64c3CD%2Fwd4NXwM1S1nk9d%2BGLsR0l%2FJGRRWQXJhfpvKpHlhYfrh2OfoS6ep5q44niwKY9qD8vCFvBA%2FLS9LHrsJk0u7BCVDMAJ3AtI%2B3OakP%2BuNDq1BAd0OmK8zhMI6ztEx%2FwJn3RQflmHWTwBdiWzspm1rFbP96TBSIac9c2CeH5vY5UZw%2BTlEoL0NsfygwdX5FszGvFdVk3dqKTJM9hud%2BZPYv%2BdJM3SqHrYgu6uLwbCQXEjSjWQt28oct1PmsYhlkXDLduX7%2Fwj09ooNowjEjgBgQBMuxmCESPTwP85FI3BfRWkWhJuMHVvf4Jd4pUH4kTGpvu2fFM9crw%3D%3D",
    is_enabled: 2,
    origin_price: 14,
    price: 13,
    title: "1238",
    unit: "台斤"
  }
];

const searchButtonConfig = {
  priceHighToLow: true,
  priceLowToHigh: true,
  search: true,
  clearSearch: true
};
const showProductList = ref(productDataList);
const handlePriceHighToLow = () => {
  showProductList.value = showProductList.value.sort((a, b) => b.price - a.price);
};
const handlePriceLowToHigh = () => {
  showProductList.value = showProductList.value.sort((a, b) => a.price - b.price);
};
interface SearchData {
  searchInfo: string;
  minPrice: string;
  maxPrice: string;
}
const handleSearch = (searchData: SearchData) => {
  const { searchInfo, minPrice, maxPrice } = searchData;
  // 篩選商品列表
  showProductList.value = productDataList.filter((product) => {
    // 檢查搜尋字串
    const matchSearchInfo =
      product.title.includes(searchInfo) ||
      product.category.includes(searchInfo) ||
      product.content.includes(searchInfo) ||
      product.description.includes(searchInfo);
    return matchSearchInfo;
  });
  showProductList.value = showProductList.value.filter((product) => {
    // 檢查價格區間
    if (minPrice === "" && maxPrice === "") return true;
    else if (minPrice && maxPrice === "") {
      return product.price >= Number(minPrice);
    } else if (maxPrice && minPrice === "") {
      return product.price <= Number(maxPrice);
    } else {
      return product.price >= Number(minPrice) && product.price <= Number(maxPrice);
    }
  });
  // 移除重複的產品
  showProductList.value = [...new Set(showProductList.value)];
};
</script>
<template>
  <SearchSearchbar
    :autoCompleteListProp="productDataList"
    :searchButtonConfigProp="searchButtonConfig"
    @priceHighToLow="handlePriceHighToLow"
    @priceLowToHigh="handlePriceLowToHigh"
    @search="handleSearch"
  ></SearchSearchbar>
  <div class="container mx-auto">
    <ProductCardList class="px-2 md:px-0" :productListProp="showProductList" productIdProp="">
    </ProductCardList>
  </div>
  <ul>
    <li v-for="item in showProductList" :key="item.id">
      {{ `產品：${item.title}` }}
      {{ `價格： ${item.price}` }}
    </li>
  </ul>
  <div class="container h-screen"></div>
</template>
<style></style>
