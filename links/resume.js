document.addEventListener("DOMContentLoaded", function() {
    fetchJson();

    let contact = document.getElementById("contact");
    let contactHead = document.getElementById("contact-h")
    contactHead.addEventListener("click", function() {
        toggle(contact)
    });
    let education = document.getElementById("education");
    let edHead = document.getElementById("ed-h")
    edHead.addEventListener("click", function() {
        toggle(education)
    });
    let skills = document.getElementById("skills");
    let skillsHead = document.getElementById("skills-h")
    skillsHead.addEventListener("click", function() {
        toggle(skills)
    });
    let summary = document.getElementById("summary");
    let summHead = document.getElementById("summ-h")
    summHead.addEventListener("click", function() {
        toggle(summary)
    });
    let work = document.getElementById("work");
    let workHead = document.getElementById("work-h")
    workHead.addEventListener("click", function() {
        toggle(work)
    });
    let projects = document.getElementById("projects");
    let projHead = document.getElementById("projects-h")
    projHead.addEventListener("click", function() {
        toggle(projects)
    });
    let references = document.getElementById("ref");
    let refHead = document.getElementById("ref-h")
    refHead.addEventListener("click", function() {
        toggle(references)
    });

});

async function fetchJson() {
    const response = await fetch("resume.json");
    const resume = await response.json();
    console.log(resume);
    displayFromJson(resume);
  }
  
  function toggle(element) {
      if (element.style.display === "none") {
          element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        console.log(element.style.display);
    }
    
    function renderH1(content) {
        let h1 = document.createElement("h1");
        h1.textContent = content;
        return h1;
    }
    
    function renderH2(content) {
        let h2 = document.createElement("h2");
        h2.textContent = content;
        return h2;
    }
    
    function renderH4(content) {
        let h4 = document.createElement("h4");
        h4.textContent = content;
        return h4;
    }
    
    function renderP(content) {
        let p = document.createElement("p");
        p.textContent = content;
        return p;
    }
    
    function renderDegree(degree) {
        return [
            renderH4(degree.degree), 
            renderP(degree.school), 
            renderP(degree.timeline)
        ]
    }
    
    function renderUl(list) {
        let summ = document.createElement("ul");
        for (const item of list) {
            let li = document.createElement("li");
            li.textContent = item;
            summ.appendChild(li);
        }
        return summ;
    }
    
    function renderJob(job) {
        return [
            renderH4(job.role), 
            renderP(job.organization), 
            renderP(job.timeline),
            renderUl(job.summary)
        ]
    }
    
    function renderProject(project) {
        return [
            renderH4(project.project), 
            renderP(project.class), 
            renderP(project.timeline),
            renderUl(project.summary)
        ]
    }
    
    function displayFromJson(resume) {
        // Title
        let titleBlock = document.getElementById("title-block");
        let name = renderH1(resume.name);
        let title = renderH2(resume.title);
        titleBlock.appendChild(name);
        titleBlock.appendChild(title);
        
        
        // Contact
        let contact = document.getElementById("contact");
        for (const item of resume.contact) {
            let para = renderP(item);
            contact.appendChild(para);
        }
        
        // Education
        let edu = document.getElementById("education");
        for (const degree of resume.education) {
            edu.append(...renderDegree(degree));
        }
        
        // Skills and Services
        let skills = document.getElementById("skills");
        for (let i=0; i < resume.skillsAndServices.length; i++) {
            skillsItem = renderP(resume.skillsAndServices[i]);
            skills.appendChild(skillsItem);
        }
        // References
        let ref = document.getElementById("ref");
        for (item of resume.references) {
            refItem = renderP(item);
            ref.appendChild(refItem);
        }
        
        // Summary
        let summary = document.getElementById("summary");
        summaryContent = renderP(resume.summary);
        summary.appendChild(summaryContent);
        
        // Work
        let work = document.getElementById("work");
        for (const job of resume.workExperience) {
            work.append(...renderJob(job));
        }
        
        // Projects
        let projects = document.getElementById("projects");
        for (const project of resume.relevantProjects) {
            projects.append(...renderProject(project));
        }
        
    }
    