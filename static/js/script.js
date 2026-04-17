const menuData = {
    "waffles": {
        title: "Вафли и корн-доги",
        items: [
            {
                id: 1,
                name: "Вафли гонконские",
                description: "со взбитыми сливками и мороженым",
                price: "350",
                weight: "250гр",
                volume: "250гр",
                calories: "410.5 ккал",
                proteins: "7.1",
                fats: "24.3",
                carbs: "45.6",
                imageIcon: "fa-cookie-bite",
                imagePath: "images/dishes/мороженое-и-сливки.jpg"
            },
            {
                id: 2,
                name: "Вафли гонконские с рыбой",
                description: "с красной рыбой и твороженым сыром",
                price: "420",
                weight: "270гр",
                volume: "270гр",
                calories: "405.2 ккал",
                proteins: "10.4",
                fats: "11.8",
                carbs: "17.5",
                imageIcon: "fa-fish",
                imagePath: "images/dishes/рыбка-и-сыр.jpg"
            },
            {
                id: 3,
                name: "Вафли гонконские с пеперонни",
                description: "",
                price: "390",
                weight: "230гр",
                volume: "230гр",
                calories: "370.5 ккал",
                proteins: "9.5",
                fats: "10.1",
                carbs: "15.3",
                imageIcon: "fa-pepper-hot",
                imagePath: "images/dishes/впепперони.jpg"
            },
            {
                id: 4,
                name: "Вафли гонконские ветчина сыр",
                description: "",
                price: "390",
                weight: "240гр",
                volume: "240гр",
                calories: "395.4 ккал",
                proteins: "11.7",
                fats: "15.3",
                carbs: "20.8",
                imageIcon: "fa-cheese",
                imagePath: "images/dishes/ветчина-и-сыр.jpg"
            },
            {
                id: 5,
                name: "Корн дог",
                description: "Сосиска, соус горчичный, кетчуп",
                price: "350",
                weight: "140гр",
                volume: "140гр",
                calories: "480.3 ккал",
                proteins: "18.1",
                fats: "6.9",
                carbs: "30.1",
                imageIcon: "fa-hotdog",
                imagePath: "images/dishes/корн-дог.png"
            },
            {
                id: 6,
                name: "Чиз дог",
                description: "Сыр моцарелла, соус сырный",
                price: "320",
                weight: "120гр",
                volume: "120гр",
                calories: "391.2 ккал",
                proteins: "15.2",
                fats: "5.8",
                carbs: "25.2",
                imageIcon: "fa-hotdog",
                imagePath: "images/dishes/чиз-дог.png"
            }
        ]
    },
    "snacks": {
        title: "Закуски",
        items: [
            {
                id: 7,
                name: "Пивной сет №1",
                description: "Гренки пивные, фри, охотничьи колбаски, пепперони. Соус: чесночный и кетчуп",
                price: "850",
                weight: "",
                volume: "",
                calories: "",
                proteins: "",
                fats: "",
                carbs: "",
                imageIcon: "fa-beer",
                imagePath: "images/dishes/beer_set1.jpg"
            },
            {
                id: 8,
                name: "Пивной сет №2",
                description: "Луковые кольца, крылья фри, стрипсы, арахис. Соус: BBQ и чесночный",
                price: "990",
                weight: "",
                volume: "",
                calories: "",
                proteins: "",
                fats: "",
                carbs: "",
                imageIcon: "fa-beer",
                imagePath: "images/dishes/beer_set2.jpg"
            }
        ]
    },
    "children": {
        title: "Детям",
        items: [
            {
                id: 66,
                name: "Картошка фри ",                
                description: "картофель + соус 30гр",
                price: "230",
                volume: "100гр",
                imageIcon: "fa-child",
                imagePath: "images/dishes/фри.png"
            },
            {
                id: 67,
                name: "Наггетсы",
                description: "",
                price: "290",
                volume: "110гр",
                imageIcon: "fa-child",
                imagePath: "images/dishes/наггетсы.png"
            },
            {
                id: 68,
                name: "Стрипсы куринные",
                description: "",
                price: "320",
                volume: "130гр",
                imageIcon: "fa-child",
                imagePath: "images/dishes/стрипсы.png"
            },
        ]
    },
    "desserts": {
        title: "Десерты",
        items: [
            {
                id: 9,
                name: "Кейс Попс",
                description: "Шоколад молочный, мука пшеничная, вафельная крошка, сахар, сметана, яйцо куриное",
                volume: "50гр",
                price: "230",
                weight: "50гр",
                imageIcon: "fa-cookie",
                imagePath: "images/dishes/кейк-попс.png"
            },
            {
                id: 10,
                name: "Чизкейк манго",
                description: "Сыр творожный, пюре манго, сахар, сливочное масло, мука пшеничная, яйцо куриное, соль, ванилин",
                volume: "150гр",
                price: "390",
                weight: "150гр",
                imageIcon: "fa-cheese",
                imagePath: "images/dishes/cheesecake_mango.jpg"
            },
            {
                id: 11,
                name: "Птичье молоко",
                description: "Яйцо куриное, сахар, мука пшеничная, масло сливочное, какао порошок, сгущенное молоко",
                volume: "85гр",
                price: "330",
                weight: "85гр",
                imageIcon: "fa-birthday-cake",
                imagePath: "images/dishes/птичье-молоко.png"
            },
            {
                id: 12,
                name: "Наполеон",
                description: "Мука пшеничная, масло сливочное, сахар, соль, молоко, яйцо куриное, сгущенное молоко",
                volume: "100гр",
                price: "390",
                weight: "100гр",
                imageIcon: "fa-birthday-cake",
                imagePath: "images/dishes/наполеон.png"
            },
            {
                id: 21,
                name: "Чизкейк жаренный",
                description: "Сыр творожный,сахар,сливочное масло,мука пшеничная,яйцо куриное,соль,ванилин",
                volume: "150гр",
                price: "430",
                weight: "150гр",
                imageIcon: "fa-birthday-cake",
                imagePath: "images/dishes/napoleon.jpg"
            },
            {
                id: 22,
                name: "Медовик",
                description: "Мука пшеничная,сахар,мед,яйцо куриное,молоко,разрыхлитель",
                volume: "150гр",
                price: "390",
                weight: "150гр",
                imageIcon: "fa-birthday-cake",
                imagePath: "images/dishes/napoleon.jpg"
            },
            {
                id: 23,
                name: "Эклер ваниль",
                description: "Мука пшеничная,масло сливочное,сахар,яйцо куриное,молоко,ваниль",
                volume: "110гр",
                price: "290",
                weight: "110гр",
                imageIcon: "fa-birthday-cake",
                imagePath: "images/dishes/эклеры.png"
            },
            {
                id: 24,
                name: "Эклер соленая карамель",
                description: "Мука пшеничная,яйцо куриное,сахар,соль,сливки,молоко",
                volume: "110гр",
                price: "290",
                weight: "110гр",
                imageIcon: "fa-birthday-cake",
                imagePath: "images/dishes/эклеры.png"
            },
            {
                id: 29,
                name: "Сладкая вата",
                description: "Сахар,краситель пищевой",
                price: "120",
                weight: "14гр",
                imageIcon: "fa-birthday-cake",
                imagePath: "images/dishes/вата.png"
            }
        ]
    },
    "ice-cream": {
        title: "Мороженое",
        items: [
            {
                id: 69,
                name: "1 Шарик",
                description: "",
                price: "120",
                imageIcon: "fa-ice-cream",
                imagePath: "images/dishes/мороженое.png"
            },
            {
                id: 70,
                name: "2 Шарика",
                description: "",
                price: "220",
                imageIcon: "fa-ice-cream",
                imagePath: "images/dishes/мороженое.png"
            },
            {
                id: 71,
                name: "3 Шарика",
                description: "",
                price: "280",
                imageIcon: "fa-ice-cream",
                imagePath: "images/dishes/мороженое.png"
            },
        ]
    },
    "scandy-mill": {
        title: "Сканди-Милл",
        items: [
            {
                id: 72,
                name: "Бургер/Фри/Сок",
                description: "+ игрушка",
                volume: "300/25/200гр",
                price: "790",
                imageIcon: "fa-hamburger",
                imagePath: "images/dishes/сканди-милл.png"
            },
            {
                id: 73,
                name: "Наггетсы/Фри/Сок",
                description: "+ игрушка",
                volume: "180/25/200гр",
                price: "790",
                imageIcon: "fa-hamburger",
                imagePath: "images/dishes/сканди-милл.png"
            },
            {
                id: 74,
                name: "Стрипсы/Фри/Сок",
                description: "+ игрушка",
                volume: "200/25/200гр",
                price: "790",
                imageIcon: "fa-hamburger",
                imagePath: "images/dishes/сканди-милл.png"
            },
        ]
    },
    "pizza": {
        title: "Пицца",
        items: [
            {
                id: 17,
                name: "Маргарита",
                description: "Томатная основа, тесто для пиццы, помидоры, моцарелла шарики, пармезан, прованские травы, моцарелла",
                volume: "470гр",
                price: "650",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/маргарита.png"
            },
            {
                id: 18,
                name: "Пепперони",
                description: "Томатная основа, тесто для пиццы, пепперони, моцарелла, помидоры, пармезан, прованские травы",
                volume: "460гр",
                price: "670",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/пепперони.png"
            },
            {
                id: 19,
                name: "Сырная",
                description: "Сливочная основа, тесто для пиццы, моцарелла, чеддер, дор-блю, пармезан, прованские травы",
                volume: "410гр",
                price: "650",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/сырная.png"
            },
            {
                id: 20,
                name: "Мясная",
                description: "Томатная/Сливочная основа, тесто для пиццы, ветчина, бекон, пепперони, сосиски, моцарелла, пармезан, прованские травы",
                volume: "490гр",
                price: "720",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/мясная.png"
            },
            {
                id: 60,
                name: "С телятиной",
                description: "Тесто для пиццы, ветчина, бекон, пепперони, сосиски, моцарелла, пармезан, прованские травы",
                volume: "450гр",
                price: "720",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/телятина.png"
            },
            {
                id: 61,
                name: "Гавайская",
                description: "Тесто для пиццы, ветчина, бекон, пепперони, сосиски, моцарелла, пармезан, прованские травы",
                volume: "460гр",
                price: "650",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/гавайская.png"
            },
            {
                id: 62,
                name: "Ветчина-грибы",
                description: "Томатная/Сливочная основа, тесто для пиццы, ветчина, бекон, пепперони, сосиски, моцарелла, пармезан, прованские травы",
                volume: "480гр",
                price: "650",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/ветчина-грибы.png"
            },
            {
                id: 63,
                name: "Курица-бекон",
                description: "Томатная/Сливочная основа, тесто для пиццы, ветчина, бекон, пепперони, сосиски, моцарелла, пармезан, прованские травы",
                volume: "470гр",
                price: "690",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/курица-бекон.png"
            },
            {
                id: 644,
                name: "Курица-грибы",
                description: "Томатная/Сливочная основа, тесто для пиццы, ветчина, бекон, пепперони, сосиски, моцарелла, пармезан, прованские травы",
                volume: "450гр",
                price: "650",
                imageIcon: "fa-pizza-slice",
                imagePath: "images/dishes/курица-грибы.png"
            }
        ]
    },
    "avto": {
        title: "Авто Комбо",
        items: [
            {
                id: 75,
                name: "Сырные палочки/Фри/Морс",
                description:"",
                volume: "100/70/200гр",
                price: "650",
                imageIcon: "fa-car",
                imagePath: "images/dishes/авто-сырные-палочки.jpg"
            },
            {
                id: 76,
                name: "Наггетсы/Фри/Морс",
                description:"",
                volume: "110/70/200гр",
                price: "650",
                imageIcon: "fa-car",
                imagePath: "images/dishes/авто-нагетсы.jpg"
            },
            {
                id: 77,
                name: "Стрипсы/Фри/Морс",
                description:"",
                volume: "130/70/200гр",
                price: "650",
                imageIcon: "fa-car",
                imagePath: "images/dishes/авто-стрипсы.jpg"
            }
        ]
    },
    "drinks": {
        title: "Напитки",
        type: "dropdown",
        subgroups: {
            "lemonades": {
                title: "Лимонады",
                icon: "fa-glass-whiskey",
                items: [
                    {
                        id: 35,
                        name: "Лимонад классический",
                        description: "Лимон, сахар, мята свежая, вода минеральная",
                        price: "270",
                        volume: "380мл",
                        imagePath: "images/dishes/лимонад.png"
                    },
                    {
                        id: 791,
                        name: "Лимонад классический",
                        description: "Лимон, сахар, мята свежая, вода минеральная",
                        price: "550",
                        volume: "1000мл",
                        imagePath: "images/dishes/лим-класс-1000.png"
                    },
                    {
                        id: 36,
                        name: "Морс ягодный",
                        description: "Пюре брусничное, сахар, вода",
                        price: "110",
                        volume: "300мл",
                        imagePath: "images/dishes/морс.png"
                    },
                    {
                        id: 361,
                        name: "Морс ягодный",
                        description: "Пюре брусничное, сахар, вода",
                        price: "350",
                        volume: "1000мл",
                        imagePath: "images/dishes/морс-1000.png"
                    },
                    {
                        id: 37,
                        name: "Лимонад Зеленое яблоко",
                        description: "Сок яблочный, сироп мятный, сироп зеленое яблоко, мята, лайм, вода минеральная",
                        price: "270",
                        volume: "380мл",
                        imagePath: "images/dishes/зеленое-яблоко.png"                        
                    },
                    {
                        id: 38,
                        name: "Лимонад Зеленое яблоко",
                        description: "Сок яблочный, сироп мятный, сироп зеленое яблоко, мята, лайм, вода минеральная",
                        price: "600",
                        volume: "1000мл",
                        imagePath: "images/dishes/зеленое-яблоко-1000.png" 
                    },
                    {
                        id: 39,
                        name: "Мохито",
                        description: "Лайм пюре, мята свежая, сахарный сироп, спрайт, вода минеральная, лайм",
                        price: "270",
                        volume: "380мл",
                        imagePath: "images/dishes/мохито.png"                         
                    },
                    {
                        id: 40,
                        name: "Лимонад манго-маракуйя",
                        description: "Пюре манго, пюре маракуйя, сок лимона, вода минеральная, сироп сахарный",
                        price: "270",
                        volume: "380мл",
                        imagePath: "images/dishes/манго.png"  
                    },
                    {
                        id: 43,
                        name: "Бабл ти фруктовый",
                        description: "Джусболлы, пюре фруктовое, сироп, вода",
                        price: "390",
                        volume: "500мл",
                        imagePath: "images/dishes/баблти-фрукт.png"
                    },
                    {
                        id: 41,
                        name: "Бабл ти манго",
                        description: "Джусболлы, пюре фруктовое, сироп, вода",
                        price: "390",
                        volume: "500мл",
                        imagePath: "images/dishes/баблти-манго.png"
                    },
                    {
                        id: 44,
                        name: "Лимонад манго-маракуйя",
                        description: "Пюре манго, пюре маракуйя, сок лимона, вода минеральная, сироп сахарный",
                        price: "600",
                        volume: "1000мл",
                        imagePath: "images/dishes/манго.png" 
                    }
                ]
            },
            "cocktails": {
                title: "Коктейли",
                icon: "fa-cocktail",
                items: [
                    {
                        id: 32,
                        name: "Молочный коктейль клубничный",
                        description: "Молоко, мороженое, сироп",
                        price: "350",
                        volume: "300мл",
                        imagePath: "images/dishes/молочный коктель.jpg"
                    },
                    {
                        id: 94,
                        name: "Молочный коктейль ваниль",
                        description: "Молоко, мороженое, сироп",
                        price: "350",
                        volume: "300мл",
                        imagePath: "images/dishes/молочный-коктель-ваниль.jpg"
                    },
                    {
                        id: 95,
                        name: "Молочный коктель шоколад",
                        description: "Молоко, мороженое, сироп",
                        price: "350",
                        volume: "300мл",
                        imagePath: "images/dishes/молочный-коктель-шоколад.jpg"
                    },
                    {
                        id: 33,
                        name: "Овершейк классический",
                        description: "Молоко, мороженое, сироп, топинг, сливки взбитые, маршмеллоу, шоколад в глазури",
                        price: "650",
                        volume: "450мл",
                        imagePath: "images/dishes/овер-классика.jpg"                        
                    },
                    {
                        id: 34,
                        name: "Овершейк орео",
                        description: "Молоко, мороженое, сироп, топинг, сливки взбитые, шоколадная крошка, орео",
                        price: "650",
                        volume: "450мл",
                        imagePath: "images/dishes/овер-орео.jpg"                        
                    },
                ]
            },
            "beer": {
                title: "Пиво и Сидр",
                icon: "fa-beer",
                items: [
                    {
                        id: 84,
                        name: "Strakovice svetle",
                        description: "",
                        price: "350",
                        volume: "450мл",
                        alcoholContent: "4.7%",
                        imagePath: "images/dishes/пиво.png"                        
                    },
                    {
                        id: 85,
                        name: "Strakovice nefiltrovano",
                        description: "",
                        price: "350",
                        volume: "450мл",
                        alcoholContent: "4.7%",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 86,
                        name: "Strakovice tmave",
                        description: "",
                        price: "350",
                        volume: "450мл",
                        alcoholContent: "4.5%",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 87,
                        name: "Жигули барное",
                        description: "бархатное",
                        price: "250",
                        volume: "450мл",
                        alcoholContent: "4.5%",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 88,
                        name: "Жигули Пшеничное",
                        description: "",
                        price: "250",
                        volume: "450мл",
                        alcoholContent: "4.9%",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 89,
                        name: "Hollandia Blanche",
                        description: "",
                        price: "300",
                        volume: "450мл",
                        alcoholContent: "4.9%",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 90,
                        name: "Hollandia malt",
                        description: "б/а",
                        price: "250",
                        volume: "450мл",
                        alcoholContent: "0.0%",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 911,
                        name: "Жигули барное",
                        description: "б/а",
                        price: "250",
                        volume: "450мл",
                        alcoholContent: "0.0%",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 92,
                        name: "Пиво розлив",
                        description: "в ассортименте",
                        price: "350",
                        volume: "500мл",
                        alcoholContent: "",
                        imagePath: "images/dishes/пиво.png"  
                    },
                    {
                        id: 93,
                        name: "Сидр Backswood",
                        description: "в ассортименте",
                        price: "350",
                        volume: "500мл",
                        alcoholContent: "",
                        imagePath: "images/dishes/пиво.png"  
                    }
                ]
            },
            "tea": {
                title: "Чай",
                icon: "fa-mug-hot",
                items: [
                    {
                        id: 50,
                        name: "Авторский чай с облепихой",
                        description: "Чай черный, облепиха, сахар, корица палочки, апельсины, бадьян, гвоздика",
                        price: "450",
                        volume: "600мл",
                        imagePath: "images/dishes/облепиха.png"
                    },
                    {
                        id: 53,
                        name: "Авторский чай лимонный имбирь",
                        description: "Чай зеленый, лимоны, имбирь, сахар, мята",
                        price: "450",
                        volume: "600мл",
                        imagePath: "images/dishes/лимон-имбирь.png"
                    },
                    {
                        id: 52,
                        name: "Авторский чай с клюквой",
                        description: "Чай черный, клюква, сахар, лимоны, гвоздика, перец черный",
                        price: "450",
                        volume: "600мл",
                        imagePath: "images/dishes/клюква.png"                        
                    },
                                    
                    {
                        id: 54,
                        name: "Травянной - Рассвет",
                        description: "Иван чай, мята горная, смородины лист, акация, жасмин",
                        price: "350",
                        volume: "600мл",
                        imagePath: "images/dishes/рассвет.png"
                    },
                    {
                        id: 55,
                        name: "Травянной - Иммунитет",
                        description: "Горная мята, лист смородины, лист брусники, розмарин, календула, астрагал",
                        price: "350",
                        volume: "600мл",
                        imagePath: "images/dishes/иммунитет.jpg"
                    },
                    {
                        id: 56,
                        name: "Травянной - Согревай",
                        description: "Лист малины, чабрец, ягоды бузины, апельсин, имбирь",
                        price: "350",
                        volume: "600мл",
                        imagePath: "images/dishes/согревай.jpg"
                    },
                    {
                        id: 57,
                        name: "Травянной - Дух леса",
                        description: "Иван чай ферментированный, чабрец, курильский чай, хвоя пихты, дольки апельсина, сушеная вишня",
                        price: "350",
                        volume: "600мл",
                        imagePath: "images/dishes/дух-леса.jpg"
                    },
                    {
                        id: 58,
                        name: "Травянной - Фруктовый",
                        description: "Иван чай ферментированный крупнолистовой, тархун, супер мята, клубника, апельсин, киви, яблоко",
                        price: "350",
                        volume: "600мл",
                        imagePath: "images/dishes/фруктовый.jpg"
                    },
                    {
                        id: 59,
                        name: "Травянной - Антистресс",
                        description: "Лаванда, вербена, акация, мята горная, котовник",
                        price: "350",
                        volume: "600мл",
                        imagePath: "images/dishes/антистресс.jpg"
                    },
                    {
                        id: 51,
                        name: "Чай листовой",
                        description: "Чай пакетированный, сахар рафинад",
                        price: "250",
                        volume: "600мл",
                        imagePath: "images/dishes/листовой.jpg" 
                    },  
                ]
            },
            "coffee": {
                title: "Кофе",
                icon: "fa-mug-saucer",
                items: [
                    {
                        id: 45,
                        name: "Эспрессо",
                        description: "Кофе зерновой, вода",
                        price: "150",
                        volume: "30мл",
                        imagePath: "images/dishes/кофе.png" 
                    },
                    {
                        id: 46,
                        name: "Американо",
                        description: "Кофе зерновой, вода",
                        price: "200",
                        volume: "150мл",
                        imagePath: "images/dishes/кофе.png" 
                    },
                    {
                        id: 47,
                        name: "Капучино",
                        description: "Кофе зерновой, вода, молоко",
                        price: "220",
                        volume: "200мл",
                        imagePath: "images/dishes/кофе.png" 
                    },
                    {
                        id: 48,
                        name: "Капучино",
                        description: "Кофе зерновой, вода, молоко",
                        price: "250",
                        volume: "300мл",
                        imagePath: "images/dishes/кофе.png" 
                    },
                    {
                        id: 49,
                        name: "Латте",
                        description: "Кофе зерновой, вода, молоко",
                        price: "220",
                        volume: "200мл",
                        imagePath: "images/dishes/кофе.png" 
                    },
                    {
                        id: 78,
                        name: "Латте",
                        description: "Кофе зерновой, вода, молоко",
                        price: "290",
                        volume: "300мл",
                        imagePath: "images/dishes/кофе.png" 
                    }
                ]
            },
            "other": {
                title: "Другие напитки",
                icon: "fa-wine-bottle",
                items: [
                    {
                        id: 42,
                        name: "Вода",
                        description: "",
                        price: "100",
                        volume: "500мл",
                        imagePath: "images/dishes/"
                    },
                    {
                        id: 792,
                        name: "Вода",
                        description: "",
                        price: "160",
                        volume: "1500мл",
                        imagePath: "images/dishes/"
                    },
                    {
                        id: 80,
                        name: "Сок",
                        description: "",
                        price: "90",
                        volume: "200мл",
                        imagePath: "images/dishes/"
                    },
                    {
                        id: 81,
                        name: "Сок",
                        description: "",
                        price: "350",
                        volume: "950мл",
                        imagePath: "images/dishes/"
                    },
                    {
                        id: 82,
                        name: "Черноголовка чай",
                        description: "",
                        price: "160",
                        volume: "500мл",
                        imagePath: "images/dishes/"
                        
                    },
                    {
                        id: 83,
                        name: "Черноголовка",
                        description: "",
                        price: "160",
                        volume: "500мл",
                        imagePath: "images/dishes/"
                    }
                ]
            }
        }
    }
};

