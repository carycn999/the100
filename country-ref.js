// country-ref.js — complete country↔region reference (UN geoscheme).
//
// The Obsidian _region/ notes only define the ~27 countries used by the 100
// people, so the map could not correctly attribute the rest of the world's
// polygons to a region. This module bundles a full reference covering every
// country the world map can render. build-data.js merges it into data.js with
// the note-derived data taking precedence, so the web project always ships
// complete country/region data even while the notes stay sparse.
//
// Subregion names match those used by the notes (西欧, 北欧, 东亚 …) and follow
// the UN M49 geoscheme for the rest. Continents match CONTINENTS in the notes.
// "北美洲" is a continent-level bucket (no subregion), matching how the notes
// hang US/Canada straight off the continent.

const SUB_TO_CONT = {
  '东亚': '亚洲', '东南亚': '亚洲', '南亚': '亚洲', '中亚': '亚洲', '西亚': '亚洲',
  '北欧': '欧洲', '西欧': '欧洲', '东欧': '欧洲', '南欧': '欧洲',
  '北非': '非洲', '西非': '非洲', '中非': '非洲', '东非': '非洲', '南部非洲': '非洲',
  '中美洲': '拉丁美洲', '加勒比': '拉丁美洲', '南美': '拉丁美洲',
  '澳新': '大洋洲', '美拉尼西亚': '大洋洲', '密克罗尼西亚': '大洋洲', '波利尼西亚': '大洋洲',
};

