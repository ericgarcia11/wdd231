const yearSpan = document.querySelector("footer span");
const currentYear = new Date().getFullYear();
yearSpan.textContent = ` © ${currentYear}`;

const lastModified = document.lastModified;
document.getElementById("lastModified").textContent = `Last modified: ${lastModified}`;

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

displayAllCourses();

function displayAllCourses(){
    let totalCredits = document.getElementById('totalCredits');
    let total = courses.reduce((total, course) =>{
        return total + course.credits;
    }, 0);
    totalCredits.textContent = `The total credits number from the courses listed above is ${total}.`;

    const classesDiv = document.getElementById('classes');
    courses.forEach( course => {
        let div = document.createElement('div');
        let label = document.createElement('label');
        if (course.completed){
            div.classList.add('completed');
        } else {
            div.classList.add('class');
        }
        label.textContent = `${course.subject} ${course.number}`;
        div.appendChild(label);
        classesDiv.appendChild(div);
    })
}

document.getElementById('all').addEventListener('click', function(){
    document.getElementById('classes').innerHTML = '';
    displayAllCourses();
})

document.getElementById('cse').addEventListener('click', function(){
    const classesDiv = document.getElementById('classes');
    classesDiv.innerHTML = '';
    let cseCourses = courses.filter(course => course.subject === 'CSE');

    let totalCredits = document.getElementById('totalCredits');
    let total = cseCourses.reduce((total, course) =>{
        return total + course.credits;
    }, 0);
    totalCredits.textContent = `The total credits number from the courses listed above is ${total}.`;

    cseCourses.forEach( course => {
        let div = document.createElement('div');
        let label = document.createElement('label');
        if (course.completed){
            div.classList.add('completed');
        } else {
            div.classList.add('class');
        }
        label.textContent = `${course.subject} ${course.number}`;
        div.appendChild(label);
        classesDiv.appendChild(div);
    })
})

document.getElementById('wdd').addEventListener('click', function(){
    const classesDiv = document.getElementById('classes');
    classesDiv.innerHTML = '';
    let wddCourses = courses.filter(course => course.subject === 'WDD');

    let totalCredits = document.getElementById('totalCredits');
    let total = wddCourses.reduce((total, course) =>{
        return total + course.credits;
    }, 0);
    totalCredits.textContent = `The total credits number from the courses listed above is ${total}.`;

    wddCourses.forEach( course => {
        let div = document.createElement('div');
        let label = document.createElement('label');
        if (course.completed){
            div.classList.add('completed');
        } else {
            div.classList.add('class');
        }
        label.textContent = `${course.subject} ${course.number}`;
        div.appendChild(label);
        classesDiv.appendChild(div);
    })
})

window.addEventListener('resize', () => {
    // console.log(`Largura: ${window.innerWidth}px, Altura: ${window.innerHeight}px`);
    if (window.innerWidth <= 770) {
         handleMenuLarge()
    } else {
        handleMenu();
    }
});

window.addEventListener('load', () => {
    if (window.innerWidth <= 770) {
         handleMenuLarge()
    } else {
        handleMenu();
    }
});

function handleMenuLarge(){
    let nav = document.getElementById('navigation');
    let openNav = document.getElementById('openNav');
    let closeNav = document.getElementById('closeNav');
    nav.style.display = 'none';
    openNav.style.display = '';
    closeNav.style.display = '';

    openNav.addEventListener('click', function(){
        nav.style.display = '';
        openNav.style.display = 'none';
    })

    closeNav.addEventListener('click', function(){
        nav.style.display = 'none';
        openNav.style.display = '';
    })
}

function handleMenu(){
    let nav = document.getElementById('navigation');
    let openNav = document.getElementById('openNav');
    let closeNav = document.getElementById('closeNav');
    nav.style.display = 'flex';
    openNav.style.display = 'none';
    closeNav.style.display = 'none';
}