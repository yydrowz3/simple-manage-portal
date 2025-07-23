import { faker } from "@faker-js/faker";
import { supabase } from "../utils/supabase.ts";

console.log("hello world");

const classes = [
    "1|1",
    "1|2",
    "1|3",
    "1|4",
    "2|1",
    "2|2",
    "2|3",
    "2|4",
    "3|1",
    "3|2",
    "3|3",
    "3|4",
];

async function generateOneUser(isStudent = false) {
    const startTime = Date.now();
    while (Date.now() - startTime < 500) {
        // do nothing
    }
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const avatarUrl = faker.image.avatar();
    // const randomName = faker.person.fullName();
    const randomUsername = faker.internet.username();

    console.log(randomEmail);
    console.log(randomPassword);

    const { data, error } = await supabase.auth.signUp({
        email: randomEmail,
        password: randomPassword,
        options: {
            data: {
                display_name: randomUsername,
                avatar: avatarUrl,
                isStudent: isStudent,
            },
        },
    });

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    if (!data || !data.user || !data.session) {
        throw new Error("Failed to create user");
    }

    return data;
}

async function generateOneTeacher(studentCount = 30, className: string) {
    console.log("generating teacher...");
    console.log();
    const userData = await generateOneUser(false);
    const randomGender = faker.person.sex();
    // const randomClass = faker.helpers.arrayElements(classes, {
    //     min: 1,
    //     max: 2,
    // });
    if (!userData.user || !userData.user.id) {
        throw new Error("Failed to create user");
    }

    const teacherData = {
        // class_in_charge: randomClass,
        class_in_charge: [className],
        gender: randomGender,
        teacher_id: userData.user.id,
    };

    const { error } = await supabase.from("tb_teacher").insert([teacherData]);

    if (error) {
        console.log(error.message);
        throw new Error(error.message);
    }

    console.log("generating students...");
    console.log();

    for (let i = 0; i < studentCount; i++) {
        const randomStudentUser = await generateOneUser(true);
        if (!randomStudentUser.user || !randomStudentUser.user.id) {
            throw new Error("Failed to create user");
        }
        const randomName = faker.person.fullName();
        const class_number = Number(className.split("|")[1]);
        const grade_number = Number(className.split("|")[0]);
        const randomStudentGender = faker.person.sex();
        const studentData = {
            name: randomName,
            class: class_number,
            grade: grade_number,
            gender: randomStudentGender,
            student_id: randomStudentUser.user.id,
            teacher_id: userData.user.id,
            avatar: randomStudentUser.user.user_metadata.avatar,
        };

        const { error } = await supabase
            .from("tb_student")
            .insert([studentData]);

        if (error) {
            console.log(error.message);
            throw new Error(error.message);
        }

        const generateScoreCount = faker.number.int({ min: 1, max: 3 });
        const randomStudentsubjects = [
            "math",
            "english",
            "physics",
            "chemistry",
            "biology",
        ];
        const selectedStudentsubjects = faker.helpers.arrayElements(
            randomStudentsubjects,
            generateScoreCount
        );
        for (let j = 0; j < generateScoreCount; j++) {
            const startTime = Date.now();
            while (Date.now() - startTime < 500) {
                // do nothing
            }

            const randomScore = faker.number.int({ min: 0, max: 100 });
            // const randomSubject = faker.helpers.arrayElement([
            //     "math",
            //     "english",
            //     "physics",
            //     "chemistry",
            //     "biology",
            // ]);
            const randomSeason = faker.helpers.arrayElement([
                "spring",
                "autumn",
            ]);
            const randomYear = faker.number.int({
                min: 2025 - grade_number,
                max: 2025,
            });
            const scoreData = {
                semester_year: randomYear,
                semester_season: randomSeason,
                score: randomScore,
                subject: selectedStudentsubjects[j],
                student_id: randomStudentUser.user.id,
            };

            const { error } = await supabase
                .from("tb_score")
                .insert([scoreData]);
            if (error) {
                console.log(error.message);
                throw new Error(error.message);
            }
        }
    }

    console.log("-----------------");
    console.log();
}

// async function generateTeachers() {
// classes.forEach(async (v) => {
//     const studentCount = faker.number.int({ min: 20, max: 30 });
//     await generateOneTeacher(studentCount, v);
// });
// }

for (let i = 0; i < classes.length; i++) {
    console.log(classes[i]);
    const studentCount = faker.number.int({ min: 20, max: 30 });
    await generateOneTeacher(studentCount, classes[i]);
}

// https://img.daisyui.com/images/profile/demo/batperson@192.webp

// const userList = userData.data.users;

// console.log(userList.length);