// Настройки отображения
const SHOW_NUTRITION = false;      // Показывать калорийность
const SHOW_WEIGHT = false;         // Показывать вес
const USE_DISH_IMAGES = true;      // Использовать изображения блюд
const SHOW_ALCOHOL_CONTENT = true; // Показывать алкоголь 

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Текущая подгруппа напитков
let currentDrinksSubgroupId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    renderMenuSections();
    updateCartCount();
    setupTouchEvents();

    // Set first category as active
    const firstCategory = Object.keys(menuData)[0];
    showCategory(firstCategory);

    // Event listeners
    document.getElementById('cartIcon').addEventListener('click', openCart);
    document.getElementById('closeCart').addEventListener('click', closeCart);
    document.getElementById('mobileMenuBtn').addEventListener('click', openMobileNav);
    document.getElementById('closeMobileNav').addEventListener('click', closeMobileNav);
    
    // Image modal event listeners
    document.getElementById('closeImageModal').addEventListener('click', closeImageModal);
    document.getElementById('imageModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeImageModal();
        }
    });

    // Close cart when clicking outside
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCart();
        }
    });

    // Close mobile nav when clicking outside
    document.getElementById('mobileNav').addEventListener('click', function(e) {
        if (e.target === this) {
            closeMobileNav();
        }
    });

    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Закрытие модального окна изображений по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeImageModal();
        }
    });
});

