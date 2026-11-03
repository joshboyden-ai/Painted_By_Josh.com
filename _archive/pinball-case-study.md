---
layout: pinball
title: Custom Electromechanical Pinball Machine
description: Designed and built a custom electromechanical pinball machine integrating mechanical mechanisms, CAD-modeled assemblies, fabricated components, electronics, embedded controls, and iterative testing.
skills:
  - Mechanical Design
  - CAD
  - Fabrication
  - Arduino
  - Circuit Design
  - Embedded Controls
  - Testing & Validation
main-image: /project-main.jpg
# Set file to a filename relative to this project folder when an image is ready.
# Add alt and caption fields describing what each actual image shows.
media:
  - title: Finished machine
    file: ''
    prompt: Add an overall photo and identify the build stage shown.
  - title: CAD & playfield layout
    file: ''
    prompt: Add an annotated CAD screenshot showing component placement and ball paths.
  - title: Mechanisms & packaging
    file: ''
    prompt: Add a mechanism detail or cabinet view showing mounting and clearances.
  - title: Electronics & wiring
    file: ''
    prompt: Add a wiring photo, schematic, or control architecture diagram.
  - title: Fabrication & assembly
    file: ''
    prompt: Add build-process photos showing parts, mounting, and integration.
  - title: Testing & iteration
    file: ''
    prompt: Add a before-and-after image of a documented design revision.
# Add a real YouTube video ID to display the existing video component.
gameplay_video_id: ''
---

<section class="pinball-section" id="overview">
  <h2>Project Overview</h2>
  <div>
    <p>I designed and built this custom electromechanical pinball machine as a hands-on engineering project. It combines mechanical design, fabrication, electronics, controls, software, and physical integration into one functioning system.</p>
    <p>The goal was to build a playable machine from the ground up while learning how traditional pinball mechanisms, switches, solenoids, controls, and game logic work together. The central engineering challenge was integrating the physical mechanisms with electrical actuation, input sensing, and software behavior.</p>
    <div class="pinball-pending">
      <p><strong>My role:</strong> I was responsible for design, fabrication, wiring, electronics integration, Arduino programming, troubleshooting, testing, and overall assembly.</p>
      <p><strong>Timeline:</strong> To add: Project start date and key milestones.</p>
      <p><strong>Status:</strong> Ongoing. The machine has progressed from initial mechanical construction and component layout into a functioning electromechanical system with working inputs, outputs, scoring, and game logic.</p>
    </div>
  </div>
</section>

<section class="pinball-section" id="goals">
  <h2>Engineering Goals</h2>
  <div>
    <p>The original design goals focus on playability, repeatability, and integration.</p>
    <ul>
      <li>Design a playable mechanical system with repeatable ball motion.</li>
      <li>Integrate mechanisms such as flippers, bumpers, switches, and scoring features.</li>
      <li>Read inputs and drive outputs reliably.</li>
      <li>Fabricate components that can withstand repeated gameplay loads.</li>
      <li>Refine the design through testing, failure analysis, and user feedback.</li>
    </ul>
    <div class="pinball-pending"><p><strong>To add:</strong> Confirm the implemented features and define measurable acceptance criteria, packaging constraints, service-access requirements, and any material or budget limits.</p></div>
  </div>
</section>

<section class="pinball-section" id="mechanical">
  <h2>Mechanical Design</h2>
  <div>
    <p>The mechanical design centers on the playfield layout, ball paths, flipper geometry, target placement, and mechanisms needed for consistent gameplay. CAD provides a way to develop the structure, locate components, check clearances, and plan fabrication.</p>
    <h3>Layout, structure &amp; mechanisms</h3>
    <ul>
      <li><strong>Playfield:</strong> Add the layout rationale, ball guides, targets, ramps, and return paths actually used.</li>
      <li><strong>Cabinet:</strong> Add the support structure, material choices, and access for maintenance.</li>
      <li><strong>Mounting &amp; packaging:</strong> Add bracket details, fasteners, clearances, and component placement decisions.</li>
      <li><strong>Moving components:</strong> Add flipper and bumper mechanism details, motion constraints, and design-for-manufacturing decisions.</li>
    </ul>
    <div class="pinball-gallery">
      {% assign section_media = page.media[1] %}{% include pinball-figure.html media=section_media %}
      {% assign section_media = page.media[2] %}{% include pinball-figure.html media=section_media %}
    </div>
  </div>
</section>

<section class="pinball-section" id="electronics">
  <h2>Electronics &amp; Controls</h2>
  <div>
    <p>An Arduino Leonardo serves as the main controller, connecting physical switch inputs with mechanism control and the game software. The system integrates low-voltage input sensing, higher-power actuation hardware, and software-based scoring and screen animations.</p>
    <dl class="pinball-evidence">
      <div><dt>Switch matrix &amp; input sensing</dt><dd>A 5-row by 3-column switch matrix uses Arduino pins 2&ndash;6 for the rows and A0&ndash;A2 for the columns. Additional direct inputs use pins 7&ndash;10, with flipper-related inputs on A3, A4, and A5.</dd></div>
      <div><dt>Solenoid &amp; mechanism control</dt><dd>MOSFET-based trigger/control hardware operates the solenoid outputs. Pin 13 provides vertical up-kicker control, while AC pop bumpers use solid-state relay control.</dd></div>
      <div><dt>Power distribution &amp; protection</dt><dd>Separate 48 V and 24 V power supplies serve the higher-power mechanisms. Diodes and transient suppression are incorporated for inductive-load protection.</dd></div>
      <div><dt>Hardware-to-software interface</dt><dd>Arduino HID keyboard mapping communicates switch events to the game software. GameDev5 handles scoring and screen animations, linking physical gameplay events to on-screen feedback.</dd></div>
    </dl>
    <div class="pinball-gallery">{% assign section_media = page.media[3] %}{% include pinball-figure.html media=section_media %}</div>
  </div>
