/* =======================================================
   data.js
   PSEUDO-CODE: Pure constant — exported once, never mutated.
   All components import from here. Nothing writes back to it.
======================================================= */
export var DATA = {
  q1: {
    headline_stats: [
      { val:"60M",  label:"U.S. adults sought MH treatment (2023)", color:"#065F46", src:"SAMHSA NSDUH 2023" },
      { val:"10%",  label:"Actually in therapy or counseling",       color:"#92400E", src:"SAMHSA NSDUH 2023" },
      { val:"149M", label:"Americans in MH shortage areas",          color:"#991B1B", src:"HRSA Data 2024" },
      { val:"4.7%", label:"App users still active at day 30",        color:"#5B21B6", src:"PLOS One 2025 (38-study review)" },
      { val:"90%+", label:"Mental health apps are English-only",     color:"#1E40AF", src:"JMIR 2024 underserved review" },
      { val:"8x",   label:"App reach vs in-person in rural areas",   color:"#065F46", src:"AHRQ FASTER Brief" }
    ],
    treatment_by_race:[
      {group:"White adults",    rate:23.0, fill:"#065F46"},
      {group:"Native American", rate:18.2, fill:"#1E40AF"},
      {group:"Black adults",    rate:13.6, fill:"#92400E"},
      {group:"Hispanic adults", rate:12.9, fill:"#991B1B"},
      {group:"Asian adults",    rate:8.7,  fill:"#5B21B6"}
    ],
    treatment_by_age:[
      {age:"18-25",pct:18.6},{age:"26-34",pct:17.3},{age:"35-49",pct:15.8},
      {age:"50-64",pct:13.9},{age:"65+",pct:10.2}
    ],
    likely_users:[
      {group:"18-25 Gen Z / Millennials",score:88,color:"#065F46",
       note:"Digital-native, low stigma, mobile-first. #1 MH app demographic by download volume.",
       detail:"Accounts for the largest share of MH app downloads. Grew up with therapy normalization. Face peak onset of anxiety, depression, and eating disorders in this life stage. High comfort using apps for personal issues."},
      {group:"Women aged 25-44",score:81,color:"#065F46",
       note:"Higher help-seeking rates; comfort with wellness apps.",
       detail:"Women are significantly more likely than men to seek MH support in all forms. Use mood-tracking and journaling features most. Convert from download to regular use at higher rates than any other segment."},
      {group:"LGBTQ+ Youth (under 25)",score:76,color:"#065F46",
       note:"Anonymity bypasses fear of judgment; disproportionate MH need.",
       detail:"LGBTQ+ youth face 4x higher rates of depression and anxiety. App anonymity reduces fear of outing. Trevor Project data shows this group is among the highest-need and most receptive to digital-first tools."},
      {group:"Urban professionals 28-45",score:73,color:"#065F46",
       note:"Time-constrained, tech-comfortable, insurance gaps.",
       detail:"Gig workers, freelancers, and those between jobs lack consistent insurance. Know how to use apps but face appointment barriers. Likely to use an app to find sliding-scale therapy or free support groups."},
      {group:"College / university students",score:71,color:"#065F46",
       note:"Campus MH crisis + 6-12 week waitlists push app adoption.",
       detail:"Campus counseling centers are overwhelmed. Average wait at university health centers exceeds 6 weeks. Apps fill the gap. A significant share who start with an app eventually connect to in-person services."},
      {group:"Wellness-oriented adults",score:68,color:"#065F46",
       note:"Already doing yoga/meditation; 80M Americans yoga-curious.",
       detail:"Yoga Alliance data: 80M Americans are yoga-curious. These users are searching for MORE resources, not first-time help-seekers. High conversion for local class finders and peer group features."},
      {group:"Waitlist patients",score:65,color:"#065F46",
       note:"Active therapy seekers blocked by 6+ week waits.",
       detail:"3 in 5 psychologists reported no capacity for new patients (APA 2022). Apps become the default for people actively trying to get care but unable to access it."}
    ],
    unlikely_users:[
      {group:"Men aged 35-64",score:74,color:"#991B1B",
       note:"Highest avoidance of all MH help-seeking. Self-reliance culture.",
       detail:"Men are 74% less likely to seek professional MH help. Least likely to self-identify as needing support, most likely to use exercise or alcohol as coping. Framing as resource finder (vs therapy app) helps, but uptake remains low without peer social proof."},
      {group:"Rural residents 50+",score:71,color:"#991B1B",
       note:"Tech barriers, device access, skepticism of digital health tools.",
       detail:"149M people in HRSA shortage areas, disproportionately rural. Older rural adults face: no smartphone, limited broadband, cultural resistance to MH framing, few local resources to actually find."},
      {group:"Low-income uninsured",score:68,color:"#991B1B",
       note:"Data costs, device access, low awareness of free tools.",
       detail:"80% cite cost as primary barrier. Even free apps require a smartphone and data plan. Awareness is low. SMS fallback and offline modes are the only way to reach them."},
      {group:"Black adults 45+",score:62,color:"#991B1B",
       note:"Cultural stigma + historical distrust of health systems.",
       detail:"33%+ of Black Americans in MH care felt depression/anxiety would be seen as crazy in their community. Historical medical harm creates generational distrust. Peer ambassador programs and culturally-specific content are required, not optional."},
      {group:"Hispanic immigrants",score:56,color:"#991B1B",
       note:"Language barriers; 90%+ apps English-only; immigration fears.",
       detail:"First-generation immigrants face triple barriers: language (90%+ apps English-only), documentation fears around health services, and different cultural models of mental distress."},
      {group:"Adults 65+",score:52,color:"#991B1B",
       note:"Low smartphone adoption, different tech comfort, ageist design.",
       detail:"Smartphone adoption drops sharply above 65 in lower-income brackets. Interface design rarely accounts for cognitive load or vision changes. Significant unmet need but requires fundamentally different product thinking."}
    ],
    capabilities:[
      {cap:"Crisis Tools / Safety Plans",  impact:93,barrier:"Emergency access",       color:"#991B1B"},
      {cap:"24/7 No-Waitlist Access",       impact:92,barrier:"6-week avg waitlist",    color:"#065F46"},
      {cap:"Anonymous Use",                 impact:88,barrier:"Stigma / shame",         color:"#065F46"},
      {cap:"CBT Thought Exercises",         impact:84,barrier:"Therapy cost ($150+/hr)",color:"#065F46"},
      {cap:"Mood Tracking",                 impact:80,barrier:"Lack of continuity",     color:"#065F46"},
      {cap:"Validated Screenings (PHQ-9)",  impact:76,barrier:"Self-awareness gap",     color:"#1E40AF"},
      {cap:"Local Resource Finder",         impact:74,barrier:"Geography / deserts",    color:"#92400E"},
      {cap:"Peer / Community Support",      impact:69,barrier:"Social isolation",       color:"#5B21B6"},
      {cap:"Guided Meditation",             impact:67,barrier:"Stress management",      color:"#5B21B6"},
      {cap:"Psychoeducation Content",       impact:63,barrier:"Health literacy",        color:"#334155"}
    ],
    funnel:[
      {stage:"Download",        value:100, fill:"#065F46"},
      {stage:"Onboarding done", value:62,  fill:"#16A34A"},
      {stage:"Active Week 1",   value:38,  fill:"#22C55E"},
      {stage:"Active Week 2",   value:18,  fill:"#86EFAC"},
      {stage:"Active Day 30+",  value:4.7, fill:"#BBF7D0"}
    ],
    care_continuum:[
      {rung:1,label:"Digital self-care",         color:"#065F46",desc:"Apps, mood trackers, Calm, Headspace, crisis text lines, warmlines, online forums"},
      {rung:2,label:"Community and peer support", color:"#1E40AF",desc:"NAMI groups, DBSA, AA/NA, faith-based groups, grief circles, men's and women's circles"},
      {rung:3,label:"Coaching and group therapy", color:"#5B21B6",desc:"Online coaching, DBT groups, behavioral activation groups. Some clinical oversight; lowers resistance vs. individual therapy"},
      {rung:4,label:"Outpatient clinical care",   color:"#92400E",desc:"Traditional therapy, psychiatry, medication management, IOP. Highest barrier — easier to reach when alt resources serve as on-ramp"}
    ],
    alt_resource_taxonomy:[
      {cat:"Movement + Body",          color:"#065F46",examples:"Yoga, tai chi, qigong, dance/movement therapy, walking groups, adaptive fitness"},
      {cat:"Mindfulness + Meditation", color:"#1E40AF",examples:"MBSR classes, community meditation centers, breathwork, body scan workshops"},
      {cat:"Peer Support Groups",      color:"#5B21B6",examples:"NAMI, DBSA, AA/NA, Al-Anon, grief groups, postpartum circles, cancer support"},
      {cat:"Creative Therapies",       color:"#92400E",examples:"Art therapy, music therapy, drama therapy, writing/journaling workshops, poetry circles"},
      {cat:"Nature-Based",             color:"#065F46",examples:"Ecotherapy, horticultural therapy, wilderness programs, park prescriptions"},
      {cat:"Faith and Spiritual",      color:"#991B1B",examples:"Pastoral counseling, faith-based support groups, chaplaincy, contemplative practice"},
      {cat:"Community and Social",     color:"#1E40AF",examples:"Community centers, social clubs, volunteer programs, men's groups, women's circles"},
      {cat:"Digital Self-Care",        color:"#5B21B6",examples:"Woebot, Calm, Headspace, crisis text lines, online forums, warmlines, peer-to-peer apps"}
    ],
    dmv_data:[
      {segment:"NW DC wellness community",    before:35,after:120},
      {segment:"Federal workforce (NoVA/DC)", before:40,after:95},
      {segment:"Ward 7-8 residents",          before:8, after:22},
      {segment:"NoVA veteran families",       before:12,after:38},
      {segment:"PG County families",          before:15,after:55}
    ],
    bridge_strategies:[
      {icon:"01",title:"Primary Care Integration",       src:"APA Monitor 2024",
       desc:"Embed app QR codes in doctor offices and ERs — reaches people at peak concern moments. Warm handoff from PCP to app dramatically increases activation rate."},
      {icon:"02",title:"Offline / Low-Bandwidth Mode",   src:"SAMHSA Digital Equity",
       desc:"Cache local resources so rural users with spotty data can access without connectivity. SMS-fallback for users without smartphones or data plans."},
      {icon:"03",title:"Multilingual-First",             src:"HHS CLAS Standards; JMIR 2024",
       desc:"Spanish, Mandarin, Vietnamese, Haitian Creole as first-class languages. Filter by culturally-specific providers. Drops exit rate sharply for non-English users."},
      {icon:"04",title:"Peer Ambassador Program",        src:"NAMI Peer Support Research",
       desc:"Lived-experience advocates normalize app use inside stigmatized communities. NAMI peer-to-peer model shows 3x higher follow-through than clinician-only referral."},
      {icon:"05",title:"Campus Counseling Partnerships", src:"APA 2022 Survey",
       desc:"Direct integration with university waitlists — when students cannot get an appointment, redirect immediately to app. Largest single growth lever for the 18-25 segment."},
      {icon:"06",title:"Faith Community Integration",    src:"NAMI Cultural Competency",
       desc:"Equip pastors and community leaders with the app as a referral tool — reach people who would never self-install. Black and Hispanic churches are primary MH support structures."},
      {icon:"07",title:"Zero-Cost / No-Account Mode",    src:"KFF 2023 Survey",
       desc:"A no-login, no-data-collection look-up-resources-near-me mode that reaches uninsured, undocumented, and privacy-concerned users without any barrier."},
      {icon:"08",title:"Outcomes Reporting for Payers",  src:"AHRQ MEPS; FAIR Health",
       desc:"Package clinical outcomes data so insurance companies and Medicaid can reimburse app use as preventive care — creates sustainable revenue from high-need populations."}
    ]
  },

  q2:{
    headline_stats:[
      {val:"50%+", label:"People with MH conditions NOT receiving care",   color:"#5B21B6",src:"SAMHSA NSDUH 2023"},
      {val:"72.6%",label:"Cite 'want to handle alone' as top reason",      color:"#92400E",src:"NCS-R Barrier Study (PMC)"},
      {val:"80%",  label:"Cite cost as barrier to accessing therapy",       color:"#991B1B",src:"KFF Mental Health Survey 2023"},
      {val:"60%+", label:"Cite shame / stigma as a barrier",               color:"#991B1B",src:"NAMI State of Mental Health 2024"},
      {val:"6 wks",label:"Average waitlist to see a therapist",            color:"#1E40AF",src:"APA Psychologist Survey 2022"},
      {val:"3 in 5",label:"Psychologists had no capacity for new patients",color:"#92400E",src:"APA 2022"}
    ],
    treatment_gap:[
      {label:"Have a MH condition",     value:100, fill:"#5B21B6"},
      {label:"Need treatment",          value:57,  fill:"#7C3AED"},
      {label:"Seek any help",           value:42,  fill:"#8B5CF6"},
      {label:"Use telehealth / online", value:21,  fill:"#A78BFA"},
      {label:"In counseling / therapy", value:10,  fill:"#C4B5FD"},
      {label:"Medication only",         value:16.5,fill:"#DDD6FE"}
    ],
    avoidance_reasons:[
      {reason:"Cost too high / unaffordable",   pct:80,  fill:"#991B1B",src:"KFF 2023"},
      {reason:"Want to handle it alone",        pct:72.6,fill:"#5B21B6",src:"NCS-R PMC"},
      {reason:"Shame / stigma",                 pct:63,  fill:"#92400E",src:"NAMI 2024"},
      {reason:"No local providers",             pct:44,  fill:"#1E40AF",src:"HRSA Shortage Data"},
      {reason:"Long waitlists",                 pct:38,  fill:"#065F46",src:"APA 2022"},
      {reason:"Distrust of health systems",     pct:33,  fill:"#BE185D",src:"SAMHSA 2023"},
      {reason:"No childcare / time constraints",pct:28,  fill:"#334155",src:"AHRQ MEPS"},
      {reason:"Don't know where to start",      pct:24,  fill:"#92400E",src:"MHA 2024"}
    ],
    by_sex:[
      {group:"Men",  avoid:74,seek:26,note:"74% avoidance; #1 barrier is self-reliance culture and stigma"},
      {group:"Women",avoid:48,seek:52,note:"Women seek help at nearly 2x the rate of men across all modalities"}
    ],
    by_age:[
      {age:"18-25",avoid:41,seek:59,appUse:38,note:"Highest app use; crisis-driven search; social media discovery"},
      {age:"26-34",avoid:48,seek:52,appUse:31,note:"Cost and time constraints emerge; telehealth preferred"},
      {age:"35-49",avoid:57,seek:43,appUse:21,note:"Career and family pressure; handle-it-myself peaks"},
      {age:"50-64",avoid:66,seek:34,appUse:12,note:"Highest unmet need; least likely to use apps"},
      {age:"65+",  avoid:74,seek:26,appUse:5, note:"Strong stigma; provider shortage; cognitive barriers to apps"}
    ],
    by_race:[
      {race:"White",          treatmentRate:23.0,avoidance:67,stigmaScore:28,fill:"#5B21B6"},
      {race:"Black",          treatmentRate:13.6,avoidance:78,stigmaScore:47,fill:"#92400E"},
      {race:"Hispanic",       treatmentRate:12.9,avoidance:80,stigmaScore:44,fill:"#991B1B"},
      {race:"Asian",          treatmentRate:8.7, avoidance:85,stigmaScore:58,fill:"#1E40AF"},
      {race:"Native American",treatmentRate:18.2,avoidance:72,stigmaScore:39,fill:"#065F46"}
    ],
    alternatives:[
      {alt:"Online self-help content",        pct:64,  detail:"Reddit, YouTube, Medium, HelpGuide, NAMI self-help library",                                src:"AHRQ FASTER"},
      {alt:"Exercise / physical activity",    pct:58,  detail:"Running, gym, yoga — most commonly cited across all demographics, especially men",            src:"CDC BRFSS 2023"},
      {alt:"Friends, family, social support", pct:55,  detail:"Informal support is the most common first step before any structured help",                   src:"SAMHSA NSDUH 2023"},
      {alt:"Mental health apps",              pct:31,  detail:"Calm, Headspace, Woebot, Youper — 500M+ total MH app downloads in 2023",                      src:"data.ai 2024"},
      {alt:"Religious / spiritual practices", pct:29,  detail:"Particularly high among Black (42%) and Hispanic (38%) adults",                               src:"Gallup 2023"},
      {alt:"Telehealth / online therapy",     pct:21,  detail:"Grew 38x during COVID; now 1 in 5 mental health seekers use it",                              src:"AHRQ MEPS 2023"},
      {alt:"Prescription medication only",    pct:16.5,detail:"Medication is used 1.65x more than therapy — largest single clinical intervention",            src:"SAMHSA NSDUH 2023"},
      {alt:"Online / in-person support groups",pct:14, detail:"NAMI, AA/NA, DBSA — higher use among people with severe or chronic conditions",               src:"NAMI 2024"}
    ],
    alt_by_demo:[
      {group:"Men",            topAlt:"Exercise",           pct:71},
      {group:"Women",          topAlt:"Friends and Family", pct:64},
      {group:"18-25",          topAlt:"Apps + Social Media",pct:55},
      {group:"50-64",          topAlt:"Medication",         pct:39},
      {group:"Black adults",   topAlt:"Religious/Spiritual",pct:42},
      {group:"Hispanic adults",topAlt:"Family Support",     pct:58},
      {group:"Rural residents",topAlt:"Self-help online",   pct:67},
      {group:"Low income",     topAlt:"Exercise (free)",    pct:62}
    ],
    search_triggers:[
      {trigger:"Panic attack or acute crisis",         timing:"Immediate 0-24h",urgency:96,note:"Highest conversion to apps and telehealth. First search often: why am I having a panic attack"},
      {trigger:"Pandemic / collective stressor",       timing:"Event-driven",   urgency:91,note:"COVID drove 38x telehealth growth. Calm and Headspace downloads spiked dramatically at pandemic onset"},
      {trigger:"Someone close suggests getting help",  timing:"Days 0-3",       urgency:80,note:"Social proof from a trusted person is the single most powerful referral mechanism"},
      {trigger:"After a breakup or major loss",        timing:"Days 2-7",       urgency:78,note:"Grief-driven spike. Often first-time searchers who never considered therapy before"},
      {trigger:"Cannot get a therapy appointment",     timing:"Same day",       urgency:74,note:"APA 2022: 60% of psychologists at capacity. Rejection from in-person care immediately drives app search"},
      {trigger:"Self-help stops working",              timing:"Week 2-4",       urgency:72,note:"People first try podcasts, books, journaling. When those fail, they graduate to structured tools"},
      {trigger:"Repeated sleepless nights",            timing:"Week 2-3",       urgency:68,note:"Sleep disruption is a lagging indicator; people search anxiety keeping me awake before therapist"},
      {trigger:"Work or school performance drops",     timing:"Week 3-6",       urgency:61,note:"Functional impairment finally makes it undeniable. Search terms shift from symptoms to solutions"},
      {trigger:"New Year mental health resolutions",   timing:"January surge",  urgency:54,note:"Annual search spike. Therapist waitlists fill faster in January than any other month"},
      {trigger:"Social media MH content (ages 18-25)",timing:"Ongoing",        urgency:48,note:"Northwestern study: algorithms detect high-risk MH searches. Automated crisis resources underused due to impersonal feel"},
      {trigger:"Insurance open enrollment",            timing:"November",       urgency:46,note:"Prompts: what does my insurance cover for therapy — high-intent commercial moment"}
    ],
    app_outcomes:[
      {metric:"Coping skills improved (all apps)",    value:72, note:"Self-reported; strongest for context engagement and cognitive change techniques",fill:"#065F46"},
      {metric:"Stress reduction (3-week usage)",      value:68, note:"Statistically significant vs. control group. PLOS One 2025, 38-study review",   fill:"#1E40AF"},
      {metric:"Anxiety reduction (mindfulness apps)", value:61, note:"MBSR-based apps show strongest evidence base",                                   fill:"#5B21B6"},
      {metric:"Depression reduction (CBT apps)",      value:57, note:"Moderate effect size; strongest when used alongside human support",              fill:"#92400E"},
      {metric:"30-day retention (all apps)",          value:4.7,note:"The core challenge. Engagement collapse is the sector's biggest unsolved problem",fill:"#991B1B"}
    ]
  },

  datasets:{
    government:[
      {id:"GOV-01",name:"NSDUH — National Survey on Drug Use and Health",     org:"SAMHSA",       url:"https://www.samhsa.gov/data",                                                       formats:"CSV, SAS, Stata, R",  access:"Free",               notes:"70,000+ respondents. MH prevalence, treatment gaps, demographics. Annual flagship."},
      {id:"GOV-02",name:"BRFSS — Behavioral Risk Factor Surveillance",        org:"CDC",          url:"https://www.cdc.gov/brfss",                                                         formats:"CSV, SAS",            access:"Free",               notes:"State-level mental health, depression, access-to-care. 400,000+ adults per year."},
      {id:"GOV-03",name:"MEPS — Medical Expenditure Panel Survey",            org:"AHRQ",         url:"https://meps.ahrq.gov",                                                             formats:"CSV, SAS, Stata",     access:"Free",               notes:"Insurance coverage, MH expenditures, service use at household level."},
      {id:"GOV-04",name:"NHANES — National Health and Nutrition Exam Survey", org:"CDC",          url:"https://www.cdc.gov/nchs/nhanes",                                                   formats:"CSV, SAS",            access:"Free",               notes:"PHQ-9 depression scores linked to demographics."},
      {id:"GOV-05",name:"HRSA Mental Health Shortage Area Data",              org:"HRSA",         url:"https://data.hrsa.gov",                                                             formats:"CSV, API",            access:"Free",               notes:"Maps of Mental Health Professional Shortage Areas (MHPSAs) by county."},
      {id:"GOV-06",name:"Household Pulse Survey — Mental Health Module",      org:"Census / CDC", url:"https://www.cdc.gov/nchs/covid19/pulse/mental-health.htm",                         formats:"CSV, API",            access:"Free",               notes:"Real-time COVID-era data; anxiety/depression prevalence by state and demographic."},
      {id:"GOV-07",name:"YRBS — Youth Risk Behavior Survey",                  org:"CDC",          url:"https://www.cdc.gov/yrbs",                                                          formats:"CSV, SAS",            access:"Free",               notes:"MH, substance use, and suicidality in high school students."},
      {id:"GOV-08",name:"NIMH Statistics",                                    org:"NIMH / NIH",   url:"https://www.nimh.nih.gov/health/statistics",                                        formats:"Web tables",          access:"Free",               notes:"Curated national MH prevalence statistics with demographic breakdowns."},
      {id:"GOV-09",name:"WISQARS — Injury and Death Data (Suicide)",          org:"CDC",          url:"https://www.cdc.gov/injury/wisqars",                                                formats:"Web tool / CSV",      access:"Free",               notes:"Suicide deaths and self-harm by age, sex, race, method, and state."},
      {id:"GOV-10",name:"NSDUH Full Historical Archive (1979-present)",       org:"Data.gov",     url:"https://catalog.data.gov/dataset/national-survey-on-drug-use-and-health",          formats:"Various",             access:"Free",               notes:"All years of NSDUH since 1979 for longitudinal trend analysis."}
    ],
    academic:[
      {id:"ACA-01",name:"NCS-R — Barriers to MH Treatment Seeking",                     doi:"10.1001/archpsyc.62.6.603",     pmc:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2847358/",stat:"72.6% cite desire to self-handle; cost and stigma are main structural barriers",n:"9,282"},
      {id:"ACA-02",name:"20-Year NHIS Mindfulness and Meditation Trends",                doi:"10.1177/2156587220968064",      pmc:"https://pubmed.ncbi.nlm.nih.gov/33100127/",            stat:"Meditation use tripled 2002-2017; yoga use grew from 5% to 14% of U.S. adults", n:"85,000+"},
      {id:"ACA-03",name:"PLOS One 2025 — 38-study MH App Systematic Review",            doi:"10.1371/journal.pone.XXXX",    pmc:"https://pubmed.ncbi.nlm.nih.gov/",                     stat:"3-week app use reduces stress. Context engagement and cognitive change are most effective CBT techniques",n:"38 studies"},
      {id:"ACA-04",name:"JMIR 2024 — Underserved Populations and Digital MH",           doi:"10.2196/XXXXX",                pmc:"https://www.jmir.org/",                                stat:"App reach 8x in-person in rural areas. 90%+ apps English-only — key equity gap", n:"Review"},
      {id:"ACA-05",name:"AHRQ FASTER Technical Brief",                                  doi:"N/A",                          pmc:"https://effectivehealthcare.ahrq.gov/",                stat:"Telehealth expansion and digital tool use for MH in underserved areas",          n:"Policy review"},
      {id:"ACA-06",name:"PNAS Nexus — Deprivation and Mental Health",                   doi:"10.1093/pnasnexus/pgad",       pmc:"https://academic.oup.com/pnasnexus/",                  stat:"Structural deprivation doubles MH condition prevalence independent of other factors",n:"National sample"},
      {id:"ACA-07",name:"APA Psychologist Survey 2022",                                 doi:"N/A",                          pmc:"https://www.apa.org/monitor/2023/01/mental-health-pipeline",stat:"3 in 5 psychologists report no capacity; average 6-week wait",n:"1,800 psychologists"},
      {id:"ACA-08",name:"Northwestern — Social Media and Digital MH Tools (Schleider)", doi:"10.1016/j.brat.2023.XXXX",    pmc:"https://pubmed.ncbi.nlm.nih.gov/",                     stat:"Automated crisis resources underused due to impersonal feel. Social media is primary discovery channel for 18-25",n:"Study review"}
    ],
    institutional:[
      {id:"INST-01",name:"NAMI State of Mental Health 2024",         org:"NAMI",          url:"https://nami.org/mhstats",                                                       key_stat:"1 in 5 adults experiences MH condition; racial gaps in access; peer support 3x follow-through"},
      {id:"INST-02",name:"Mental Health America 2024 Report",        org:"MHA",           url:"https://mhanational.org/issues/state-mental-health-america",                    key_stat:"Youth MH deteriorating year-over-year; 57% of adults with MH conditions not treated"},
      {id:"INST-03",name:"KFF Mental Health Survey 2023",            org:"KFF",           url:"https://kff.org/mental-health/",                                                key_stat:"80% cite cost; insurance gaps; Medicaid as primary payer for serious MH conditions"},
      {id:"INST-04",name:"Trevor Project 2024 Survey",               org:"Trevor Project",url:"https://www.thetrevorproject.org/survey-2024/",                                key_stat:"45% LGBTQ+ youth seriously considered suicide; app and hotline use high in this group"},
      {id:"INST-05",name:"APA Monitor on Psychology 2024",           org:"APA",           url:"https://www.apa.org/monitor",                                                   key_stat:"Workforce shortage; capacity crisis; telehealth expanding but reimbursement inconsistent"},
      {id:"INST-06",name:"Gallup Mental Health Poll 2023",           org:"Gallup",        url:"https://news.gallup.com/poll/mental-health",                                   key_stat:"29% cite religious/spiritual coping; trust in MH professionals varies by affiliation"},
      {id:"INST-07",name:"Grand View Research — MH App Market",      org:"Grand View",    url:"https://www.grandviewresearch.com/industry-analysis/mental-health-apps-market", key_stat:"Global market $6.2B in 2023; CAGR 16.5% through 2030; 500M+ downloads annually"},
      {id:"INST-08",name:"FAIR Health — MH Cost Data",               org:"FAIR Health",   url:"https://www.fairhealth.org",                                                   key_stat:"Average therapy session $150-$250 out-of-pocket; telehealth ~40% cheaper per session"},
      {id:"INST-09",name:"Yoga Alliance Consumer Survey",            org:"Yoga Alliance", url:"https://www.yogaalliance.org/research",                                        key_stat:"80M Americans yoga-curious; 37M current practitioners; strong overlap with MH wellness seekers"},
      {id:"INST-10",name:"Grow Therapy Mental Health Landscape",     org:"Grow Therapy",  url:"https://growtherapy.com/blog/",                                                key_stat:"Waitlist data; telehealth adoption; payor mix breakdown for MH services"}
    ],
    additional:[
      {id:"EXT-01",name:"ICPSR NCS-R Microdata",                        url:"https://www.icpsr.umich.edu/web/ICPSR/studies/34902",                            access:"Application required",notes:"Full microdata for the National Comorbidity Survey Replication — gold standard for treatment barriers"},
      {id:"EXT-02",name:"Our World in Data — Mental Health (CC-BY)",     url:"https://ourworldindata.org/mental-health",                                       access:"Free CC-BY",          notes:"Curated global MH data with downloadable CSVs. Cite as CC-BY."},
      {id:"EXT-03",name:"WHO Global Health Observatory — Mental Health", url:"https://www.who.int/data/gho/data/themes/mental-health",                         access:"Free",                notes:"Global mental health service data and treatment coverage. 2020 and later."},
      {id:"EXT-04",name:"data.ai — Mental Health App Downloads 2024",    url:"https://www.data.ai/",                                                           access:"Partial free",        notes:"App download volumes, retention, DAU for Calm, Headspace, Woebot, and others."},
      {id:"EXT-05",name:"NIMH Data Archive (NDA)",                       url:"https://nda.nih.gov/",                                                           access:"Application required",notes:"Large archive of human subjects mental health research datasets."},
      {id:"EXT-06",name:"Psychology Today Therapist Directory",          url:"https://www.psychologytoday.com/us/therapists",                                  access:"Free",                notes:"Provider density analysis by zip code — useful for mapping shortage vs. abundance areas."},
      {id:"EXT-07",name:"SAMHDA Full Archive (1979-present)",            url:"https://www.datafiles.samhsa.gov/",                                              access:"Free",                notes:"All SAMHSA datasets: NSDUH, TEDS, N-SSATS, N-MHSS. Full historical archive."}
    ],
    key_stats:[
      {cat:"Prevalence",    stat:"1 in 5 U.S. adults experiences a MH condition annually",       value:"52.9M", year:2023,src:"NIMH",         url:"https://www.nimh.nih.gov/health/statistics"},
      {cat:"Prevalence",    stat:"Youth (18-25) with serious suicidal ideation",                 value:"13.2%", year:2023,src:"SAMHSA NSDUH", url:"https://www.samhsa.gov/data"},
      {cat:"Treatment Gap", stat:"Adults not receiving needed MH treatment",                     value:"57%",   year:2023,src:"MHA",           url:"https://mhanational.org"},
      {cat:"Treatment Gap", stat:"Adults in counseling or therapy",                              value:"10%",   year:2023,src:"SAMHSA NSDUH", url:"https://www.samhsa.gov/data"},
      {cat:"Treatment Gap", stat:"Adults on prescription MH medication",                         value:"16.5%", year:2023,src:"SAMHSA NSDUH", url:"https://www.samhsa.gov/data"},
      {cat:"Barriers",      stat:"Cite cost as primary barrier to therapy",                      value:"80%",   year:2023,src:"KFF Survey",    url:"https://kff.org/mental-health"},
      {cat:"Barriers",      stat:"Cite desire to self-handle as top reason",                     value:"72.6%", year:2005,src:"NCS-R PMC",     url:"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2847358/"},
      {cat:"Barriers",      stat:"Cite shame or stigma as a barrier",                            value:"63%",   year:2024,src:"NAMI",          url:"https://nami.org"},
      {cat:"Demographics",  stat:"White adult treatment rate",                                   value:"23%",   year:2023,src:"SAMHSA NSDUH", url:"https://www.samhsa.gov/data"},
      {cat:"Demographics",  stat:"Black adult treatment rate",                                   value:"13.6%", year:2023,src:"SAMHSA NSDUH", url:"https://www.samhsa.gov/data"},
      {cat:"Demographics",  stat:"Hispanic adult treatment rate",                                value:"12.9%", year:2023,src:"SAMHSA NSDUH", url:"https://www.samhsa.gov/data"},
      {cat:"Demographics",  stat:"Asian adult treatment rate",                                   value:"8.7%",  year:2023,src:"SAMHSA NSDUH", url:"https://www.samhsa.gov/data"},
      {cat:"Geography",     stat:"Americans in MH shortage areas",                               value:"149M",  year:2024,src:"HRSA",          url:"https://data.hrsa.gov"},
      {cat:"Apps",          stat:"MH app users still active at Day 30",                          value:"4.7%",  year:2025,src:"PLOS One 2025",url:"https://journals.plos.org/plosone/"},
      {cat:"Apps",          stat:"Global MH app market size",                                    value:"$6.2B", year:2023,src:"Grand View",    url:"https://www.grandviewresearch.com"},
      {cat:"Apps",          stat:"Annual MH app downloads globally",                             value:"500M+", year:2023,src:"data.ai 2024", url:"https://www.data.ai/"},
      {cat:"Telehealth",    stat:"Telehealth MH use growth during COVID",                        value:"38x",   year:2021,src:"AHRQ MEPS",    url:"https://meps.ahrq.gov"},
      {cat:"Alternatives",  stat:"Use exercise as MH coping strategy",                           value:"58%",   year:2023,src:"CDC BRFSS",     url:"https://www.cdc.gov/brfss"},
      {cat:"Alternatives",  stat:"Use online self-help content",                                 value:"64%",   year:2024,src:"AHRQ FASTER",  url:"https://effectivehealthcare.ahrq.gov"},
      {cat:"Mindfulness",   stat:"U.S. adults who currently practice yoga",                      value:"37M",   year:2023,src:"Yoga Alliance", url:"https://www.yogaalliance.org"}
    ]
  }
};

export var CAT_COLORS = {
  Prevalence:"#991B1B","Treatment Gap":"#5B21B6",Barriers:"#92400E",
  Demographics:"#1E40AF",Geography:"#065F46",Apps:"#065F46",
  Telehealth:"#1E40AF",Alternatives:"#5B21B6",Mindfulness:"#92400E"
};

/* ============================================================
   DMV DATA — DC, Maryland, Virginia regional resources
============================================================ */
export var DMV = {

  headline_stats: [
    { val:"91%",   label:"Virginia localities are designated MH shortage areas", color:"#991B1B", src:"VMAP / CHKD 2024" },
    { val:"22nd",  label:"Virginia's national MH ranking (down from 12th in 2024)", color:"#92400E", src:"Mental Health Virginia 2025" },
    { val:"74%",   label:"Marylanders very concerned about MH access disparities", color:"#5B21B6", src:"MHAMD Survey 2023" },
    { val:"29",    label:"DC Parks & Rec centers offering free wellness programming", color:"#065F46", src:"DC DPR 2024" },
    { val:"48th",  label:"Virginia ranks 48th nationally for youth MH vs. access", color:"#991B1B", src:"VMAP 2024" },
    { val:"14",    label:"Child psychiatrists per 100K children in Virginia", color:"#92400E", src:"CHKD VMAP 2024" }
  ],

  regional_stats: [
    {
      region:"Washington DC",
      color:"#1E40AF",
      stats:[
        { label:"Wards with federally designated MH shortage areas", value:"7 of 8" },
        { label:"Ward 7–8 residents without a nearby MH provider", value:"~85%" },
        { label:"DC crisis line calls per year", value:"60,000+" },
        { label:"Free DPR rec centers with wellness programming", value:"29" },
        { label:"Uninsured adults in Ward 7–8", value:"~18%" },
        { label:"Black residents in Ward 7–8", value:">90%" }
      ],
      context:"DC has significant geographic inequity — the Anacostia River divides well-resourced Wards 1–6 from severely underserved Wards 7–8. Faith communities are the primary mental health infrastructure east of the river."
    },
    {
      region:"Maryland",
      color:"#991B1B",
      stats:[
        { label:"Adults very concerned about MH access disparities", value:"74%" },
        { label:"Prince George's County MH shortage designation", value:"Full county" },
        { label:"MD residents who couldn't access needed MH care", value:"1 in 3" },
        { label:"Top MD priorities: funding + criminal justice reform", value:"#1 and #2" },
        { label:"MD Medicaid expansion MH coverage rate", value:"~89%" },
        { label:"Montgomery County crisis center capacity", value:"Limited" }
      ],
      context:"Maryland's statewide survey found Prince George's County residents disproportionately represented in disparity concerns. Strong Medicaid coverage but geographic inequity between Montgomery/Howard and PG/Charles counties persists."
    },
    {
      region:"Virginia",
      color:"#065F46",
      stats:[
        { label:"Localities designated as MH shortage areas", value:"91%" },
        { label:"National MH ranking (2025)", value:"22nd (↓ from 12th)" },
        { label:"National youth MH access ranking", value:"48th" },
        { label:"Child psychiatrists per 100K children", value:"14" },
        { label:"Rural VA counties with zero MH providers", value:"~35%" },
        { label:"VA crisis line (REACH VA) annual calls", value:"50,000+" }
      ],
      context:"Virginia dropped 10 spots in the national MH ranking from 2024 to 2025 — the steepest decline of any state. The rural provider desert is most acute in Southwest and Shenandoah Valley regions. Northern Virginia (Fairfax, Arlington, Alexandria) is better served but still faces waitlists."
    }
  ],

  resources_dc: [
    {
      category:"Crisis Lines",
      color:"#991B1B",
      items:[
        { name:"DC 988 Suicide and Crisis Lifeline", type:"Crisis line", cost:"Free", phone:"988", url:"https://dmhrecovery.org/", notes:"24/7; DC-specific call routing since 2022; multilingual" },
        { name:"DC Department of Behavioral Health — ACCESS Helpline", type:"Crisis line", cost:"Free", phone:"1-888-793-4357", url:"https://dbh.dc.gov/service/access-helpline", notes:"24/7 crisis support, referrals, mobile crisis dispatch across all 8 wards" },
        { name:"DC Crisis Intervention Team (CIT)", type:"Mobile crisis", cost:"Free", phone:"911 + request CIT", url:"https://dbh.dc.gov/", notes:"Co-responder model; trained officers + clinicians; active in all wards" }
      ]
    },
    {
      category:"Community Mental Health Centers",
      color:"#1E40AF",
      items:[
        { name:"DC Department of Behavioral Health — DBH", type:"Clinical", cost:"Sliding scale / Medicaid", phone:"202-673-7440", url:"https://dbh.dc.gov/", notes:"Primary public MH system; serves all wards; operates or funds 20+ community sites" },
        { name:"Community Connections", type:"Clinical + Peer", cost:"Sliding scale", phone:"202-745-5947", url:"https://communityconnectionsdc.org/", notes:"Wards 5–8 focus; trauma-informed care; supportive housing integration" },
        { name:"So Others Might Eat (SOME)", type:"Integrated care", cost:"Free", phone:"202-797-8806", url:"https://some.org/", notes:"Ward 5/6 focus; MH integrated with food, housing, addiction recovery; BIPOC-centered" },
        { name:"Unity Health Care", type:"FQHC", cost:"Sliding scale", phone:"202-745-4300", url:"https://unityhealthcare.org/", notes:"Multiple sites across Ward 1–8; integrated behavioral health in primary care" }
      ]
    },
    {
      category:"DC Parks & Recreation — Free Wellness",
      color:"#065F46",
      items:[
        { name:"Anacostia Community Rec Center (Ward 8)", type:"Free programming", cost:"Free", phone:"202-645-0510", url:"https://dpr.dc.gov/", notes:"Free fitness classes, youth programs, senior activities; wellness programming year-round" },
        { name:"Fort Stanton Rec Center (Ward 8)", type:"Free programming", cost:"Free", phone:"202-645-0573", url:"https://dpr.dc.gov/", notes:"One of the most underutilized Ward 8 resources; free classes, after-school MH support" },
        { name:"Ferebee Hope Rec Center (Ward 7)", type:"Free programming", cost:"Free", phone:"202-576-8655", url:"https://dpr.dc.gov/", notes:"Youth-focused; free movement, mentorship, and wellness programming; walk-in" },
        { name:"DC DPR — All 29 Rec Centers", type:"Free programming", cost:"Free", phone:"202-673-7647", url:"https://dpr.dc.gov/page/recreation-centers", notes:"All 29 centers across 8 wards offer free fitness, yoga, and wellness classes; no app lists all of them" }
      ]
    },
    {
      category:"Peer Support & Community Groups",
      color:"#5B21B6",
      items:[
        { name:"NAMI DC Chapter", type:"Peer support", cost:"Free", phone:"202-546-0646", url:"https://namidc.org/", notes:"NAMI Family Support Groups, NAMI Connection Recovery, Peer-to-Peer classes; multiple DC locations" },
        { name:"Narcotics Anonymous — DC Region", type:"Peer support", cost:"Free", phone:"202-399-5316", url:"https://dcna.org/", notes:"Daily meetings across all 8 wards including Ward 7/8; free; no sign-up required" },
        { name:"AA — DC Intergroup", type:"Peer support", cost:"Free", phone:"202-966-9115", url:"https://www.aa-dc.org/", notes:"Hundreds of weekly meetings across DC; multilingual; in-person and online" },
        { name:"DC LGBTQ+ Center — Mental Health Programs", type:"Peer support + Clinical", cost:"Free / low cost", phone:"202-682-2245", url:"https://thedccenter.org/", notes:"Support groups, peer counseling, and referrals specifically for LGBTQ+ residents" }
      ]
    },
    {
      category:"Faith-Based Resources (Wards 7, 8, PG County)",
      color:"#92400E",
      items:[
        { name:"Black churches — grief ministries", type:"Faith-based peer support", cost:"Free", phone:"Varies", url:"", notes:"The single most robust alt-resource network east of the Anacostia. Historically Black churches in Wards 7/8 run grief ministries, addiction recovery, and community counseling — none listed in existing directories" },
        { name:"St. Augustine's Catholic Church (Ward 2)", type:"Faith-based counseling", cost:"Free / donation", phone:"202-265-1470", url:"https://www.staugustine-dc.org/", notes:"Black Catholic community; grief support, addiction recovery, counseling referral ministry" },
        { name:"Ward 7/8 Faith Network (informal)", type:"Faith-based peer support", cost:"Free", phone:"Via DBH", url:"https://dbh.dc.gov/", notes:"DBH has partnerships with Ward 7/8 congregations for community outreach; DBH can connect to local pastors doing MH referrals" }
      ]
    }
  ],

  resources_md: [
    {
      category:"Crisis Lines",
      color:"#991B1B",
      items:[
        { name:"Maryland 988 Suicide and Crisis Lifeline", type:"Crisis line", cost:"Free", phone:"988", url:"https://988lifeline.org/", notes:"24/7; MD-routed; Spanish language line available; text and chat options" },
        { name:"Prince George's County Crisis Center", type:"Crisis center", cost:"Free", phone:"301-864-7130", url:"https://www.princegeorgescountymd.gov/", notes:"Walk-in and phone; 24/7 crisis stabilization; serves uninsured" },
        { name:"Montgomery County Crisis Center (CCSMC)", type:"Crisis center", cost:"Free / sliding scale", phone:"240-777-4000", url:"https://www.montgomerycareercenters.org/", notes:"24/7 walk-in and phone; bilingual Spanish; one of the best-resourced in the region" }
      ]
    },
    {
      category:"Community Mental Health Centers",
      color:"#1E40AF",
      items:[
        { name:"Prince George's County Health Dept — Behavioral Health", type:"Clinical", cost:"Sliding scale / Medicaid", phone:"301-909-6389", url:"https://health.pgcountymd.gov/", notes:"Primary public MH system for PG County; serves uninsured at reduced cost; multiple sites" },
        { name:"Montgomery County Behavioral Health Crisis Services", type:"Clinical + Crisis", cost:"Sliding scale", phone:"240-777-4000", url:"https://www.montgomerycountymd.gov/HHS-Program/DBHS/", notes:"Most comprehensive county MH system in MD; outpatient, crisis, peer support" },
        { name:"Sheppard Pratt — MD Statewide", type:"Clinical", cost:"Insurance / sliding scale", phone:"410-938-3000", url:"https://www.sheppardpratt.org/", notes:"Largest private, nonprofit MH system in Maryland; outpatient sites across Baltimore, PG, and DC suburbs" },
        { name:"Mental Health Association of Maryland (MHAMD)", type:"Advocacy + Peer", cost:"Free", phone:"410-235-1178", url:"https://www.mhamd.org/", notes:"Peer support, education, warmline; statewide advocacy for MH funding and access equity" }
      ]
    },
    {
      category:"Peer Support & Community Groups",
      color:"#5B21B6",
      items:[
        { name:"NAMI Maryland", type:"Peer support", cost:"Free", phone:"410-435-2600", url:"https://www.namimaryland.org/", notes:"Support groups, family education, Peer-to-Peer courses across all MD counties including PG and Montgomery" },
        { name:"AA Maryland — Central Office", type:"Peer support", cost:"Free", phone:"410-663-1922", url:"https://www.aa-md.org/", notes:"Thousands of weekly meetings across MD; PG County and Montgomery County both well-covered" },
        { name:"DBSA Maryland Chapters", type:"Peer support", cost:"Free", phone:"800-826-3632", url:"https://www.dbsalliance.org/", notes:"Depression and Bipolar Support Alliance chapters in Montgomery, Baltimore, and Annapolis areas" }
      ]
    },
    {
      category:"Maryland Regional Data Sources",
      color:"#065F46",
      items:[
        { name:"MHAMD Statewide Behavioral Health Survey 2023", type:"Data source", cost:"Free", phone:"", url:"https://www.mhamd.org/news/marylands-statewide-behavioral-health-survey/", notes:"Annual survey of MD residents and providers on access, disparities, and priorities. 74% very concerned about disparities." },
        { name:"Maryland Behavioral Health Administration (BHA)", type:"Data + Programs", cost:"Free", phone:"410-402-8300", url:"https://bha.health.maryland.gov/", notes:"State agency overseeing public MH system; publishes annual capacity reports by county" }
      ]
    }
  ],

  resources_va: [
    {
      category:"Crisis Lines",
      color:"#991B1B",
      items:[
        { name:"REACH VA — Virginia Crisis Line", type:"Crisis line", cost:"Free", phone:"1-800-273-8255 (Option 1)", url:"https://www.reachva.com/", notes:"Virginia-specific routing; 50,000+ annual calls; mobile crisis dispatch in most jurisdictions" },
        { name:"Virginia 988 Suicide and Crisis Lifeline", type:"Crisis line", cost:"Free", phone:"988", url:"https://988lifeline.org/", notes:"24/7; VA-routed; serves all 134 localities including rural Southwest VA" },
        { name:"Northern Virginia Crisis Center (ACTS)", type:"Crisis center", cost:"Free", phone:"703-573-5679", url:"https://actshelps.org/", notes:"Walk-in and phone; Fairfax-focused; 24/7; accepts uninsured" }
      ]
    },
    {
      category:"Community Mental Health Centers",
      color:"#1E40AF",
      items:[
        { name:"Fairfax-Falls Church Community Services Board", type:"Clinical", cost:"Sliding scale / Medicaid", phone:"703-383-8500", url:"https://www.fairfaxcounty.gov/community-services-board/", notes:"One of the largest CSBs in VA; outpatient, crisis, peer support, addiction; serves uninsured" },
        { name:"Arlington County Community Services Board", type:"Clinical", cost:"Sliding scale / Medicaid", phone:"703-228-1560", url:"https://www.arlingtonva.us/Government/Programs/Human-Services/Mental-Health/", notes:"Integrated MH + SUD; telepsychiatry available; multilingual" },
        { name:"Alexandria Community Services Board", type:"Clinical", cost:"Sliding scale / Medicaid", phone:"703-746-3400", url:"https://www.alexandriava.gov/CommunityServices", notes:"City of Alexandria public MH; crisis, outpatient, peer support; bilingual Spanish" },
        { name:"Prince William County CSB", type:"Clinical", cost:"Sliding scale / Medicaid", phone:"703-792-7373", url:"https://www.pwcva.gov/department/community-services/mental-health-substance-abuse", notes:"Serves Manassas and Prince William; large Spanish-speaking population; bilingual staff" }
      ]
    },
    {
      category:"Peer Support & Community Groups",
      color:"#5B21B6",
      items:[
        { name:"NAMI Northern Virginia", type:"Peer support", cost:"Free", phone:"703-941-0900", url:"https://naminorthernvirginia.org/", notes:"Support groups, family programs, crisis advocacy; Arlington, Fairfax, Alexandria, Loudoun coverage" },
        { name:"AA Virginia Northern District", type:"Peer support", cost:"Free", phone:"703-293-9999", url:"https://www.aa-dc.org/", notes:"Multiple weekly meetings across NoVA; online and in-person; multilingual" },
        { name:"VMAP — Virginia Mental Health Access Program", type:"Clinical referral", cost:"Free consultation", phone:"866-730-2820", url:"https://www.chkd.org/for-medical-professionals/virginia-mental-health-access-program-vmap/", notes:"For youth (0–25); rapid child psychiatry consultation to PCPs; covers rural VA pediatricians with no local specialist access" }
      ]
    },
    {
      category:"Virginia Regional Data Sources",
      color:"#065F46",
      items:[
        { name:"Mental Health Virginia — State Rankings 2025", type:"Data source", cost:"Free", phone:"", url:"https://mentalhealthvirginia.org/virginia-drops-from-12th-to-22nd-in-the-2025-state-of-mental-health-in-america-report/", notes:"VA dropped from 12th to 22nd nationally. Tracks workforce shortage, youth access, regional equity annually." },
        { name:"CHKD / VMAP Youth MH Data", type:"Data source", cost:"Free", phone:"", url:"https://www.chkd.org/for-medical-professionals/virginia-mental-health-access-program-vmap/", notes:"VA ranks 48th for youth MH vs. access; 91% of VA localities are MH shortage areas; 14 child psychiatrists per 100K children." }
      ]
    }
  ],

  regional_datasets: [
    { id:"R01", scope:"DC",       name:"DC DBH Annual Mental Health Report",                             org:"DC Dept of Behavioral Health",       url:"https://dbh.dc.gov/",                                                                                       key_stat:"Crisis call volume, provider capacity, ward-level disparities; updated annually" },
    { id:"R02", scope:"DC",       name:"DC Open Data — Mental Health Facilities",                         org:"DC Government",                       url:"https://opendata.dc.gov/",                                                                                  key_stat:"Geocoded MH facility locations across all 8 wards; free API" },
    { id:"R03", scope:"DC",       name:"DMPED DC Neighborhood Profiles",                                  org:"DC Office of Planning",               url:"https://planning.dc.gov/node/1238671",                                                                     key_stat:"Income, insurance, and health data by ward and ANC; useful for equity mapping" },
    { id:"R04", scope:"Maryland", name:"Maryland Behavioral Health Administration — County Profiles",     org:"MD BHA",                              url:"https://bha.health.maryland.gov/",                                                                          key_stat:"County-level MH capacity, provider counts, Medicaid utilization rates" },
    { id:"R05", scope:"Maryland", name:"MHAMD Statewide Behavioral Health Survey 2023",                   org:"Mental Health Association of MD",     url:"https://www.mhamd.org/news/marylands-statewide-behavioral-health-survey/",                                 key_stat:"74% very concerned about access disparities; PG County most underserved" },
    { id:"R06", scope:"Maryland", name:"Maryland CHRC — Health Workforce Shortage Designation Data",      org:"MD Health Care Commission",           url:"https://mhcc.maryland.gov/",                                                                                key_stat:"Tracks MH shortage designations by county; updated quarterly" },
    { id:"R07", scope:"Virginia", name:"Mental Health Virginia — State MH Rankings 2025",                 org:"Mental Health Virginia",              url:"https://mentalhealthvirginia.org/",                                                                         key_stat:"VA dropped 22nd nationally (from 12th). Covers workforce, youth, regional equity." },
    { id:"R08", scope:"Virginia", name:"CHKD / VMAP Youth Mental Health Data",                            org:"CHKD / Virginia MAP",                 url:"https://www.chkd.org/for-medical-professionals/virginia-mental-health-access-program-vmap/",               key_stat:"VA 48th for youth MH access; 91% localities shortage areas; 14 child psych per 100K" },
    { id:"R09", scope:"Virginia", name:"Virginia DBHDS — Statewide Behavioral Health Plan",               org:"VA Dept of Behavioral Health",        url:"https://www.dbhds.virginia.gov/",                                                                           key_stat:"State MH system capacity, CSB utilization, rural access gaps; annual report" },
    { id:"R10", scope:"Virginia", name:"DBHDS — Community Services Board Annual Report",                  org:"VA DBHDS",                            url:"https://www.dbhds.virginia.gov/",                                                                           key_stat:"Per-CSB data on crisis, outpatient, and residential MH capacity for all 40 CSBs" },
    { id:"R11", scope:"DC/MD/VA", name:"NAM DC Public Health Case Challenge 2024",                        org:"National Academy of Medicine",        url:"https://nam.edu/",                                                                                          key_stat:"Evidence base for MH interventions among emerging adults (18–29) in the DMV region" },
    { id:"R12", scope:"DC/MD/VA", name:"HRSA DMV Shortage Area Map",                                     org:"HRSA",                                url:"https://data.hrsa.gov/tools/shortage-area/hpsa-find",                                                       key_stat:"Interactive map of all MH shortage areas across DC, MD, and VA by county/census tract" }
  ],

  underserved_spotlight: [
    {
      area:"DC Ward 7 and Ward 8",
      color:"#991B1B",
      population:"~155,000 residents",
      pctBlack:">90%",
      challenge:"Virtually no private MH practices east of the Anacostia River. The entire area east of the river — home to 155,000+ predominantly Black residents — is a clinical desert. The existing infrastructure is faith communities, DPR rec centers, and a handful of DBH-funded community sites.",
      keyResources:["DBH ACCESS Helpline (888-793-4357)", "Community Connections", "DC DPR rec centers (Anacostia, Fort Stanton, Ferebee Hope)", "Narcotics Anonymous — DC Region", "Black church grief and recovery ministries"],
      appOpportunity:"No existing app or directory lists the full range of faith-based, DPR, and peer resources east of the Anacostia. The gap between available resources and discoverable resources is the largest in the region."
    },
    {
      area:"Prince George's County, MD",
      color:"#5B21B6",
      population:"~970,000 residents",
      pctBlack:"~64%",
      challenge:"The most populous majority-Black county in the U.S. is also one of the most underserved for MH in the DMV. Full-county HRSA shortage designation. Strong Medicaid coverage but limited provider base. MHAMD survey found PG County residents most likely to report inability to access care.",
      keyResources:["PG County Health Dept Behavioral Health (301-909-6389)", "NAMI Maryland", "988 Lifeline — MD routing", "AA and NA groups across the county"],
      appOpportunity:"PG County has high smartphone ownership but low MH app engagement. Primary discovery barriers are awareness and language (significant Spanish-speaking population in Hyattsville/Langley Park area)."
    },
    {
      area:"Southwest and Shenandoah Valley Virginia",
      color:"#92400E",
      population:"~600,000 rural residents",
      pctBlack:"~12%",
      challenge:"Rural Southwest VA has zero MH providers in many counties. The nearest psychiatrist may be 90+ miles away. REACH VA and telehealth are the primary access points. Community colleges and churches serve as informal mental health hubs.",
      keyResources:["REACH VA (1-800-273-8255 Option 1)", "Virginia 988", "Local community colleges — counseling centers", "Church-based support groups", "VMAP telehealth consultations for PCPs"],
      appOpportunity:"Offline mode and telehealth resource listing are the most critical features for this population. In-person resources are sparse; virtual peer groups and teletherapy directories fill the largest gap."
    },
    {
      area:"Northern Virginia (Fairfax, Arlington, Loudoun)",
      color:"#065F46",
      population:"~1.5M residents",
      pctBlack:"~10%",
      challenge:"NoVA has more providers per capita than DC or rural VA but still faces 6+ week waitlists due to high-income demand. Significant multilingual needs — Vietnamese, Korean, Spanish, Farsi, Amharic communities all underserved. Federal workforce culture creates stigma barriers among government employees.",
      keyResources:["Fairfax-Falls Church CSB (703-383-8500)", "NAMI Northern Virginia (703-941-0900)", "ACTS Crisis Center (703-573-5679)", "Arlington CSB", "Alexandria CSB"],
      appOpportunity:"Multilingual resource finder + federal employee anonymity features are the highest-leverage opportunities. Yoga studio and peer group discovery also strong for this wellness-oriented population."
    }
  ]
};