// Setup touch events for mobile
function setupTouchEvents() {
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    document.querySelectorAll('button, .menu-card').forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.opacity = '0.8';
        });
        
        element.addEventListener('touchend', function() {
            this.style.opacity = '';
        });
    });
}

// Handle window resize
function handleResize() {
    if (window.innerWidth <= 768) {
        initMobileQuickNav();
        
        // Для мобильных устройств добавляем горизонтальную прокрутку вкладок
        const drinksTabs = document.getElementById('drinksTabs');
        if (drinksTabs) {
            drinksTabs.style.overflowX = 'auto';
            drinksTabs.style.paddingBottom = '10px';
        }
    } else {
        document.getElementById('categoryQuickNav').innerHTML = '';
        const drinksTabs = document.getElementById('drinksTabs');
        if (drinksTabs) {
            drinksTabs.style.overflowX = 'visible';
        }
    }
}

// Initialize navigation
function initNavigation() {
    const categoryNav = document.getElementById('categoryNav');
    const mobileCategories = document.getElementById('mobileCategories');

    Object.keys(menuData).forEach((categoryId, index) => {
        const category = menuData[categoryId];
        
        // Desktop nav
        const desktopLink = document.createElement('a');
        desktopLink.href = '#';
        desktopLink.dataset.category = categoryId;
        desktopLink.textContent = category.title;
        if (index === 0) desktopLink.classList.add('active');

        desktopLink.addEventListener('click', function(e) {
            e.preventDefault();
            showCategory(categoryId);
            updateActiveNav(categoryId);
        });

        categoryNav.appendChild(desktopLink);

        // Mobile nav
        const mobileLink = document.createElement('a');
        mobileLink.href = '#';
        mobileLink.dataset.category = categoryId;
        mobileLink.textContent = category.title;
        if (index === 0) mobileLink.classList.add('active');

        mobileLink.addEventListener('click', function(e) {
            e.preventDefault();
            showCategory(categoryId);
            updateActiveNav(categoryId);
            closeMobileNav();
        });

        mobileCategories.appendChild(mobileLink);
    });

    // Initialize mobile quick nav if needed
    if (window.innerWidth <= 768) {
        initMobileQuickNav();
    }
}

