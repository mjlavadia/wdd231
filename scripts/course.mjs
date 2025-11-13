const byuiCourse = {
  code: "WDD 231",
  name: "Web Frontend Development II",
  sections: [
    { sectionNum: 1, enrolled: 25, available: 30 },
    { sectionNum: 2, enrolled: 28, available: 30 },
    { sectionNum: 3, enrolled: 15, available: 30 }
  ],

  changeEnrollment(sectionNum, add = true) {
    const section = this.sections.find(sec => sec.sectionNum == sectionNum);
    if (section) {
      if (add && section.enrolled < section.available) {
        section.enrolled++;
      } else if (!add && section.enrolled > 0) {
        section.enrolled--;
      }
    }
  }
};

export default byuiCourse;