</section>

<section class="pinball-section" id="fabrication">
  <h2>Fabrication &amp; Assembly</h2>
  <div>
    <p>This build brings fabricated mechanical components and electronics together into one machine. Documenting the assembly process will show how the design moved from CAD to physical integration.</p>
    <ul>
      <li><strong>Parts &amp; processes:</strong> Add materials and fabrication methods actually used, including machining or 3D printing if applicable.</li>
      <li><strong>Physical assembly:</strong> Add the playfield construction, brackets, mounts, fixtures, fasteners, and assembly sequence.</li>
      <li><strong>Integration:</strong> Add wiring installation, component fit-up, alignment checks, manufacturing constraints, and resulting tradeoffs.</li>
    </ul>
    <div class="pinball-gallery">{% assign section_media = page.media[4] %}{% include pinball-figure.html media=section_media %}</div>
  </div>
</section>

<section class="pinball-section" id="software">
  <h2>Software &amp; Game Logic</h2>
  <div>
    <p>The software documentation should explain how physical events become game behavior. The following items are prompts for the actual implementation.</p>
    <ul>
      <li><strong>Scoring &amp; rules:</strong> Add scoring events, game rules, ball handling, and start/end conditions.</li>
      <li><strong>Keyboard / input mapping:</strong> Add physical-input mappings and any keyboard or host interface used; mark keyboard mapping as not applicable if unused.</li>
      <li><strong>Animations &amp; feedback:</strong> Add any light, display, or animation behavior implemented.</li>
      <li><strong>Control logic:</strong> Add game states, event handling, output timing, and relevant code excerpts or a repository link.</li>
    </ul>
  </div>
</section>

<section class="pinball-section" id="iteration">
  <h2>Challenges &amp; Iteration</h2>
  <div>
    <p>Use one or two concrete examples to connect an observed problem to a design decision and its verification.</p>
    <dl class="pinball-evidence">
      <div><dt>Problem encountered</dt><dd>To add: A specific symptom, the operating conditions, and its effect on gameplay or reliability.</dd></div>
      <div><dt>First approach &amp; troubleshooting</dt><dd>To add: What you tried, what failed, and the observations or measurements that helped identify the cause.</dd></div>
      <div><dt>Design change &amp; verification</dt><dd>To add: The mechanical, electrical, or software revision and how you checked its effect.</dd></div>
      <div><dt>Lesson learned</dt><dd>To add: The tradeoff, what you would change next time, and how it informed the next iteration.</dd></div>
    </dl>
    <p>Possible topics to document, if encountered: mechanical alignment, inconsistent ball paths, solenoid timing or heating, electrical noise, wiring faults, or component failures.</p>
  </div>
</section>

<section class="pinball-section" id="results">
  <h2>Results</h2>
  <div>
    <p>The project combines mechanical design, fabrication, electronics, embedded controls, and iterative testing in a single electromechanical build. Its current capabilities and measured performance still need to be documented.</p>
    <dl class="pinball-evidence">
      <div><dt>Current machine capabilities</dt><dd>To add: Which mechanisms, sensing, scoring, and gameplay functions work today, and which remain in progress.</dd></div>
      <div><dt>Testing &amp; reliability</dt><dd>To add: Test procedure, observed results, repeatability, and any limitations. Include numerical results only where recorded.</dd></div>
      <div><dt>Next revision</dt><dd>To add: Remaining issues and prioritized improvements.</dd></div>
    </dl>
  </div>
</section>

<section class="pinball-section" id="media">
  <h2>Media Gallery</h2>
  <div>
    <p>Machine views, design details, and the build process.</p>
    <div class="pinball-gallery">
      {% for media in page.media %}{% include pinball-figure.html media=media %}{% endfor %}
    </div>
    <div class="pinball-video">
      {% if page.gameplay_video_id and page.gameplay_video_id != '' %}
        {% include youtube-video.html id=page.gameplay_video_id autoplay="false" %}
      {% else %}
        <div class="pinball-media-placeholder"><span class="pinball-placeholder-label">Video to add</span><strong>Gameplay &amp; mechanism demonstration</strong><span>Add a gameplay video showing the current machine in operation.</span></div>
      {% endif %}
    </div>
  </div>
</section>

<section class="pinball-section" id="skills">
  <h2>Skills Demonstrated</h2>
  <div>
    <p>This project brings together the core work of developing an electromechanical system: designing parts and assemblies, building physical hardware, integrating electronics and controls, and refining the system through testing.</p>
    <ul>
      <li><strong>CAD &amp; mechanical design:</strong> Connecting component geometry, mechanism layout, and assembly constraints.</li>
      <li><strong>Electronics &amp; embedded controls:</strong> Integrating sensing and actuation with the mechanical system.</li>
      <li><strong>Fabrication &amp; prototyping:</strong> Translating a design into assembled hardware.</li>
      <li><strong>Testing &amp; problem solving:</strong> Using iterative testing to guide design refinement.</li>
    </ul>
  </div>
</section>
