# Curriculum Research Record

## Web Application Security

The [OWASP Web Security Testing Guide](https://owasp.org/www-project-web-security-testing-guide/) is a comprehensive resource for testing web applications and web services. It provides versioned test-scenario identifiers, which makes it suitable as a stable reference for a student learning path.

The [OWASP Top 10](https://owasp.org/www-project-top-ten/) is a current awareness document for developers and web application security. Cyber 4 Ever uses it as a conceptual reference, not as permission to test real applications.

## Purpose-Built Training Environments

[OWASP Juice Shop](https://owasp.org/www-project-juice-shop/) is a deliberately insecure application used for training, awareness demonstrations, and CTF-style exercises. Its documentation describes beginner guidance and a broad range of intentionally included weaknesses.

[OWASP WebGoat](https://owasp.org/www-project-webgoat/) is a deliberately insecure teaching application. Its lessons explain a weakness, provide a bounded assignment, and conclude with mitigation guidance. The project warns learners not to attempt techniques without authorization and recommends keeping its vulnerable training environment isolated.

## Design Decision

All linked practical material in Cyber 4 Ever must remain an official, purpose-built training resource or a source explicitly designed for education. The platform will show a clear authorization boundary beside every external link and will not provide instructions for testing systems outside a learner's confirmed scope.

## Security Operations and Incident Response

[NIST SP 800-61 Revision 3](https://csrc.nist.gov/pubs/sp/800/61/r3/final), published in April 2025, presents incident-response recommendations in the context of the NIST Cybersecurity Framework 2.0. Cyber 4 Ever uses it to structure the defensive concepts of preparation, detection, response, recovery, and lessons learned.

[CISA's Incident and Vulnerability Response Playbooks](https://www.cisa.gov/resources-tools/resources/federal-government-cybersecurity-incident-and-vulnerability-response-playbooks) describe standard procedures to identify, coordinate, remediate, recover, and track mitigations. The SOC path will use this as the basis for safe case-triage and incident-note exercises.

[MITRE ATT&CK](https://attack.mitre.org/) is a publicly accessible knowledge base of adversary tactics and techniques drawn from real-world observations. Students will use it only to label observed behavior in provided training artifacts and to connect detections with mitigations; the platform will not present it as an instruction set for unauthorized activity.

## Digital Forensics

[NIST SP 800-86](https://csrc.nist.gov/pubs/sp/800/86/final) provides practical guidance for computer and network forensics in incident response, covering files, operating systems, network traffic, and applications. It also states that its guidance is not legal advice; Cyber 4 Ever therefore limits its lesson material to learner-owned artifacts and prepared datasets.

[NIST Digital Evidence](https://www.nist.gov/digital-evidence) explains that digital forensics concerns retrieving, storing, and analyzing electronic data, while stressing the importance of reliable methods that do not alter evidence. This informs the path's emphasis on evidence integrity, note-taking, and reproducibility.

[NIST IR 8387](https://www.nist.gov/itl/csd/secure-systems-and-applications/computer-forensics-tool-testing-program-cftt/digital) provides considerations for digital-evidence preservation. The platform will frame preservation as a professional practice and keep exercises limited to supplied training images or records.

## Cloud Security

[NIST SP 500-299](https://csrc.nist.gov/pubs/sp/500/299/ipd) describes a cloud-security reference architecture that identifies security components and responsibilities by cloud actor and service model. It is a draft whose development has ceased, so Cyber 4 Ever will cite it for enduring architectural concepts only, rather than as current implementation policy.

[CISA's Cloud Security Technical Reference Architecture](https://www.cisa.gov/resources-tools/resources/cloud-security-technical-reference-architecture) discusses data protection, cloud migration, shared-risk models, and cloud security posture management. The platform will use it to teach responsibility boundaries and configuration review in learner-owned sandboxes.

[CSA Cloud Controls Matrix](https://cloudsecurityalliance.org/research/cloud-controls-matrix) is a cloud control framework with structured domains that include identity, logging and monitoring, application security, encryption, incident management, and threat and vulnerability management. Its material informs the path's configuration-review checklist and control-mapping exercise.

## Additional Safe Learning Resources

[pwn.college](https://pwn.college/) is an Arizona State University-maintained hands-on education platform that powers cybersecurity curriculum and publishes rules for learners. It will be offered for foundational practice only, with an explicit reminder to respect challenge rules and not post solutions where prohibited.

[CyberDefenders](https://cyberdefenders.org/blue-team-labs/) provides browser-accessible blue-team scenarios in DFIR, threat hunting, threat intelligence, and malware analysis. It is suitable for the SOC and DFIR tracks because learners analyze supplied scenarios rather than external targets.

[Microsoft Learn Security](https://learn.microsoft.com/en-us/security/) provides vendor-authored, practice-based modules and selected sandboxes for Microsoft security, identity, and cloud skills. It will be described as vendor-specific learning, not as a general authorization for tenant testing.

[AWS Skill Builder](https://aws.amazon.com/training/digital/immersive-learning/) provides guided learning experiences and safe AWS Console environments. Cyber 4 Ever will advise students to confirm the terms, access level, and any pricing before starting a cloud exercise.