// Initialize mobile quick navigation
function initMobileQuickNav() {
    const quickNav = document.getElementById('categoryQuickNav');
    quickNav.innerHTML = '';

    Object.keys(menuData).forEach((categoryId, index) => {
        const category = menuData[categoryId];
        const link = document.createElement('a');
        link.href = '#';
        link.dataset.category = categoryId;
        link.textContent = category.title;
        if (index === 0) link.classList.add('active');

        link.addEventListener('click', function(e) {
            e.preventDefault();
            showCategory(categoryId);
            updateActiveNav(categoryId);
            
            // Scroll to category
            const element = document.getElementById(`category-${categoryId}`);
            if (element) {
                const offset = 150;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });

        quickNav.appendChild(link);
    });
}

// Update active navigation
function updateActiveNav(categoryId) {
    // Update desktop nav
    document.querySelectorAll('.category-nav a').forEach(a => {
        a.classList.toggle('active', a.dataset.category === categoryId);
    });

    // Update mobile nav
    document.querySelectorAll('.mobile-categories a').forEach(a => {
        a.classList.toggle('active', a.dataset.category === categoryId);
    });

    // Update quick nav
    document.querySelectorAll('.category-quick-nav a').forEach(a => {
        a.classList.toggle('active', a.dataset.category === categoryId);
    });
}

// Render menu sections
function renderMenuSections() {
    const menuSections = document.getElementById('menuSections');

    Object.keys(menuData).forEach(categoryId => {
        const category = menuData[categoryId];

        const section = document.createElement('section');
        section.id = `category-${categoryId}`;
        section.className = 'category-section';

        let itemsHTML = '';
        
        // Проверяем, является ли категория напитками с подгруппами
        if (category.subgroups && category.type === 'dropdown') {
            // Создаем вкладки вместо выпадающего списка
            let tabsHTML = '<div class="drinks-tabs-container"><div class="drinks-tabs" id="drinksTabs">';
            
            // Создаем вкладки для каждой подгруппы
            Object.keys(category.subgroups).forEach(subgroupId => {
                const subgroup = category.subgroups[subgroupId];
                const icon = subgroup.icon || 'fa-glass-whiskey';
                tabsHTML += `
                    <div class="drinks-tab" data-subgroup="${subgroupId}">
                        <i class="fas ${icon}"></i>
                        ${subgroup.title}
                    </div>
                `;
            });
            
            tabsHTML += '</div><div class="drinks-content"><div class="menu-grid" id="drinksMenuGrid"></div></div></div>';
            
            // Подсчет общего количества позиций
            let totalItems = 0;
            Object.keys(category.subgroups).forEach(subgroupId => {
                totalItems += category.subgroups[subgroupId].items.length;
            });

            section.innerHTML = `
            <div class="category-title">
                <h2>${category.title}</h2>
                <span>${totalItems} позиций</span>
            </div>
            ${tabsHTML}
            `;
            
            // Загружаем первую подгруппу по умолчанию
            const firstSubgroupId = Object.keys(category.subgroups)[0];
            if (firstSubgroupId) {
                setTimeout(() => {
                    loadDrinksSubgroup(firstSubgroupId);
                    currentDrinksSubgroupId = firstSubgroupId;
                    
                    // Активируем первую вкладку
                    const firstTab = document.querySelector(`.drinks-tab[data-subgroup="${firstSubgroupId}"]`);
                    if (firstTab) {
                        firstTab.classList.add('active');
                    }
                }, 0);
            }
        } else {
            // Обычная категория без подгрупп
            category.items.forEach(item => {
                const cartItem = cart.find(ci => ci.id === item.id);
                const quantityInCart = cartItem ? cartItem.quantity : 0;
                
                itemsHTML += renderMenuItem(item, quantityInCart);
            });

            section.innerHTML = `
            <div class="category-title">
                <h2>${category.title}</h2>
                <span>${category.items.length} позиций</span>
            </div>
            <div class="menu-grid">
                ${itemsHTML}
            </div>
            `;
        }

        menuSections.appendChild(section);
    });

    // Добавляем обработчики событий для карточек и изображений
    setupImageClickHandlers();
    setupAddToCartHandlers();
    setupDrinksTabHandlers();
}

// Настройка обработчиков клика по изображениям
function setupImageClickHandlers() {
    // Обработчики для увеличения изображений
    document.addEventListener('click', function(e) {
        const cardImage = e.target.closest('.card-image');
        if (cardImage) {
            const img = cardImage.querySelector('.dish-image.loaded');
            if (img && img.src && img.src !== '') {
                openImageModal(img.src);
            }
        }
    });
}

// Настройка обработчиков для кнопок "В корзину"
function setupAddToCartHandlers() {
    document.addEventListener('click', function(e) {
        const addToCartBtn = e.target.closest('.add-to-cart');
        if (addToCartBtn) {
            e.preventDefault();
            e.stopPropagation();
            const itemId = parseInt(addToCartBtn.dataset.id);
            addToCart(itemId);
        }
    });
}

// Настройка обработчиков для вкладок напитков
function setupDrinksTabHandlers() {
    document.addEventListener('click', function(e) {
        const drinksTab = e.target.closest('.drinks-tab');
        if (drinksTab) {
            e.preventDefault();
            const subgroupId = drinksTab.dataset.subgroup;
            if (subgroupId && subgroupId !== currentDrinksSubgroupId) {
                loadDrinksSubgroup(subgroupId);
                currentDrinksSubgroupId = subgroupId;
                
                // Обновляем активную вкладку
                document.querySelectorAll('.drinks-tab').forEach(t => {
                    t.classList.remove('active');
                });
                drinksTab.classList.add('active');
            }
        }
    });
}

// Helper function to render menu item
function renderMenuItem(item, quantityInCart) {
    const showWeight = SHOW_WEIGHT && item.weight && item.weight.trim() !== '';
    const showVolume = item.volume && item.volume.trim() !== '';
    const showAlcohol = SHOW_ALCOHOL_CONTENT && item.alcoholContent;
    
    return `
    <div class="menu-card" data-id="${item.id}">
        <div class="card-image">
            <i class="fas ${item.imageIcon} dish-icon"></i>
            
            ${USE_DISH_IMAGES && item.imagePath ? `
            <img class="dish-image" 
                 src="${item.imagePath}" 
                 alt="${item.name}" 
                 loading="lazy"
                 onload="this.classList.add('loaded'); this.parentElement.querySelector('.dish-icon').style.display='none';"
                 onerror="this.style.display='none'; this.parentElement.querySelector('.dish-icon').style.display='block';">
            ` : ''}
        </div>
        <div class="card-content">
            <div class="card-header">
                <h3 class="card-title">${item.name}</h3>
                <div class="card-price">${item.price} ₽</div>
            </div>
            
            <div class="info-row">
                ${showWeight ? `<span class="weight-info">${item.weight}</span>` : ''}
                ${showVolume ? `<span class="volume-info">${item.volume}</span>` : ''}
                ${showAlcohol ? `<span class="alcohol-info">${item.alcoholContent}</span>` : ''}
            </div>
            
            ${item.description ? `<p class="card-description">${item.description}</p>` : ''}

            <div class="card-footer">
                <button class="add-to-cart" data-id="${item.id}">
                    ${quantityInCart > 0 ? `${quantityInCart} в корзине` : 'В корзину'}
                </button>
            </div>
        </div>
    </div>
    `;
}
// Load drinks subgroup
function loadDrinksSubgroup(subgroupId) {
    const drinksMenuGrid = document.getElementById('drinksMenuGrid');
    const category = menuData.drinks;
    const subgroup = category.subgroups[subgroupId];
    
    if (!drinksMenuGrid || !subgroup) return;
    
    let itemsHTML = '';
    subgroup.items.forEach(item => {
        const cartItem = cart.find(ci => ci.id === item.id);
        const quantityInCart = cartItem ? cartItem.quantity : 0;
        
        itemsHTML += renderMenuItem(item, quantityInCart);
    });
    
    drinksMenuGrid.innerHTML = itemsHTML;
}

// Show selected category
function showCategory(categoryId) {
    document.querySelectorAll('.category-section').forEach(section => {
        section.classList.remove('active');
    });

    const selectedSection = document.getElementById(`category-${categoryId}`);
    if (selectedSection) {
        selectedSection.classList.add('active');
        
        // Scroll to top of category on mobile
        if (window.innerWidth <= 768) {
            setTimeout(() => {
                selectedSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }
}

// Mobile navigation
function openMobileNav() {
    document.getElementById('mobileNav').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('active');
    document.body.style.overflow = '';
}

// Функции для работы с модальным окном изображения
function openImageModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = imageSrc;
    modalImage.alt = 'Увеличенное изображение блюда';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
    document.getElementById('modalImage').src = '';
}

// Toast notification
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'toast show';
    
    if (type === 'success') {
        toast.style.backgroundColor = '#4CAF50';
    } else if (type === 'error') {
        toast.style.backgroundColor = '#f44336';
    } else {
        toast.style.backgroundColor = 'var(--primary-dark)';
    }
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Cart functions
function addToCart(itemId) {
    // Find the item in all categories and subgroups
    let item = null;
    
    for (const categoryId in menuData) {
        const category = menuData[categoryId];
        
        if (category.subgroups) {
            // Search in subgroups
            for (const subgroupId in category.subgroups) {
                const foundItem = category.subgroups[subgroupId].items.find(i => i.id === itemId);
                if (foundItem) {
                    item = foundItem;
                    break;
                }
            }
        } else {
            // Search in regular items
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
                item = foundItem;
                break;
            }
        }
        
        if (item) break;
    }

    if (!item) return;

    // Check if item already in cart
    const existingItem = cart.find(cartItem => cartItem.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: item.id,
            name: item.name,
            price: parseInt(item.price),
            quantity: 1
        });
    }

    updateCartCount();
    saveCartToLocalStorage();
    updateAddToCartButton(itemId);

    // Show visual feedback
    const button = document.querySelector(`.add-to-cart[data-id="${itemId}"]`);
    if (button) {
        button.classList.add('added');
        setTimeout(() => button.classList.remove('added'), 300);
    }
    
    showToast(`"${item.name}" добавлен в корзину`, 'success');
    
    // Haptic feedback on supported devices
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }
}

