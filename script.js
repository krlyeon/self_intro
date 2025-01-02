/* 다크모드 */
const profilePhoto = document.querySelector(".profile-photo");

profilePhoto.addEventListener("click", () => {
    // if (document.body.className == 'dark-mode') {
    //     document.body.className = '';
    // } else {
    //     document.body.className = 'dark-mode';
    // }

    // DOM 요소에 지정한 클래스 값이 없으면 추가하고, 있다면 제거
    document.body.classList.toggle('dark-mode');
})


/* 함수화 */
const sections = document.querySelectorAll(".right_container section");
let currentIndex = 0;

const showAfterSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })  // 현재 section 숨기기
    if (currentIndex == sections.length - 1) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    sections[currentIndex].style.display = 'flex';  // 다음 section 보여주기
}
const showBeforeSection = () => {
    sections.forEach((section) => { section.style.display = 'none'; })
    if (currentIndex == 0) {
        currentIndex = sections.length - 1;
    } else {
        currentIndex--;
    }
    sections[currentIndex].style.display = 'flex';
}

let intervalId = setInterval(showAfterSection, 3000);

const resetInterval = () => {
    clearInterval(intervalId);
    intervalId = setInterval(showAfterSection, 3000);
}

sections.forEach((section, index) => {
    section.addEventListener("click", (event) => {
        const sectionWidth = section.offsetWidth;
        const clickX = event.clientX - section.getBoundingClientRect().left;

        if (clickX < sectionWidth / 3) {  // 왼쪽 1/3 클릭 시 이전 section으로 이동
            showBeforeSection();
            resetInterval();
        } else if (clickX > sectionWidth * 2 / 3) {  // 오른쪽 1/3 클릭 시 다음 section으로 이동
            showAfterSection();
            resetInterval();
        } else {  // 중간 1/3 클릭 시 자동 넘김 토글
            if (intervalId) {
                clearInterval(intervalId);  // 자동 넘김 중지
                intervalId = null;
            } else {
                intervalId = setInterval(showAfterSection, 3000);  // 자동 넘김 재개
            }
        }
    });
});

fetch("https://m.search.naver.com/p/csearch/content/apirender.nhn?where=nexearch&pkid=387&u2=20031029&q=생년월일+운세&u1=f&u3=solar&u4=12&_=1719518803829")
    .then((response) => response.json())  // 응답을 JSON으로 파싱
    .then(data => {
        const htmlString = data.flick[0]; // 첫 번째 항목 선택
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const fortune = doc.querySelector('dd b').textContent;
        const fortuneText = doc.querySelector('dd p').textContent;
        console.log(fortune); // 추출한 텍스트 출력
        console.log(fortuneText); // 추출한 텍스트 출력

        const fortuneSection = document.createElement("section");  // 오늘의 운세 section 생성
        const sectionTitle = document.createElement("h2");  // 오늘의 운세 타이틀 생성
        sectionTitle.textContent = "오늘의 운세";
        const fortuneE = document.createElement("h3");  // 오늘의 운세명 추가
        fortuneE.style.margin = 0;
        fortuneE.textContent = fortune;
        const fortuneTextE = document.createElement("p");  // 오늘의 운세 풀이 추가
        fortuneTextE.textContent = fortuneText;

        // append: 자식 중 가장 마지막에 삽입
        fortuneSection.append(sectionTitle);
        fortuneSection.append(fortuneE);
        fortuneSection.append(fortuneTextE);

        const contactSection = document.querySelector(".contact");
        // contactSection.before(fortuneSection);  // contact의 전에 fortune 추가
        contactSection.after(fortuneSection);  // contact의 뒤에 fortune 추가
    });