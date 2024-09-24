import {getExpCourse, getNormCourse} from "@/api/getCourse";

class Lesson {
    constructor(jw_course_code, base_teacher_name, base_room_name, week, jw_task_book_no, jw_course_name, section_end, week_day, section, base_teacher_no, section_start) {
        this.jw_course_code = jw_course_code;
        this.base_teacher_name = base_teacher_name;
        this.base_room_name = base_room_name;
        this.week = week;
        this.jw_task_book_no = jw_task_book_no;
        this.jw_course_name = jw_course_name;
        this.section_end = section_end;
        this.week_day = week_day;
        this.section = section;
        this.base_teacher_no = base_teacher_no;
        this.section_start = section_start;
    }
}

function isCurWeek(week, curWeek) {
    if (week.includes("-")) {
        let lets = week.split("-");
        if (lets.length === 2) {
            return curWeek >= Number(lets[0]) && curWeek <= Number(lets[1]);
        }
    } else {
        return curWeek === Number(week);
    }
    return false;
}

function onlySelectWeek(selectedWeek, lessonsArray) {
    let result = [];
    for (let lesson of lessonsArray) {
        let week = lesson.week;
        if (week.includes(",")) {
            let split = week.split(",");
            let inRange = false;
            for (let s of split) {
                inRange = isCurWeek(s, selectedWeek);
                if (inRange) {
                    result.push(lesson);
                }
            }
        } else {
            if (isCurWeek(week, selectedWeek)) {
                result.push(lesson);
            }
        }
    }
    return result
}

function lessonSplit(lesson, lessons) {
    let start = Number(lesson.section_start);
    let end = Number(lesson.section_end);
    for (let i = start; i < end; i += 2) {
        lessons.push(new Lesson(lesson.jw_course_code, lesson.base_teacher_name, lesson.base_room_name, lesson.week,
                lesson.jw_task_book_no, lesson.jw_course_name, (i + 1).toString(), lesson.week_day, i.toString(), lesson.base_teacher_no, i.toString()))
    }
}

function lessonMerge(lesson1, lesson2) {
    let jw_course_code = lesson1.jw_course_code + " | " + lesson2.jw_course_code;
    let base_teacher_name = lesson1.base_teacher_name + " | " + lesson2.base_teacher_name;
    let base_room_name = lesson1.base_room_name + " | " + lesson2.base_room_name;
    let week = lesson1.week + " | " + lesson2.week;
    let jw_task_book_no = lesson1.jw_task_book_no + " | " + lesson2.jw_task_book_no;
    let jw_course_name = lesson1.jw_course_name + " | " + lesson2.jw_course_name;
    jw_course_name = jw_course_name.replace("(重课)", "");
    jw_course_name = "(重课)" + jw_course_name;
    let section_end = lesson1.section_end;
    let week_day = lesson1.week_day;
    let section = lesson1.section;
    let base_teacher_no = lesson1.base_teacher_no + " | " + lesson2.base_teacher_no;
    let section_start = lesson1.section_start;
    return new Lesson(jw_course_code, base_teacher_name, base_room_name, week, jw_task_book_no, jw_course_name,
        section_end, week_day, section, base_teacher_no, section_start);
}

function process(lessonsArray) {
    let lessons = Array.from(lessonsArray);
    // 节数大于2处理，将其切割成两节
    for (let i = 0; i < lessons.length; i++) {
        let lesson = lessons[i];
        if (Number(lesson.section_end) - Number(lesson.section_start) > 1) {
            lessons[i] = null;
            lessonSplit(lesson, lessons);
        }
    }
    lessons = lessons.filter(lesson => lesson != null);
    let lessonsLen = lessons.length;
    // 重课处理，两节合并为一节
    for (let i = 0; i < lessonsLen; i++) {
        let lesson1 = lessons[i];
        for (let j = 0; lesson1 != null && j < lessonsLen; j++) {
            let lesson2 = lessons[j];
            if (j === i || lesson2 == null) {
                continue;
            }
            if (Number(lesson1.section_start) === Number(lesson2.section_start) && Number(lesson1.week_day) === Number(lesson2.week_day)) {
                let merge = lessonMerge(lesson1, lesson2);
                lessons[i] = null;
                lessons[j] = null;
                lessons.push(merge);
                lessonsLen = lessons.length;
                break;
            }
        }
    }
    lessons = lessons.filter(lesson => lesson != null);
    return lessons;
}

export default function simpleSelectWeek(selectedWeek, lessonsArray) {
    let lessons = onlySelectWeek(selectedWeek, lessonsArray);
    lessons = process(lessons);
    return lessons;
}

export function refreshNormalCourse(onError) {
    if (onError === undefined) {
        onError = () => {}
    }
    getNormCourse().then((response) => {
        if (response.status === 200) {
            if (response.data.code === 0) {
                localStorage.setItem("norm", JSON.stringify(response.data.data));
            } else {
                onError(response);
            }
        } else {
            onError(response);
        }
    });
}

export function refreshExpCourse(onError) {
    if (onError === undefined) {
        onError = () => {}
    }
    getExpCourse().then((response) => {
        if (response.status === 200) {
            if (response.data.code === 0) {
                localStorage.setItem("exp", JSON.stringify(response.data.data));
            } else {
                onError(response);
            }
        } else {
            onError(response);
        }
    });
}