// Update quantity in cart
function updateQuantity(itemId, change) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const item = cart[itemIndex];
    const newQuantity = item.quantity + change;
    
    if (newQuantity <= 0) {
        cart.splice(itemIndex, 1);
        showToast(`"${item.name}" удален из корзины`, 'error');
    } else {
        item.quantity = newQuantity;
        const itemData = getItemData(itemId);
        showToast(`Количество "${itemData.name}" изменено на ${newQuantity}`, 'info');
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    updateAddToCartButton(itemId);
    renderCartItems();
    
    if (navigator.vibrate) {
        navigator.vibrate(30);
    }
}

// Get item data by ID
function getItemData(itemId) {
    for (const categoryId in menuData) {
        const category = menuData[categoryId];
        
        if (category.subgroups) {
            for (const subgroupId in category.subgroups) {
                const foundItem = category.subgroups[subgroupId].items.find(i => i.id === itemId);
                if (foundItem) {
                    return foundItem;
                }
            }
        } else {
            const foundItem = category.items.find(i => i.id === itemId);
            if (foundItem) {
                return foundItem;
            }
        }
    }
    return null;
}

// Update cart count display
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cartCount').textContent = totalItems;
    
    const cartIcon = document.getElementById('cartIcon');
    if (totalItems > 0) {
        cartIcon.style.color = 'var(--primary-red)';
    } else {
        cartIcon.style.color = 'var(--primary-dark)';
    }
}

