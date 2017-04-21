//---------------------------------------------------------------------------------------
//  0----------> X        
//  |"HAAI"
//  |"HAAI"
//  |"JBBK"
//  |"JOPK"
//  |"Q@@R"
//  V
//  Y
//
// normal block = A..[
// empty  block = @
//---------------------------------------------------------------------------------------
//Block Shapes:
// @, AA BB CC DD EE FF GG  H  I  J  K  L  M  N  O  P  Q  R  S  T  U  V  W  X  Y  Z  [
//    AA                    H  I  J  K  L  M
//---------------------------------------------------------------------------------------

//==============================================================
// Below table extract from http://fayaa.com/youxi/hrd/
//==============================================================
var initBoardFayaa = [
	{
		level: 1,
		name: "橫刀立馬",
		mini: 81,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/1/",
		board:
			"HAAI" +
			"HAAI" +
			"JBBK" +
			"JNOK" +
			"P@@Q",
		empty: 2
	},
	{
		level: 2,
		name: "指揮若定",
		mini: 70,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/2/",
		board:
			"HAAI" +
			"HAAI" +
			"NBBO" +
			"JPQK" +
			"J@@K",
		empty: 2
	},
	{
		level: 3,
		name: "將擁曹營",
		mini: 72,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/3/",
		board:
			"@AA@" +
			"HAAI" +
			"HJKI" +
			"NJKO" +
			"BBPQ",
		empty: 2
	},
	{
		level: 4,
		name: "齊頭並進",
		mini: 60,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/4/",
		board:
			"HAAI" +
			"HAAI" +
			"NOPQ" +
			"JBBK" +
			"J@@K",
		empty: 2
	},
	{
		level: 5,
		name: "兵分三路",
		mini: 72,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/5/",
		board:
			"NAAO" +
			"HAAI" +
			"HBBI" +
			"JPQK" +
			"J@@K",
		empty: 2
	},
	{
		level: 6,
		name: "雨聲淅瀝",
		mini: 47,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/6/",
		board:
			"HAAN" +
			"HAAO" +
			"IBBJ" +
			"IK@J" +
			"PK@Q",
		empty: 2
	},
	{
		level: 7,
		name: "左右佈兵",
		mini: 54,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/7/",
		board:
			"NAAO" +
			"PAAQ" +
			"HIJK" +
			"HIJK" +
			"@BB@",
		empty: 2
	},
	{
		level: 8,
		name: "桃花園中",
		mini: 70,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/8/",
		board:
			"NAAO" +
			"HAAI" +
			"HJKI" +
			"PJKQ" +
			"@BB@",
		empty: 2
	},
	{
		level: 9,
		name: "一路進軍",
		mini: 58,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/9/",
		board:
			"HAAN" +
			"HAAO" +
			"IJKP" +
			"IJKQ" +
			"@BB@",
		empty: 2
	},
	{
		level: 10,
		name: "一路順風",
		mini: 39,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/10/",
		board:
			"HAAN" +
			"HAAO" +
			"IBBJ" +
			"IPKJ" +
			"@QK@",
		empty: 2
	},
	{
		level: 11,
		name: "圍而不殲",
		mini: 62,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/11/",
		board:
			"HAAN" +
			"HAAO" +
			"IBBP" +
			"IJKQ" +
			"@JK@",
		empty: 2
	},
	{
		level: 12,
		name: "捷足先登",
		mini: 32,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/12/",
		board:
			"NAAO" +
			"PAAQ" +
			"@BB@" +
			"HIJK" +
			"HIJK",
		empty: 2
	},
	{
		level: 13,
		name: "插翅難飛",
		mini: 62,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/13/",
		board:
			"HAAN" +
			"HAAO" +
			"BBPQ" +
			"ICCJ" +
			"I@@J",
		empty: 2
	},
	{
		level: 14,
		name: "守口如瓶1",
		mini: 81,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/14/",
		board:
			"HAAI" +
			"HAAI" +
			"NJ@O" +
			"PJ@Q" +
			"BBCC",
		empty: 2
	},
	{
		level: 15,
		name: "守口如瓶2",
		mini: 99,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/15/",
		board:
			"NAAO" +
			"HAAI" +
			"HJ@I" +
			"PJ@Q" +
			"BBCC",
		empty: 2
	},
	{
		level: 16,
		name: "雙將擋路",
		mini: 73,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/16/",
		board:
			"HAAN" +
			"HAAO" +
			"IBBJ" +
			"ICCJ" +
			"P@@Q",
		empty: 2
	},
	{
		level: 17,
		name: "橫馬當關",
		mini: 83,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/17/",
		board:
			"HAAI" +
			"HAAI" +
			"BBCC" +
			"NJ@O" +
			"PJ@Q",
		empty: 2
	},
	{
		level: 18,
		name: "層層設防1",
		mini: 102,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/18/",
		board:
			"HAAI" +
			"HAAI" +
			"NBBO" +
			"PCCQ" +
			"@DD@",
		empty: 2
	},
	{
		level: 19,
		name: "層層設防2",
		mini: 120,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/19/",
		board:
			"NAAO" +
			"HAAI" +
			"HBBI" +
			"PCCQ" +
			"@DD@",
		empty: 2
	},
	{
		level: 20,
		name: "兵擋將阻",
		mini: 87,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/20/",
		board:
			"NAAH" +
			"OAAH" +
			"IBBP" +
			"ICCQ" +
			"@DD@",
		empty: 2
	},
	{
		level: 21,
		name: "堵塞要道",
		mini: 40,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/21/",
		board:
			"NAAO" +
			"PAAQ" +
			"HIBB" +
			"HICC" +
			"@DD@",
		empty: 2
	},
	{
		level: 22,
		name: "甕中之鼈",
		mini: 103,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/22/",
		board:
			"HAAI" +
			"HAAI" +
			"BBCC" +
			"NDDO" +
			"P@@Q",
		empty: 2
	},
	{
		level: 23,
		name: "層巒疊嶂",
		mini: 98,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/23/",
		board:
			"HAAI" +
			"HAAI" +
			"NBBO" +
			"CCDD" +
			"P@@Q",
		empty: 2
	},
	{
		level: 24,
		name: "水泄不通",
		mini: 79,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/24/",
		board:
			"HAAN" +
			"HAAO" +
			"BBCC" +
			"DDEE" +
			"P@@Q",
		empty: 2
	},
	{
		level: 25,
		name: "四路進兵",
		mini: 77,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/25/",
		board:
			"NAAO" +
			"PAAQ" +
			"H@BB" +
			"H@CC" +
			"DDEE",
		empty: 2
	},
	{
		level: 26,
		name: "入地無門",
		mini: 87,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/26/",
		board:
			"HAAN" +
			"HAAO" +
			"PBBQ" +
			"CCDD" +
			"@EE@",
		empty: 2
	},
	{
		level: 27,
		name: "勇闖五關",
		mini: 34,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/27/",
		board:
			"NAAO" +
			"PAAQ" +
			"BBCC" +
			"DDEE" +
			"@FF@",
		empty: 2
	},
	{
		level: 28,
		name: "一橫最難解的佈局",
		mini: 84,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/28/",
		board:
			"HAAN" +
			"HAAI" +
			"BBJI" +
			"KOJP" +
			"K@@Q",
		empty: 2
	},
	{
		level: 29,
		name: "一橫最容易解的佈局1",
		mini: 32,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/29/",
		board:
			"NAAO" +
			"PAAQ" +
			"@BB@" +
			"HIJK" +
			"HIJK",
		empty: 2
	},
	{
		level: 30,
		name: "一橫最容易解的佈局2",
		mini: 32,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/30/",
		board:
			"NAAO" +
			"HAAI" +
			"HPQI" +
			"JBBK" +
			"J@@K",
		empty: 2
	},
	{
		level: 31,
		name: "二橫最難解的佈局",
		mini: 103,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/31/",
		board:
			"NAAH" +
			"OAAH" +
			"BBIJ" +
			"PQIJ" +
			"@CC@",
		empty: 2
	},
	{
		level: 32,
		name: "二橫最容易解的佈局",
		mini: 56,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/32/",
		board:
			"NAAH" +
			"OAAH" +
			"IJBB" +
			"IJPQ" +
			"@CC@",
		empty: 2
	},
	{
		level: 33,
		name: "三橫最難解的佈局",
		mini: 120,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/33/",
		board:
			"NAAO" +
			"HAAI" +
			"HBBI" +
			"PCCQ" +
			"@DD@",
		empty: 2
	},
	{
		level: 34,
		name: "三橫最容易解的佈局",
		mini: 40,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/34/",
		board:
			"NAAO" +
			"PAAQ" +
			"HIBB" +
			"HICC" +
			"@DD@",
		empty: 2
	},
	{
		level: 35,
		name: "四橫最難解的佈局",
		mini: 87,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/35/",
		board:
			"HAAN" +
			"HAAO" +
			"PBBQ" +
			"CCDD" +
			"@EE@",
		empty: 2
	},
	{
		level: 36,
		name: "四橫最易解的佈局",
		mini: 69,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/36/",
		board:
			"NAAO" +
			"HAAP" +
			"HQBB" +
			"CCDD" +
			"@EE@",
		empty: 2
	},
	{
		level: 37,
		name: "亂石崩雲",
		mini: 84,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/37/",
		board:
			"NAAH" +
			"IAAH" +
			"IJBB" +
			"OJPK" +
			"Q@@K",
		empty: 2
	},
	{
		level: 38,
		name: "背水列陣",
		mini: 54,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/38/",
		board:
			"HBBI" +
			"HNOI" +
			"@AA@" +
			"PAAQ" +
			"CCDD",
		empty: 2
	},
	{
		level: 39,
		name: "四面楚歌",
		mini: 56,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/39/",
		board:
			"HNOI" +
			"HAAI" +
			"PAAJ" +
			"KBBJ" +
			"K@@Q",
		empty: 2
	},
	{
		level: 40,
		name: "前呼後擁",
		mini: 22,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/40/",
		board:
			"NOAA" +
			"BBAA" +
			"CCDD" +
			"EEFF" +
			"@@PQ",
		empty: 2
	},
	{
		level: 41,
		name: "兵臨曹營",
		mini: 34,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/41/",
		board:
			"NAAO" +
			"PAAQ" +
			"HBBI" +
			"HJKI" +
			"@JK@",
		empty: 2
	},
	{
		level: 42,
		name: "五將逼宮",
		mini: 36,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/42/",
		board:
			"BBCC" +
			"HAAI" +
			"HAAI" +
			"NDDO" +
			"P@@Q",
		empty: 2
	},
	{
		level: 43,
		name: "雲遮霧障",
		mini: 81,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/43/",
		board:
			"HAAI" +
			"HAAI" +
			"JBBN" +
			"JCCO" +
			"P@@Q",
		empty: 2
	},
	{
		level: 44,
		name: "iPhone關卡1",
		mini: 38,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/44/",
		board:
			"HAAI" +
			"HAAI" +
			"NOPQ" +
			"RBBS" +
			"T@@U",
		empty: 2
	},
	{
		level: 45,
		name: "三軍聯防",
		mini: 65,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/45/",
		board:
			"AAHI" +
			"AAHI" +
			"BBCC" +
			"NDDO" +
			"P@@Q",
		empty: 2
	},
	{
		level: 46,
		name: "前擋後阻",
		mini: 42,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/46/",
		board:
			"AABB" +
			"AAHN" +
			"IJHO" +
			"IJPQ" +
			"@CC@",
		empty: 2
	},
	{
		level: 47,
		name: "近在咫尺",
		mini: 98,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/47/",
		board:
			"NHIJ" +
			"OHIJ" +
			"BBPQ" +
			"CCAA" +
			"@@AA",
		empty: 2
	},
	{
		level: 48,
		name: "走投無路",
		mini: 0,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/48/",
		board:
			"HAAI" +
			"HAAI" +
			"JKNL" +
			"JKOL" +
			"P@@Q",
		empty: 2
	},
	{
		level: 49,
		name: "小燕出巢",
		mini: 103,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/49/",
		board:
			"HAAI" +
			"HAAI" +
			"BBCC" +
			"NDDO" +
			"P@@Q",
		empty: 2
	},
	{
		level: 50,
		name: "比翼橫空",
		mini: 28,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/50/",
		board:
			"BBAA" +
			"CCAA" +
			"DDEE" +
			"N@OH" +
			"P@QH",
		empty: 2
	},
	{
		level: 51,
		name: "夾道藏兵",
		mini: 75,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/51/",
		board:
			"AANH" +
			"AAOH" +
			"BBCC" +
			"DDEE" +
			"P@@Q",
		empty: 2
	},
	{
		level: 52,
		name: "屯兵東路",
		mini: 71,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/52/",
		board:
			"AAHI" +
			"AAHI" +
			"BBNO" +
			"JKPQ" +
			"JK@@",
		empty: 2
	},
	{
		level: 53,
		name: "四將連關",
		mini: 39,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/53/",
		board:
			"AABB" +
			"AACC" +
			"HIDD" +
			"HINO" +
			"P@@Q",
		empty: 2
	},
	{
		level: 54,
		name: "近在咫尺2",
		mini: 105,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/54/",
		board:
			"HINO" +
			"HIJP" +
			"BBJQ" +
			"CCAA" +
			"@@AA",
		empty: 2
	},
	{
		level: 55,
		name: "峰迴路轉",
		mini: 138,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/55/",
		board:
			"NOPH" +
			"AAIH" +
			"AAIJ" +
			"@BBJ" +
			"@QCC",
		empty: 2
	},
	{
		level: 56,
		name: "井底之蛙",
		mini: 68,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/56/",
		board:
			"NBBO" +
			"HAAI" +
			"HAAI" +
			"PCCQ" +
			"@DD@",
		empty: 2
	},
	{
		level: 57,
		name: "插翅難飛2",
		mini: 63,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/57/",
		board:
			"NBBO" +
			"HAAI" +
			"HAAI" +
			"P@@Q" +
			"CCDD",
		empty: 2
	},
	{
		level: 58,
		name: "似遠實近",
		mini: 15,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/58/",
		board:
			"AABB" +
			"AACC" +
			"@@NO" +
			"HIPJ" +
			"HIQJ",
		empty: 2
	},
	{
		level: 59,
		name: "近在咫尺3",
		mini: 105,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/59/",
		board:
			"@HNO" +
			"IHJP" +
			"IQJ@" +
			"BBAA" +
			"CCAA",
		empty: 2
	},
	{
		level: 60,
		name: "五橫最難的開局",
		mini: 56,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/60/",
		board:
			"AANO" +
			"AABB" +
			"CCDD" +
			"PEE@" +
			"FFQ@",
		empty: 2
	},
	{
		level: 61,
		name: "小兵探路",
		mini: 135,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/61/",
		board:
			"AANH" +
			"AA@H" +
			"@IBB" +
			"OICC" +
			"PQDD",
		empty: 2
	},
	{
		level: 62,
		name: "前後夾攻",
		mini: 112,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/62/",
		board:
			"@HNI" +
			"OH@I" +
			"JPAA" +
			"JQAA" +
			"BBCC",
		empty: 2
	},
	{
		level: 63,
		name: "單兵種的沒落",
		mini: 19,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/63/",
		board:
			"HINO" +
			"HIJK" +
			"AAJK" +
			"AALP" +
			"@QL@",
		empty: 2
	},
	{
		level: 64,
		name: "欲罷不能",
		mini: 93,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/64/",
		board:
			"@AAH" +
			"NAAH" +
			"IBBJ" +
			"IK@J" +
			"OKPQ",
		empty: 2
	},
	{
		level: 65,
		name: "橫行之將",
		mini: 97,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/65/",
		board:
			"AANO" +
			"AABB" +
			"CCP@" +
			"QHDD" +
			"@HEE",
		empty: 2
	},
	{
		level: 66,
		name: "列隊歡送",
		mini: 102,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/66/",
		board:
			"HIJN" +
			"HIJO" +
			"BBPQ" +
			"CCAA" +
			"@@AA",
		empty: 2
	},
	{
		level: 67,
		name: "列隊歡送2",
		mini: 99,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/67/",
		board:
			"@HIJ" +
			"@HIJ" +
			"NOPQ" +
			"AABB" +
			"AACC",
		empty: 2
	},
	{
		level: 68,
		name: "百花盛開",
		mini: 100,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/68/",
		board:
			"HINJ" +
			"HIOJ" +
			"@@PQ" +
			"BBAA" +
			"CCAA",
		empty: 2
	},
	{
		level: 69,
		name: "行百里者半九十",
		mini: 90,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/69/",
		board:
			"BBHN" +
			"OPHI" +
			"@AAI" +
			"QAAJ" +
			"CC@J",
		empty: 2
	},
	{
		level: 70,
		name: "小汽車",
		mini: 109,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/70/",
		board:
			"HNO@" +
			"HIAA" +
			"@IAA" +
			"JPBB" +
			"JCCQ",
		empty: 2
	},
	{
		level: 71,
		name: "單身的小兵",
		mini: 111,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/71/",
		board:
			"@NHO" +
			"AAHI" +
			"AAPI" +
			"QBBJ" +
			"@CCJ",
		empty: 2
	},
	{
		level: 72,
		name: "以退為進",
		mini: 99,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/72/",
		board:
			"@NOP" +
			"AAHI" +
			"AAHI" +
			"BBJQ" +
			"CCJ@",
		empty: 2
	},
	{
		level: 73,
		name: "一字長蛇陣",
		mini: 50,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/73/",
		board:
			"@AAN" +
			"HAAO" +
			"HPBB" +
			"IQCC" +
			"I@DD",
		empty: 2
	},
	{
		level: 74,
		name: "一字長蛇陣2",
		mini: 50,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/74/",
		board:
			"AANO" +
			"AAHP" +
			"BBHQ" +
			"CCI@" +
			"DDI@",
		empty: 2
	},
	{
		level: 75,
		name: "擾敵之策",
		mini: 49,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/75/",
		board:
			"@AAN" +
			"@AAO" +
			"PQHI" +
			"JKHI" +
			"JKBB",
		empty: 2
	},
	{
		level: 76,
		name: "左兵右將",
		mini: 74,
		user: "ythqy",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/76/",
		board:
			"AAHI" +
			"AAHI" +
			"NOBB" +
			"PQJK" +
			"@@JK",
		empty: 2
	},
	{
		level: 77,
		name: "星羅棋佈",
		mini: 50,
		user: "ythqy",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/77/",
		board:
			"NBBO" +
			"HCCI" +
			"HAAI" +
			"PAAQ" +
			"@DD@",
		empty: 2
	},
	{
		level: 78,
		name: "虛與委蛇",
		mini: 131,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/78/",
		board:
			"AANH" +
			"AA@H" +
			"O@BB" +
			"PICC" +
			"QIDD",
		empty: 2
	},
	{
		level: 79,
		name: "虛與委蛇2",
		mini: 128,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/79/",
		board:
			"AANO" +
			"AAPH" +
			"@@IH" +
			"BBIJ" +
			"QCCJ",
		empty: 2
	},
	{
		level: 80,
		name: "層層設防3",
		mini: 69,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/80/",
		board:
			"NAAH" +
			"OAAH" +
			"PBBI" +
			"QCCI" +
			"@DD@",
		empty: 2
	},
	{
		level: 81,
		name: "獎盃",
		mini: 40,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/81/",
		board:
			"BBCC" +
			"HAAI" +
			"HAAI" +
			"@DD@" +
			"NOPQ",
		empty: 2
	},
	{
		level: 82,
		name: "氣勢洶洶",
		mini: 41,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/82/",
		board:
			"BBAA" +
			"CCAA" +
			"DDHI" +
			"@@HI" +
			"NOPQ",
		empty: 2
	},
	{
		level: 83,
		name: "近在咫尺4",
		mini: 22,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/83/",
		board:
			"HINO" +
			"HIPQ" +
			"JKBB" +
			"JKAA" +
			"@@AA",
		empty: 2
	},
	{
		level: 84,
		name: "數位系列: 0",
		mini: 102,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/84/",
		board:
			"NAAO" +
			"HAAP" +
			"H@@I" +
			"QBBI" +
			"CCDD",
		empty: 2
	},
	{
		level: 85,
		name: "數位系列: 1",
		mini: 131,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/85/",
		board:
			"@NO@" +
			"AAPH" +
			"AAIH" +
			"BBIJ" +
			"QCCJ",
		empty: 2
	},
	{
		level: 86,
		name: "數位系列: 2",
		mini: 121,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/86/",
		board:
			"NAAO" +
			"@AAH" +
			"IBBH" +
			"ICC@" +
			"PDDQ",
		empty: 2
	},
	{
		level: 87,
		name: "數位系列: 3",
		mini: 126,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/87/",
		board:
			"NAAO" +
			"@AAH" +
			"PBBH" +
			"@ICC" +
			"QIDD",
		empty: 2
	},
	{
		level: 88,
		name: "數位系列: 4",
		mini: 133,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/88/",
		board:
			"H@AA" +
			"HNAA" +
			"BBIO" +
			"CCIP" +
			"@DDQ",
		empty: 2
	},
	{
		level: 89,
		name: "數位系列: 5",
		mini: 121,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/89/",
		board:
			"NAAO" +
			"HAA@" +
			"HBBI" +
			"@CCI" +
			"PDDQ",
		empty: 2
	},
	{
		level: 90,
		name: "數位系列: 6",
		mini: 106,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/90/",
		board:
			"AAHN" +
			"AAH@" +
			"OPBB" +
			"I@CC" +
			"IDDQ",
		empty: 2
	},
	{
		level: 91,
		name: "數位系列: 7",
		mini: 126,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/91/",
		board:
			"AANO" +
			"AAPH" +
			"BBIH" +
			"@QIJ" +
			"@CCJ",
		empty: 2
	},
	{
		level: 92,
		name: "數位系列: 8",
		mini: 99,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/92/",
		board:
			"HNOI" +
			"H@PI" +
			"JQAA" +
			"J@AA" +
			"BBCC",
		empty: 2
	},
	{
		level: 93,
		name: "數位系列: 9",
		mini: 130,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/93/",
		board:
			"HNAA" +
			"H@AA" +
			"BBOP" +
			"@CCI" +
			"QDDI",
		empty: 2
	},
	{
		level: 94,
		name: "窮途末路",
		mini: 90,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/94/",
		board:
			"AA@@" +
			"AANH" +
			"OPQH" +
			"BBIJ" +
			"CCIJ",
		empty: 2
	},
	{
		level: 95,
		name: "砝碼",
		mini: 61,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/95/",
		board:
			"NOPQ" +
			"@BB@" +
			"HAAI" +
			"HAAI" +
			"CCDD",
		empty: 2
	},
	{
		level: 96,
		name: "瓊瑤敲碎",
		mini: 125,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/96/",
		board:
			"@AAN" +
			"OAAH" +
			"BB@H" +
			"IPCC" +
			"IDDQ",
		empty: 2
	},
	{
		level: 97,
		name: "馮京馬涼",
		mini: 122,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/97/",
		board:
			"AA@N" +
			"AAOP" +
			"HQBB" +
			"HCCI" +
			"DD@I",
		empty: 2
	},
	{
		level: 98,
		name: "馮京馬涼2",
		mini: 109,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/98/",
		board:
			"NAAO" +
			"@AAP" +
			"H@BB" +
			"HCCI" +
			"DDQI",
		empty: 2
	},
	{
		level: 99,
		name: "花車",
		mini: 106,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/99/",
		board:
			"@AA@" +
			"HAAI" +
			"HBBI" +
			"CCDD" +
			"NOPQ",
		empty: 2
	},
	{
		level: 100,
		name: "離而不坎",
		mini: 104,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/100/",
		board:
			"HAAI" +
			"HAAI" +
			"BB@N" +
			"OPCC" +
			"DD@Q",
		empty: 2
	},
	{
		level: 101,
		name: "孤雁南飛",
		mini: 101,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/101/",
		board:
			"HAAI" +
			"HAAI" +
			"NOBB" +
			"PCC@" +
			"DD@Q",
		empty: 2
	},
	{
		level: 102,
		name: "高廈一零一",
		mini: 101,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/102/",
		board:
			"AAHN" +
			"AAHO" +
			"IBBP" +
			"ICCQ" +
			"@DD@",
		empty: 2
	},
	{
		level: 103,
		name: "暗渡陳倉",
		mini: 99,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/103/",
		board:
			"NOPH" +
			"IAAH" +
			"IAAQ" +
			"BBCC" +
			"@DD@",
		empty: 2
	},
	{
		level: 104,
		name: "困於赤紱",
		mini: 95,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/104/",
		board:
			"H@NI" +
			"HAAI" +
			"OAA@" +
			"BBCC" +
			"PQDD",
		empty: 2
	},
	{
		level: 105,
		name: "大渡橋橫鐵索寒",
		mini: 88,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/105/",
		board:
			"@AA@" +
			"HAAN" +
			"HBBO" +
			"PCCI" +
			"QDDI",
		empty: 2
	},
	{
		level: 106,
		name: "魚游春水",
		mini: 94,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/106/",
		board:
			"AAN@" +
			"AAOP" +
			"HQBB" +
			"HCC@" +
			"DDEE",
		empty: 2
	},
	{
		level: 107,
		name: "古堡藏龍",
		mini: 100,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/107/",
		board:
			"NOHI" +
			"PQHI" +
			"AA@J" +
			"AA@J" +
			"BBCC",
		empty: 2
	},
	{
		level: 108,
		name: "歧路亡羊",
		mini: 94,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/108/",
		board:
			"NHAA" +
			"OHAA" +
			"BBIP" +
			"CCIJ" +
			"Q@@J",
		empty: 2
	},
	{
		level: 109,
		name: "陳兵西陲",
		mini: 107,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/109/",
		board:
			"NAAH" +
			"OAAH" +
			"PBBI" +
			"Q@JI" +
			"CCJ@",
		empty: 2
	},
	{
		level: 110,
		name: "水滸聚義",
		mini: 108,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/110/",
		board:
			"HNIJ" +
			"H@IJ" +
			"@AAO" +
			"PAAQ" +
			"BBCC",
		empty: 2
	},
	{
		level: 111,
		name: "山在虛無縹緲間",
		mini: 107,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/111/",
		board:
			"NH@O" +
			"PH@Q" +
			"IAAJ" +
			"IAAJ" +
			"BBCC",
		empty: 2
	},
	{
		level: 112,
		name: "相看兩不厭",
		mini: 100,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/112/",
		board:
			"HI@J" +
			"HI@J" +
			"NAAO" +
			"PAAQ" +
			"BBCC",
		empty: 2
	},
	{
		level: 113,
		name: "互不相讓",
		mini: 62,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/113/",
		board:
			"HNBB" +
			"HAA@" +
			"OAAP" +
			"@CCQ" +
			"DDEE",
		empty: 2
	},
	{
		level: 114,
		name: "胡馬窺江",
		mini: 72,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/114/",
		board:
			"BB@H" +
			"@AAH" +
			"NAAO" +
			"CCDD" +
			"PEEQ",
		empty: 2
	},
	{
		level: 115,
		name: "馬首是瞻",
		mini: 73,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/115/",
		board:
			"BBNO" +
			"CCAA" +
			"PHAA" +
			"@HDD" +
			"EEQ@",
		empty: 2
	},
	{
		level: 116,
		name: "異地同心",
		mini: 81,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/116/",
		board:
			"BBNO" +
			"PHAA" +
			"@HAA" +
			"CCQ@" +
			"DDEE",
		empty: 2
	},
	{
		level: 117,
		name: "十八步",
		mini: 18,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/117/",
		board:
			"NAAO" +
			"PAAQ" +
			"RSTU" +
			"VWXY" +
			"Z@@[",
		empty: 2
	},
	{
		level: 118,
		name: "DAISY",
		mini: 28,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/118/",
		board:
			"HAAI" +
			"HAAI" +
			"NOPQ" +
			"RSTU" +
			"V@@W",
		empty: 2
	},
	{
		level: 119,
		name: "VIOLET",
		mini: 27,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/119/",
		board:
			"HAAI" +
			"HAAI" +
			"JNOP" +
			"JQRS" +
			"T@@U",
		empty: 2
	},
	{
		level: 120,
		name: "POPPY",
		mini: 40,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/120/",
		board:
			"HAAI" +
			"HAAI" +
			"NBBO" +
			"PQRS" +
			"T@@U",
		empty: 2
	},
	{
		level: 121,
		name: "PANSY",
		mini: 28,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/121/",
		board:
			"HAAI" +
			"HAAI" +
			"JNOK" +
			"JPQK" +
			"R@@S",
		empty: 2
	},
	{
		level: 122,
		name: "SNOWDROP",
		mini: 46,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/122/",
		board:
			"HAAI" +
			"HAAI" +
			"JBBN" +
			"JOPQ" +
			"R@@S",
		empty: 2
	},
	{
		level: 123,
		name: "四路進兵2",
		mini: 66,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/123/",
		board:
			"HAA@" +
			"HAA@" +
			"NOPQ" +
			"BBCC" +
			"DDEE",
		empty: 2
	},
	{
		level: 124,
		name: "數字系列4-2",
		mini: 135,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/124/",
		board:
			"N@OH" +
			"AAPH" +
			"AAIJ" +
			"BBIJ" +
			"@QCC",
		empty: 2
	},
	{
		level: 125,
		name: "四面八方",
		mini: 53,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/125/",
		board:
			"@BB@" +
			"NCCO" +
			"HAAI" +
			"HAAI" +
			"PDDQ",
		empty: 2
	},
	{
		level: 126,
		name: "牛氣沖天",
		mini: 54,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/126/",
		board:
			"N@@O" +
			"BBCC" +
			"HAAI" +
			"HAAI" +
			"PDDQ",
		empty: 2
	},
	{
		level: 127,
		name: "拳頭",
		mini: 109,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/127/",
		board:
			"NAAH" +
			"OAAH" +
			"PQBB" +
			"CCIJ" +
			"@@IJ",
		empty: 2
	},
	{
		level: 128,
		name: "匹馬嘶風",
		mini: 70,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/128/",
		board:
			"AANO" +
			"AAPQ" +
			"BB@@" +
			"HIJK" +
			"HIJK",
		empty: 2
	},
	{
		level: 129,
		name: "伏羲八卦:天天乾",
		mini: 53,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/129/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"DDEE" +
			"FFGG",
		empty: 2
	},
	{
		level: 130,
		name: "伏羲八卦:地地坤",
		mini: 18,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/130/",
		board:
			"HAA@" +
			"HAA@" +
			"NOPQ" +
			"RSTU" +
			"VWXY",
		empty: 2
	},
	{
		level: 131,
		name: "伏羲八卦:水水坎",
		mini: 26,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/131/",
		board:
			"HAA@" +
			"HAA@" +
			"NOPQ" +
			"BBCC" +
			"RSTU",
		empty: 2
	},
	{
		level: 132,
		name: "伏羲八卦:火火離",
		mini: 28,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/132/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"PQRS" +
			"DDEE",
		empty: 2
	},
	{
		level: 133,
		name: "伏羲八卦:雷雷震",
		mini: 30,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/133/",
		board:
			"@AA@" +
			"NAAO" +
			"PQRS" +
			"TUVW" +
			"BBCC",
		empty: 2
	},
	{
		level: 134,
		name: "伏羲八卦:山山艮",
		mini: 19,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/134/",
		board:
			"@@AA" +
			"BBAA" +
			"CCDD" +
			"NOPQ" +
			"RSTU",
		empty: 2
	},
	{
		level: 135,
		name: "伏羲八卦:風風巽",
		mini: 21,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/135/",
		board:
			"@@AA" +
			"BBAA" +
			"CCDD" +
			"EEFF" +
			"NOPQ",
		empty: 2
	},
	{
		level: 136,
		name: "伏羲八卦:澤澤兌",
		mini: 35,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/136/",
		board:
			"@AA@" +
			"NAAO" +
			"PQRS" +
			"BBCC" +
			"DDEE",
		empty: 2
	},
	{
		level: 137,
		name: "伏羲八卦:天地否",
		mini: 24,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/137/",
		board:
			"@@AA" +
			"BBAA" +
			"CCNO" +
			"DDPQ" +
			"EERS",
		empty: 2
	},
	{
		level: 138,
		name: "伏羲八卦:地天泰",
		mini: 82,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/138/",
		board:
			"@AA@" +
			"NAAO" +
			"PQBB" +
			"HICC" +
			"HIDD",
		empty: 2
	},
	{
		level: 139,
		name: "伏羲八卦:天水訟",
		mini: 79,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/139/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"CCDD" +
			"EEPQ",
		empty: 2
	},
	{
		level: 140,
		name: "伏羲八卦:火天大有",
		mini: 31,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/140/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"PQDD" +
			"EEFF",
		empty: 2
	},
	{
		level: 141,
		name: "伏羲八卦:天雷無妄",
		mini: 71,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/141/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"CCPQ" +
			"DDEE",
		empty: 2
	},
	{
		level: 142,
		name: "伏羲八卦:天山遯",
		mini: 86,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/142/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"DDHP" +
			"EEHQ",
		empty: 2
	},
	{
		level: 143,
		name: "伏羲八卦:山天大畜",
		mini: 28,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/143/",
		board:
			"@@AA" +
			"BBAA" +
			"CCDD" +
			"NOEE" +
			"PQFF",
		empty: 2
	},
	{
		level: 144,
		name: "伏羲八卦:風天小畜",
		mini: 28,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/144/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"DDEE" +
			"PQFF",
		empty: 2
	},
	{
		level: 145,
		name: "伏羲八卦:澤天夬",
		mini: 53,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/145/",
		board:
			"NAA@" +
			"OAA@" +
			"PQBB" +
			"CCDD" +
			"EEFF",
		empty: 2
	},
	{
		level: 146,
		name: "伏羲八卦:水地比",
		mini: 22,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/146/",
		board:
			"@@AA" +
			"BBAA" +
			"NOPQ" +
			"CCRS" +
			"TUVW",
		empty: 2
	},
	{
		level: 147,
		name: "伏羲八卦:地火明夷",
		mini: 99,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/147/",
		board:
			"HAA@" +
			"HAA@" +
			"NOBB" +
			"IJPQ" +
			"IJCC",
		empty: 2
	},
	{
		level: 148,
		name: "伏羲八卦:火地晉",
		mini: 34,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/148/",
		board:
			"@AA@" +
			"NAAO" +
			"BBPQ" +
			"RSTU" +
			"CCVW",
		empty: 2
	},
	{
		level: 149,
		name: "伏羲八卦:地雷複",
		mini: 28,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/149/",
		board:
			"@AA@" +
			"NAAO" +
			"PQRS" +
			"TUVW" +
			"XYBB",
		empty: 2
	},
	{
		level: 150,
		name: "伏羲八卦:雷地豫",
		mini: 62,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/150/",
		board:
			"@AA@" +
			"NAAO" +
			"HIJK" +
			"HIJK" +
			"BBPQ",
		empty: 2
	},
	{
		level: 151,
		name: "伏羲八卦:地山謙1",
		mini: 21,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/151/",
		board:
			"NAA@" +
			"OAA@" +
			"PQBB" +
			"RSTU" +
			"VWXY",
		empty: 2
	},
	{
		level: 152,
		name: "伏羲八卦:地山謙2",
		mini: 72,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/152/",
		board:
			"NAA@" +
			"OAA@" +
			"PQBB" +
			"HIJK" +
			"HIJK",
		empty: 2
	},
	{
		level: 153,
		name: "伏羲八卦:山地剝",
		mini: 20,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/153/",
		board:
			"@@AA" +
			"BBAA" +
			"CCNO" +
			"PQRS" +
			"TUVW",
		empty: 2
	},
	{
		level: 154,
		name: "伏羲八卦:地風升",
		mini: 100,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/154/",
		board:
			"HAA@" +
			"HAA@" +
			"NOBB" +
			"IJCC" +
			"IJPQ",
		empty: 2
	},
	{
		level: 155,
		name: "伏羲八卦:風地觀",
		mini: 22,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/155/",
		board:
			"@@AA" +
			"BBAA" +
			"CCNO" +
			"DDPQ" +
			"RSTU",
		empty: 2
	},
	{
		level: 156,
		name: "伏羲八卦:地澤臨",
		mini: 89,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/156/",
		board:
			"HAA@" +
			"HAA@" +
			"NOPQ" +
			"IJBB" +
			"IJCC",
		empty: 2
	},
	{
		level: 157,
		name: "伏羲八卦:澤地萃",
		mini: 27,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/157/",
		board:
			"HAA@" +
			"HAA@" +
			"NOPQ" +
			"BBRS" +
			"CCTU",
		empty: 2
	},
	{
		level: 158,
		name: "伏羲八卦:水火既濟",
		mini: 42,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/158/",
		board:
			"@AA@" +
			"NAAO" +
			"PQBB" +
			"CCRS" +
			"TUDD",
		empty: 2
	},
	{
		level: 159,
		name: "伏羲八卦:水雷屯",
		mini: 30,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/159/",
		board:
			"HAA@" +
			"HAA@" +
			"NOPQ" +
			"BBRS" +
			"TUCC",
		empty: 2
	},
	{
		level: 160,
		name: "伏羲八卦:雷水解",
		mini: 97,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/160/",
		board:
			"HAA@" +
			"HAA@" +
			"IJNO" +
			"IJBB" +
			"CCPQ",
		empty: 2
	},
	{
		level: 161,
		name: "伏羲八卦:水山蹇",
		mini: 32,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/161/",
		board:
			"HAA@" +
			"HAA@" +
			"NOBB" +
			"CCPQ" +
			"RSTU",
		empty: 2
	},
	{
		level: 162,
		name: "伏羲八卦:山水蒙",
		mini: 96,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/162/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"IJCC" +
			"IJPQ",
		empty: 2
	},
	{
		level: 163,
		name: "伏羲八卦:風水渙",
		mini: 39,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/163/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"CCDD" +
			"PQRS",
		empty: 2
	},
	{
		level: 164,
		name: "伏羲八卦:水澤節",
		mini: 24,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/164/",
		board:
			"NAA@" +
			"OAA@" +
			"PQRS" +
			"BBCC" +
			"TUDD",
		empty: 2
	},
	{
		level: 165,
		name: "伏羲八卦:火雷噬嗑",
		mini: 35,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/165/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"PQRS" +
			"CCDD",
		empty: 2
	},
	{
		level: 166,
		name: "伏羲八卦:火山旅",
		mini: 83,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/166/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"PQHI" +
			"DDHI",
		empty: 2
	},
	{
		level: 167,
		name: "伏羲八卦:山火賁",
		mini: 29,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/167/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"PQRS" +
			"TUDD",
		empty: 2
	},
	{
		level: 168,
		name: "伏羲八卦:風火家人",
		mini: 27,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/168/",
		board:
			"@@AA" +
			"BBAA" +
			"CCDD" +
			"EENO" +
			"PQFF",
		empty: 2
	},
	{
		level: 169,
		name: "伏羲八卦:火澤睽",
		mini: 73,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/169/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"PQCC" +
			"DDEE",
		empty: 2
	},
	{
		level: 170,
		name: "伏羲八卦:雷山小過",
		mini: 95,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/170/",
		board:
			"HAA@" +
			"HAA@" +
			"IJBB" +
			"IJNO" +
			"CCPQ",
		empty: 2
	},
	{
		level: 171,
		name: "伏羲八卦:山雷頤",
		mini: 108,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/171/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"IJPQ" +
			"IJCC",
		empty: 2
	},
	{
		level: 172,
		name: "伏羲八卦:雷風恒",
		mini: 42,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/172/",
		board:
			"@AA@" +
			"NAAO" +
			"PQBB" +
			"RSCC" +
			"DDTU",
		empty: 2
	},
	{
		level: 173,
		name: "伏羲八卦:風雷益",
		mini: 70,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/173/",
		board:
			"NAA@" +
			"OAA@" +
			"BBHI" +
			"CCHI" +
			"PQDD",
		empty: 2
	},
	{
		level: 174,
		name: "伏羲八卦:雷澤歸妹",
		mini: 32,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/174/",
		board:
			"HAA@" +
			"HAA@" +
			"NOPQ" +
			"RSBB" +
			"CCDD",
		empty: 2
	},
	{
		level: 175,
		name: "伏羲八卦:風山漸",
		mini: 19,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/175/",
		board:
			"@@AA" +
			"BBAA" +
			"CCDD" +
			"EENO" +
			"PQRS",
		empty: 2
	},
	{
		level: 176,
		name: "伏羲八卦:山澤損",
		mini: 40,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/176/",
		board:
			"@AA@" +
			"NAAO" +
			"BBPQ" +
			"RSCC" +
			"TUDD",
		empty: 2
	},
	{
		level: 177,
		name: "伏羲八卦:澤山鹹",
		mini: 85,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/177/",
		board:
			"@AA@" +
			"NAAO" +
			"PQBB" +
			"CCHI" +
			"DDHI",
		empty: 2
	},
	{
		level: 178,
		name: "伏羲八卦:風澤中孚",
		mini: 80,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/178/",
		board:
			"HAA@" +
			"HAA@" +
			"BBNO" +
			"CCDD" +
			"PQEE",
		empty: 2
	},
	{
		level: 179,
		name: "顛倒96(陰)",
		mini: 96,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/179/",
		board:
			"NBBH" +
			"OPIH" +
			"AAIJ" +
			"AA@J" +
			"@QCC",
		empty: 2
	},
	{
		level: 180,
		name: "顛倒96(陽)",
		mini: 96,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/180/",
		board:
			"@NBB" +
			"AA@H" +
			"AAIH" +
			"OPIJ" +
			"QCCJ",
		empty: 2
	},
	{
		level: 181,
		name: "獨闢蹊徑",
		mini: 88,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/181/",
		board:
			"AAN@" +
			"AAOP" +
			"HQBB" +
			"HICC" +
			"@IDD",
		empty: 2
	},
	{
		level: 182,
		name: "三羊開泰1",
		mini: 62,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/182/",
		board:
			"NAAO" +
			"PAAQ" +
			"HBBI" +
			"HCCI" +
			"@DD@",
		empty: 2
	},
	{
		level: 183,
		name: "三羊開泰2",
		mini: 90,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/183/",
		board:
			"NAAO" +
			"HAAI" +
			"HPQI" +
			"BBCC" +
			"@DD@",
		empty: 2
	},
	{
		level: 184,
		name: "三羊開泰3",
		mini: 100,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/184/",
		board:
			"NAAO" +
			"HAAI" +
			"HBBI" +
			"CCDD" +
			"@PQ@",
		empty: 2
	},
	{
		level: 185,
		name: "順時風車",
		mini: 87,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/185/",
		board:
			"AA@H" +
			"AANH" +
			"BBIO" +
			"J@IP" +
			"JCCQ",
		empty: 2
	},
	{
		level: 186,
		name: "逆時風車",
		mini: 77,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/186/",
		board:
			"AA@H" +
			"AA@H" +
			"IBBN" +
			"IOJP" +
			"CCJQ",
		empty: 2
	},
	{
		level: 187,
		name: "一橫定式A",
		mini: 45,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/187/",
		board:
			"HAAN" +
			"HAAO" +
			"IPJK" +
			"IQJK" +
			"@@BB",
		empty: 2
	},
	{
		level: 188,
		name: "一橫定式B",
		mini: 38,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/188/",
		board:
			"HAAN" +
			"HAAO" +
			"@@BB" +
			"IPJK" +
			"IQJK",
		empty: 2
	},
	{
		level: 189,
		name: "一橫定式C",
		mini: 40,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/189/",
		board:
			"AANH" +
			"AAOH" +
			"@@BB" +
			"PIJK" +
			"QIJK",
		empty: 2
	},
	{
		level: 190,
		name: "一橫定式D",
		mini: 42,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/190/",
		board:
			"AANO" +
			"AABB" +
			"@@PH" +
			"IJKH" +
			"IJKQ",
		empty: 2
	},
	{
		level: 191,
		name: "二橫定式A",
		mini: 51,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/191/",
		board:
			"AA@N" +
			"AA@O" +
			"HIBB" +
			"HIPJ" +
			"CCQJ",
		empty: 2
	},
	{
		level: 192,
		name: "二橫定式B",
		mini: 49,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/192/",
		board:
			"AA@N" +
			"AA@O" +
			"HPBB" +
			"HQIJ" +
			"CCIJ",
		empty: 2
	},
	{
		level: 193,
		name: "三橫定式A",
		mini: 65,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/193/",
		board:
			"AA@N" +
			"AA@O" +
			"HPBB" +
			"HCCI" +
			"DDQI",
		empty: 2
	},
	{
		level: 194,
		name: "三橫定式B",
		mini: 81,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/194/",
		board:
			"AA@N" +
			"AA@O" +
			"HPBB" +
			"HCCI" +
			"QDDI",
		empty: 2
	},
	{
		level: 195,
		name: "四橫定式A",
		mini: 53,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/195/",
		board:
			"NHOP" +
			"QH@@" +
			"BBAA" +
			"CCAA" +
			"DDEE",
		empty: 2
	},
	{
		level: 196,
		name: "四橫定式B",
		mini: 46,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/196/",
		board:
			"NOAA" +
			"BBAA" +
			"HPCC" +
			"HQDD" +
			"@@EE",
		empty: 2
	},
	{
		level: 197,
		name: "四橫定式C",
		mini: 44,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/197/",
		board:
			"BBAA" +
			"HNAA" +
			"HOCC" +
			"@PDD" +
			"@QEE",
		empty: 2
	},
	{
		level: 198,
		name: "四橫定式D",
		mini: 38,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/198/",
		board:
			"HNBB" +
			"HOPQ" +
			"CCAA" +
			"DDAA" +
			"EE@@",
		empty: 2
	},
	{
		level: 199,
		name: "四橫定式E",
		mini: 33,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/199/",
		board:
			"NOBB" +
			"CCAA" +
			"HPAA" +
			"HQDD" +
			"@@EE",
		empty: 2
	},
	{
		level: 200,
		name: "殊途同歸",
		mini: 76,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/200/",
		board:
			"HIAA" +
			"HIAA" +
			"N@O@" +
			"JBBK" +
			"JPQK",
		empty: 2
	},
	{
		level: 201,
		name: "勿入歧途",
		mini: 73,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/201/",
		board:
			"HAAI" +
			"HAAI" +
			"JNO@" +
			"JBBK" +
			"@PQK",
		empty: 2
	},
	{
		level: 202,
		name: "一夫當關",
		mini: 64,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/202/",
		board:
			"HIJK" +
			"HIJK" +
			"@AA@" +
			"NAAO" +
			"BBPQ",
		empty: 2
	},
	{
		level: 203,
		name: "節節高升",
		mini: 63,
		user: "ythqy",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/203/",
		board:
			"H@AA" +
			"HIAA" +
			"NIJ@" +
			"OPJK" +
			"BBQK",
		empty: 2
	},
	{
		level: 204,
		name: "六將之近在咫尺A",
		mini: 62,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/204/",
		board:
			"BBCC" +
			"HINO" +
			"HIDD" +
			"AAEE" +
			"AA@@",
		empty: 2
	},
	{
		level: 205,
		name: "六將之近在咫尺B",
		mini: 44,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/205/",
		board:
			"HBBI" +
			"HJKI" +
			"NJK@" +
			"AACC" +
			"AA@@",
		empty: 3
	},
	{
		level: 206,
		name: "六將之步步高1",
		mini: 63,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/206/",
		board:
			"AA@H" +
			"AAIH" +
			"NJI@" +
			"KJBB" +
			"KCC@",
		empty: 3
	},
	{
		level: 207,
		name: "六將之步步高2",
		mini: 72,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/207/",
		board:
			"AANH" +
			"AAIH" +
			"@JI@" +
			"KJBB" +
			"K@CC",
		empty: 3
	},
	{
		level: 208,
		name: "六將守關1",
		mini: 75,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/208/",
		board:
			"@@@N" +
			"AAHI" +
			"AAHI" +
			"JKBB" +
			"JKCC",
		empty: 3
	},
	{
		level: 209,
		name: "六將守關2",
		mini: 63,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/209/",
		board:
			"@@@H" +
			"AAIH" +
			"AAIN" +
			"JKBB" +
			"JKCC",
		empty: 3
	},
	{
		level: 210,
		name: "六將守關3",
		mini: 81,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/210/",
		board:
			"H@NI" +
			"HAAI" +
			"@AA@" +
			"JKBB" +
			"JKCC",
		empty: 3
	},
	{
		level: 211,
		name: "六將守關4",
		mini: 77,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/211/",
		board:
			"AA@@" +
			"AABB" +
			"NOHI" +
			"CCHI" +
			"DDEE",
		empty: 2
	},
	{
		level: 212,
		name: "六將守關5",
		mini: 86,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/212/",
		board:
			"@@@H" +
			"AAIH" +
			"AAIN" +
			"BBJK" +
			"CCJK",
		empty: 3
	},
	{
		level: 213,
		name: "六將守關6",
		mini: 62,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/213/",
		board:
			"@@@N" +
			"HAAI" +
			"HAAI" +
			"JBBK" +
			"JCCK",
		empty: 3
	},
	{
		level: 214,
		name: "六將守關7",
		mini: 76,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/214/",
		board:
			"H@@@" +
			"HAAI" +
			"NAAI" +
			"BBJK" +
			"CCJK",
		empty: 3
	},
	{
		level: 215,
		name: "六將之跋山涉水",
		mini: 92,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/215/",
		board:
			"@NHI" +
			"AAHI" +
			"AA@J" +
			"KBBJ" +
			"K@CC",
		empty: 3
	},
	{
		level: 216,
		name: "換離為兌",
		mini: 87,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/216/",
		board:
			"BBNO" +
			"CCAA" +
			"PQAA" +
			"DDHI" +
			"@@HI",
		empty: 2
	},
	{
		level: 217,
		name: "寓巧於拙",
		mini: 83,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/217/",
		board:
			"AANO" +
			"AABB" +
			"@CCP" +
			"HDDI" +
			"H@QI",
		empty: 2
	},
	{
		level: 218,
		name: "搖旗放曹",
		mini: 17,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/218/",
		board:
			"NAAO" +
			"PAAQ" +
			"HRSI" +
			"HTUI" +
			"V@@W",
		empty: 2
	},
	{
		level: 219,
		name: "輪回",
		mini: 58,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/219/",
		board:
			"HNBB" +
			"HAAO" +
			"PAAI" +
			"CCQI" +
			"@DD@",
		empty: 2
	},
	{
		level: 220,
		name: "殊途同歸I",
		mini: 63,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/220/",
		board:
			"AAHI" +
			"AAHI" +
			"@N@O" +
			"JKBB" +
			"JKPQ",
		empty: 2
	},
	{
		level: 221,
		name: "殊途同歸II",
		mini: 82,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/221/",
		board:
			"NAAH" +
			"IAAH" +
			"IJOP" +
			"QJ@@" +
			"BBCC",
		empty: 2
	},
	{
		level: 222,
		name: "殊途同歸III",
		mini: 91,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/222/",
		board:
			"HAAN" +
			"HAAI" +
			"BBOI" +
			"CC@@" +
			"PQDD",
		empty: 2
	},
	{
		level: 223,
		name: "殊途同歸IV",
		mini: 52,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/223/",
		board:
			"NOBB" +
			"PHAA" +
			"@HAA" +
			"@QCC" +
			"DDEE",
		empty: 2
	},
	{
		level: 224,
		name: "曹13",
		mini: 13,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/224/",
		board:
			"NAAO" +
			"PAAQ" +
			"H@@R" +
			"HSTI" +
			"UVWI",
		empty: 2
	},
	{
		level: 225,
		name: "百步歧形",
		mini: 100,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/225/",
		board:
			"@HIJ" +
			"NHIJ" +
			"@OPQ" +
			"AABB" +
			"AACC",
		empty: 2
	},
	{
		level: 226,
		name: "四兵同心",
		mini: 102,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/226/",
		board:
			"NOH@" +
			"PQHI" +
			"AAJI" +
			"AAJ@" +
			"BBCC",
		empty: 2
	},
	{
		level: 227,
		name: "生機盎然",
		mini: 116,
		user: "kk",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/227/",
		board:
			"AA@H" +
			"AANH" +
			"@OIP" +
			"BBIJ" +
			"CCQJ",
		empty: 2
	},
	{
		level: 228,
		name: "旭日東昇",
		mini: 18,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/228/",
		board:
			"NOPQ" +
			"RAAS" +
			"TAAU" +
			"VWXY" +
			"@BB@",
		empty: 2
	},
	{
		level: 229,
		name: "退一步海闊天空",
		mini: 13,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/229/",
		board:
			"NBBO" +
			"HAAI" +
			"HAAI" +
			"JPQK" +
			"J@@K",
		empty: 2
	},
	{
		level: 230,
		name: "三七二十一",
		mini: 21,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/230/",
		board:
			"NAAO" +
			"HAAI" +
			"HP@I" +
			"JQRK" +
			"J@SK",
		empty: 2
	},
	{
		level: 231,
		name: "高處不勝寒",
		mini: 92,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/231/",
		board:
			"@AA@" +
			"HAAI" +
			"HNOI" +
			"PBBQ" +
			"CCDD",
		empty: 2
	},
	{
		level: 232,
		name: "步步高3",
		mini: 97,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/232/",
		board:
			"AANH" +
			"AAIH" +
			"@OIJ" +
			"BBPJ" +
			"@CCQ",
		empty: 2
	},
	{
		level: 233,
		name: "換位思考",
		mini: 19,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/233/",
		board:
			"NAAO" +
			"HAAP" +
			"HQRS" +
			"ITUJ" +
			"I@@J",
		empty: 2
	},
	{
		level: 234,
		name: "水中倒影之實",
		mini: 69,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/234/",
		board:
			"@BBN" +
			"HAAO" +
			"HAA@" +
			"IJCC" +
			"IJPQ",
		empty: 2
	},
	{
		level: 235,
		name: "水中倒影之像",
		mini: 69,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/235/",
		board:
			"HINO" +
			"HIBB" +
			"JAA@" +
			"JAAP" +
			"@CCQ",
		empty: 2
	},
	{
		level: 236,
		name: "進退維谷",
		mini: 97,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/236/",
		board:
			"NO@P" +
			"AAHI" +
			"AAHI" +
			"BB@J" +
			"CCQJ",
		empty: 2
	},
	{
		level: 237,
		name: "不謀而合",
		mini: 99,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/237/",
		board:
			"NOH@" +
			"AAHP" +
			"AAIJ" +
			"BBIJ" +
			"CC@Q",
		empty: 2
	},
	{
		level: 238,
		name: "左右逢源",
		mini: 25,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/238/",
		board:
			"AABB" +
			"AANO" +
			"@PQ@" +
			"HIJK" +
			"HIJK",
		empty: 2
	},
	{
		level: 239,
		name: "進退自如",
		mini: 100,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/239/",
		board:
			"NHI@" +
			"OHIP" +
			"AAJQ" +
			"AAJ@" +
			"BBCC",
		empty: 2
	},
	{
		level: 240,
		name: "百步穿楊",
		mini: 132,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/240/",
		board:
			"H@AA" +
			"HNAA" +
			"BBOI" +
			"CCPI" +
			"@QDD",
		empty: 2
	},
	{
		level: 241,
		name: "七上八下(上)",
		mini: 77,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/241/",
		board:
			"HIJN" +
			"HIJO" +
			"AABB" +
			"AA@@" +
			"CCPQ",
		empty: 2
	},
	{
		level: 242,
		name: "七上八下(下)",
		mini: 78,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/242/",
		board:
			"BBNO" +
			"AA@@" +
			"AACC" +
			"HIJP" +
			"HIJQ",
		empty: 2
	},
	{
		level: 243,
		name: "別無選擇",
		mini: 90,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/243/",
		board:
			"AAH@" +
			"AAH@" +
			"NIBB" +
			"JIOK" +
			"JPQK",
		empty: 2
	},
	{
		level: 244,
		name: "大喬小喬(上)",
		mini: 39,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/244/",
		board:
			"HINO" +
			"HIAA" +
			"PQAA" +
			"JKBB" +
			"JK@@",
		empty: 2
	},
	{
		level: 245,
		name: "大喬小喬(下)",
		mini: 38,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/245/",
		board:
			"HI@@" +
			"HIBB" +
			"NOAA" +
			"JKAA" +
			"JKPQ",
		empty: 2
	},
	{
		level: 246,
		name: "旋轉讓道",
		mini: 70,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/246/",
		board:
			"@HIN" +
			"JHIO" +
			"JAAP" +
			"KAA@" +
			"KQBB",
		empty: 2
	},
	{
		level: 247,
		name: "兵隨將轉",
		mini: 73,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/247/",
		board:
			"AANH" +
			"AAIH" +
			"JOIP" +
			"JKBB" +
			"@KQ@",
		empty: 2
	},
	{
		level: 248,
		name: "新鴻門宴Ⅰ",
		mini: 68,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/248/",
		board:
			"NAAH" +
			"IAAH" +
			"IJKO" +
			"@JK@" +
			"PQBB",
		empty: 2
	},
	{
		level: 249,
		name: "新鴻門宴Ⅱ",
		mini: 100,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/249/",
		board:
			"HAAI" +
			"HAAI" +
			"BBCC" +
			"@NO@" +
			"DDPQ",
		empty: 2
	},
	{
		level: 250,
		name: "全民皆兵",
		mini: 22,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/250/",
		board:
			"AAN@" +
			"AAOP" +
			"QRST" +
			"UVWX" +
			"YZ[@",
		empty: 2
	},
	{
		level: 251,
		name: "三顧茅廬",
		mini: 80,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/251/",
		board:
			"AAHI" +
			"AAHI" +
			"JNO@" +
			"JPQ@" +
			"BBCC",
		empty: 2
	},
	{
		level: 252,
		name: "7系列:七步成詩",
		mini: 7,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/252/",
		board:
			"HI@J" +
			"HI@J" +
			"KLAA" +
			"KLAA" +
			"NOPQ",
		empty: 2
	},
	{
		level: 253,
		name: "7系列:整齊排列",
		mini: 37,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/253/",
		board:
			"NHIO" +
			"JHIK" +
			"JPQK" +
			"AA@@" +
			"AABB",
		empty: 2
	},
	{
		level: 254,
		name: "7系列:倒扣杯中",
		mini: 47,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/254/",
		board:
			"BBCC" +
			"@NO@" +
			"HAAI" +
			"HAAI" +
			"PDDQ",
		empty: 2
	},
	{
		level: 255,
		name: "7系列:飄在空中",
		mini: 57,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/255/",
		board:
			"HNOI" +
			"HAAI" +
			"JAAP" +
			"JBBK" +
			"@@QK",
		empty: 2
	},
	{
		level: 256,
		name: "7系列:四面楚歌",
		mini: 67,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/256/",
		board:
			"@NO@" +
			"HBBI" +
			"HAAI" +
			"PAAQ" +
			"CCDD",
		empty: 2
	},
	{
		level: 257,
		name: "7系列:步履維艱",
		mini: 107,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/257/",
		board:
			"NAAO" +
			"HAA@" +
			"HIBB" +
			"JIPQ" +
			"JCC@",
		empty: 2
	},
	{
		level: 258,
		name: "7系列:自動報時",
		mini: 117,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/258/",
		board:
			"@HNO" +
			"PHAA" +
			"IJAA" +
			"IJBB" +
			"CCQ@",
		empty: 2
	},
	{
		level: 259,
		name: "一心一意",
		mini: 11,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/259/",
		board:
			"BBCC" +
			"HNAA" +
			"HOAA" +
			"IPQR" +
			"I@@S",
		empty: 2
	},
	{
		level: 260,
		name: "上下鏡像",
		mini: 23,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/260/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"DDEE" +
			"FFPQ",
		empty: 2
	},
	{
		level: 261,
		name: "首尾互換(上)",
		mini: 29,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/261/",
		board:
			"NAA@" +
			"OAA@" +
			"BBPQ" +
			"HIJK" +
			"HIJK",
		empty: 2
	},
	{
		level: 262,
		name: "首尾互換(下)",
		mini: 29,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/262/",
		board:
			"NAAO" +
			"HAAI" +
			"H@@I" +
			"JPQK" +
			"JBBK",
		empty: 2
	},
	{
		level: 263,
		name: "眾志成城",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/263/",
		board:
			"HNBB" +
			"HAAO" +
			"IAAP" +
			"IJ@K" +
			"@JQK",
		empty: 2
	},
	{
		level: 264,
		name: "孔融讓梨",
		mini: 47,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/264/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"PHDD" +
			"QHEE",
		empty: 2
	},
	{
		level: 265,
		name: "仙人推磨",
		mini: 59,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/265/",
		board:
			"NAA@" +
			"OAAP" +
			"HBBQ" +
			"H@IJ" +
			"CCIJ",
		empty: 2
	},
	{
		level: 266,
		name: "陸績懷橘",
		mini: 61,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/266/",
		board:
			"HNOI" +
			"HAAI" +
			"JAAK" +
			"JBBK" +
			"PQ@@",
		empty: 2
	},
	{
		level: 267,
		name: "曹沖稱象",
		mini: 113,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/267/",
		board:
			"AANH" +
			"AAIH" +
			"@OIP" +
			"@BBJ" +
			"CCQJ",
		empty: 2
	},
	{
		level: 268,
		name: "千里走單騎",
		mini: 33,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/268/",
		board:
			"@AA@" +
			"NAAO" +
			"PHQR" +
			"SHTU" +
			"VBBW",
		empty: 2
	},
	{
		level: 269,
		name: "三英戰呂布",
		mini: 57,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/269/",
		board:
			"AA@H" +
			"AANH" +
			"OBBP" +
			"QIJR" +
			"SIJ@",
		empty: 2
	},
	{
		level: 270,
		name: "桃園三結義",
		mini: 43,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/270/",
		board:
			"@AA@" +
			"HAAI" +
			"HBBI" +
			"NOPQ" +
			"RSTU",
		empty: 2
	},
	{
		level: 271,
		name: "孔明扇",
		mini: 16,
		user: "jia",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/271/",
		board:
			"HBBN" +
			"HAAI" +
			"JAAI" +
			"JOKP" +
			"@QK@",
		empty: 2
	},
	{
		level: 272,
		name: "步步高之“義放曹操”",
		mini: 71,
		user: "jia",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/272/",
		board:
			"BBAA" +
			"HNAA" +
			"HICC" +
			"@IJO" +
			"P@JQ",
		empty: 2
	},
	{
		level: 273,
		name: "異位同步(上)",
		mini: 103,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/273/",
		board:
			"N@HI" +
			"AAHI" +
			"AA@J" +
			"BBOJ" +
			"PQCC",
		empty: 2
	},
	{
		level: 274,
		name: "異位同步(下)",
		mini: 103,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/274/",
		board:
			"N@@H" +
			"AAIH" +
			"AAIJ" +
			"BBOJ" +
			"PQCC",
		empty: 2
	},
	{
		level: 275,
		name: "自成鏡像",
		mini: 31,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/275/",
		board:
			"NAA@" +
			"OAA@" +
			"BBCC" +
			"HIPQ" +
			"HIDD",
		empty: 2
	},
	{
		level: 276,
		name: "孔明扇2",
		mini: 30,
		user: "jia",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/276/",
		board:
			"HBBN" +
			"HAAI" +
			"JAAI" +
			"JKOP" +
			"@KQ@",
		empty: 2
	},
	{
		level: 277,
		name: "大意失荊州",
		mini: 66,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/277/",
		board:
			"@HNI" +
			"JH@I" +
			"JAAO" +
			"KAAP" +
			"KQBB",
		empty: 2
	},
	{
		level: 278,
		name: "鞠躬盡瘁",
		mini: 55,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/278/",
		board:
			"HINO" +
			"HIAA" +
			"PQAA" +
			"JBBK" +
			"J@@K",
		empty: 2
	},
	{
		level: 279,
		name: "木牛流馬",
		mini: 44,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/279/",
		board:
			"HAAN" +
			"HAAI" +
			"BBOI" +
			"J@PK" +
			"J@QK",
		empty: 2
	},
	{
		level: 280,
		name: "諸葛八陣",
		mini: 88,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/280/",
		board:
			"HAA@" +
			"HAAN" +
			"BBIJ" +
			"K@IJ" +
			"KOPQ",
		empty: 2
	},
	{
		level: 281,
		name: "上下求索",
		mini: 75,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/281/",
		board:
			"@AAH" +
			"IAAH" +
			"IBBJ" +
			"@KNJ" +
			"OKPQ",
		empty: 2
	},
	{
		level: 282,
		name: "浪跡天涯",
		mini: 59,
		user: "perheeseen",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/282/",
		board:
			"BBAA" +
			"HIAA" +
			"HICC" +
			"DDNO" +
			"EE@@",
		empty: 2
	},
	{
		level: 283,
		name: "花間一壺酒",
		mini: 55,
		user: "perheeseen",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/283/",
		board:
			"@NO@" +
			"BBCC" +
			"HAAI" +
			"HAAI" +
			"PDDQ",
		empty: 2
	},
	{
		level: 284,
		name: "不惑之前",
		mini: 39,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/284/",
		board:
			"NOPQ" +
			"AAHI" +
			"AAHI" +
			"BBJK" +
			"@@JK",
		empty: 2
	},
	{
		level: 285,
		name: "不惑之後",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/285/",
		board:
			"@@HI" +
			"BBHI" +
			"AAJK" +
			"AAJK" +
			"NOPQ",
		empty: 2
	},
	{
		level: 286,
		name: "雙兵爭鋒",
		mini: 58,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/286/",
		board:
			"AABB" +
			"AANH" +
			"IO@H" +
			"IPCC" +
			"DDQ@",
		empty: 2
	},
	{
		level: 287,
		name: "高位分歧",
		mini: 87,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/287/",
		board:
			"AA@@" +
			"AANH" +
			"IOPH" +
			"IQBB" +
			"CCDD",
		empty: 2
	},
	{
		level: 288,
		name: "形近神似(上)",
		mini: 45,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/288/",
		board:
			"AABB" +
			"AACC" +
			"HNOI" +
			"HDDI" +
			"P@@Q",
		empty: 2
	},
	{
		level: 289,
		name: "形近神似(下)",
		mini: 45,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/289/",
		board:
			"AABB" +
			"AACC" +
			"HNOI" +
			"H@@I" +
			"PDDQ",
		empty: 2
	},
	{
		level: 290,
		name: "旋轉砝碼",
		mini: 86,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/290/",
		board:
			"NOAA" +
			"@@AA" +
			"HPBB" +
			"HCCI" +
			"DDQI",
		empty: 2
	},
	{
		level: 291,
		name: "坦克",
		mini: 123,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/291/",
		board:
			"@AA@" +
			"NAAO" +
			"HBBI" +
			"HCCI" +
			"PDDQ",
		empty: 2
	},
	{
		level: 292,
		name: "孔明扇3",
		mini: 42,
		user: "jia",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/292/",
		board:
			"NBBH" +
			"IAAH" +
			"IAAJ" +
			"OCCJ" +
			"@PQ@",
		empty: 2
	},
	{
		level: 293,
		name: "萊希",
		mini: 27,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/293/",
		board:
			"BBAA" +
			"CCAA" +
			"DDEE" +
			"NOP@" +
			"@QFF",
		empty: 2
	},
	{
		level: 294,
		name: "米拉",
		mini: 36,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/294/",
		board:
			"BBAA" +
			"CCAA" +
			"DDN@" +
			"OEE@" +
			"PQFF",
		empty: 2
	},
	{
		level: 295,
		name: "形同神異",
		mini: 38,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/295/",
		board:
			"BBAA" +
			"CCAA" +
			"NHOI" +
			"PHQI" +
			"@@DD",
		empty: 2
	},
	{
		level: 296,
		name: "神在內涵",
		mini: 36,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/296/",
		board:
			"AABB" +
			"AACC" +
			"DDNO" +
			"@HEE" +
			"@HPQ",
		empty: 2
	},
	{
		level: 297,
		name: "面具",
		mini: 60,
		user: "小笨貓",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/297/",
		board:
			"HAAI" +
			"HAAI" +
			"NJKO" +
			"PJKQ" +
			"@BB@",
		empty: 2
	},
	{
		level: 298,
		name: "龍鳳三胞（兄長）",
		mini: 44,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/298/",
		board:
			"@NO@" +
			"BBPQ" +
			"AACC" +
			"AAHI" +
			"DDHI",
		empty: 2
	},
	{
		level: 299,
		name: "龍鳳三胞（大妹）",
		mini: 44,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/299/",
		board:
			"BBHI" +
			"AAHI" +
			"AACC" +
			"DDNO" +
			"@PQ@",
		empty: 2
	},
	{
		level: 300,
		name: "龍鳳三胞（小妹）",
		mini: 44,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/300/",
		board:
			"BBHI" +
			"AAHI" +
			"AACC" +
			"DDNO" +
			"PQ@@",
		empty: 2
	},
	{
		level: 301,
		name: "小鬼難纏",
		mini: 78,
		user: "小笨貓",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/301/",
		board:
			"HNAA" +
			"HOAA" +
			"BBPQ" +
			"ICCJ" +
			"I@@J",
		empty: 2
	},
	{
		level: 302,
		name: "佳人梳妝（佳人）",
		mini: 28,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/302/",
		board:
			"@@BB" +
			"AAHN" +
			"AAHI" +
			"OJKI" +
			"PJKQ",
		empty: 2
	},
	{
		level: 303,
		name: "佳人梳妝（鏡像）",
		mini: 28,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/303/",
		board:
			"NHIO" +
			"PHIJ" +
			"AAKJ" +
			"AAKQ" +
			"@@BB",
		empty: 2
	},
	{
		level: 304,
		name: "雙頭倆尾",
		mini: 34,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/304/",
		board:
			"BBH@" +
			"AAH@" +
			"AAIN" +
			"OJIK" +
			"PJQK",
		empty: 2
	},
	{
		level: 305,
		name: "分兵作戰",
		mini: 38,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/305/",
		board:
			"NOBB" +
			"CCDD" +
			"HAA@" +
			"HAA@" +
			"PQEE",
		empty: 2
	},
	{
		level: 306,
		name: "閃展騰挪",
		mini: 45,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/306/",
		board:
			"NH@@" +
			"OHBB" +
			"AACC" +
			"AAPQ" +
			"DDEE",
		empty: 2
	},
	{
		level: 307,
		name: "丫形優解",
		mini: 38,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/307/",
		board:
			"BBCC" +
			"AADD" +
			"AANO" +
			"H@EE" +
			"HP@Q",
		empty: 2
	},
	{
		level: 308,
		name: "一顛快兩步（上）",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/308/",
		board:
			"@HBB" +
			"@HCC" +
			"AANO" +
			"AAPQ" +
			"DDEE",
		empty: 2
	},
	{
		level: 309,
		name: "一顛快兩步（下）",
		mini: 39,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/309/",
		board:
			"BBCC" +
			"AANO" +
			"AAPQ" +
			"@HDD" +
			"@HEE",
		empty: 2
	},
	{
		level: 310,
		name: "逃出來啦(上)",
		mini: 26,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/310/",
		board:
			"BBCC" +
			"H@@N" +
			"HAAO" +
			"PAAQ" +
			"DDEE",
		empty: 2
	},
	{
		level: 311,
		name: "逃出來啦(下)",
		mini: 26,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/311/",
		board:
			"BBCC" +
			"NAAO" +
			"HAAP" +
			"H@@Q" +
			"DDEE",
		empty: 2
	},
	{
		level: 312,
		name: "一顛快三步(上)",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/312/",
		board:
			"BBCC" +
			"DDNO" +
			"PAAQ" +
			"@AA@" +
			"EEFF",
		empty: 2
	},
	{
		level: 313,
		name: "一顛快三步(下)",
		mini: 38,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/313/",
		board:
			"BBCC" +
			"@AA@" +
			"NAAO" +
			"DDPQ" +
			"EEFF",
		empty: 2
	},
	{
		level: 314,
		name: "未卜先知",
		mini: 36,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/314/",
		board:
			"@AA@" +
			"NAAH" +
			"IOJH" +
			"IKJP" +
			"QKRS",
		empty: 2
	},
	{
		level: 315,
		name: "困獸猶鬥",
		mini: 62,
		user: "perheeseen",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/315/",
		board:
			"AANO" +
			"AABB" +
			"CCH@" +
			"DDHP" +
			"QEE@",
		empty: 2
	},
	{
		level: 316,
		name: "六將之近在咫尺",
		mini: 40,
		user: "小笨貓",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/316/",
		board:
			"NO@@" +
			"BBCC" +
			"DDEE" +
			"AAFF" +
			"AAGG",
		empty: 2
	},
	{
		level: 317,
		name: "H形優解",
		mini: 97,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/317/",
		board:
			"AAN@" +
			"AA@H" +
			"IBBH" +
			"ICCO" +
			"PQDD",
		empty: 2
	},
	{
		level: 318,
		name: "扇壺一體(扇)",
		mini: 65,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/318/",
		board:
			"HIBB" +
			"HIAA" +
			"NJAA" +
			"OJCC" +
			"@PQ@",
		empty: 2
	},
	{
		level: 319,
		name: "扇壺一體(壺)",
		mini: 65,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/319/",
		board:
			"@NO@" +
			"PHBB" +
			"QHAA" +
			"IJAA" +
			"IJCC",
		empty: 2
	},
	{
		level: 320,
		name: "將士一心",
		mini: 108,
		user: "小笨貓",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/320/",
		board:
			"AAH@" +
			"AAHN" +
			"OPBB" +
			"ICCQ" +
			"IDD@",
		empty: 2
	},
	{
		level: 321,
		name: "人形優解",
		mini: 77,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/321/",
		board:
			"AAH@" +
			"AAHI" +
			"N@OI" +
			"JBBK" +
			"JPQK",
		empty: 2
	},
	{
		level: 322,
		name: "手形優解",
		mini: 62,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/322/",
		board:
			"HIAA" +
			"HIAA" +
			"N@OJ" +
			"K@PJ" +
			"KBBQ",
		empty: 2
	},
	{
		level: 323,
		name: "倒影丫解（上）",
		mini: 38,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/323/",
		board:
			"AABB" +
			"AAHN" +
			"OPHI" +
			"JCCI" +
			"J@@Q",
		empty: 2
	},
	{
		level: 324,
		name: "倒影丫解（下）",
		mini: 38,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/324/",
		board:
			"H@@N" +
			"HBBI" +
			"OPJI" +
			"AAJQ" +
			"AACC",
		empty: 2
	},
	{
		level: 325,
		name: "倒影等優（上）",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/325/",
		board:
			"AABB" +
			"AAHN" +
			"CCHI" +
			"ODDI" +
			"P@@Q",
		empty: 2
	},
	{
		level: 326,
		name: "倒影等優（下）",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/326/",
		board:
			"N@@O" +
			"PBBH" +
			"CCIH" +
			"AAIQ" +
			"AADD",
		empty: 2
	},
	{
		level: 327,
		name: "同步倒影（上）",
		mini: 26,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/327/",
		board:
			"AABB" +
			"AANH" +
			"OPIH" +
			"QJIK" +
			"@J@K",
		empty: 2
	},
	{
		level: 328,
		name: "同步倒影（下）",
		mini: 26,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/328/",
		board:
			"@H@I" +
			"NHJI" +
			"OPJK" +
			"AAQK" +
			"AABB",
		empty: 2
	},
	{
		level: 329,
		name: "活眼倒影(上)",
		mini: 71,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/329/",
		board:
			"HNOP" +
			"HIBB" +
			"JI@Q" +
			"J@AA" +
			"CCAA",
		empty: 2
	},
	{
		level: 330,
		name: "活眼倒影(下)",
		mini: 71,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/330/",
		board:
			"BBAA" +
			"H@AA" +
			"HI@N" +
			"JICC" +
			"JOPQ",
		empty: 2
	},
	{
		level: 331,
		name: "觸角優解(左)",
		mini: 75,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/331/",
		board:
			"@HI@" +
			"NHIO" +
			"JBBP" +
			"JQAA" +
			"CCAA",
		empty: 2
	},
	{
		level: 332,
		name: "觸角優解(右)",
		mini: 75,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/332/",
		board:
			"BBAA" +
			"HNAA" +
			"HCCO" +
			"PIJQ" +
			"@IJ@",
		empty: 2
	},
	{
		level: 333,
		name: "字母糸列A",
		mini: 135,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/333/",
		board:
			"NHOP" +
			"IHAA" +
			"I@AA" +
			"JBBQ" +
			"J@CC",
		empty: 2
	},
	{
		level: 334,
		name: "字母系列C",
		mini: 125,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/334/",
		board:
			"NOAA" +
			"HPAA" +
			"HBB@" +
			"IJQ@" +
			"IJCC",
		empty: 2
	},
	{
		level: 335,
		name: "字母系列F",
		mini: 116,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/335/",
		board:
			"HNAA" +
			"HIAA" +
			"OIP@" +
			"JQBB" +
			"JCC@",
		empty: 2
	},
	{
		level: 336,
		name: "字母系列H",
		mini: 134,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/336/",
		board:
			"N@OH" +
			"AAPH" +
			"AAIJ" +
			"BBIJ" +
			"Q@CC",
		empty: 2
	},
	{
		level: 337,
		name: "字母系列I",
		mini: 106,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/337/",
		board:
			"HAAN" +
			"HAAO" +
			"@BB@" +
			"IJPQ" +
			"IJCC",
		empty: 2
	},
	{
		level: 338,
		name: "字母系列L",
		mini: 117,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/338/",
		board:
			"AAN@" +
			"AAO@" +
			"PBBQ" +
			"HCCI" +
			"HDDI",
		empty: 2
	},
	{
		level: 339,
		name: "字母系列N",
		mini: 134,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/339/",
		board:
			"NO@H" +
			"AAPH" +
			"AAIJ" +
			"BBIJ" +
			"Q@CC",
		empty: 2
	},
	{
		level: 340,
		name: "字母系列P",
		mini: 126,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/340/",
		board:
			"NAAO" +
			"HAAP" +
			"H@BB" +
			"CCIQ" +
			"DDI@",
		empty: 2
	},
	{
		level: 341,
		name: "字母系列T",
		mini: 137,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/341/",
		board:
			"HNOP" +
			"HIAA" +
			"JIAA" +
			"JBBQ" +
			"@CC@",
		empty: 2
	},
	{
		level: 342,
		name: "字母系列U",
		mini: 131,
		user: "華英雄",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/342/",
		board:
			"N@OP" +
			"H@AA" +
			"HIAA" +
			"JIBB" +
			"JCCQ",
		empty: 2
	},
	{
		level: 343,
		name: "古稀倒影(上)",
		mini: 70,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/343/",
		board:
			"NBB@" +
			"HIAA" +
			"HIAA" +
			"OJCC" +
			"PJQ@",
		empty: 2
	},
	{
		level: 344,
		name: "古稀倒影(下)",
		mini: 70,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/344/",
		board:
			"NHO@" +
			"PHBB" +
			"IJAA" +
			"IJAA" +
			"QCC@",
		empty: 2
	},
	{
		level: 345,
		name: "形神顛倒(上)",
		mini: 64,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/345/",
		board:
			"HBB@" +
			"HNAA" +
			"OPAA" +
			"IJCC" +
			"IJQ@",
		empty: 2
	},
	{
		level: 346,
		name: "形神顛倒(下)",
		mini: 64,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/346/",
		board:
			"HIN@" +
			"HIBB" +
			"OPAA" +
			"JQAA" +
			"JCC@",
		empty: 2
	},
	{
		level: 347,
		name: "形顛神倒(上)",
		mini: 34,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/347/",
		board:
			"BBAA" +
			"@HAA" +
			"NHOI" +
			"JPKI" +
			"JQK@",
		empty: 2
	},
	{
		level: 348,
		name: "形顛神倒(下)",
		mini: 43,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/348/",
		board:
			"HNI@" +
			"HOIJ" +
			"PKQJ" +
			"@KAA" +
			"BBAA",
		empty: 2
	},
	{
		level: 349,
		name: "鳳凰倒影(鳳)",
		mini: 31,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/349/",
		board:
			"BBN@" +
			"AAHI" +
			"AAHI" +
			"JOKP" +
			"JQK@",
		empty: 2
	},
	{
		level: 350,
		name: "鳳凰倒影(凰)",
		mini: 31,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/350/",
		board:
			"HNI@" +
			"HOIP" +
			"AAJK" +
			"AAJK" +
			"BBQ@",
		empty: 2
	},
	{
		level: 351,
		name: "互生優解",
		mini: 71,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/351/",
		board:
			"HNAA" +
			"H@AA" +
			"OIBB" +
			"@IJK" +
			"PQJK",
		empty: 2
	},
	{
		level: 352,
		name: "重鏈優解",
		mini: 96,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/352/",
		board:
			"NOAA" +
			"@HAA" +
			"@HBB" +
			"CCIP" +
			"DDIQ",
		empty: 2
	},
	{
		level: 353,
		name: "電阻優解",
		mini: 63,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/353/",
		board:
			"HBBN" +
			"HAAI" +
			"OAAI" +
			"CCDD" +
			"@PQ@",
		empty: 2
	},
	{
		level: 354,
		name: "平行優解",
		mini: 75,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/354/",
		board:
			"NAA@" +
			"HAA@" +
			"HBBO" +
			"IPQJ" +
			"ICCJ",
		empty: 2
	},
	{
		level: 355,
		name: "麒麟倒影(麒)",
		mini: 53,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/355/",
		board:
			"BBN@" +
			"OHCC" +
			"IHAA" +
			"IPAA" +
			"DDQ@",
		empty: 2
	},
	{
		level: 356,
		name: "麒麟倒影(麟)",
		mini: 53,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/356/",
		board:
			"BBN@" +
			"HOAA" +
			"HIAA" +
			"PICC" +
			"DDQ@",
		empty: 2
	},
	{
		level: 357,
		name: "合兵一處",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/357/",
		board:
			"BBNO" +
			"CCDD" +
			"PH@@" +
			"QHAA" +
			"EEAA",
		empty: 2
	},
	{
		level: 358,
		name: "兵分二路",
		mini: 48,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/358/",
		board:
			"BBN@" +
			"HOCC" +
			"HPQ@" +
			"AADD" +
			"AAEE",
		empty: 2
	},
	{
		level: 359,
		name: "貔貅倒影(貔)",
		mini: 44,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/359/",
		board:
			"NBBO" +
			"HP@I" +
			"HJ@I" +
			"QJAA" +
			"CCAA",
		empty: 2
	},
	{
		level: 360,
		name: "貔貅倒影(貅)",
		mini: 44,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/360/",
		board:
			"BBAA" +
			"NHAA" +
			"IH@J" +
			"IO@J" +
			"PCCQ",
		empty: 2
	},
	{
		level: 361,
		name: "同步堂親(兄)",
		mini: 62,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/361/",
		board:
			"AAHN" +
			"AAH@" +
			"IBBJ" +
			"IKOJ" +
			"PK@Q",
		empty: 2
	},
	{
		level: 362,
		name: "同步堂親(弟)",
		mini: 62,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/362/",
		board:
			"AAHN" +
			"AAH@" +
			"OBBI" +
			"JKPI" +
			"JK@Q",
		empty: 2
	},
	{
		level: 363,
		name: "分久必合",
		mini: 106,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/363/",
		board:
			"AANO" +
			"AAHI" +
			"BBHI" +
			"PCCJ" +
			"Q@@J",
		empty: 2
	},
	{
		level: 364,
		name: "合久必分",
		mini: 91,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/364/",
		board:
			"AA@H" +
			"AANH" +
			"OPIQ" +
			"BBIJ" +
			"@CCJ",
		empty: 2
	},
	{
		level: 365,
		name: "日月同輝",
		mini: 102,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/365/",
		board:
			"@N@H" +
			"OIJH" +
			"PIJQ" +
			"AABB" +
			"AACC",
		empty: 2
	},
	{
		level: 366,
		name: "曹操劃小圈",
		mini: 75,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/366/",
		board:
			"HIN@" +
			"HIO@" +
			"BBJP" +
			"AAJQ" +
			"AACC",
		empty: 2
	},
	{
		level: 367,
		name: "虎蹤",
		mini: 62,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/367/",
		board:
			"HBB@" +
			"HNCC" +
			"OAAP" +
			"IAAQ" +
			"I@DD",
		empty: 2
	},
	{
		level: 368,
		name: "狼影",
		mini: 62,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/368/",
		board:
			"H@BB" +
			"HAAN" +
			"OAAP" +
			"IQCC" +
			"IDD@",
		empty: 2
	},
	{
		level: 369,
		name: "轅門射戟Ａ",
		mini: 60,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/369/",
		board:
			"NBBH" +
			"CCOH" +
			"PIAA" +
			"@IAA" +
			"DDQ@",
		empty: 2
	},
	{
		level: 370,
		name: "轅門射戟Ｂ",
		mini: 47,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/370/",
		board:
			"NBBO" +
			"HPCC" +
			"HAA@" +
			"QAAI" +
			"@DDI",
		empty: 2
	},
	{
		level: 371,
		name: "以逸待勞",
		mini: 83,
		user: "zzyyllyyxx",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/371/",
		board:
			"HAAI" +
			"HAAI" +
			"BBCC" +
			"JNOP" +
			"J@@Q",
		empty: 2
	},
	{
		level: 372,
		name: "雪擁藍關",
		mini: 62,
		user: "wondaol",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/372/",
		board:
			"BBAA" +
			"@NAA" +
			"OHPI" +
			"@HJI" +
			"CCJQ",
		empty: 2
	},
	{
		level: 373,
		name: "雲橫秦嶺",
		mini: 65,
		user: "wondaol",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/373/",
		board:
			"BBHN" +
			"@IHJ" +
			"OIPJ" +
			"@QAA" +
			"CCAA",
		empty: 2
	},
	{
		level: 374,
		name: "八陣圖",
		mini: 80,
		user: "wondaol",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/374/",
		board:
			"HAAN" +
			"HAAI" +
			"OBBI" +
			"JCCP" +
			"J@@Q",
		empty: 2
	},
	{
		level: 375,
		name: "兵據曹營",
		mini: 97,
		user: "我是曹操",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/375/",
		board:
			"HNOI" +
			"HPQI" +
			"JAA@" +
			"JAA@" +
			"BBCC",
		empty: 2
	},
	{
		level: 376,
		name: "山窮水盡",
		mini: 70,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/376/",
		board:
			"HAAI" +
			"HAAI" +
			"BBNO" +
			"PJKQ" +
			"@JK@",
		empty: 2
	},
	{
		level: 377,
		name: "上屋抽梯",
		mini: 82,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/377/",
		board:
			"HAAN" +
			"HAAO" +
			"BBPI" +
			"QCCI" +
			"@DD@",
		empty: 2
	},
	{
		level: 378,
		name: "抽梁斷柱",
		mini: 37,
		user: "admin",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/378/",
		board:
			"NAAO" +
			"PAAQ" +
			"RBBH" +
			"CCSH" +
			"@DD@",
		empty: 2
	},
	{
		level: 379,
		name: "有去有回",
		mini: 63,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/379/",
		board:
			"NOPQ" +
			"HIBB" +
			"HICC" +
			"AADD" +
			"AA@@",
		empty: 2
	},
	{
		level: 380,
		name: "能上能下",
		mini: 55,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/380/",
		board:
			"NHI@" +
			"OHIP" +
			"Q@BB" +
			"AACC" +
			"AADD",
		empty: 2
	},
	{
		level: 381,
		name: "火燒連營",
		mini: 41,
		user: "艾恩",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/381/",
		board:
			"H@N@" +
			"HIOJ" +
			"PIKJ" +
			"AAKQ" +
			"AABB",
		empty: 2
	},
	{
		level: 382,
		name: "橫行霸道",
		mini: 28,
		user: "尋心追夢",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/382/",
		board:
			"@AA@" +
			"NAAO" +
			"PHIQ" +
			"JHIK" +
			"JRSK",
		empty: 2
	},
	{
		level: 383,
		name: "睡獅甦醒",
		mini: 82,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/383/",
		board:
			"NOAA" +
			"PHAA" +
			"IHBB" +
			"IJQK" +
			"@J@K",
		empty: 2
	},
	{
		level: 384,
		name: "側面虎",
		mini: 76,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/384/",
		board:
			"@NOH" +
			"AAIH" +
			"AAIJ" +
			"@PKJ" +
			"BBKQ",
		empty: 2
	},
	{
		level: 385,
		name: "胸有朝陽",
		mini: 80,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/385/",
		board:
			"AANH" +
			"AA@H" +
			"OBBI" +
			"JK@I" +
			"JKPQ",
		empty: 2
	},
	{
		level: 386,
		name: "江村夕照",
		mini: 81,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/386/",
		board:
			"H@AA" +
			"HNAA" +
			"IJK@" +
			"IJKO" +
			"PQBB",
		empty: 2
	},
	{
		level: 387,
		name: "曲水流觴",
		mini: 81,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/387/",
		board:
			"HIAA" +
			"HIAA" +
			"JNOP" +
			"JKBB" +
			"QK@@",
		empty: 2
	},
	{
		level: 388,
		name: "簷浮旭日",
		mini: 70,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/388/",
		board:
			"AA@H" +
			"AANH" +
			"IJBB" +
			"IJ@K" +
			"OPQK",
		empty: 2
	},
	{
		level: 389,
		name: "三一奇陣",
		mini: 111,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/389/",
		board:
			"AA@H" +
			"AANH" +
			"OPBB" +
			"@QIJ" +
			"CCIJ",
		empty: 2
	},
	{
		level: 390,
		name: "流水行雲",
		mini: 110,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/390/",
		board:
			"AAH@" +
			"AAH@" +
			"NOBB" +
			"PQIJ" +
			"CCIJ",
		empty: 2
	},
	{
		level: 391,
		name: "運兵陰平",
		mini: 109,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/391/",
		board:
			"NAAO" +
			"PAAH" +
			"BB@H" +
			"I@CC" +
			"IQDD",
		empty: 2
	},
	{
		level: 392,
		name: "野馬分鬃",
		mini: 107,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/392/",
		board:
			"@HAA" +
			"NHAA" +
			"@BBI" +
			"CCOI" +
			"PDDQ",
		empty: 2
	},
	{
		level: 393,
		name: "寄人籬下",
		mini: 106,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/393/",
		board:
			"@HAA" +
			"NHAA" +
			"OPBB" +
			"CCIQ" +
			"DDI@",
		empty: 2
	},
	{
		level: 394,
		name: "披甲持螯",
		mini: 103,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/394/",
		board:
			"H@@I" +
			"HAAI" +
			"NAAO" +
			"BBCC" +
			"PDDQ",
		empty: 2
	},
	{
		level: 395,
		name: "居中斡旋",
		mini: 101,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/395/",
		board:
			"@AA@" +
			"NAAO" +
			"HBBI" +
			"HCCI" +
			"PQDD",
		empty: 2
	},
	{
		level: 396,
		name: "開到茶蘼",
		mini: 101,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/396/",
		board:
			"AA@H" +
			"AANH" +
			"OPBB" +
			"ICC@" +
			"IQDD",
		empty: 2
	},
	{
		level: 397,
		name: "小孤雁",
		mini: 69,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/397/",
		board:
			"@@AA" +
			"BBAA" +
			"HCCN" +
			"HODD" +
			"PQEE",
		empty: 2
	},
	{
		level: 398,
		name: "漩渦乍現",
		mini: 69,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/398/",
		board:
			"NBBO" +
			"HPAA" +
			"H@AA" +
			"CCQ@" +
			"DDEE",
		empty: 2
	},
	{
		level: 399,
		name: "漩渦乍現2",
		mini: 68,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/399/",
		board:
			"HNBB" +
			"HAA@" +
			"@AAO" +
			"CCPQ" +
			"DDEE",
		empty: 2
	},
	{
		level: 400,
		name: "兵不厭走",
		mini: 66,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/400/",
		board:
			"BBAA" +
			"@HAA" +
			"NH@O" +
			"PQCC" +
			"DDEE",
		empty: 2
	},
	{
		level: 401,
		name: "倒影胡馬",
		mini: 62,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/401/",
		board:
			"NBBO" +
			"CCDD" +
			"PAAQ" +
			"HAA@" +
			"H@EE",
		empty: 2
	},
	{
		level: 402,
		name: "首居中道",
		mini: 72,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/402/",
		board:
			"@HAA" +
			"NHAA" +
			"IJBB" +
			"IJK@" +
			"OPKQ",
		empty: 2
	},
	{
		level: 403,
		name: "小旋風",
		mini: 46,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/403/",
		board:
			"NBBO" +
			"PAAH" +
			"IAAH" +
			"IJQK" +
			"@J@K",
		empty: 2
	},
	{
		level: 404,
		name: "小旋風Ⅰ",
		mini: 41,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/404/",
		board:
			"BBNH" +
			"OAAH" +
			"PAAI" +
			"JQKI" +
			"J@K@",
		empty: 2
	},
	{
		level: 405,
		name: "小旋風Ⅱ",
		mini: 40,
		user: "香港一笨豬",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/405/",
		board:
			"HNBB" +
			"HAA@" +
			"IAAJ" +
			"I@KJ" +
			"OPKQ",
		empty: 2
	},
	{
		level: 406,
		name: "身先士卒",
		mini: 21,
		user: "影子",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/406/",
		board:
			"BBAA" +
			"CCAA" +
			"DDEE" +
			"FFNO" +
			"PQ@@",
		empty: 2
	},
	{
		level: 407,
		name: "兵威將廣",
		mini: 52,
		user: "影子",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/407/",
		board:
			"AANO" +
			"AAPQ" +
			"BBCC" +
			"DDEE" +
			"@FF@",
		empty: 2
	},
	{
		level: 408,
		name: "高枕無憂",
		mini: 17,
		user: "gs26115",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/408/",
		board:
			"BBCC" +
			"AAHI" +
			"AAHI" +
			"DDNO" +
			"PQ@@",
		empty: 2
	},
	{
		level: 409,
		name: "海晏河清",
		mini: 32,
		user: "gs26115",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/409/",
		board:
			"BBAA" +
			"HIAA" +
			"HICC" +
			"N@@O" +
			"DDPQ",
		empty: 2
	},
	{
		level: 410,
		name: "旭日東昇2",
		mini: 61,
		user: "gs26115",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/410/",
		board:
			"@NO@" +
			"AAHP" +
			"AAHQ" +
			"BBCC" +
			"DDEE",
		empty: 2
	},
	{
		level: 411,
		name: "橫駱駝",
		mini: 72,
		user: "gs26115",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/411/",
		board:
			"AANH" +
			"AAIH" +
			"BBIO" +
			"@PCC" +
			"DD@Q",
		empty: 2
	},
	{
		level: 412,
		name: "圈套",
		mini: 87,
		user: "半瓶墨水",
		url_name: "發芽網",
		url:  "http://fayaa.com/youxi/hrd/412/",
		board:
			"AA@N" +
			"AA@O" +
			"BBPH" +
			"ICCH" +
			"IQDD",
		empty: 2
	}
];
