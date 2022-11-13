    let span = document.querySelector(".icon-preview");
    window.onscroll = function() 
    {
        this.scrollY >= 100 ? span.classList.add("show") : span.classList.remove("show");
    };
    span.onclick = function() 
    {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }
        
    let exploreBtn = document.querySelector('.title .btn')
    HadithsSection = document.querySelector('.hadith')
    exploreBtn .addEventListener('click',()=> {
        HadithsSection.scrollIntoView({
            behavior:"smooth" 
        })
    })
    let fixedNav = document.querySelector('.header');
        window.addEventListener("scrollY",()=>{
        window.scrollY >100?fixedNav.classList.add('active'):fixedNav.classList.remove('active');
    })

    let hadithContainer = document.querySelector('.container-hadith .h4');
    next = document.querySelector('.buttoms .next'),
    prve = document.querySelector('.buttoms .prve'),
    number = document.querySelector('.buttoms .number');
    let hadithIndex = 0 ;
    hadithChanger();
    function hadithChanger() 
    {
        fetch("https://ahadith-api.herokuapp.com/api/ahadith/all/ar-notashkeel")
        .then(Response => Response.json())
        .then(data => {
            let Hadiths = data.data.ahadith;
            changerHadith();
            next.addEventListener('click',()=>{
                hadithIndex == 299 ? hadithIndex = 0 : hadithIndex++ ;
                changerHadith()
            });
            prve.addEventListener('click',()=>{
                hadithIndex == 0 ? hadithIndex = 299 : hadithIndex-- ;
                changerHadith()
            });
            function changerHadith() 
            {
                hadithContainer .innerText = Hadiths[hadithIndex].arab;
                number.innerText=`300 - ${hadithIndex + 1}`;
            }
        })
    }
    let sections = document.querySelectorAll("section"),
    links = document.querySelectorAll(".header ul li");
    links .forEach(link => {
        link.addEventListener('click',()=>{
            document.querySelector('.header ul li.active').classList.remove("active");
            link.classList.add("active");
            let target = link.dataset.filter;
            sections.forEach(section => {
                if (section.classList.contains(target)) 
                {
                    section.scrollIntoView({
                        behavior:"smooth"
                    });
                }
            });
        });
    });

    // let myRequest = new XMLHttpRequest();
    //         myRequest.open("GET", "opject.json");
    //         myRequest.send();
    //         //console.log(myRequest);
    //         myRequest.onreadystatechange= function(){
    //             if (this.readyState === 4 && this.status === 200) {
    //                 let jsData = JSON.parse(this.responseText);
    //                 //console.log(jsData);
    //                 for (let i = 0; i < jsData.length; i++) {
    //                     let div = document.createElement("div");
    //                     let repoName = document.createTextNode(jsData[0]:name);
    //                     div.appendChild(repoName);
    //                     document.body.appendChild(div);
                        
    //                 }
    //             }
    //         };
    
    let qurenContainer = document.querySelector(".quren-container")
    getShorua();
    function getShorua() 
    {
        fetch('https://api.alquran.cloud/v1/meta')
        .then(Response => Response.json())
        .then(data=>{
            let surahs = data.data.surahs.references
            let numberOfSurahs = data.data.surahs.count
            for (let i = 0; i < numberOfSurahs ; i++) {
                qurenContainer.innerHTML+=
                    `
                        <div class="shorua">
                            <p> ${ surahs [i] .name } </p> 
                            <span> آيات ${ surahs [i] .numberOfAyahs } </span>
                            <span class="count"><strong> ${ surahs [i] .number }  </strong> </span>
                        </div>
                    `
            }
            let SurahsTitels = document.querySelectorAll('.shorua');
            let popup = document.querySelector('.surah-popup');
                AyatContainer = document.querySelector('.ayat');
            SurahsTitels.forEach((title,index)=>{
                title.addEventListener('click',()=>{
                    fetch(`https://api.alquran.cloud/v1/surah/${index +1}`)
                    .then(Response => Response.json())
                    .then(data=>{
                        AyatContainer.innerHTML = "";
                        let Ayat = data.data.ayahs;
                        Ayat.forEach(aya=>{
                                popup.classList.add('active');
                                AyatContainer.innerHTML += `
                                    <span> (${ aya .numberInSurah}) </span>
                                    <p>  ${ aya .text } </p>
                                `
                        })
                    })
                })
            })
            let ClosePopup = document.querySelector(".close-popup");
            ClosePopup.addEventListener('click',()=>{
                popup.classList.remove("active");
                });
        })
        
    }

    let Cards = document.querySelector('.cards')
    getPrayTimes();
    function getPrayTimes() {
        fetch ('https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt&method=8')
        .then(Response => Response.json())
        .then(data => {
            let times = data.data.timings;
            Cards.innerHTML = "";
            for (let time in times)
            {
                Cards.innerHTML+=
                    `
                        <div class="card">
                            <div class="circle">
                                <svg>
                                    <circle cx="100" cy="100" r="100" />
                                </svg>
                                <div class="praytime"> ${ times [ time ] } </div>
                            </div>
                            <p> ${ time } </p>
                        </div>
                    `
            }
        })
    }

    let bars = document.querySelector('.bars'),
    sidbar = document.querySelector('.header ul');
    bars.addEventListener('click',()=>{
        sidbar.classList.toggle("active")
    })
    $(function(){
        $.getJSON("opject.json",function(data){
            console.log(data);
            var content = '';
            for (var x in data) {
                content += data[x][4].name ;
            }
            console.log(content);
        })
    })


    fetch('https://ahadith-api.herokuapp.com/api/ahadith/1/1/ar-notashkeel')
    .then((Result)=>{
    console.log (Result) ;
    let myData = Result.json();
    console.log(myData);
    });
   