// Update "Add to cart" button text
function updateAddToCartButton(itemId) {
    const button = document.querySelector(`.add-to-cart[data-id="${itemId}"]`);
    if (!button) return;
    
    const cartItem = cart.find(item => item.id === itemId);
    if (cartItem) {
        button.textContent = `${cartItem.quantity} в корзине`;
        button.style.backgroundColor = '#4CAF50';
    } else {
        button.textContent = 'В корзину';
        button.style.backgroundColor = '';
    }
}

// Open cart modal
function openCart() {
    renderCartItems();
    document.getElementById('cartModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    document.getElementById('cartModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Render cart items with quantity controls
function renderCartItems() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Ваша корзина пуста</p>
                <p class="empty-cart-hint">Добавьте блюда из меню</p>
            </div>
        `;
        cartTotal.textContent = '0';
        return;
    }

    let itemsHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        itemsHTML += `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${item.price} ₽ за шт.</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn decrease" data-id="${item.id}" ${item.quantity <= 1 ? 'disabled' : ''}>
                    <i class="fas fa-minus"></i>
                </button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
            <div class="cart-item-total">${itemTotal} ₽</div>
            <div class="cart-item-actions">
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                    <span class="remove-text">Удалить</span>
                </button>
            </div>
        </div>
        `;
    });

    cartItems.innerHTML = itemsHTML;
    cartTotal.textContent = total;

    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            updateQuantity(itemId, -1);
        });
    });

    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            updateQuantity(itemId, 1);
        });
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            removeFromCart(itemId);
        });
    });
}

// Remove item from cart completely
function removeFromCart(itemId) {
    const itemIndex = cart.findIndex(item => item.id === itemId);
    
    if (itemIndex === -1) return;
    
    const item = cart[itemIndex];
    const itemData = getItemData(itemId);
    
    if (confirm(`Удалить "${item.name}" из корзины?`)) {
        cart.splice(itemIndex, 1);
        updateCartCount();
        saveCartToLocalStorage();
        updateAddToCartButton(itemId);
        renderCartItems();
        showToast(`"${itemData.name}" удален из корзины`, 'error');
    }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}