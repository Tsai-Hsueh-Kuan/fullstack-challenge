# Full-stack Engineer Written Challenge

Please answer one or more questions on Section 1 and Section 2, and two or more questions in Section 3. There are no word limits on the answers; you can keep them as concise as possible as long as you have demostrate your thoughts. 

You can directly write your answers in your branch following the questions. 

## Section 1: Architectural Design

*Please answer at lease one of the following questions.*

* Assume that you are building a backend service for a medical company. When a request come in, this service needs to take the user input, pass it to a pre-trained computational model, and return the output to the user. The service needs to handle a high request frequency with uncertian average traffic volumne, and the computational model needs to process large amount of data in parallel. How would you design this service and choose the building blocks to achieve the above requirements?

```
針對request我認為可以使用Nodejs來處理,它針對IO效能較佳,針對使用者的資料身份驗正,資料格式處理等可以透過他解決,並將處理好後資訊使用
Message Queue技術送出,可以讓使用者不需等太久的計算,而是收到res表示訊息送出後,在前端可能以polling形式確認資料是否完成處理
pre-trained computational model從Message Queue接到資料後處理完畢再發送完成的Queue通知,Nodejs Server接收到後再更新狀態讓
polling request得以更新資料給使用者
高請求頻率以及不穩定流量我希望使用雲服務的load balancer 搭配 auto scaling來處理
```

* Assume that you have an application that is growing very fast. It uses PostgreSQL as data storage, and the growing traffic is making write and read operations slow. What strategies would you take to scale your database horizontally and vertically?

```
1.code層面
 >第一要先確定說能不能使用cache機制減少對資料庫的讀取操作,將沒有即時性必要且重複拿取的資料使用cache來儲存
2.資料庫設計層面
 >確認index設置是否完善影響查詢速率
3.擴展 
 >垂直擴展(可能有硬體極限且增加成本) 水平擴展可能要透過一些雲端服務商(AWS) 較容易管理
4.讀寫分離
 >使用master/slave架構
5.切表
```


## Section 2: Distributed Systems and Web3

*Please answer at lease one of the following questions.*

* Assume you are to design a product supporting a social network, which allows users to publish articles, comment on articles, and follow other users' articles and comments. You also want this social network to be decentralized and scalable, while enabling other developers to build different tools for the network. What technologies and product would be the essential building blocks, what roles would they play, and how would you combine them together?

```
其實我認為去中心化社交平台會是下一個相當重要項目,類似於去中心化twitter,用戶可以使用錢包地址作為身份發文以及留言,使用token作為gas
的同時,也可增設獎勵機制,讓使用者對其他人的文章給予支持捐蹭自己的token,這可以鼓勵作者寫出更好的文章,這些資料因為全部記錄在鏈上所以
任何人都沒辦法撤銷,下架. 這是優點但也會造成一個問題:若有不想看到且影響用戶體驗的文章該如何處理？我認為這可以使用個人化的瀏覽器來解
覺這方面問題, "enabling other developers to build different tools for the network" 這是非常重要一點, 我認為可以在早期
開發時公開所有文章/留言等等在鏈上的格式,讓更多開發這願意對接資料製作各種的瀏覽器,例如可以新增黑名單功能(讓使用者設定不希望看的文章
作者,文章標題關鍵字,文章類別等等)當市場上有多家瀏覽器開發者,使用者會找到屬於且適合自己,當該項目成為主流,也能讓作者了解怎樣的文章會
被下架,怎樣的文章也許會被黑名單屏蔽,而逐漸達到作者與讀者對社群規範的共識.資料永遠都存在去中心化的鏈上,但利用各個中心化平台來達到社
群平衡,而且最好能讓各開發者開源瀏覽器代碼,最終達到每個人能對自己瀏覽器進行個人化設定,在自己電腦跑起來頁面去接鏈上資料,讓自己對文章
的審核以及知的權利保留在自己手中.
```

* Assume you are to design a product for crowdfunding creative projects with NFTs, where the creator pre-sale the ownership of the final result as NFTs. From minting the tokens to delivering the final result, what are the UX and techonogical challenges you forsee, and what do you think it takes to solve these problems well?