// [iso, 中文, English, lat, lon] grouped by subregion.
const BY_SUB = {
  '东亚': [
    ['CN','中国','China',35.9,104.2], ['JP','日本','Japan',36.2,138.3],
    ['KP','朝鲜','North Korea',40.3,127.5], ['KR','韩国','South Korea',36.5,127.8],
    ['MN','蒙古','Mongolia',46.9,103.8], ['TW','台湾','Taiwan',23.7,121.0],
    ['HK','香港','Hong Kong',22.3,114.2], ['MO','澳门','Macau',22.2,113.5],
  ],
  '东南亚': [
    ['MM','缅甸','Myanmar',21.9,96.0], ['KH','柬埔寨','Cambodia',12.6,104.9],
    ['ID','印度尼西亚','Indonesia',-2.5,118.0], ['LA','老挝','Laos',19.9,102.5],
    ['MY','马来西亚','Malaysia',4.2,102.0], ['PH','菲律宾','Philippines',12.9,121.8],
    ['SG','新加坡','Singapore',1.35,103.8], ['TH','泰国','Thailand',15.0,101.0],
    ['VN','越南','Vietnam',16.0,107.8], ['BN','文莱','Brunei',4.5,114.7],
    ['TL','东帝汶','Timor-Leste',-8.8,125.7],
  ],
  '南亚': [
    ['AF','阿富汗','Afghanistan',33.9,67.7], ['BD','孟加拉国','Bangladesh',23.7,90.4],
    ['BT','不丹','Bhutan',27.5,90.4], ['IN','印度','India',22.0,79.0],
    ['LK','斯里兰卡','Sri Lanka',7.9,80.7],
    ['MV','马尔代夫','Maldives',3.2,73.2], ['NP','尼泊尔','Nepal',28.4,84.1],
    ['PK','巴基斯坦','Pakistan',30.4,69.3],
  ],
  '中亚': [
    ['KZ','哈萨克斯坦','Kazakhstan',48.0,67.0], ['KG','吉尔吉斯斯坦','Kyrgyzstan',41.2,74.8],
    ['TJ','塔吉克斯坦','Tajikistan',38.9,71.3], ['TM','土库曼斯坦','Turkmenistan',39.1,59.4],
    ['UZ','乌兹别克斯坦','Uzbekistan',41.4,64.6],
  ],
  '西亚': [
    ['AM','亚美尼亚','Armenia',40.1,45.0], ['AZ','阿塞拜疆','Azerbaijan',40.4,47.6],
    ['BH','巴林','Bahrain',26.0,50.55], ['CY','塞浦路斯','Cyprus',35.1,33.4],
    ['GE','格鲁吉亚','Georgia',42.3,43.4], ['IQ','伊拉克','Iraq',33.2,43.7],
    ['IR','伊朗','Iran',32.4,53.7],
    ['IL','以色列','Israel',31.5,34.9], ['JO','约旦','Jordan',31.2,36.8],
    ['KW','科威特','Kuwait',29.3,47.5], ['LB','黎巴嫩','Lebanon',33.9,35.9],
    ['OM','阿曼','Oman',21.5,55.9], ['PS','巴勒斯坦','Palestine',31.9,35.2],
    ['QA','卡塔尔','Qatar',25.3,51.2], ['SA','沙特阿拉伯','Saudi Arabia',24.0,45.0],
    ['SY','叙利亚','Syria',35.0,38.5], ['TR','土耳其','Turkey',39.0,35.2],
    ['AE','阿拉伯联合酋长国','United Arab Emirates',23.9,54.3], ['YE','也门','Yemen',15.5,48.0],
  ],
  '北欧': [
    ['DK','丹麦','Denmark',56.0,10.0], ['EE','爱沙尼亚','Estonia',58.7,25.5],
    ['FI','芬兰','Finland',64.5,26.0], ['IS','冰岛','Iceland',64.9,-18.6],
    ['IE','爱尔兰','Ireland',53.2,-8.0], ['LV','拉脱维亚','Latvia',56.9,24.9],
    ['LT','立陶宛','Lithuania',55.2,23.9], ['NO','挪威','Norway',64.5,12.0],
    ['SE','瑞典','Sweden',62.0,15.0], ['GB','英国','United Kingdom',54.0,-2.5],
    ['FO','法罗群岛','Faroe Islands',62.0,-6.9], ['AX','奥兰群岛','Åland Islands',60.2,20.0],
    ['GG','根西','Guernsey',49.45,-2.58], ['JE','泽西','Jersey',49.2,-2.13],
    ['IM','马恩岛','Isle of Man',54.2,-4.5],
  ],
  '西欧': [
    ['AT','奥地利','Austria',47.6,14.1], ['BE','比利时','Belgium',50.6,4.6],
    ['FR','法国','France',46.6,2.4], ['DE','德国','Germany',51.1,10.4],
    ['LI','列支敦士登','Liechtenstein',47.2,9.55], ['LU','卢森堡','Luxembourg',49.8,6.1],
    ['MC','摩纳哥','Monaco',43.74,7.42], ['NL','荷兰','Netherlands',52.2,5.5],
    ['CH','瑞士','Switzerland',46.8,8.2],
  ],
  '东欧': [
    ['BY','白俄罗斯','Belarus',53.7,28.0], ['BG','保加利亚','Bulgaria',42.7,25.2],
    ['CZ','捷克','Czechia',49.8,15.5], ['HU','匈牙利','Hungary',47.2,19.4],
    ['PL','波兰','Poland',52.1,19.4], ['MD','摩尔多瓦','Moldova',47.2,28.5],
    ['RO','罗马尼亚','Romania',45.9,25.0], ['RU','俄罗斯','Russia',61.5,105.0],
    ['SK','斯洛伐克','Slovakia',48.7,19.7], ['UA','乌克兰','Ukraine',49.0,31.4],
  ],
  '南欧': [
    ['AL','阿尔巴尼亚','Albania',41.2,20.0], ['AD','安道尔','Andorra',42.5,1.5],
    ['BA','波斯尼亚和黑塞哥维那','Bosnia and Herzegovina',44.0,18.0], ['HR','克罗地亚','Croatia',45.2,15.5],
    ['GI','直布罗陀','Gibraltar',36.14,-5.35], ['GR','希腊','Greece',39.0,22.0],
    ['IT','意大利','Italy',42.8,12.8], ['MT','马耳他','Malta',35.9,14.4],
    ['ME','黑山','Montenegro',42.7,19.4], ['MK','北马其顿','North Macedonia',41.6,21.7],
    ['PT','葡萄牙','Portugal',39.6,-8.0], ['RS','塞尔维亚','Serbia',44.0,20.9],
    ['SI','斯洛文尼亚','Slovenia',46.1,14.8], ['ES','西班牙','Spain',40.0,-4.0],
    ['VA','梵蒂冈','Vatican City',41.9,12.45], ['SM','圣马力诺','San Marino',43.94,12.46],
  ],
  '北非': [
    ['DZ','阿尔及利亚','Algeria',28.0,2.6], ['EG','埃及','Egypt',26.8,30.8],
    ['LY','利比亚','Libya',27.0,18.0], ['MA','摩洛哥','Morocco',31.8,-7.0],
    ['SD','苏丹','Sudan',15.5,30.2], ['TN','突尼斯','Tunisia',34.0,9.5],
    ['EH','西撒哈拉','Western Sahara',24.5,-13.0],
  ],
  '西非': [
    ['BJ','贝宁','Benin',9.6,2.3], ['BF','布基纳法索','Burkina Faso',12.2,-1.6],
    ['CV','佛得角','Cape Verde',16.0,-24.0], ['CI','科特迪瓦',"Côte d'Ivoire",7.6,-5.5],
    ['GM','冈比亚','Gambia',13.4,-15.4], ['GH','加纳','Ghana',7.9,-1.0],
    ['GN','几内亚','Guinea',10.4,-10.9], ['GW','几内亚比绍','Guinea-Bissau',12.0,-15.0],
    ['LR','利比里亚','Liberia',6.4,-9.4], ['ML','马里','Mali',17.6,-4.0],
    ['MR','毛里塔尼亚','Mauritania',20.3,-10.3], ['NE','尼日尔','Niger',17.6,8.1],
    ['NG','尼日利亚','Nigeria',9.1,8.7], ['SN','塞内加尔','Senegal',14.5,-14.5],
    ['SL','塞拉利昂','Sierra Leone',8.5,-11.8], ['TG','多哥','Togo',8.6,0.8],
    ['SH','圣赫勒拿','Saint Helena',-15.95,-5.7],
  ],
  '中非': [
    ['AO','安哥拉','Angola',-11.2,17.9], ['CM','喀麦隆','Cameroon',5.7,12.7],
    ['CF','中非共和国','Central African Republic',6.6,20.9], ['TD','乍得','Chad',15.4,18.7],
    ['CG','刚果（布）','Republic of the Congo',-0.8,15.2], ['CD','刚果（金）','DR Congo',-2.9,23.6],
    ['GQ','赤道几内亚','Equatorial Guinea',1.6,10.3], ['GA','加蓬','Gabon',-0.6,11.8],
    ['ST','圣多美和普林西比','São Tomé and Príncipe',0.2,6.6],
  ],
  '东非': [
    ['BI','布隆迪','Burundi',-3.4,29.9], ['KM','科摩罗','Comoros',-11.6,43.3],
    ['DJ','吉布提','Djibouti',11.8,42.6], ['ER','厄立特里亚','Eritrea',15.2,39.8],
    ['ET','埃塞俄比亚','Ethiopia',9.1,40.5], ['KE','肯尼亚','Kenya',0.2,37.9],
    ['MG','马达加斯加','Madagascar',-19.0,46.7], ['MW','马拉维','Malawi',-13.3,34.3],
    ['MU','毛里求斯','Mauritius',-20.3,57.6], ['YT','马约特','Mayotte',-12.8,45.2],
    ['MZ','莫桑比克','Mozambique',-18.3,35.5], ['RE','留尼汪','Réunion',-21.1,55.5],
    ['RW','卢旺达','Rwanda',-1.9,29.9], ['SC','塞舌尔','Seychelles',-4.7,55.5],
    ['SO','索马里','Somalia',5.2,46.2], ['SS','南苏丹','South Sudan',7.3,30.3],
    ['TZ','坦桑尼亚','Tanzania',-6.4,35.0], ['UG','乌干达','Uganda',1.4,32.4],
    ['ZM','赞比亚','Zambia',-13.1,27.8], ['ZW','津巴布韦','Zimbabwe',-19.0,29.8],
  ],
  '南部非洲': [
    ['BW','博茨瓦纳','Botswana',-22.3,24.7], ['LS','莱索托','Lesotho',-29.6,28.2],
    ['NA','纳米比亚','Namibia',-22.0,17.2], ['ZA','南非','South Africa',-29.0,24.0],
    ['SZ','斯威士兰','Eswatini',-26.5,31.5],
  ],
  '中美洲': [
    ['BZ','伯利兹','Belize',17.2,-88.5], ['CR','哥斯达黎加','Costa Rica',9.9,-84.1],
    ['SV','萨尔瓦多','El Salvador',13.8,-88.9], ['GT','危地马拉','Guatemala',15.7,-90.3],
    ['HN','洪都拉斯','Honduras',14.8,-86.6], ['MX','墨西哥','Mexico',23.6,-102.5],
    ['NI','尼加拉瓜','Nicaragua',12.9,-85.2], ['PA','巴拿马','Panama',8.5,-80.1],
  ],
  '加勒比': [
    ['AG','安提瓜和巴布达','Antigua and Barbuda',17.1,-61.8], ['AI','安圭拉','Anguilla',18.2,-63.1],
    ['AW','阿鲁巴','Aruba',12.5,-69.97], ['BS','巴哈马','Bahamas',25.0,-77.4],
    ['BB','巴巴多斯','Barbados',13.2,-59.5], ['BQ','博奈尔','Bonaire',12.2,-68.3],
    ['CU','古巴','Cuba',21.5,-79.5], ['CW','库拉索','Curaçao',12.2,-69.0],
    ['DM','多米尼克','Dominica',15.4,-61.4], ['DO','多米尼加','Dominican Republic',18.7,-70.2],
    ['GD','格林纳达','Grenada',12.1,-61.7], ['GP','瓜德罗普','Guadeloupe',16.2,-61.6],
    ['HT','海地','Haiti',19.0,-72.3], ['JM','牙买加','Jamaica',18.1,-77.3],
    ['KN','圣基茨和尼维斯','Saint Kitts and Nevis',17.3,-62.7], ['LC','圣卢西亚','Saint Lucia',13.9,-61.0],
    ['MF','法属圣马丁','Saint Martin',18.08,-63.05], ['MQ','马提尼克','Martinique',14.6,-61.0],
    ['MS','蒙特塞拉特','Montserrat',16.7,-62.2], ['PR','波多黎各','Puerto Rico',18.2,-66.5],
    ['SX','荷属圣马丁','Sint Maarten',18.04,-63.06], ['TT','特立尼达和多巴哥','Trinidad and Tobago',10.7,-61.2],
    ['VC','圣文森特和格林纳丁斯','Saint Vincent and the Grenadines',13.0,-61.2],
    ['VI','美属维尔京群岛','U.S. Virgin Islands',18.3,-64.9],
  ],
  '南美': [
    ['AR','阿根廷','Argentina',-38.4,-63.6], ['BO','玻利维亚','Bolivia',-16.3,-63.6],
    ['BR','巴西','Brazil',-10.8,-52.9], ['CL','智利','Chile',-35.7,-71.5],
    ['CO','哥伦比亚','Colombia',4.1,-72.9], ['EC','厄瓜多尔','Ecuador',-1.4,-78.2],
    ['FK','福克兰群岛','Falkland Islands',-51.8,-59.5], ['GF','法属圭亚那','French Guiana',4.0,-53.0],
    ['GY','圭亚那','Guyana',4.9,-58.9], ['PY','巴拉圭','Paraguay',-23.4,-58.4],
    ['PE','秘鲁','Peru',-9.2,-75.0], ['SR','苏里南','Suriname',4.0,-56.0],
    ['UY','乌拉圭','Uruguay',-32.8,-56.0], ['VE','委内瑞拉','Venezuela',6.4,-66.6],
    ['GS','南乔治亚和南桑威奇群岛','South Georgia and the South Sandwich Islands',-54.5,-37.0],
  ],
  '澳新': [
    ['AU','澳大利亚','Australia',-25.7,134.5], ['NZ','新西兰','New Zealand',-41.8,174.0],
    ['NF','诺福克岛','Norfolk Island',-29.04,167.95], ['CX','圣诞岛','Christmas Island',-10.49,105.6],
    ['CC','科科斯群岛','Cocos (Keeling) Islands',-12.17,96.83],
  ],
  '美拉尼西亚': [
    ['FJ','斐济','Fiji',-17.7,178.0], ['NC','新喀里多尼亚','New Caledonia',-21.3,165.5],
    ['PG','巴布亚新几内亚','Papua New Guinea',-6.5,145.0], ['SB','所罗门群岛','Solomon Islands',-9.6,160.2],
    ['VU','瓦努阿图','Vanuatu',-16.0,167.5],
  ],
  '密克罗尼西亚': [
    ['FM','密克罗尼西亚联邦','Micronesia',6.9,158.2], ['GU','关岛','Guam',13.45,144.78],
    ['KI','基里巴斯','Kiribati',1.9,-157.4], ['MH','马绍尔群岛','Marshall Islands',7.1,171.2],
    ['MP','北马里亚纳群岛','Northern Mariana Islands',15.2,145.7], ['NR','瑙鲁','Nauru',-0.52,166.93],
    ['PW','帕劳','Palau',7.5,134.6],
  ],
  '波利尼西亚': [
    ['CK','库克群岛','Cook Islands',-21.2,-159.8], ['PF','法属波利尼西亚','French Polynesia',-17.7,-149.4],
    ['NU','纽埃','Niue',-19.05,-169.87], ['PN','皮特凯恩群岛','Pitcairn Islands',-24.4,-128.3],
    ['TK','托克劳','Tokelau',-9.2,-171.8], ['TO','汤加','Tonga',-21.2,-175.2],
    ['TV','图瓦卢','Tuvalu',-7.5,178.0], ['WS','萨摩亚','Samoa',-13.8,-172.1],
  ],
};

// Northern America — continent-level bucket (subregion '' so it matches how the
// notes attach US/Canada directly to the 北美洲 continent).
const NORTH_AMERICA = [
  ['US','美国','United States',39.8,-98.6], ['CA','加拿大','Canada',56.1,-106.3],
  ['GL','格陵兰','Greenland',71.7,-42.6], ['BM','百慕大','Bermuda',32.3,-64.75],
  ['PM','圣皮埃尔和密克隆','Saint Pierre and Miquelon',46.9,-56.3],
];

function flag(iso) { return `https://flagcdn.com/w320/${iso.toLowerCase()}.png`; }

const COUNTRIES = {};
for (const [sub, list] of Object.entries(BY_SUB)) {
  const cont = SUB_TO_CONT[sub];
  for (const [iso, zh, en, lat, lon] of list) {
    COUNTRIES[iso] = { zh, en, lat, lon, subregion: sub, continent: cont, flag: flag(iso) };
  }
}
for (const [iso, zh, en, lat, lon] of NORTH_AMERICA) {
  COUNTRIES[iso] = { zh, en, lat, lon, subregion: '', continent: '北美洲', flag: flag(iso) };
}

module.exports = { COUNTRIES, SUB_TO_CONT };