```
UX

1.收集性質NFT(圖片/影音/文字等)要有一定的儀式感才能鼓勵用戶購買,所以在介面設計購買後如何讓使用者有獲得專屬收集成就是相當重要的事
 > 可以結合其他社群平台,讓使用者可以分享購買NFT的喜悅或是使用NFT作為頭像等身份象徵
 > 平台也可以有探訪其他用戶的功能,可以互相分享收集的成果也可以讓使用者去注意到現在最熱門的項目是什麼
2.瀏覽的平台若能讓使用者有更高程度的設定自由,以及個人推波優化,可以增進使用者購買意願
 > 可以像一些電商平台對產品有內部標籤方式,記錄每個使用者喜好（瀏覽紀錄/購買記錄）,在展示頁面使用數據分析推薦他最可能適合產品
3.許多用戶也許是因為喜歡作品,喜歡作者,來加入並希望使用,但可能本身並沒有區塊鏈經驗
 > 對於錢包註冊一直是許多新手加入時的瓶頸,也許可以結合一些錢包串接產品來增加使用者的門檻(例如BLOCTO錢包,當然也可以自己開發)

techonogical

1.要先確認所使用代幣以及鏈
 > 一些比較冷門的鏈可能會降低使用者意願以及擁有該token機率,熱門的例如ETH可能會有gas較高問題
2.所有上架商品資料的更新
 > 鏈上資料需要及時的取得與更新,但許多鏈要拿到node資料本身速度並沒辦法到非常快,也許需要設置indexer server不斷同步鏈上資料,
   使用者頁面的資訊則是從indexer server來拿,增加使用者體驗
3.若是使用smart contract,則技術上需要注意是否出現漏洞
 > 鏈上資料好處是不可被篡改,但同時也代表若有漏洞大部分狀況無法改該智能合約,要避免類似Poly Network因為智能合約被駭的問題 

```

## Section 3: Personal Passions and Communities

*Please answer at lease two of the following questions.*

* What are some technologies you are recently fascinated with, and why are they interesting to you?
```
我接觸區塊鏈技術跟我開始學習code是差不多時間,我認為區塊鏈是一個相當有淺力的技術,除了一般人比較熟知的金融/炒作之外,他本身是
有非常多優點可以進行相關應用,例如web3網域,Soulbound Token, POAP...都是非常有意思且有淺力的項目,我認為中心化在許多層面
的問題已經出現(金融:交易所/社群:ban人權力過於集中且很難申訴) 也許區塊鏈技術就是解決這些問題的答案,而且身為一名軟體工程師,
我認為區塊鏈技術是非常進展快速的,他也滿足我對不對學習新知的嚮往,所以在成為一名軟體工程師後,我更希望能成為一名在web3行業中的
工程師.
```

* What are some open source projects that you are involved with, or enjoy working on? What aspect of the project (e.g. architectural design, scope, community vibe, organization) makes it enjoyable or admirable?
```
我參與g0v Hackath, 該項目是使用區塊鏈技術(IPFS/Arweave + ISCN)對新聞媒體/史料/作品等等進行保存,利用區塊鏈的抗審查,
防下架技術來永久保存.我主要參與項目後段的browser開發,因為資料都有備份上鏈後,若沒有一個好的平台可以查閱是很可惜的一件事,
所以我們利用ISCN技術將關鍵字查找等功能做成一個瀏覽器,讓使用者可以查閱這些被消失的史料
```

* If you were given the resource and freedom to start and maintain an open source project, what problem do you choose to solve, and how would you setup the community guideline and collabration process?
```
我最想做的項目會是去中心化論壇
其實從twitter BAN 川普事件就可以看出,當中心化的社交平台決定封殺一個人時,貴為美國總統都沒有辦法救濟,也許他的言論確實並非正確,
但我認為每個讀者都該有自行判斷是否願意接受該資訊的權利,我認為可以架設去中心化論壇讓所有使用者只要有錢包地址都可以支付gas fee後
發表自己的立場,再透過客製化瀏覽器讓各用戶自行決定你想看到什麼資訊(詳見Section 2-1)
社群開發流程我認為需要先統一資料格式,並提供各式的key word以供資訊分類,當有共識地將資料上傳後,鏈就是最好的server + database,
可以讓各開發者發想如何使用這些資料,並且互相交換意見,在這專案中開源甚至不只是一個項目,它可以是每個人都有各自的介面運用.
```

