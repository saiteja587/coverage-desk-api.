const STATUS_COLORS = { assigned: 'var(--teal)', woi: 'var(--amber)', unassigned: 'var(--coral)' };
// Seeded once from the uploaded student-master spreadsheet — after the
// first successful load, this seed is never used again; all edits go
// through the normal Students Master panel and its own storage.
const DEFAULT_STUDENTS_SEED = [{"n":"Abhishek Karre","c":"United States"},{"n":"Abhishek Muralidharan","c":"United States"},{"n":"Abhishek Singh Hazari","c":"United Kingdom"},{"n":"Adithya Ranga Sai Battini","c":"United States"},{"n":"AJAY BABU MANDHA","c":"United States"},{"n":"Ajay Kumar Polam","c":"United States"},{"n":"Ajay Lakkuntla","c":"United States"},{"n":"Akash Goud Amula","c":"United States"},{"n":"AKHIL BASHA DUDEKULA","c":"United States"},{"n":"Akhil Kondabathini","c":"United States"},{"n":"Akhila Marka","c":"United Kingdom"},{"n":"Akshara Movva","c":"United States"},{"n":"AKSHAY KUMAR JANGALA","c":"United States"},{"n":"Akshaya Paila","c":"United States"},{"n":"AKSHITHA KOTAGIRI","c":"United States"},{"n":"Ambika Valapatla","c":"United Kingdom"},{"n":"Amrutha Varshini","c":"United States"},{"n":"Amruthacharya Kothakota","c":"United States"},{"n":"Amulya chowdary Bellam","c":"United States"},{"n":"Amulya Lakkireddy","c":"United States"},{"n":"Anand Kumar Kopperla","c":"United Kingdom"},{"n":"Andrew Sedillo","c":"United States"},{"n":"Anil Kumar Nagam","c":"Ireland"},{"n":"Anil Telusuri","c":"United States"},{"n":"Anirudh Sai Puppala","c":"United States"},{"n":"Anmol Kumar Ale","c":"United Kingdom"},{"n":"Anuhya Gullapudi","c":"Ireland"},{"n":"Aparna Veldurti","c":"United States"},{"n":"Aravind Jambuka","c":"United States"},{"n":"Aruna kumari Nagabhiru","c":"United States"},{"n":"Arunprasad Maruthachalamurthy","c":"United States"},{"n":"Ashri Julkanain","c":"India"},{"n":"Ashrith Bhooka Ravinandan","c":"United States"},{"n":"Ashwan Teja Dasari","c":"Ireland"},{"n":"ASLESHA RAMANUJAM","c":"United States"},{"n":"Aslesha Yalamanchili","c":"United States"},{"n":"ASMITA TIRKEY","c":"Ireland"},{"n":"Atharva Nirdesh Varshney","c":"United Kingdom"},{"n":"Avirineni Navaneeth Rao","c":"United States"},{"n":"Bala Seeta Rami Reddy Avuluri","c":"United States"},{"n":"Battu Sai Kumar","c":"United States"},{"n":"Benhur Ruchitha Mamidi","c":"United States"},{"n":"Bhanu Prakash Pushpaka","c":"United States"},{"n":"Bhanu Prakash Sunke","c":"United States"},{"n":"Bharath Reddy Choudary","c":"Ireland"},{"n":"Bhargav Venigalla","c":"Germany"},{"n":"Bhaskara Sai Chandu Anisetti","c":"United States"},{"n":"BHAVANA ANAMDASU","c":"United States"},{"n":"Bhavanand Jupalli","c":"United States"},{"n":"Bhavani Gali","c":"United States"},{"n":"BhavanTeja Ammisetty","c":"United States"},{"n":"Bhuvanesh Marineni","c":"United States"},{"n":"Chaitanya Vemula","c":"United States"},{"n":"Chaithra Talagavara Sundaresha","c":"United Kingdom"},{"n":"chakravarthi sangoju","c":"United States"},{"n":"Chandan Shekar Hemmanahalli","c":"United Kingdom"},{"n":"CHANDANA SETTY SHARAFF","c":"United States"},{"n":"Chandi Priya Katta","c":"United States"},{"n":"Chandra Sekar Nandanavanam","c":"United States"},{"n":"Chandra Sekhar Mutina","c":"United States"},{"n":"Chandru Ganesan","c":"United States"},{"n":"Charitha Rampally","c":"United States"},{"n":"CHARITHA SRI SIDDAMSETTI","c":"United States"},{"n":"Chatura Vallabhaneni","c":"United States"},{"n":"Cherishma Samala","c":"United States"},{"n":"Chetan Babu Sakamuri","c":"United Kingdom"},{"n":"chetan sakamuri","c":"Aland Islands"},{"n":"Chidghana Hemantharaju","c":"Germany"},{"n":"Chivatam Eswar Chandra Vidya Sagar","c":"United Kingdom"},{"n":"Deepak Bantu","c":"United States"},{"n":"Deepanshu Raghuvanshi","c":"Ireland"},{"n":"Deepesh Naidu Paladugu","c":"United States"},{"n":"Deepthi Vadlapati","c":"United States"},{"n":"Devakalyan Adigopula","c":"United States"},{"n":"Developer Student Account","c":"United States"},{"n":"Devi Annamreddy","c":"United States"},{"n":"Devika Gunda","c":"United States"},{"n":"Diddi Sushma Swaraj","c":"United States"},{"n":"Dinesh Kumar Anini","c":"United Kingdom"},{"n":"Dinesh Sai Boppana","c":"United States"},{"n":"Dummy Student ADD","c":"Albania"},{"n":"Durga Lakshmi Bala Subash Sriram","c":"United States"},{"n":"Eemana Sairam","c":"United States"},{"n":"Ganesh Krishna Murugan","c":"United States"},{"n":"Ganesh Narayana Mareedu","c":"United States"},{"n":"Ganesh Reddy Neela","c":"United States"},{"n":"Gayathri Malempati","c":"United States"},{"n":"Geetha Bachina","c":"United States"},{"n":"Geetha Bujala","c":"United States"},{"n":"Geetheswara Reddy Chenchani","c":"United Kingdom"},{"n":"GNANA PRAKASH BANDI","c":"United States"},{"n":"Greha Shah","c":"United Kingdom"},{"n":"Gulla Srilatha","c":"United States"},{"n":"Gurusai Ravi Raja Reddy Ankireddy","c":"United States"},{"n":"Hamdoon A. K. A. Gaffoor","c":"Ireland"},{"n":"Haneesh Reddy","c":"United States"},{"n":"Hanmanth Reddy Aleti","c":"United States"},{"n":"Hari Venkateswarlu Annam","c":"United States"},{"n":"Harinath Reddy","c":"United States"},{"n":"Harish selva Selvaraj","c":"United States"},{"n":"Haritha Nallam","c":"United States"},{"n":"Harivardhan Reddy Manda","c":"United States"},{"n":"Harsha nandini Manikonda","c":"United States"},{"n":"Harshapriya Golagani","c":"United States"},{"n":"Harshavardanreddy Putluri","c":"United States"},{"n":"HARSHITHA DEVI SUNKARA","c":"United States"},{"n":"HAVILA PENUMAKA","c":"United States"},{"n":"Hemanth Kumar Panditi","c":"United Kingdom"},{"n":"Hemanth Rayavarapu","c":"United Kingdom"},{"n":"Himaja Rao Adirala","c":"United States"},{"n":"Humera Khanam Pathan","c":"United States"},{"n":"Jagadeesh Naidu Mamidibathula","c":"United States"},{"n":"Jagadish Goddati","c":"United States"},{"n":"JAHNAVI BATTU","c":"United States"},{"n":"Jahnavi Bhavana","c":"United States"},{"n":"Jahnavi Kalisetty","c":"United States"},{"n":"Jammula Chaithanya","c":"United States"},{"n":"Janani priya Kasireddy","c":"United States"},{"n":"Jangam Vinod Kumar","c":"Ireland"},{"n":"Jayanth Kethineni","c":"United States"},{"n":"Jennifer Mary Nancy","c":"United States"},{"n":"Jyothi Lohith Kumar Mamidi","c":"United States"},{"n":"Jyothipriya Ramavath","c":"United States"},{"n":"Jyothish Reddy Jaggavarapu","c":"United States"},{"n":"Kambli Giri","c":"United States"},{"n":"Karri Dileep","c":"Canada"},{"n":"Karri Tejaswini","c":"United States"},{"n":"Karthik D","c":"India"},{"n":"Karthik Komirisetti","c":"United States"},{"n":"Karthikeya Tirupathi","c":"United States"},{"n":"Kasaraneni Keerthi Sai","c":"United States"},{"n":"Kaushik Budida","c":"United States"},{"n":"Kautik Saridey","c":"United States"},{"n":"Kavya Kandagattla","c":"United States"},{"n":"Kavyashree Chandrashekar","c":"United States"},{"n":"Keerthana sathish Kumar","c":"United States"},{"n":"Keerthi Muppalaneni","c":"United States"},{"n":"Keerthi Sajja","c":"United States"},{"n":"Keerthi venkata Prasanna Kotra","c":"United States"},{"n":"Keerththana Sripathmarasa","c":"United Kingdom"},{"n":"Khadar Basha Shaik","c":"United States"},{"n":"Khurshid Shaik","c":"United States"},{"n":"Kiran Biradar","c":"United Kingdom"},{"n":"Kiran Teja Devineni","c":"United States"},{"n":"Kishore Mavireddy","c":"United States"},{"n":"kosanam chetan sai","c":"United States"},{"n":"Krishna Kumar korada","c":"United States"},{"n":"Krishna Murthy Koravi","c":"United States"},{"n":"Krishna Reddy Sabbella","c":"United States"},{"n":"Krishna Vamshi Reddy","c":"United States"},{"n":"KUNDURU VENKATA NIKHIL","c":"United States"},{"n":"Kusal Sai Ayinala","c":"United States"},{"n":"Kushal Sai Venigalla","c":"United States"},{"n":"Kusuma Naga Lalitha Batraju","c":"United States"},{"n":"Lahari Beerla","c":"United States"},{"n":"Lakshmi Bhavani Chennamsetty","c":"United States"},{"n":"Lakshmi Narayana Utlapalli","c":"United States"},{"n":"Lakshmi Sai Anusha Adiraju","c":"United Kingdom"},{"n":"Lakshmi Sreya Tushara Bandaru","c":"United States"},{"n":"Lavan Kumar Terapalli","c":"Canada"},{"n":"LAVANYA AKIRI","c":"United States"},{"n":"Laxman Nayak kodavath","c":"United States"},{"n":"Laxmi Prasanna Ganji","c":"United States"},{"n":"Likitha Chowdary Kasaraneni","c":"United States"},{"n":"Likitha Reddy Gudibandi","c":"United States"},{"n":"Lohith Cheedalla","c":"United States"},{"n":"Lohith Kukkadapu","c":"United States"},{"n":"Lokesh pathipati","c":"United States"},{"n":"Lokesh Reddy Ratnala","c":"United States"},{"n":"Madhuri Veeramalla","c":"United States"},{"n":"Mahesh Tirumalasetti","c":"United States"},{"n":"Maheshkumar Madipeddi","c":"United States"},{"n":"Mahnoor Hassan","c":"United States"},{"n":"Mallikarjun Reddy Vuradi","c":"United States"},{"n":"Manasa Keerthi","c":"United States"},{"n":"Maneesha Chalasani","c":"United States"},{"n":"Maneesha Gayathri Sunkara","c":"Germany"},{"n":"Mani Teja Akinapalli","c":"United States"},{"n":"Manideep reddy Mukkala","c":"United States"},{"n":"Manideepa Balan","c":"United States"},{"n":"Manikanta Puttoj","c":"Ireland"},{"n":"Manikethan Reddy Peesari","c":"United States"},{"n":"Manisha Vemireddy","c":"United States"},{"n":"Manjur Kanekal","c":"United States"},{"n":"Manoj kumar Bodduluru","c":"United States"},{"n":"Manoj Kumar Gondala","c":"United Kingdom"},{"n":"Manokrishna Nenuganti","c":"United States"},{"n":"Mansi Solanki","c":"United Kingdom"},{"n":"Masthan Babu Padarthi","c":"United States"},{"n":"Mathew kodavalli","c":"United Kingdom"},{"n":"Meghana Botta","c":"United Kingdom"},{"n":"Meghana Chittepu","c":"United States"},{"n":"Meghana Sanaka","c":"United States"},{"n":"Merugu Rajeswari","c":"India"},{"n":"Mounika Kumari Moodavath","c":"United States"},{"n":"Mounika Sandepamu","c":"United Kingdom"},{"n":"Muhammed Shibil Kooran Puthiyapurayi","c":"United States"},{"n":"Muzammil Mohammed","c":"United States"},{"n":"Mydhili Palagani","c":"United Kingdom"},{"n":"Naga Bhargav kumar Pilla","c":"United Kingdom"},{"n":"Naga Raju Jetti","c":"United States"},{"n":"Naga Sai Kumar Potti","c":"United States"},{"n":"Naga sankar nakkina","c":"United States"},{"n":"Naga Tarun Kumar Kunapareddy","c":"United States"},{"n":"Nagamani Medepalli","c":"United States"},{"n":"Nagaraju Kante","c":"Ireland"},{"n":"Nagidi Uday Kiran","c":"United States"},{"n":"Nagoor Basha Shaik","c":"United Kingdom"},{"n":"Nalabolu Prasanna Kumar","c":"United States"},{"n":"Narendra Swamy","c":"United States"},{"n":"Narsimha Rao Vengisetti","c":"United States"},{"n":"Navanthi Guvvala","c":"United States"},{"n":"Naveed Raja Maligaveli","c":"United States"},{"n":"Naveen Kumar Ramishetty","c":"United Kingdom"},{"n":"Naveen Reddy Pinreddy","c":"United States"},{"n":"Navya Baddam","c":"United States"},{"n":"Navya Desham","c":"United States"},{"n":"Navya Sreerama","c":"United States"},{"n":"Navya sri Chittiprolu","c":"United Kingdom"},{"n":"Navya Sri Mulukuntla","c":"United States"},{"n":"Nikhil Darisa","c":"United States"},{"n":"Nikhil Kumar Chandra","c":"United States"},{"n":"Nikhil Yadav","c":"Ireland"},{"n":"Nikitha Gopu","c":"United States"},{"n":"Nimisha Kumar","c":"United Kingdom"},{"n":"NITHESH KUMAR YADDLAPALLI","c":"United States"},{"n":"Padmaraju Siva Prasanth Raju","c":"United States"},{"n":"Paladugu Harshitha","c":"United States"},{"n":"PAVAN KALYAN LAKKISETTY","c":"United States"},{"n":"Pavan Kalyan Reddy Pochugari","c":"United States"},{"n":"Pavan Kumar Nagaraju Nagarathna","c":"United States"},{"n":"Pavan Kumar Reddy Naramreddy","c":"United States"},{"n":"Pavan kumar Thyarala","c":"United States"},{"n":"Pinky Sachdev","c":"United States"},{"n":"Pippalla Srilakshmi Subrahmanyam","c":"United States"},{"n":"Potla Lakshmi prasanna","c":"United States"},{"n":"Prabhath Medarametla","c":"United States"},{"n":"Pradeep Kommalapati","c":"United States"},{"n":"Pradhan Das","c":"United States"},{"n":"Pragna Tammineni","c":"United States"},{"n":"Pranay Mohan Kanakabandi","c":"United States"},{"n":"Pranay Thanneru","c":"United States"},{"n":"Pranaya Gundaboina","c":"United States"},{"n":"Praneetha Sate","c":"United States"},{"n":"Prasath Natarajan","c":"United Kingdom"},{"n":"Prashanth Muddam","c":"United States"},{"n":"Prashanth Nimmani","c":"United States"},{"n":"Prashanth Reddy Mittakanti","c":"United States"},{"n":"Prashanth Reddy Voladri","c":"Ireland"},{"n":"Prathyusha Anantha","c":"United States"},{"n":"Prathyusha Gadi","c":"United States"},{"n":"Pravallika Obulapuram","c":"United States"},{"n":"Praveen Dondapati","c":"United States"},{"n":"Prem Kumar Golla","c":"United States"},{"n":"Prem Sai Jagadish Batchu","c":"United Kingdom"},{"n":"Prema Kumari Ravipalli","c":"United States"},{"n":"Prema Latha Kolukulapally","c":"United States"},{"n":"Privith Sadhu","c":"United States"},{"n":"Priyanka Mupparaju","c":"United States"},{"n":"Priyanka Nelluri","c":"United States"},{"n":"Priyanka Tella","c":"United States"},{"n":"Pulipati Sai Teja","c":"United States"},{"n":"Rachana Nemilla","c":"United States"},{"n":"Raghuvamshi Goud karnati","c":"United States"},{"n":"RAGHUVARDHAN KATIPELLY","c":"United States"},{"n":"Raheema Begum Shaik","c":"United States"},{"n":"Rahul Akula","c":"United States"},{"n":"Rajesh Chaitanya Meedemula","c":"United Kingdom"},{"n":"Rajesh Pagadala","c":"United States"},{"n":"Rajesh Yadav Golla","c":"United States"},{"n":"Rajeswari M","c":"India"},{"n":"Raji","c":"United States"},{"n":"RAKESH GANDRA","c":"United States"},{"n":"Ram Mohan Reddy Muthyala","c":"United States"},{"n":"Ramakrishna Y","c":"United States"},{"n":"Ramasita Kona","c":"United States"},{"n":"Rameetha Reddy Sarasani","c":"United States"},{"n":"Ramya Perumal","c":"United States"},{"n":"Rasul Shaik","c":"United States"},{"n":"RAVEENDRA MARNA","c":"United Kingdom"},{"n":"Ravi Teja Algubelli","c":"United States"},{"n":"Reshma Shaik","c":"United Kingdom"},{"n":"Revanth Reddy Dharmala","c":"United States"},{"n":"Rishika Yalamanchili","c":"United States"},{"n":"Ritheesha Rajannagari","c":"United States"},{"n":"Riyaz Ahemed shaik","c":"United States"},{"n":"Robin Luke Jangam","c":"United States"},{"n":"Rohini Sura","c":"United States"},{"n":"Rohit Garjakuntla","c":"United Kingdom"},{"n":"ROHIT GUNNAM","c":"United States"},{"n":"Rohit Shyam","c":"United States"},{"n":"ROHITH ESAMPALLY","c":"United States"},{"n":"Rohith Modem","c":"United States"},{"n":"Rohith Myana","c":"United States"},{"n":"Rojarani Cheruku","c":"Canada"},{"n":"Roopal Mishra","c":"United States"},{"n":"Ruchika Godugu","c":"United States"},{"n":"RUCHITHA MANDALAPU","c":"United States"},{"n":"Ruthik Reddy Damerla","c":"United States"},{"n":"S Sai Kiran","c":"United States"},{"n":"Saaiiram Mandadapu","c":"United States"},{"n":"Sadhu Sri Charan","c":"Ireland"},{"n":"Safiya Kamuluru","c":"United States"},{"n":"Sai Aditya Nekkalapudi","c":"United States"},{"n":"Sai Chandana Panthulu","c":"United States"},{"n":"Sai Karthik Reddy Papammagari","c":"United States"},{"n":"Sai Nikhil Velagapudi","c":"United States"},{"n":"Sai Prasanna Patlolla","c":"United States"},{"n":"SAI PRASHANTH ALAKUNTLA","c":"United States"},{"n":"Sai Preetham D","c":"United States"},{"n":"SAI RAGHAVA VOBBANABOINA","c":"United States"},{"n":"Sai Rohit Reddy Parne","c":"United States"},{"n":"Sai Rohith Chada","c":"United States"},{"n":"Sai Sahithi Gunnapaneni","c":"United States"},{"n":"Sai Sampath Nagalla","c":"United States"},{"n":"Sai sankar chakradhar Maddali","c":"United States"},{"n":"Sai Shivani Kushanapalli","c":"United States"},{"n":"Sai Shwetha Kancharlapalli","c":"United States"},{"n":"Sai sreekanth Korukonda","c":"United Kingdom"},{"n":"Sai Sushrith Yadav Vaggu","c":"Canada"},{"n":"Sai Swagath Chava","c":"United States"},{"n":"Sai vardhan Jella","c":"United States"},{"n":"Sai Veera Venkat Tadisetty","c":"United States"},{"n":"Saiesh Vemulapalli","c":"United States"},{"n":"Saikiran Galla","c":"Ireland"},{"n":"Sailaja Meenigala","c":"United States"},{"n":"Saimanoj Kumar Addala","c":"United States"},{"n":"Sairam Karnati","c":"United States"},{"n":"Sairamakrishna Yaswanth Komaravolu","c":"United States"},{"n":"Sairamya Kankanampati","c":"United States"},{"n":"Saisnehanjali Sanike","c":"United States"},{"n":"Saiteja Reddy Poreddy","c":"United States"},{"n":"Saitejdeepkumar Chowdary Bodapati","c":"United States"},{"n":"Sakshi Goud","c":"United Kingdom"},{"n":"SALMA REDDIPALLI","c":"United States"},{"n":"Samyuktha Noolu","c":"United States"},{"n":"Sananazneen Shaik","c":"United States"},{"n":"Sandeep Guguloth","c":"United States"},{"n":"Sandeep Kaur","c":"United States"},{"n":"Sanjay Nenavath","c":"United States"},{"n":"Sardhak Peddapalli","c":"United Kingdom"},{"n":"Sathvika Ontela","c":"United States"},{"n":"Satya Devi Vundavalli","c":"United States"},{"n":"Satya Krishna Vallabhu","c":"United States"},{"n":"Satya Pavan Vignesh Veera","c":"United States"},{"n":"Saurabh Singh","c":"United Kingdom"},{"n":"Sekhar Reddy Kandula","c":"United States"},{"n":"Shadab Ahmed","c":"Canada"},{"n":"Shaik Ikramulla Shareef","c":"United States"},{"n":"Shaik Mohammad Sartaj Ali","c":"Ireland"},{"n":"Shajiya Begum","c":"United Kingdom"},{"n":"Shanmukha Muppalla","c":"United States"},{"n":"Shareef Shaik","c":"United Kingdom"},{"n":"Sharon Rentala","c":"United Kingdom"},{"n":"Sharukh Ahamed Shaik","c":"United States"},{"n":"Shashank Reddy Pisati","c":"United States"},{"n":"Sheba Diana Modam Reddy","c":"United States"},{"n":"Sherry Kollmann","c":"United States"},{"n":"Shilpitha Reddy Peruvala","c":"United States"},{"n":"Shiva Prasad Reddy Nagireddy","c":"United States"},{"n":"Shiva Shankar Orsu","c":"Ireland"},{"n":"Shiva Venkata Sai Kumar Kommuri","c":"United States"},{"n":"Shivendra Gupta","c":"United States"},{"n":"Shree Ramji","c":"United Kingdom"},{"n":"SHRUTHI CHEVA","c":"United States"},{"n":"Shruthi Salla","c":"United States"},{"n":"Shweta Hari","c":"United States"},{"n":"Siddharth Yalamanchili","c":"United States"},{"n":"Sinduja Bhoopathi","c":"United States"},{"n":"Siva Sai Kiran Akula","c":"United States"},{"n":"SIVA SAI KRISHNA TANINKI","c":"United States"},{"n":"Sivakumar Kolluru","c":"United States"},{"n":"Snigdha Chanda","c":"United States"},{"n":"Somishetti Pooja","c":"United States"},{"n":"Souban Ahmed","c":"United States"},{"n":"Soujanya Degavath","c":"United States"},{"n":"Sowmya Palla","c":"United States"},{"n":"Sravan Kumar Dama","c":"United States"},{"n":"Sravan kumar Sunketa","c":"United States"},{"n":"Sravani Naragani","c":"United States"},{"n":"Sravani Thurlapati","c":"United States"},{"n":"Sravya Reddappa","c":"United States"},{"n":"Sree Nikitha Reddy Doddareddy","c":"United States"},{"n":"Sreeja Damera","c":"United States"},{"n":"Sreeja Thimmapuram","c":"UNITED STATES"},{"n":"Srestha Somala","c":"United States"},{"n":"Sri Harsha Pochincharla","c":"United States"},{"n":"Sri Mayur Dasari","c":"United States"},{"n":"Sri Sandeep Kommanaboyina","c":"United States"},{"n":"Srija Reddy Vellanki","c":"United States"},{"n":"Srija Sadula","c":"United States"},{"n":"Srikanth Banoth","c":"United States"},{"n":"srikanth kasthala","c":"United States"},{"n":"Srikar Reddy Maadhu","c":"United States"},{"n":"Srilakshmi Jammula","c":"United States"},{"n":"Srilekha Reddy Lekireddy","c":"United States"},{"n":"Srimani Kumar Gamidi","c":"United States"},{"n":"Srinivas Bharadwaj Muchimilli","c":"Canada"},{"n":"Srinivas Reddy Marri","c":"United States"},{"n":"Srinivasa Rao Ambati","c":"United States"},{"n":"SrinivasaReddy Mekapothu","c":"United States"},{"n":"SRINU PAMULURI","c":"United States"},{"n":"Sriram Maddineni","c":"Ireland"},{"n":"Sriramadasu Sai Teja","c":"United Kingdom"},{"n":"Srivalli Tummala","c":"United States"},{"n":"Subhash Nethra","c":"United States"},{"n":"Subramanyam Meka","c":"United States"},{"n":"SUBRAMANYAM NOOKALA","c":"United States"},{"n":"Sujith Koneru","c":"United States"},{"n":"Sumasree Bodela","c":"United States"},{"n":"Sumayya Fathima Shaik","c":"United States"},{"n":"Sunaina Ali Basha","c":"United States"},{"n":"SUNDEEP BATTINA","c":"United States"},{"n":"Sunil Kumar Pasupuleti","c":"Canada"},{"n":"Sunnyhitha Dubbaka","c":"United Kingdom"},{"n":"Suresh kadiyala","c":"United States"},{"n":"SURVI SAIKISHOR GOUD","c":"United States"},{"n":"Surya Kiran Adari","c":"United States"},{"n":"Surya Teja Gowd Ayinavilli","c":"Ireland"},{"n":"Sushma gonu","c":"United States"},{"n":"Sushma Rayala","c":"United States"},{"n":"Sushma Reddy V","c":"United States"},{"n":"Sushma Sri Kondamareddy","c":"United States"},{"n":"Sushmitha Basavaraju","c":"United Kingdom"},{"n":"Sushmitha Kamani","c":"United States"},{"n":"Sushmitha Yerramasetti","c":"United States"},{"n":"Susmitha Polisetti","c":"Ireland"},{"n":"Swapna Kusuluri","c":"United States"},{"n":"Swathi Batt","c":"United States"},{"n":"Swathi Datla","c":"United States"},{"n":"Swathi Konakanchi","c":"United States"},{"n":"SWECHA SEKHAR SIDDAMSHETTY","c":"United States"},{"n":"Sweta Sridhar","c":"United Kingdom"},{"n":"Swetha Bunga","c":"United States"},{"n":"Syed Umar Farook","c":"United States"},{"n":"Tagili Karthik Kumar","c":"United States"},{"n":"TANVI ANANTULA","c":"United States"},{"n":"TARUN DONDA","c":"United States"},{"n":"Teja ram","c":"Not Added"},{"n":"Teja Ravipati","c":"United States"},{"n":"Tejasri Guttikonda","c":"United States"},{"n":"Tejaswaroop Renukuntla","c":"United States"},{"n":"Tejaswi Dasari","c":"United States"},{"n":"test test","c":"India"},{"n":"teststudent","c":"India"},{"n":"Thanuja Moganti","c":"United States"},{"n":"Thirumalagiri Sowjanya Maddineni","c":"United States"},{"n":"Thiruvengadam Leelakrishnan","c":"United Kingdom"},{"n":"Thrayamba keswar bettala","c":"United Kingdom"},{"n":"Toluganti Satya Praneeth Reddy","c":"United States"},{"n":"Triveni Nagabirava","c":"United States"},{"n":"Uday Guntupalli","c":"United States"},{"n":"Uday Kiran Ganta","c":"United States"},{"n":"Upendra Kumar Malladi","c":"United States"},{"n":"Uppalapati Sri Lakshmi","c":"United States"},{"n":"Usha Sree Sharanya Boinapally","c":"United States"},{"n":"Vaishnavi Kokkirala","c":"United States"},{"n":"Vamshi Arutla","c":"United States"},{"n":"Vamshi Burugupally","c":"United States"},{"n":"Vamshi Krishna Reddy Attla","c":"United States"},{"n":"Vamshi Merugu","c":"United States"},{"n":"Vanka Lasya Priyanka","c":"United States"},{"n":"VARAHALA BHARATH","c":"United States"},{"n":"Varmini Akella","c":"United States"},{"n":"Varsha Reddy Veerati","c":"United States"},{"n":"Varshini Reddy Borra","c":"United States"},{"n":"Varshitha Gosi","c":"United States"},{"n":"Varun Noone","c":"United States"},{"n":"Varun Venaganti","c":"United States"},{"n":"Vasavi Ramya","c":"United States"},{"n":"Vasreya Nimmaluri","c":"United States"},{"n":"Veditha Reddy Avuthu","c":"United States"},{"n":"Venkat Beera","c":"United States"},{"n":"Venkata Avinash Matcha","c":"United States"},{"n":"Venkata Naga Surya Lalitamanogjna Parsa","c":"United States"},{"n":"Venkata Praveen Putta","c":"United States"},{"n":"Venkata Sai Shashi Kumar Yella","c":"United States"},{"n":"Venkata Sai Swetha Gatamaneni","c":"Germany"},{"n":"Venkata Saketh Reddy Vennapusa","c":"United Kingdom"},{"n":"Venkata Surya Yakkala","c":"Ireland"},{"n":"Venkata Tarun Dodda","c":"United States"},{"n":"Venkata Uday Chand NUTHI","c":"United States"},{"n":"Venkatesh Gompa","c":"United States"},{"n":"VENKATESH NIDUMUKKALA","c":"United States"},{"n":"Venkateswara Rao Narra","c":"United States"},{"n":"Venugopal Mylapilli","c":"United States"},{"n":"Vijayalakshmi Pandian","c":"United States"},{"n":"Vijetha Nonwar","c":"United Kingdom"},{"n":"Vinay Kumar Bollepalli","c":"United States"},{"n":"Vinay Kumar Nandigama","c":"United States"},{"n":"Vineeth Sai Movva","c":"United States"},{"n":"Viswanadhuni sairam","c":"Ireland"},{"n":"Vivek Maddukuri","c":"United States"},{"n":"Vivek Paranthaman","c":"United States"},{"n":"Vybhavi Acharya Bailore","c":"United States"},{"n":"Vyshakh Prasad","c":"United States"},{"n":"Yannam Jeshwanth Reddy","c":"United States"},{"n":"Yasaswi Vankayalapati","c":"United States"},{"n":"Yaseswini Pamulapati","c":"United States"},{"n":"Yashaswi Kashozhala","c":"United Kingdom"},{"n":"Yashaswini Ganjikunta","c":"United States"},{"n":"Yashwanth Reddy Kareddy","c":"United States"},{"n":"Yaswanth Sai Teja Gorantla","c":"United States"},{"n":"Yedulla Sandeep","c":"United States"},{"n":"Yeswanthi Chowdavaram","c":"United States"},{"n":"YOCHITH KOMATINENI","c":"United States"}];

const DEFAULT_ROSTER = [
  {id:uid(), name:"Karthikeya", team:"HYD Team", advanced:true},
  {id:uid(), name:"Stephen", team:"HYD Team", advanced:true},
  {id:uid(), name:"Anji", team:"HYD Team", advanced:false},
  {id:uid(), name:"Uday", team:"HYD Team", advanced:false},
  {id:uid(), name:"Vamshidhar", team:"HYD Team", advanced:false},
  {id:uid(), name:"Akhil", team:"HYD Team", advanced:false},
  {id:uid(), name:"Pradeep Anna", team:"Pradeep Anna Team", advanced:true},
  {id:uid(), name:"Dhruva", team:"Pradeep Anna Team", advanced:true},
  {id:uid(), name:"Bharath", team:"Pradeep Anna Team", advanced:true},
  {id:uid(), name:"Avinash", team:"Pradeep Anna Team", advanced:true},
  {id:uid(), name:"Venkatesh", team:"Pradeep Anna Team", advanced:false},
  {id:uid(), name:"Naresh", team:"Pradeep Anna Team", advanced:false},
  {id:uid(), name:"Karthik", team:"Pradeep Anna Team", advanced:false},
  {id:uid(), name:"Gopal", team:"Pradeep Anna Team", advanced:false},
  {id:uid(), name:"Sai", team:"Sai Team", advanced:true},
  {id:uid(), name:"Sandeep Anna", team:"Sandeep Anna Team", advanced:true},
  {id:uid(), name:"Gopi", team:"Development Team", advanced:true},
  {id:uid(), name:"Kishore", team:"Development Team", advanced:true},
  {id:uid(), name:"Vamsi", team:"Development Team", advanced:true}
];
function isAdvancedRound(round){
  // Anything that doesn't start with "1" (optionally "1st") counts as
  // advanced — deliberately not requiring a specific, correctly-spelled
  // ordinal suffix like "nd"/"rd"/"th", since real source data has typos
  // ("2ns Round" instead of "2nd Round") that a stricter check would miss,
  // causing the row to be misfiled into the 1st Round tab despite the badge
  // correctly showing it as an advanced round. This matches the same loose
  // rule already used for the round badge's color styling, so the two never
  // disagree with each other again.
  const r = (round||'').trim();
  if(!r) return false;
  return !/^1(st)?\b/i.test(r);
}

let state = {
  // Reflects whatever the early inline script (see <head>) already applied
  // to <html data-theme>, so the toggle button's icon is correct on the
  // very first render rather than defaulting to dark and flipping a moment
  // later.
  theme: document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark',
  date: todayStr(),
  rows: [],
  roster: [],
  notes: [],
  filter: 'all',
  search: '',
  view: '1st',
  finalized: false,
  showImport: false,
  showRescheduleImport: false,
  showNavAddMenu: false, // the mobile bottom-nav ＋ button's "Add call / Reschedule" dropdown
  closureReview: null,
  closureApplying: false,
  showClosures: false,
  closures: [],
  closuresLoaded: false,
  closureManualMatches: {}, // closureId -> {candidate, company} — see findClosureMatchWithOverride()
  closureManualMatchPickerId: null, // which closure's "Match manually" picker is currently open, if any
  closureManualMatchSaving: false,
  closureMatchError: null,
  closureMatchSearch: '', // manual-match picker's search box text — see getClosureMatchCandidateList()
  // Pre-save "pick the right call" picker on the closure REVIEW screen
  // (added 2026-10-02) — same idea as the post-save "🔗 Match manually"
  // picker above, but for a closure that hasn't been saved yet, so the
  // candidate doesn't have to save it unmatched first and come back to fix
  // it afterward. See getReviewMatchCandidateList() / renderClosureConfirmPanel().
  closureReviewMatchIdx: null, // which closureReview[] item's picker is open, if any
  closureReviewMatchSearch: '',
  closureReviewAllRows: [], // cached from the same fetchAllRowsAcrossDates() call parseClosureBtn already does for cross-referencing
  closureReviewMatchRefreshing: false, // true while [data-open-review-match] is force-refreshing closureReviewAllRows — see that handler
  companyAliasError: null, // error text for the "🔗 Company aliases" add form — see renderCompanyAliasesHtml()
  appSettings: {}, // generic key/value settings map — see loadAppSettings()/saveAppSetting()
  editingIncentiveTarget: false,
  editingClosuresTarget: false,
  incentiveTargetError: null,
  closuresTargetError: null,
  // Expected Closures (added 2026-10-01): "who is in the call, we can
  // except this as closures depends on the call feedback by handlers or
  // driving persons" — a lightweight flag, separate from the real
  // (confirmed) Closures log above, for a call that a handler/driving
  // person says LOOKS like it's heading toward a closure, so it doesn't
  // get lost among everything else happening that day. Saiteja's own
  // framing: "let's say like a remainder [reminder] — I can follow up the
  // candidates or POCs what's the update regarding this." Lives in its
  // own backend resource/table (expected_closures), never written into
  // the append-only `closures` log itself until someone explicitly
  // confirms it.
  showExpectedClosures: false,
  expectedClosures: [],
  expectedClosuresLoaded: false,
  expectClosureRowId: null, // which board row's "flag as expected closure" note sheet is open, if any
  expectClosureSaving: false,
  expectClosureError: null,
  expectedClosureDeletingId: null,
  expectedClosureConfirmingId: null,
  expectedClosureFollowupId: null,
  rescheduleReview: null,
  rescheduleApplying: false,
  duplicatesReview: null,
  duplicatesRemoving: false,
  clearAllReview: null,
  clearAllRemoving: false,
  showPortalSync: false,
  portalSyncData: null,
  portalSyncError: '',
  portalSyncCacheWarning: '',
  portalSyncLoading: false,
  portalSyncUpdatedAt: null,
  portalSyncMode: 'today',
  portalSyncFromCache: false,
  dateSwitching: false,
  showIncentives: false,
  showBackups: false,
  backupsList: [],
  backupsLoading: false,
  incentivesMonth: '',
  incentivesData: null,
  incentivesLoading: false,
  incentivesError: '',
  incentivesUpdatedAt: null,
  incentivesFromCache: false, // true when incentivesData came from the saved cache (loadIncentivesCache) rather than a live Refresh (fetchIncentivesMonth) — see renderIncentivesPanel()
  showHelp: false,
  showCalendarView: false,
  calendarMonth: '',
  calendarData: null,
  calendarLoading: false,
  calendarError: '',
  // Team/person week-over-week + month-over-month comparison, added to the
  // Calendar view 2026-09-29 at Saiteja's request — see
  // computeCalendarComparisons() for the shape.
  calendarComparison: null,
  calendarCompareView: 'teams', // 'teams' | 'people'
  calendarCompareSearch: '',
  showRoster: false,
  showNotifications: false,
  showDbSettings: false,
  showCandidateProfile: false,
  candidateProfileName: '',
  candidateProfileData: null,
  candidateProfileLoading: false,
  showCompanyScorecard: false,
  companyScorecardQuery: '',
  companyScorecardData: null,
  companyScorecardLoading: false,
  needsLogin: false,
  loginError: '',
  dirty: false,
  saving: false,
  notifications: null,
  clientHistory: null,
  selectedIds: new Set(),
  expandedDetailIds: new Set(),
  portalAssignments: null,
  portalSyncLoading: false,
  portalSyncError: '',
  saveError: '',
  portalSyncedAt: '',
  portalDrivingPersonFillCount: 0,
  portalDrivingPersonSaveError: '',
  notifTab: 'absent',
  repeatClientsAdvanced: null,
  notifSearchCandidates: '',
  notifSearchClients: '',
  hideAllNotifCandidates: false,
  hideAllNotifClients: false,
  allReschedulesData: null,
  absencePatterns: null,
  notifSearchAllResched: '',
  hideAllNotifAllResched: false,
  clientReliabilityData: null,
  notifSearchReliability: '',
  hideAllNotifReliability: false,
  trendsData: null,
  predictiveCapacityWarnings: null,
  closuresView: 'list',
  closuresPerformance: null,
  closuresSummaryPeriod: 'month',
  closuresListMonth: null,
  closuresListShowAll: false,
  showSummary: false,
  backingUp: false,
  showUsers: false,
  showCreateUserForm: false,
  usersList: null,
  usersError: '',
  lastDeleted: null,
  assigneeFilter: '',
  clientFilter: '',
  teamFilter: null,
  groupByCompany: false,
  showMoreMenu: false,
  showToolsMenu: false,
  showImportMenu: false,
  showAllDates: false,
  mobileNoteExpanded: false,
  mobileStripExpanded: false,
  showUniversalSearch: false,
  universalSearchQuery: '',
  universalSearchResults: null,
  universalSearchLoading: false,
  // Merged in Client History Search's fuzzy company-only matching (2026-09-24)
  // as a mode here, instead of keeping two separate lookup panels — see
  // renderUniversalSearchPanel().
  universalSearchCompanyOnly: false,
  showMissedCheck: false,
  missedCheckText: '',
  missedCheckResults: null,
  missedCheckLoading: false,
  missedCheckError: null,
  missedCheckReviewItems: null,
  missedCheckApplying: false,
  woiAgingData: null,
  woiAgingLoading: false,
  weeklyRecapData: null,
  weeklyRecapLoading: false,
  conversionFunnelData: null,
  conversionFunnelLoading: false,
  stuckPipelineData: null,
  stuckPipelineLoading: false,
  timeToCloseData: null,
  timeToCloseLoading: false,
  showDataHealth: false,
  dataHealthLoading: false,
  dataHealthGeneratedAt: null,
  showDailyDigest: false,
  showDailyDigestBanner: false,
  showQuickSearchModal: false,
  finalRoundNudgeData: null,
  finalRoundNudgeLoading: false,
  candidateLastStatusData: null,
  candidateLastStatusLoading: false,
  notifSearchLastStatus: '',
  candidateActivityMonth: null,
  candidateActivityShowAll: true, // default to "all months" so a stale candidate from a while back is never hidden by default — nav lets you narrow to one month on top of that
  candidateActivityStaleOnly: false,
  candidateProfileClosureForm: null,
  candidateProfileClosureSaving: false,
  closureMatchRefreshing: false,
  incentivesExpandedHandler: null,
  incentiveAddingClosureKey: null,
  closureDeletingId: null,
  closureDeleteError: null,
  noAssigneeApplyingId: null,
  noAssigneeApplyError: null,
  drivingPersonBackfillRunning: false,
  drivingPersonBackfillResult: null,
  drivingPersonBackfillError: null,
  drivingPersonBackfillApplyingKey: null,
  micListening: false,
  micTargetId: null,
  allDatesData: null,
  allDatesLoading: false,
  absentIds: [],
  exportedIds: [],
  showStudentsMaster: false,
  showConflicts: false,
  studentsMaster: [],
  studentsMasterLoaded: false,
  studentsMasterLoading: false,
  studentsMasterBackendMissing: false,
  studentsSearch: '',
  studentsAddError: '',
  showAddStudentForm: false,
  importDefaultRound: '1st',
  lastImportedIds: null,
  lastImportedCount: 0,
  lastImportMergedCount: 0,
  recentImportIds: null,
  // Same pattern as the "Undo import" banner above, for the Reschedule/
  // Cancel confirm flow — added 2026-09-26 because confirming a reschedule
  // import used to just close the review screen and pop a transient
  // alert(), leaving no visible trace on the home screen of which records
  // actually got saved.
  lastReschedItems: null,
  recentReschedIds: null,
  // Same reasoning, for "Remove Duplicates" — that action also used to just
  // alert() a count and close the review screen, with no lasting record of
  // which specific duplicate rows were actually removed.
  lastDedupeInfo: null,
  loadError: null,
  confirmedStudentMatches: new Set(),
  showSwipeAssignPicker: false,
  pendingSwipeAssignRowId: null,
  // "..." quick-action sheet — Instagram-style bottom sheet for a single
  // call card, opened via its own visible button (mobile card view) so a
  // person doesn't need to remember a swipe direction to reassign, mark a
  // status, jump to that candidate's Timeline, or delete — the four things
  // that otherwise each need their own separate navigation. Holds just the
  // row id; the sheet itself always reads the live row from state.rows so
  // it can never show stale data.
  quickActionRowId: null,
  rejectedStudentMatches: new Set(),
  showClipboardPicker: false,
  clipboardPickerMessages: [],
  clipboardPickerSelected: null,
  clipboardPickerTargetId: null,
  clipboardPickerExistingValue: '',

  // ---- 2026-09-30 batch: priority sort, tomorrow preview, quick-jump,
  // end-of-day wrap-up, offline queue, time-sensitive alerts ----
  prioritySort: false, // unassigned-and-soonest first, instead of pure chronological
  tomorrowPreview: null, // { date, total, woi } — see loadTomorrowPreview()
  tomorrowPreviewLoading: false,
  showQuickJump: false,
  quickJumpQuery: '',
  quickJumpResults: null,
  quickJumpLoading: false,
  showEodWrapup: false,
  eodWrapupLoading: false,
  eodWrapupData: null, // { handledCount, slippedRows, tomorrowPreview } — see computeEodWrapup()
  offlineQueue: {}, // dateKey -> {rows, notes, finalized, queuedAt} — see queueOfflineSave()
  offlineQueueRetrying: false,
  offlineRosterPending: false, // roster isn't date-scoped, so it gets its own flag instead of a queue entry — see queueOfflineSave()
  alertsEnabled: false, // "Time-sensitive alerts" — persisted to localStorage, see setupTimeSensitiveAlerts()
  alertedRowIds: new Set(), // rows already notified about this session, so the same call doesn't re-alert every check
};
let saveTimer = null;
let portalSyncTimer = null;
let undoToastTimer = null;

function todayStr(){
  const d = new Date();
  return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
}

function uid(){ return Math.random().toString(36).slice(2,10); }

// ---------- storage adapter ----------
// Inside Claude's app/website, window.storage saves data to your Claude account.
// Opened standalone (system browser, downloaded file, hosted elsewhere), that
// API doesn't exist — this falls back to the browser's own localStorage instead,
// so the app still saves and reloads your data, just tied to that one browser/device.
const USE_CLAUDE_STORAGE = (typeof window !== 'undefined' && window.storage &&
  typeof window.storage.get === 'function' && typeof window.storage.set === 'function');
const storageAdapter = {
  async get(key, shared){
    if(USE_CLAUDE_STORAGE) return window.storage.get(key, shared);
    const raw = localStorage.getItem('coverage-desk::'+key);
    if(raw===null) throw new Error('Key not found: '+key);
    return {key, value: raw, shared: !!shared};
  },
  async set(key, value, shared){
    if(USE_CLAUDE_STORAGE) return window.storage.set(key, value, shared);
    localStorage.setItem('coverage-desk::'+key, value);
    return {key, value, shared: !!shared};
  },
  async list(prefix, shared){
    if(USE_CLAUDE_STORAGE) return window.storage.list(prefix, shared);
    const fullPrefix = 'coverage-desk::'+(prefix||'');
    const keys = [];
    for(let i=0;i<localStorage.length;i++){
      const k = localStorage.key(i);
      if(k && k.startsWith(fullPrefix)) keys.push(k.slice('coverage-desk::'.length));
    }
    return {keys, prefix, shared: !!shared};
  }
};

// ---------- storage ----------
// ---------- optional remote MySQL API (Vercel backend) ----------
// If configured, calls/roster/notes/finalized all save to a real MySQL database
// via a small backend, instead of Claude storage or browser localStorage.
// DEFAULT_API_BASE_URL is baked in so that anyone who opens this file — on any
// device, any browser — automatically connects to the same shared database
// without needing to manually configure anything. The Database panel can still
// override it (e.g. to point at a different backend), and an explicit
// "disconnect" (saving a blank URL) is respected and remembered per-browser.
const DEFAULT_API_BASE_URL = 'https://coverage-desk-api.vercel.app';
let API_BASE_URL = DEFAULT_API_BASE_URL;
try{
  const saved = localStorage.getItem('coverage-desk-api-url');
  if(saved !== null) API_BASE_URL = saved; // respects an explicit disconnect (empty string)
}catch(e){}

let ADMIN_PASSWORD = '';
try{ ADMIN_PASSWORD = localStorage.getItem('coverage-desk-admin-pw') || ''; }catch(e){}
let CURRENT_USERNAME = '';
try{ CURRENT_USERNAME = localStorage.getItem('coverage-desk-username') || ''; }catch(e){}
let CURRENT_ROLE = 'admin'; // optimistic default; refined by refreshRole() once connected
let AUTH_FAILED = false; // set true when the backend rejects the current credentials

// "My Calls" quick filter (2026-09-24, pipeline-visibility batch). There's
// no server-side link between a login account and a roster name — login
// accounts are for access control, roster entries are who calls actually
// get assigned to, and the two were never the same list — so this is
// deliberately a personal, per-browser preference (like the theme choice),
// not something the backend knows about. Read once per page load; cleared
// only by explicitly changing it via myCallsChangeBtn.
function getMyAssigneeName(){
  try{ return localStorage.getItem('coverage-desk-my-name') || ''; }catch(e){ return ''; }
}
function setMyAssigneeName(name){
  try{
    if(name) localStorage.setItem('coverage-desk-my-name', name);
    else localStorage.removeItem('coverage-desk-my-name');
  }catch(e){}
}

// Global "working…" indicator (the bar at the very top of the page — see
// #globalBusyBar in the static HTML). Every apiCall() increments this on
// start and decrements it when it settles, success or failure; the bar
// shows whenever the count is above zero, so ANY in-flight request —
// import, quick-assign, a panel loading its data, not just the main Save
// button — now gives some visible sign it's working instead of the button
// just silently doing nothing until the response comes back. A plain class
// toggle, not a render() call, so showing/hiding it never costs a render.
let __pendingApiCalls = 0;
function setNetworkBusy(delta){
  __pendingApiCalls = Math.max(0, __pendingApiCalls + delta);
  const bar = document.getElementById('globalBusyBar');
  if(bar) bar.classList.toggle('active', __pendingApiCalls > 0);
}
async function apiCall(resource, opts){
  setNetworkBusy(1);
  try{
  const url = `${API_BASE_URL.replace(/\/$/,'')}/api/data?resource=${resource}${opts.qs?'&'+opts.qs:''}`;
  const headers = opts.body ? {'Content-Type':'application/json'} : {};
  if(ADMIN_PASSWORD){
    headers['x-admin-password'] = ADMIN_PASSWORD; // tried as the master password first
    headers['x-password'] = ADMIN_PASSWORD;        // also tried as this account's own password
  }
  if(CURRENT_USERNAME) headers['x-username'] = CURRENT_USERNAME;
  // Without a timeout, a fetch that never resolves (server accepts the
  // connection but never answers — a slow-waking serverless function or a
  // suspended free-tier database are the realistic causes here) leaves
  // whoever is awaiting this call stuck forever, with no way for their own
  // try/catch to help — that only handles a promise that actually rejects,
  // not one that simply never settles. On first load specifically, that's
  // exactly what would leave someone staring at "Loading Coverage Desk…"
  // indefinitely, since render() never gets reached. 20s is generous enough
  // for a genuine cold start while still guaranteeing the app eventually
  // gives up and falls back instead of hanging forever.
  //
  // Portal sync is the one caller that needs longer: it proxies out to a
  // separate Apps Script bridge (its own, independent cold start on top of
  // this backend's) and, on a Full Sync, deliberately pulls the entire call
  // history — a real request that can legitimately take close to 20s on
  // its own even once everything's warm. A flat 20s timeout was killing
  // that right as it was about to succeed. Callers that know they're slow
  // pass a longer opts.timeoutMs; everything else keeps the original 20s.
  const timeoutMs = opts.timeoutMs || 20000;
  const controller = new AbortController();
  const timeoutId = setTimeout(()=>controller.abort(), timeoutMs);
  let res;
  try{
    res = await fetch(url, {
      method: opts.method || 'GET',
      headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      // Forces the browser to bypass its HTTP cache entirely and always hit
      // the server fresh — without this, the browser can send a conditional
      // request (If-None-Match) and reuse a stale cached response (304 Not
      // Modified) even when the underlying data has genuinely changed, which
      // would look exactly like "I saved but it still shows the old data."
      cache: 'no-store',
      signal: controller.signal
    });
  }catch(e){
    if(e && e.name === 'AbortError'){
      const secs = Math.round(timeoutMs/1000);
      throw new Error(`${resource}: the server took too long to respond (over ${secs}s) — it may be waking up from being idle. Try again in a moment.`);
    }
    throw e;
  }finally{
    clearTimeout(timeoutId);
  }
  if(res.status === 401){ AUTH_FAILED = true; throw new Error('Unauthorized — wrong or missing credentials'); }
  if(res.status === 403){ throw new Error('Read-only account — admin permission required to save changes.'); }
  AUTH_FAILED = false;
  if(!res.ok){
    // FIX (2026-09-27): this used to throw just the HTTP status code
    // ("API closure_manual_match failed: 500"), discarding whatever actual
    // explanation the backend sent back in its JSON error body — reported
    // as a manual closure match silently "not stored," when what was
    // actually happening was a real save failure with a real reason
    // (e.g. a database table that hasn't been created yet) that the person
    // had no way to see. Read the body first; fall back to the plain
    // status code only if the response isn't valid JSON at all.
    let detail = '';
    try{ const body = await res.json(); detail = body && body.error ? body.error : ''; }catch(e){ /* not JSON — fall through */ }
    throw new Error(detail ? `${resource}: ${detail}` : `API ${resource} failed: ${res.status}`);
  }
  return await res.json();
  } finally {
    setNetworkBusy(-1);
  }
}
// Pulls the combined, read-only Portal snapshot (assignments + per-handler
// incentives) via Coverage Desk's own backend, which proxies the actual
// Apps Script bridge call server-side so the portal secret never reaches
// the browser.
//
// mode 'today'  -> fast: only this date's calls (few seconds), auto-polled
// mode 'full'   -> slow: the entire call history (~20-40s depending on
//                  whether the Apps Script bridge is cold), manual only
// After a Portal sync, for 1st Round calls on the currently-open date:
// if the Portal shows who's actually handling a call and Coverage Desk
// doesn't have a Driving Person set for it yet, fill it in automatically.
// Requested specifically for 1st Round — advanced rounds are left alone,
// since those are more often driven by a senior member the Portal doesn't
// necessarily reflect. Deliberately narrow to keep this safe:
//   - only fills an EMPTY Driving Person — never overwrites one someone
//     already set by hand (silently overwriting a person's own edit is
//     exactly the kind of silent-failure-shaped bug this app has been
//     burned by before)
//   - only runs for admin/team_lead — the only roles allowed to edit
//     Driving Person at all, so a read-only viewer never sees local-only
//     changes they have no way to save or explain
//   - reuses findPortalMatch(), the same team-isolated, date-scoped,
//     tie-broken matcher the 📡 badge already relies on — never invents
//     its own looser matching logic
//   - only ever runs as part of an explicit sync the person just clicked
//     (fetchPortalSync), never on page load or date change, matching the
//     existing "never auto-load Portal data" rule
// Returns how many rows it actually filled, so the sync panel can say so.
// Deliberately does NOT call markDirty() — Driving Person is its own
// self-saving field (see the per-row select's onchange handler below, and
// saveDrivingPersons() above), completely separate from the batched
// "Save changes" flow that saveAllChanges() drives. Relying on the dirty
// flag here was the actual bug reported 2026-09-24: filled values showed
// "Remember to Save", but the general Save button (and autosave, and
// Ctrl+S) only ever calls saveAllChanges(), which never touches the
// driving_person endpoint — so a portal-filled value was never actually
// persisted no matter how many times "Save" was clicked. The caller
// (fetchPortalSync) now saves the fill immediately instead, exactly like
// a manual edit to the same field does.
function fillDrivingPersonFromPortal(){
  if(CURRENT_ROLE !== 'admin' && CURRENT_ROLE !== 'team_lead') return 0;
  let filled = 0;
  state.rows.forEach(row=>{
    if(row.woi || row.drivingPerson || isAdvancedRound(row.round)) return;
    const match = findPortalMatch(row);
    if(match && match.handler){
      row.drivingPerson = match.handler;
      filled++;
    }
  });
  return filled;
}
async function fetchPortalSync(mode){
  if(!API_BASE_URL){ state.portalSyncError = 'Portal sync requires the app to be connected to the database backend.'; render(); return; }
  if((mode || state.portalSyncMode) === 'today' && !isViewingToday()){
    state.portalSyncError = `Sync Today only works while viewing today's date — you're currently on ${state.date}. Switch to today first, or use Full Sync for historical data.`;
    render();
    return;
  }
  state.portalSyncMode = mode || state.portalSyncMode || 'today';
  state.portalSyncLoading = true;
  render();
  try{
    const dateQs = state.portalSyncMode === 'today' ? ('&date=' + encodeURIComponent(state.date)) : '';
    // Longer timeout than apiCall's usual 20s default — this proxies out to
    // a separate Apps Script bridge with its own cold start, and a Full
    // Sync deliberately pulls the entire call history, which can genuinely
    // take close to 20s on its own even once everything's warm.
    const portalTimeoutMs = state.portalSyncMode === 'full' ? 45000 : 30000;
    const [assignmentsResult, incentivesResult] = await Promise.all([
      apiCall('portal_sync', {qs:'type=assignments' + dateQs, timeoutMs: portalTimeoutMs}),
      apiCall('portal_sync', {qs:'type=incentives', timeoutMs: portalTimeoutMs})
    ]);
    state.portalSyncData = {
      assignments: assignmentsResult.data || [],
      incentives: incentivesResult.data || null
    };
    state.portalSyncUpdatedAt = Date.now();
    state.portalSyncError = '';
    // The backend saves this sync to portal_sync_cache so it survives a
    // refresh; that write used to be able to fail silently (only logged
    // server-side). It now reports a cacheWarning on the response instead —
    // surface it so a save failure is visible instead of invisible until
    // the data mysteriously "disappears" on next load.
    state.portalSyncCacheWarning = [assignmentsResult.cacheWarning, incentivesResult.cacheWarning].filter(Boolean).join(' ');
    // Also feeds the inline per-row "Portal shows a different assignee"
    // badges (findPortalMatch()) — this used to need its own separate
    // "Sync Portal" quick action buried in a different menu, fetching the
    // exact same data a second time into a second state field. One sync
    // now drives both; `handler` is kept for findPortalMatch()'s naming,
    // which predates this panel's `assignee` field.
    const rows = assignmentsResult.data || [];
    state.portalAssignments = rows.map(r => ({ ...r, handler: r.handler || r.assignee || '' }));
    state.portalSyncedAt = new Date().toLocaleTimeString();
    state.portalDrivingPersonFillCount = fillDrivingPersonFromPortal();
    state.portalDrivingPersonSaveError = '';
    // Persist the fill right away, the same way a manual edit to this field
    // saves itself — the general Save button never covers Driving Person
    // (see the comment on fillDrivingPersonFromPortal), so without this the
    // filled names would show on screen but silently vanish on next reload.
    if(state.portalDrivingPersonFillCount > 0){
      try{
        await saveDrivingPersons();
      }catch(saveErr){
        state.portalDrivingPersonSaveError = 'Filled ' + state.portalDrivingPersonFillCount + ' Driving Person value(s) from this sync, but saving them failed: ' + (saveErr && saveErr.message ? saveErr.message : saveErr) + '. They are showing on screen but are NOT saved yet — try syncing again.';
      }
    }
  }catch(e){
    state.portalSyncError = e && e.message ? e.message : 'Could not reach the Portal sync bridge.';
  }
  state.portalSyncLoading = false;
  render();
}
// Shows whatever was last saved in the database instantly, without
// waiting on the slow Apps Script bridge — used the moment the panel
// opens, before the person even asks for a fresh pull.
//
// FIX (2026-09-24): this used to only ever ask for the cache under
// today's date-scoped key ("assignments:<date>"), which is the key a
// "Sync Today" run writes to — but a "Full Sync" run writes its cache
// under a DIFFERENT key ("assignments:ALL"), since it has no single date
// of its own. So if the last real sync anyone ran was a Full Sync, this
// date-scoped lookup found nothing and the panel looked empty on
// reopen/refresh even though a fresh copy really was sitting in the
// database — just under the other key. Now falls back to the ALL-scoped
// cache when the date-scoped one comes back empty.
//
// Also now restores state.portalAssignments (not just state.portalSyncData,
// which only feeds this panel's own table) from whichever cache actually
// has data — previously the 📡 per-row "Portal shows a different
// assignee" badges and the Driving Person auto-fill stayed blank from a
// cache load alone, only ever repopulating once the slower live re-sync
// that follows this call finished (or silently stayed blank if that live
// call failed, e.g. the Apps Script bridge being down).
async function loadPortalSyncCache(){
  if(!API_BASE_URL) return;
  try{
    const dateQs = '&date=' + encodeURIComponent(state.date);
    let [assignmentsResult, incentivesResult] = await Promise.all([
      apiCall('portal_sync', {qs:'type=assignments&cached=1' + dateQs}),
      apiCall('portal_sync', {qs:'type=incentives&cached=1'})
    ]);
    if(!assignmentsResult.data){
      // Nothing cached under today's date-scoped key — fall back to the
      // Full Sync's cache key (no date param at all) before giving up.
      try{
        const fullResult = await apiCall('portal_sync', {qs:'type=assignments&cached=1'});
        if(fullResult.data) assignmentsResult = fullResult;
      }catch(e){ /* fallback is best-effort too */ }
    }
    if(assignmentsResult.data || incentivesResult.data){
      state.portalSyncData = {
        assignments: assignmentsResult.data || [],
        incentives: incentivesResult.data || null
      };
      state.portalSyncUpdatedAt = assignmentsResult.generatedAt ? new Date(assignmentsResult.generatedAt).getTime() : null;
      state.portalSyncFromCache = true;
      if(assignmentsResult.data){
        state.portalAssignments = assignmentsResult.data.map(r => ({ ...r, handler: r.handler || r.assignee || '' }));
      }
      render();
    }
  }catch(e){ /* cache is best-effort; a manual sync still works without it */ }
}
function startPortalSyncPolling(){
  stopPortalSyncPolling();
  loadPortalSyncCache().then(()=>{ fetchPortalSync('today'); });
  portalSyncTimer = setInterval(()=>{
    if(state.portalSyncMode === 'today') fetchPortalSync('today');
  }, 30000);
}
function stopPortalSyncPolling(){
  if(portalSyncTimer){ clearInterval(portalSyncTimer); portalSyncTimer = null; }
}
// ---------- dedicated monthly Incentives screen ----------
// True only when the date currently open in Coverage Desk is today's real
// calendar date — Portal sync is deliberately restricted to this case,
// since syncing for a past date the person has navigated to (rather than
// today) is what caused confusing, out-of-context data to appear earlier.
function isViewingToday(){
  const now = new Date();
  const todayKey = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
  return state.date === todayKey;
}
// Single source of truth for how each call status is labeled/colored/
// iconed, so adding a new status only means changing it in one place
// instead of hunting down every ternary across the file.
function statusBadgeInfo(status){
  if(status === 'cancelled') return { icon:'✕', label:'Cancelled', shortLabel:'CANCELLED', colorVar:'var(--coral)' };
  if(status === 'not_responded') return { icon:'☎', label:'Not Responded', shortLabel:'NOT RESPONDED', colorVar:'var(--amber)' };
  // Added 2026-09-30: "call didn't happen because the invite/link never
  // reached the candidate" — a coordination/technical failure, distinct
  // from the candidate not responding or either side asking to reschedule.
  // Deliberately its own status (not folded into 'cancelled') so it's
  // visually distinguishable at a glance and, more importantly, NOT
  // counted as a "bad outcome" in client-reliability/repeat-no-show
  // tracking (RESCHED_STATUSES deliberately does not include it) — this
  // isn't the candidate or client being unreliable.
  if(status === 'no_invite') return { icon:'📨', label:'Didn’t Receive Invite', shortLabel:'NO INVITE', colorVar:'var(--sky)' };
  return { icon:'↻', label:'Rescheduled', shortLabel:'RESCHED.', colorVar:'var(--violet)' };
}
// Clears a "just happened" confirmation banner (state[stateKey]) on its own
// after a while, so a person who doesn't click Dismiss doesn't end up with
// these piling up across a busy shift. Reference-checks the value before
// clearing it — if a NEWER banner of the same kind has already replaced
// this one by the time the timer fires, this only clears its own, never a
// later banner that happens to still be showing.
function autoDismissBanner(stateKey, ms){
  const ref = state[stateKey];
  setTimeout(()=>{
    if(state[stateKey] === ref){ state[stateKey] = null; render(); }
  }, ms);
}
function currentMonthKey(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}
// Home-toolbar "🏆 Closures (N)" badge (added 2026-10-01): previously showed
// the flat all-time total, which meant it never changed month to month and
// didn't tell you anything about how the CURRENT month is going. Now shows
// how many closures were recorded in the real current calendar month —
// deliberately always "now", not whatever month is being browsed inside the
// Closures panel's List tab (that's a separate, already-open-panel concern;
// this badge is meant to be glanceable from the home screen at any time).
function closuresThisMonthCount(){
  const mk = currentMonthKey();
  return (state.closures||[]).filter(c=>{
    if(!c.createdAt) return false;
    const d = new Date(c.createdAt);
    return (d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0')) === mk;
  }).length;
}
function shiftMonthKey(monthKey, delta){
  const [y,m] = monthKey.split('-').map(Number);
  const d = new Date(y, m - 1 + delta, 1);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}
function monthKeyLabel(monthKey){
  const [y,m] = monthKey.split('-').map(Number);
  return new Date(y, m-1, 1).toLocaleDateString('en-US', {month:'long', year:'numeric'});
}
// Forces a fresh LIVE pull from the slow Apps Script Portal bridge and
// saves it (handlePortalSyncFetch caches every fetch server-side under a
// month-scoped key — see the matching fix in api-data.js). This is now
// reserved for the explicit "Refresh" button and the nightly cron job
// (api/cron-portal-sync.js, added 2026-10-02) — opening the panel or
// switching months no longer calls this directly; see
// loadIncentivesCache() below for that instant, cache-only path.
async function fetchIncentivesMonth(monthKey){
  if(!API_BASE_URL){ state.incentivesError = 'Incentives requires the app to be connected to the database backend.'; render(); return; }
  state.incentivesMonth = monthKey;
  state.incentivesLoading = true;
  render();
  try{
    const result = await apiCall('portal_sync', {qs:'type=incentives&month=' + encodeURIComponent(monthKey)});
    state.incentivesData = result.data;
    state.incentivesUpdatedAt = Date.now();
    state.incentivesFromCache = false;
    state.incentivesError = '';
  }catch(e){
    state.incentivesError = e && e.message ? e.message : 'Could not reach the Portal sync bridge.';
  }
  state.incentivesLoading = false;
  render();
}
// Shows whatever was last SAVED for this month instantly, without touching
// the slow Apps Script bridge — added 2026-10-02 per Saiteja's ask: "every
// time [I open] incentives [it] needs [a live] sync... that's already
// auto-syncing every night at 10pm right? save them, show them in
// incentives... if I sync for a new time the saved data will be updated."
// Before this, opening the Incentives panel (or switching months) always
// called fetchIncentivesMonth() above — a full live Portal pull every
// time, with nothing saved to fall back on in between. Now the panel opens
// instantly to whatever the last sync (nightly cron, or a manual Refresh)
// saved, and only an explicit Refresh click does a live pull. Same
// "cache first, live fetch is a deliberate separate action" pattern
// loadPortalSyncCache()/loadCachedPortalAssignmentsForDate() already use
// for Team Sync.
async function loadIncentivesCache(monthKey){
  if(!API_BASE_URL) return;
  state.incentivesMonth = monthKey;
  state.incentivesLoading = true;
  state.incentivesError = '';
  render();
  try{
    const result = await apiCall('portal_sync', {qs:'type=incentives&cached=1&month=' + encodeURIComponent(monthKey)});
    state.incentivesData = result.data;
    state.incentivesUpdatedAt = result.generatedAt ? new Date(result.generatedAt).getTime() : null;
    state.incentivesFromCache = true;
  }catch(e){
    state.incentivesError = e && e.message ? e.message : 'Could not load the saved Incentives data.';
  }
  state.incentivesLoading = false;
  render();
}
// Call-volume-per-day for a whole month, for the Calendar view — reuses the
// same cross-date fetcher every other "across all dates" report already
// shares (fetchAllRowsAcrossDates), rather than a separate per-day query
// loop, so this is one bulk read, not N.
async function fetchCalendarMonth(monthKey){
  state.calendarMonth = monthKey;
  state.calendarLoading = true;
  state.calendarError = '';
  render();
  try{
    const allRows = await fetchAllRowsAcrossDates(true);
    const counts = {};
    allRows.forEach(r=>{
      if(!r._date || !r._date.startsWith(monthKey)) return;
      counts[r._date] = (counts[r._date]||0) + 1;
    });
    state.calendarData = counts;
    // Team/person comparison — reuses this same allRows fetch, no second
    // round trip. See computeCalendarComparisons() below for what it builds.
    state.calendarComparison = computeCalendarComparisons(allRows, monthKey);
  }catch(e){
    state.calendarError = e && e.message ? e.message : 'Could not load call history for this month.';
  }
  state.calendarLoading = false;
  render();
}
// Team & person call-volume comparison for the Calendar view (added
// 2026-09-29, at Saiteja's request: "compare to last month how many calls
// assigned to a particular team weekly, and the difference — also for a
// single person, this month vs last month, this week vs last week").
//
// Two independent comparisons, both computed from the one `allRows` fetch
// fetchCalendarMonth() already does:
//   - WEEK: real "this week" vs "last week" (Monday-anchored, via the same
//     weekStartDateKey() bucketing scanCallTrends()/Weekly Recap already
//     use), anchored on today — independent of which month the calendar
//     grid happens to be showing, so navigating Prev/Next month doesn't
//     change what "this week" means.
//   - MONTH: the month currently shown in the calendar grid (`monthKey`)
//     vs the month immediately before it — DOES follow Prev/Next
//     navigation, since that's the month actually on screen.
// Team assignment excluded (a call assigned to the team itself, not a
// named person) counts toward the team total but never toward any
// individual's total — same "team name isn't a person" exclusion used
// throughout (see computeAssigneeWorkloadToday, scanCallTrends).
function computeCalendarComparisons(allRows, monthKey){
  const teamNames = new Set(state.roster.map(p=>p.team));
  function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  }
  const prevMonthKey = shiftMonthKey(monthKey, -1);
  const thisWeekKey = weekStartDateKey(todayStr());
  const lastWeekDate = new Date(thisWeekKey + 'T00:00:00Z');
  lastWeekDate.setUTCDate(lastWeekDate.getUTCDate() - 7);
  const lastWeekKey = lastWeekDate.toISOString().slice(0,10);

  const teamAgg = {};   // team -> {thisWeek,lastWeek,thisMonth,lastMonth}
  const personAgg = {}; // name -> {team, thisWeek,lastWeek,thisMonth,lastMonth}
  function bump(map, key, field, extra){
    if(!map[key]) map[key] = Object.assign({thisWeek:0,lastWeek:0,thisMonth:0,lastMonth:0}, extra||{});
    map[key][field]++;
  }

  allRows.forEach(row=>{
    if(!row._date || row.woi) return; // WOI has no real scheduled date yet — same exclusion scanCallTrends() uses
    const team = teamOf(row.assignee);
    const wk = weekStartDateKey(row._date);
    const isIndividual = !!row.assignee && !teamNames.has(row.assignee);

    if(team){
      if(wk === thisWeekKey) bump(teamAgg, team, 'thisWeek');
      else if(wk === lastWeekKey) bump(teamAgg, team, 'lastWeek');
      if(row._date.startsWith(monthKey)) bump(teamAgg, team, 'thisMonth');
      else if(row._date.startsWith(prevMonthKey)) bump(teamAgg, team, 'lastMonth');
    }
    if(isIndividual){
      if(wk === thisWeekKey) bump(personAgg, row.assignee, 'thisWeek', {team: team||''});
      else if(wk === lastWeekKey) bump(personAgg, row.assignee, 'lastWeek', {team: team||''});
      if(row._date.startsWith(monthKey)) bump(personAgg, row.assignee, 'thisMonth', {team: team||''});
      else if(row._date.startsWith(prevMonthKey)) bump(personAgg, row.assignee, 'lastMonth', {team: team||''});
    }
  });

  const teams = Object.keys(teamAgg).map(team=>{
    const a = teamAgg[team];
    return { team, thisWeek:a.thisWeek, lastWeek:a.lastWeek, weekDiff:a.thisWeek-a.lastWeek, thisMonth:a.thisMonth, lastMonth:a.lastMonth, monthDiff:a.thisMonth-a.lastMonth };
  }).sort((a,b)=> b.thisMonth - a.thisMonth || a.team.localeCompare(b.team));

  const people = Object.keys(personAgg).map(name=>{
    const a = personAgg[name];
    return { name, team:a.team, thisWeek:a.thisWeek, lastWeek:a.lastWeek, weekDiff:a.thisWeek-a.lastWeek, thisMonth:a.thisMonth, lastMonth:a.lastMonth, monthDiff:a.thisMonth-a.lastMonth };
  }).sort((a,b)=> b.thisMonth - a.thisMonth || a.name.localeCompare(b.name));

  return { teams, people, monthKey, prevMonthKey, thisWeekKey, lastWeekKey };
}
async function refreshRole(){
  if(!API_BASE_URL){ CURRENT_ROLE = 'admin'; return; }
  try{
    const data = await apiCall('whoami', {});
    CURRENT_ROLE = data.role || 'admin';
  }catch(e){ /* leave role as-is on a transient error — don't lock the UI over a blip */ }
}
async function testApiConnection(){
  try{
    await apiCall('dates', {});
    return {ok:true};
  }catch(e){
    return {ok:false, error: e.message};
  }
}

async function loadRoster(){
  if(API_BASE_URL){
    try{
      const data = await apiCall('roster', {});
      state.roster = (data.rows && data.rows.length) ? data.rows : DEFAULT_ROSTER.slice();
      state.needsLogin = false;
      return;
    }catch(e){
      if(AUTH_FAILED){ state.needsLogin = true; return; } // don't silently fall back to stale local data
    }
  }
  try{
    const r = await storageAdapter.get('roster', false);
    let parsed = r && r.value ? JSON.parse(r.value) : DEFAULT_ROSTER.slice();
    // migrate old string-array roster format if present
    if(parsed.length && typeof parsed[0] === 'string'){
      parsed = parsed.map(name=>({id:uid(), name, team:'Unassigned', advanced:false}));
    }
    state.roster = parsed;
  }catch(e){ state.roster = DEFAULT_ROSTER.slice(); }
}
async function saveRoster(){
  if(API_BASE_URL){
    // Do NOT silently fall back to local storage on a backend failure — that
    // was the actual bug: a failed save would quietly succeed into the
    // browser's local cache only, the UI would claim "All saved", and the
    // change would vanish on refresh since loading always prefers the
    // backend. A real failure here needs to surface, not hide.
    await apiCall('roster', {method:'POST', body:{rows: state.roster}});
    return;
  }
  await storageAdapter.set('roster', JSON.stringify(state.roster), false);
}

// ---------- Students Master (the full active-student roster, separate
// from state.roster which is just coordinators/team members) ----------
// Seeded once from an uploaded spreadsheet, then lives independently —
// used to recognize/validate candidate names during a WhatsApp import and
// to surface a student's domain, assigned counselor, visa, etc. at a
// glance. Follows the same "try backend, fall back to local" shape as
// loadRoster, but ALSO tolerates the backend simply not having this
// endpoint yet (a brand-new feature, not yet in api/data.js) — that case
// is flagged via studentsMasterBackendMissing so the panel can say so
// plainly instead of silently pretending everything's synced.
async function loadStudentsMaster(){
  function seedFromSpreadsheet(){
    return DEFAULT_STUDENTS_SEED.map(s => ({ id: uid(), name: s.n, country: s.c }));
  }
  if(API_BASE_URL){
    try{
      const data = await apiCall('students', {});
      if(data.rows && data.rows.length){
        state.studentsMaster = data.rows;
      } else {
        // Backend reachable and the endpoint exists, but no rows saved
        // yet — seed it once from the spreadsheet and persist that.
        state.studentsMaster = seedFromSpreadsheet();
        await saveStudentsMaster();
      }
      state.studentsMasterLoaded = true;
      state.studentsMasterBackendMissing = false;
      loadStudentMatchDecisions(); // fire-and-forget — badges just stay in "needs confirming" state until this resolves
      return;
    }catch(e){
      // Most likely: this backend doesn't have a 'students' resource yet.
      state.studentsMasterBackendMissing = true;
    }
  }
  try{
    const r = await storageAdapter.get('students-master', false);
    const parsed = r && r.value ? JSON.parse(r.value) : null;
    state.studentsMaster = (parsed && parsed.length) ? parsed : seedFromSpreadsheet();
  }catch(e){
    state.studentsMaster = seedFromSpreadsheet();
  }
  try{ await storageAdapter.set('students-master', JSON.stringify(state.studentsMaster), false); }catch(e){}
  state.studentsMasterLoaded = true;
}
// Pulls every confirm/reject verdict anyone has ever given on a fuzzy
// name match, so a decision made once — on any device, by any admin —
// sticks permanently instead of resetting every time someone reloads the
// page. Silently does nothing if the backend doesn't have this resource
// yet (e.g. the SQL migration hasn't been run) — badges just fall back to
// asking again each session, same as before this existed.
async function loadStudentMatchDecisions(){
  if(!API_BASE_URL) return;
  try{
    const data = await apiCall('student_match_decisions', {});
    (data.rows||[]).forEach(row=>{
      const pairKey = row.candidateKey + '|' + row.studentId;
      if(row.decision === 'confirmed') state.confirmedStudentMatches.add(pairKey);
      else if(row.decision === 'rejected') state.rejectedStudentMatches.add(pairKey);
    });
    render();
  }catch(e){
    // Backend doesn't have this resource yet, or the call failed — fine,
    // the confirm/reject badges still work, they just won't persist.
  }
}
async function saveStudentsMaster(){
  if(API_BASE_URL){
    try{
      await apiCall('students', {method:'POST', body:{rows: state.studentsMaster}});
      state.studentsMasterBackendMissing = false;
    }catch(e){
      state.studentsMasterBackendMissing = true;
      // Fall through to local storage too, so at least this browser keeps
      // the edit until the backend endpoint exists.
      try{ await storageAdapter.set('students-master', JSON.stringify(state.studentsMaster), false); }catch(e2){}
    }
    return;
  }
  try{ await storageAdapter.set('students-master', JSON.stringify(state.studentsMaster), false); }catch(e){}
}
// Loads every closure/job-offer ever recorded, newest first. Silently
// does nothing if the backend doesn't have this resource yet (e.g. the
// SQL migration hasn't been run) — same fallback behavior as
// loadStudentMatchDecisions, since this is equally non-essential to the
// app's core function.
async function loadClosures(){
  if(!API_BASE_URL) return;
  try{
    const data = await apiCall('closures', {});
    state.closures = (data.rows||[]).map(r=>({
      id: r.id, candidate: r.candidate, company: r.company, salary: r.salary||'', createdAt: r.createdAt
    }));
    state.closuresLoaded = true;
    render();
  }catch(e){
    // Backend doesn't have this resource yet, or the call failed — the
    // Closures panel just shows nothing rather than erroring loudly.
  }
  loadClosureManualMatches(); // fire-and-forget, same non-essential fallback behavior
}
// Manual closure↔call matches (2026-09-24, pipeline-visibility follow-up):
// when automatic matching (findClosureMatch(), now with fuzzy-company
// tolerance too — see there) still can't find a call for a real closure —
// a genuinely unusual spelling gap, or the call predates a name/company
// correction — this lets someone point the closure at the correct call by
// hand instead of that closure silently never counting toward anyone's
// performance or the conversion/time-to-close numbers. Deliberately
// stored as a SEPARATE table from `closures` itself, not an edit to the
// closure's own candidate/company fields — closures are an append-only
// historical log by design (see the backend's own comment on this), so
// this is a correctable "pointer" layered on top, not a rewrite of the
// original record. Same non-essential fallback behavior as loadClosures()
// itself if the backend doesn't have this resource yet.
async function loadClosureManualMatches(){
  if(!API_BASE_URL) return;
  try{
    const data = await apiCall('closure_manual_match', {});
    const map = {};
    (data.rows||[]).forEach(r=>{ map[r.closureId] = { candidate: r.candidate, company: r.company }; });
    state.closureManualMatches = map;
    _closureManualMatchesVersion++;
    render();
  }catch(e){
    // Backend doesn't have this resource yet — automatic matching still
    // works fine without it, this is purely an enhancement on top.
  }
}
async function saveClosureManualMatch(closureId, candidate, company){
  if(!API_BASE_URL) throw new Error('Manual matching requires the backend to be configured.');
  await apiCall('closure_manual_match', {method:'POST', body:{ closureId, candidate, company }});
  state.closureManualMatches[closureId] = { candidate, company };
  _closureManualMatchesVersion++;
}
// Monthly goal tracking (2026-09-25) — a simple ₹ target on the Incentives
// panel and a simple closure-count target on the Closures panel, so the
// numbers already being tracked (Incentives' grandTotal, Closures'
// thisMonthCount) turn into a visible goal instead of just a historical
// log. Deliberately ONE flat, ongoing target rather than a per-month
// value — simplest useful version; if Saiteja ever wants a different
// target for a specific month, that's a real feature to build later, not
// assumed here. Backed by the generic app_settings key/value store so a
// future setting like this doesn't need its own migration.
async function loadAppSettings(){
  if(!API_BASE_URL) return;
  try{
    const data = await apiCall('app_settings', {});
    state.appSettings = data.settings || {};
    render();
  }catch(e){
    // Non-essential — goal tracking just shows "not set" until this
    // resolves or the resource exists, same fallback posture as the
    // other optional-enhancement loaders above.
  }
}
async function saveAppSetting(key, value){
  if(!API_BASE_URL) throw new Error('Saving a setting requires the backend to be configured.');
  await apiCall('app_settings', {method:'POST', body:{ key, value }});
  state.appSettings[key] = String(value);
}
// Appends newly-confirmed closures to the backend, then merges them into
// local state so the list and the More-menu count update immediately
// without needing a full reload.
async function saveNewClosures(rows){
  if(!API_BASE_URL) throw new Error('Closures require the backend to be configured.');
  const payload = rows.map(r=>({ candidate: r.candidate, company: r.company, salary: r.salary||'', rawText: r.raw||'' }));
  await apiCall('closures', {method:'POST', body:{rows: payload}});
  await loadClosures(); // re-fetch rather than guess IDs/timestamps locally — keeps "recorded by" and ordering exactly what the server actually stored
}
// ---------- Expected Closures (added 2026-10-01) ----------
// "Flag this call as an expected closure, based on what the handler/
// driving person told you after the call, and let me follow up on it
// later" — a holding area that sits BEFORE the real (confirmed) Closures
// log above, not a replacement for it. Own backend resource
// (expected_closures) so flagging something here never writes into the
// append-only `closures` table until someone explicitly confirms it via
// confirmExpectedClosure() below.
async function loadExpectedClosures(){
  if(!API_BASE_URL) return;
  try{
    const data = await apiCall('expected_closures', {});
    state.expectedClosures = (data.rows||[]).map(r=>({
      id: r.id, callId: r.callId||null, callDate: r.callDate||'', candidate: r.candidate,
      company: r.company, round: r.round||'', note: r.note||'', flaggedBy: r.flaggedBy||'',
      createdAt: r.createdAt, lastFollowupAt: r.lastFollowupAt||null, lastFollowupNote: r.lastFollowupNote||''
    }));
    state.expectedClosuresLoaded = true;
    render();
  }catch(e){
    // Backend doesn't have this resource/table yet, or the call failed —
    // same non-essential fallback behavior as loadClosures() above; the
    // rest of the app keeps working either way.
  }
}
async function saveExpectedClosure(row){
  if(!API_BASE_URL) throw new Error('Expected Closures require the backend to be configured.');
  const payload = {
    callId: row.id||null, callDate: state.date||'', candidate: row.candidate||'',
    company: row.company||'', round: row.round||'', note: row.note||''
  };
  await apiCall('expected_closures', {method:'POST', body:{rows:[payload]}});
  await loadExpectedClosures();
}
async function deleteExpectedClosure(id){
  await apiCall('expected_closures', {method:'POST', body:{action:'delete', id}});
  state.expectedClosures = (state.expectedClosures||[]).filter(c=>c.id !== id);
}
async function logExpectedClosureFollowup(id, note){
  await apiCall('expected_closures', {method:'POST', body:{action:'followup', id, note: note||''}});
  await loadExpectedClosures();
}
// Confirming promotes it into the real, append-only Closures log (exactly
// the same saveNewClosures() path a pasted-in message uses) and then
// removes the flag — once it's a real closure it belongs in one place,
// not two.
async function confirmExpectedClosure(row, salary){
  await saveNewClosures([{ candidate: row.candidate, company: row.company, salary: salary||'', raw: row.note||'' }]);
  await deleteExpectedClosure(row.id);
}
function expectedClosuresPendingCount(){
  return (state.expectedClosures||[]).length;
}
// Strips everything but letters before comparing — same idea as
// normalizeCompanyKey — so a name typed slightly differently in a
// WhatsApp paste ("Keerththana" vs "Keerthana", extra spacing, etc.)
// still matches the spreadsheet entry.
function normalizeNameKey(name){
  return (name||'').toLowerCase().replace(/[^a-z]/g,'');
}
// Standard edit distance — used only for the bounded typo-tolerance check
// below, never for anything with real stakes (like Portal handler matching).
function levenshteinDistance(a, b){
  const m = a.length, n = b.length;
  if(m === 0) return n;
  if(n === 0) return m;
  let prev = new Array(n+1), curr = new Array(n+1);
  for(let j=0;j<=n;j++) prev[j] = j;
  for(let i=1;i<=m;i++){
    curr[0] = i;
    for(let j=1;j<=n;j++){
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      curr[j] = Math.min(prev[j]+1, curr[j-1]+1, prev[j-1]+cost);
    }
    const tmp = prev; prev = curr; curr = tmp;
  }
  return prev[n];
}
function findStudentMasterMatch(candidateName){
  const info = findStudentMasterMatchWithConfidence(candidateName);
  return info ? info.student : null;
}
// Same matching logic as before, but reports whether the match was an
// exact string match or one of the fuzzy heuristics — and if fuzzy, which
// one and why, so the UI can ask a human to confirm it rather than
// silently trusting a guess. Returns null (nothing found), or
// { student, exact: true } for an exact match, or
// { student, exact: false, reason: '...' } for a fuzzy one.
//
// MEMOIZED: this cascade (especially the Levenshtein and initial+compound
// checks) is expensive, and was being recomputed from scratch for every
// row on every single render — profiling a realistic-scale render (120
// rows, 506 master-list students) showed this costing ~145ms out of a
// ~316ms total render, the single largest cost in the entire app, because
// nothing was cached between renders even though the master list itself
// rarely changes. The cache is keyed by candidate name and invalidated
// whenever state.studentsMaster's reference OR length changes (load,
// import, add/edit/delete a student). Checking length as well as
// reference — not reference alone — matters: an earlier version of this
// comment claimed reference-checking alone made staleness impossible, but
// a real bug proved otherwise. Two call sites used to add a student via
// .push() (in-place mutation, same array reference) instead of
// reassignment — both are now fixed to reassign — but relying solely on
// "every mutation site remembers to reassign" is a fragile invariant to
// maintain forever, so the length check is a cheap second signal that
// catches the realistic case (someone added/removed a student) even if
// a future change mutates in place again.
let _studentMatchCache = new Map();
let _studentMatchCacheForList = null;
let _studentMatchCacheForLength = -1;
// Call this from any code path that adds, removes, or edits a Students
// Master entry — the reference/length checks in
// findStudentMasterMatchWithConfidence below catch most real mutations,
// but not one that edits an EXISTING entry's name/country in place
// (same reference, same length). This is the reliable, explicit fallback
// for that case — cheap to call defensively even where the reference or
// length check would have already caught it.
function invalidateStudentMatchCache(){
  _studentMatchCache = new Map();
}
function findStudentMasterMatchWithConfidence(candidateName){
  const currentLength = state.studentsMaster ? state.studentsMaster.length : 0;
  if(_studentMatchCacheForList !== state.studentsMaster || _studentMatchCacheForLength !== currentLength){
    _studentMatchCache = new Map();
    _studentMatchCacheForList = state.studentsMaster;
    _studentMatchCacheForLength = currentLength;
  }
  const cacheKey = candidateName || '';
  if(_studentMatchCache.has(cacheKey)) return _studentMatchCache.get(cacheKey);
  const result = computeStudentMasterMatch(candidateName);
  _studentMatchCache.set(cacheKey, result);
  return result;
}
function computeStudentMasterMatch(candidateName){
  const key = normalizeNameKey(candidateName);
  if(!key || !state.studentsMaster) return null;
  const exact = state.studentsMaster.find(s => normalizeNameKey(s.name) === key);
  if(exact) return { student: exact, exact: true };

  // Every fuzzy pathway below runs unconditionally and contributes its
  // own (unambiguous-within-itself) result to this shared list, instead
  // of returning as soon as any ONE pathway finds a unique match. That
  // early-return approach had a real gap: two DIFFERENT pathways could
  // each independently find a different "unique" candidate for the same
  // name (e.g. a word-reorder match pointing at one person, while an
  // initial+compound match points at someone else) — neither pathway
  // knows about the other, so neither one's own ambiguity check catches
  // it. Collecting every pathway's answer here and only resolving when
  // they all agree closes that gap.
  const found = []; // { student, reason }
  const parts = (candidateName||'').trim().split(/\s+/);

  // WhatsApp messages very often abbreviate to "First L." (e.g. "Sushmitha
  // B" for "Sushmitha Basavaraju"). Only contributes a candidate when
  // it's completely unambiguous on its own — if more than one master-list
  // student shares that exact first name AND last-name initial, this
  // pathway contributes nothing, same principle as the Karthik/Karthikeya
  // incident: under-matching is safe, silently conflating two different
  // real people is not.
  if(parts.length === 2 && /^[A-Za-z]\.?$/.test(parts[1])){
    const firstNameKey = normalizeNameKey(parts[0]);
    const initial = parts[1][0].toLowerCase();
    const candidates = state.studentsMaster.filter(s=>{
      const sParts = (s.name||'').trim().split(/\s+/);
      if(sParts.length < 2) return false;
      return normalizeNameKey(sParts[0]) === firstNameKey &&
             sParts[sParts.length-1][0].toLowerCase() === initial;
    });
    if(candidates.length === 1) found.push({ student: candidates[0], reason: `"${parts[1]}" looks like a last-name initial` });
  }
  // Mirror of the above, but the INITIAL comes first — "S Sricharan" for
  // a full name like "Sadhu Sricharan". Same unambiguous-only rule.
  if(parts.length === 2 && /^[A-Za-z]\.?$/.test(parts[0])){
    const lastNameKey = normalizeNameKey(parts[1]);
    const initial = parts[0][0].toLowerCase();
    const candidatesRev = state.studentsMaster.filter(s=>{
      const sParts = (s.name||'').trim().split(/\s+/);
      if(sParts.length < 2) return false;
      return normalizeNameKey(sParts[sParts.length-1]) === lastNameKey &&
             sParts[0][0].toLowerCase() === initial;
    });
    if(candidatesRev.length === 1) found.push({ student: candidatesRev[0], reason: `"${parts[0]}" looks like a first-name initial` });
  }
  // Small typo tolerance — catches things like "Chigdhana Hemantharaju"
  // typed in a WhatsApp message vs the master list's actual "Chidghana
  // Hemantharaju" (two adjacent letters swapped). Only applied to longer
  // names, since a couple of edits on a short name is far too likely to be
  // a coincidence rather than a typo; capped at 2 edits; and — same rule
  // as the abbreviation case above — only contributes when exactly one
  // master-list student is that close.
  if(key.length >= 10){
    const closeMatches = [];
    for(const s of state.studentsMaster){
      const sKey = normalizeNameKey(s.name);
      if(Math.abs(sKey.length - key.length) > 2) continue;
      if(levenshteinDistance(key, sKey) <= 2){
        closeMatches.push(s);
        if(closeMatches.length > 1) break; // already ambiguous within this pathway — stop early
      }
    }
    if(closeMatches.length === 1) found.push({ student: closeMatches[0], reason: 'spelled slightly differently (a couple of letters off)' });
  }
  // Same person, name components in a different order — "Sadhu Sri Charan"
  // vs "Sri Charan Sadhu". Sorting every LETTER (not word) in the
  // normalized name collapses any word-order difference down to the same
  // signature, but — critically — two names only produce the same sorted
  // signature if they're built from the exact same multiset of letters.
  // That's a much stronger constraint than the typo check above (equality,
  // not closeness), so real different names essentially never collide
  // here by chance. Length-gated for the same reason as the typo check.
  if(key.length >= 8){
    const sortedKey = key.split('').sort().join('');
    const reorderMatches = state.studentsMaster.filter(s => normalizeNameKey(s.name).split('').sort().join('') === sortedKey);
    if(reorderMatches.length === 1) found.push({ student: reorderMatches[0], reason: 'same name, words in a different order' });
  }
  // "S Sricharan" for "Sadhu Sri Charan" — an initial standing in for one
  // name component, PLUS a separate component that's really two words
  // merged together with no space ("Sri Charan" -> "Sricharan"). Checked
  // in both directions, since either the call or the master list could be
  // the abbreviated one. Only contributes when exactly one master-list
  // student fits, and only when the initial and the merged word together
  // account for ALL THREE components of the fuller name — no partial or
  // fuzzy credit.
  const candidateWordCount = (candidateName||'').trim().split(/\s+/).filter(Boolean).length;
  if(candidateWordCount === 2 || candidateWordCount === 3){
    const compoundMatches = state.studentsMaster.filter(s => initialPlusCompoundNameMatch(candidateName, s.name));
    if(compoundMatches.length === 1) found.push({ student: compoundMatches[0], reason: 'an initial plus a shortened/merged name' });
  }

  if(!found.length) return null;
  const uniqueStudentIds = new Set(found.map(f => f.student.id));
  if(uniqueStudentIds.size > 1) return null; // different pathways disagree — genuinely ambiguous, never guess
  return { student: found[0].student, exact: false, reason: found[0].reason };
}
// Helper for findStudentMasterMatchWithConfidence — see the call site above for the
// exact scenario this handles.
function initialPlusCompoundNameMatch(nameA, nameB){
  function attempt(shortName, fullName){
    const shortParts = (shortName||'').trim().split(/\s+/);
    if(shortParts.length !== 2) return false;
    const fullParts = (fullName||'').trim().split(/\s+/).map(normalizeNameKey).filter(Boolean);
    if(fullParts.length !== 3) return false;
    const isInitial = (s) => /^[A-Za-z]\.?$/.test(s);
    function tryOrder(initialTok, compoundTok){
      if(!isInitial(initialTok)) return false;
      const compoundKey = normalizeNameKey(compoundTok);
      if(!compoundKey) return false;
      let matchCount = 0;
      for(let i=0;i<3;i++){
        if(fullParts[i][0] !== initialTok[0].toLowerCase()) continue;
        const others = fullParts.filter((_,idx)=>idx!==i);
        if(compoundKey === others[0]+others[1] || compoundKey === others[1]+others[0]) matchCount++;
      }
      return matchCount === 1; // ambiguous otherwise — don't guess
    }
    return tryOrder(shortParts[0], shortParts[1]) || tryOrder(shortParts[1], shortParts[0]);
  }
  return attempt(nameA, nameB) || attempt(nameB, nameA);
}
// Decides what (if anything) the candidate-name cell should show about
// Students Master status: nothing (exact match, or a fuzzy match already
// confirmed this session), a "?" needing a human to confirm a fuzzy guess,
// or the existing "N" new-student badge (no match at all, OR a fuzzy
// match that was already explicitly rejected this session).
function studentMatchBadgeInfo(candidateName){
  if(!candidateName || !state.studentsMasterLoaded) return null;
  const info = findStudentMasterMatchWithConfidence(candidateName);
  if(!info) return { kind: 'new' };
  if(info.exact) return null;
  const pairKey = normalizeNameKey(candidateName) + '|' + info.student.id;
  if(state.confirmedStudentMatches.has(pairKey)) return null;
  if(state.rejectedStudentMatches.has(pairKey)) return { kind: 'new' };
  return { kind: 'confirm', student: info.student, reason: info.reason, pairKey };
}
// Toggles the light/dark theme by setting the same data-theme attribute
// the early <head> script reads on next load, and persists the choice
// (best-effort — a blocked/cleared localStorage just means it won't be
// remembered next visit, not a broken toggle this session).
function applyTheme(mode){
  state.theme = mode;
  if(mode === 'light') document.documentElement.setAttribute('data-theme', 'light');
  else document.documentElement.removeAttribute('data-theme');
  try{ localStorage.setItem('coverage-desk-theme', mode); }catch(e){}
}
function todayDateString(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function addDaysToDateStr(dateStr, days){
  const [y,m,d] = dateStr.split('-').map(Number);
  const dt = new Date(y, m-1, d);
  dt.setDate(dt.getDate()+days);
  return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');
}
// "Tomorrow preview" (added 2026-09-30) — a lightweight peek at tomorrow's
// scheduled/WOI count from today's own screen, so a fresh WOI pile isn't a
// surprise first thing. Fire-and-forget from loadDay() when today's date
// loads; never blocks the real load, and quietly does nothing on failure
// since this is a nice-to-have, not load-bearing data.
async function loadTomorrowPreview(){
  if(!API_BASE_URL) return;
  const tmrw = addDaysToDateStr(todayDateString(), 1);
  if(state.tomorrowPreview && state.tomorrowPreview.date === tmrw) return; // already have it this session
  state.tomorrowPreviewLoading = true;
  try{
    const data = await apiCall('calls', {qs:'date='+tmrw});
    const rows = data.rows || [];
    state.tomorrowPreview = { date: tmrw, total: rows.length, woi: rows.filter(r=>r.woi).length };
  }catch(e){
    // Quiet failure — nothing to show is fine, no error banner needed for a preview.
  }
  state.tomorrowPreviewLoading = false;
  render();
}
async function loadDay(dateStr){
  // Scoped to whichever date the import happened on — clearing it here
  // (the one place every date switch/reload passes through) means it
  // never lingers and mistakenly labels calls on a DIFFERENT date as
  // "recently imported".
  state.recentImportIds = null;
  state.filter = state.filter === 'recentImport' ? 'all' : state.filter;
  // Same reasoning, for the reschedule/cancel "just saved" banner below.
  state.recentReschedIds = null;
  state.lastReschedItems = null;
  state.filter = state.filter === 'recentResched' ? 'all' : state.filter;
  state.lastDedupeInfo = null;
  // Same reasoning as recentImportIds just above — scoped to whichever
  // date the sync happened on, so switching dates doesn't leave a stale
  // "filled N calls" message pointing at a sync that ran on a different day.
  state.portalDrivingPersonFillCount = 0;
  state.portalDrivingPersonSaveError = '';
  if(API_BASE_URL){
    try{
      const [callsData, notesData, finalData, statusData] = await Promise.all([
        apiCall('calls', {qs:'date='+dateStr}),
        apiCall('notes', {qs:'date='+dateStr}),
        apiCall('finalized', {qs:'date='+dateStr}),
        // Reschedule/cancel tags live in their own table now, loaded and
        // merged separately from the plain call rows above. If handleCalls'
        // JOIN already attached them, this just confirms/overwrites with the
        // same data; if the backend is an older deployment without the JOIN,
        // this is what actually brings the tags back after a refresh.
        apiCall('call_status', {qs:'date='+dateStr}).catch(()=>({rows:[]}))
      ]);
      state.rows = callsData.rows || [];
      const statusById = {};
      (statusData.rows||[]).forEach(s=>{ statusById[s.callId] = s; });
      state.rows.forEach(r=>{
        const s = statusById[r.id];
        if(s){ r.status = s.status; r.statusFields = s.statusFields || []; }
      });
      state.notes = notesData.rows || [];
      state.finalized = !!finalData.finalized;
      state.needsLogin = false;
      syncShiftNoteFromNotes(); syncAbsentFromNotes(); syncExportedIdsFromNotes();
      // Clear first so a previous date's Portal data can't linger while
      // this date's own snapshot (if any) loads in.
      state.portalAssignments = null;
      if(dateStr === todayDateString()){
        // Today's date specifically stays manual-only — data is still
        // actively changing, and given open questions about occasional
        // cross-team accuracy, showing nothing by default is safer than
        // auto-showing something that might be stale or wrong. Click a
        // sync button to pull it deliberately.
        loadTomorrowPreview(); // fire-and-forget — a nice-to-have, never blocks today's own load
      } else {
        // Past dates are more settled, so showing the last-saved snapshot
        // automatically (no live Apps Script call, just a fast DB read)
        // is genuinely helpful rather than risky.
        loadCachedPortalAssignmentsForDate(dateStr);
      }
      return;
    }catch(e){
      if(AUTH_FAILED){ state.needsLogin = true; return; } // don't silently fall back to stale local data
    }
  }
  try{
    const r = await storageAdapter.get('day:'+dateStr, false);
    const parsed = r && r.value ? JSON.parse(r.value) : null;
    if(Array.isArray(parsed)){ state.rows = parsed; state.finalized = false; state.notes = []; }
    else if(parsed){ state.rows = parsed.rows || []; state.finalized = !!parsed.finalized; state.notes = parsed.notes || []; }
    else { state.rows = []; state.finalized = false; state.notes = []; }
  }catch(e){ state.rows = []; state.finalized = false; state.notes = []; }
  syncShiftNoteFromNotes(); syncAbsentFromNotes(); syncExportedIdsFromNotes();
}
// Saves the reschedule/cancel tags for the current date to the dedicated
// call_status table — a full replace of everything currently tagged for
// this date (mirrors the delete-then-insert pattern used for notes/roster).
// This never touches the `calls` table, so it can't be lost to a stale
// deployment or a missing column there, and a routine call edit elsewhere
// can't wipe it out either.
async function saveCallStatuses(){
  if(!API_BASE_URL) return; // local-storage mode already keeps status embedded on the row itself
  const payload = state.rows.filter(r=>r.status).map(r=>({
    callId: r.id,
    status: r.status,
    reason: (r.statusFields||[]).find(f=>f.label==='Reason')?.value || '',
    statusFields: r.statusFields || [],
  }));
  await apiCall('call_status', {method:'POST', body:{date: state.date, rows: payload}});
}
// Deliberately its own narrow resource, separate from the main calls save —
// a Team Lead account is otherwise fully read-only, and this is the one
// field they're allowed to write. Keeping it on its own endpoint means the
// backend can permit exactly this one narrow update for that role without
// opening up write access to anything else (time, candidate, assignee,
// etc.) — the restriction is enforced server-side, not just hidden in the UI.
async function saveDrivingPersons(){
  if(!API_BASE_URL) return; // local-storage mode: drivingPerson already lives on the row like every other field
  const payload = state.rows.map(r=>({ callId: r.id, drivingPerson: r.drivingPerson || '' }));
  await apiCall('driving_person', {method:'POST', body:{date: state.date, rows: payload}});
}
// Saves a batch of {row, handler} Driving Person updates that can span MANY
// different dates at once — added 2026-09-29 for the cross-date backfill
// (see computeDrivingPersonBackfillPlan() below). Groups by date and, for
// each one, always sends that date's COMPLETE row set (fetching it first
// when it isn't already today's loaded board) with only the touched rows'
// values changed — the driving_person endpoint is a full replace-for-the-
// date write, so sending anything less would silently wipe out every other
// Driving Person already saved for that date (the same data-loss risk
// caught and fixed for the single-closure "📡 Apply" button).
async function saveDrivingPersonBatchAcrossDates(entries){
  const byDate = {};
  entries.forEach(e=>{
    const d = (e.row && e.row._date) || state.date;
    (byDate[d] = byDate[d] || []).push(e);
  });
  const dates = Object.keys(byDate);
  await Promise.all(dates.map(async date=>{
    let dateRows;
    if(date === state.date){
      dateRows = state.rows || [];
    } else {
      const data = await apiCall('calls', {qs:'date='+encodeURIComponent(date)});
      dateRows = data.rows || [];
    }
    const updates = {};
    byDate[date].forEach(e=>{ updates[String(e.row.id)] = e.handler; });
    const payload = dateRows.map(r=>({
      callId: r.id,
      drivingPerson: Object.prototype.hasOwnProperty.call(updates, String(r.id)) ? updates[String(r.id)] : (r.drivingPerson || ''),
    }));
    await apiCall('driving_person', {method:'POST', body:{date, rows: payload}});
    if(date === state.date){
      byDate[date].forEach(e=>{
        const localRow = (state.rows||[]).find(r=>String(r.id)===String(e.row.id));
        if(localRow) localRow.drivingPerson = e.handler;
      });
    }
  }));
}
// Cross-date Driving Person backfill (added 2026-09-29) — "some calls gets
// after first round only" plus "there is so much process going on from
// importing calls to closures" together pointed at the real structural
// gap: fillDrivingPersonFromPortal() (used on every sync) only ever fills
// whichever date is currently open on the board, so a call on ANY other
// date never gets the benefit of a sync that happened while you were
// looking at today. This scans every date's calls against the last Team
// Sync's Portal data and splits what it finds into two buckets:
//   - autoFill: 1st Round, empty Driving Person, a clean Portal match —
//     the exact same safety rule fillDrivingPersonFromPortal() already
//     uses, just applied across every date instead of one.
//   - needsConfirm: 2nd Round and up — deliberately NEVER auto-applied
//     (every auto-assignment in this app leaves advanced rounds for a
//     human, since they're more often run by someone the Portal doesn't
//     reliably reflect) — returned as suggestions for a one-click Apply,
//     not applied here.
// Requires a Team Sync (state.portalAssignments) to already exist —
// returns {needsSync:true} rather than silently finding nothing if not.
async function computeDrivingPersonBackfillPlan(forceRefresh){
  if(!state.portalAssignments || !state.portalAssignments.length){
    return { needsSync: true, autoFill: [], needsConfirm: [] };
  }
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const autoFill = [];
  const needsConfirm = [];
  allRows.forEach(row=>{
    if(row.woi || row.drivingPerson || !row.candidate) return;
    const match = findPortalMatchForRow(row, row._date);
    if(!match) return;
    const handler = match.handler || match.assignee;
    if(!handler) return;
    const entry = { row, handler };
    if(isAdvancedRound(row.round)) needsConfirm.push(entry);
    else autoFill.push(entry);
  });
  return { needsSync: false, autoFill, needsConfirm };
}
// The "note for next shift" box reuses the existing notes table/resource —
// stored as one special entry per date rather than a whole new backend
// endpoint, since that infrastructure already exists and works. The id is
// prefixed with the date (not just the fixed string 'shift-note') because
// the notes table's primary key is on `id` alone, not (id, note_date) — a
// bare 'shift-note' id would collide with the row left behind from any
// other date the moment you tried to save a second day, causing a
// "Duplicate entry ... for key 'notes.PRIMARY'" error on save.
function shiftNoteId(){ return state.date + '-shift-note'; }
function absentIdsNoteId(){ return state.date + '-absent-ids'; }
function exportedIdsNoteId(){ return state.date + '-exported-ids'; }
function syncShiftNoteFromNotes(){
  const entry = (state.notes||[]).find(n => n && n.id === shiftNoteId());
  state.shiftNote = entry ? (entry.text||'') : '';
}
function syncNotesFromShiftNote(){
  state.notes = state.notes || [];
  const idx = state.notes.findIndex(n => n && n.id === shiftNoteId());
  if(state.shiftNote && state.shiftNote.trim()){
    if(idx >= 0) state.notes[idx].text = state.shiftNote;
    else state.notes.push({ id:shiftNoteId(), text: state.shiftNote });
  } else if(idx >= 0){
    state.notes.splice(idx, 1);
  }
}
// Absences — same reused-notes trick as the shift note, scoped to THIS date
// specifically (not the roster globally), since being absent is a today-only
// thing, not a permanent roster change. Stored as one special entry per date
// holding a JSON array of roster person IDs marked absent.
function syncAbsentFromNotes(){
  const entry = (state.notes||[]).find(n => n && n.id === absentIdsNoteId());
  try{ state.absentIds = entry ? (JSON.parse(entry.text)||[]) : []; }
  catch(e){ state.absentIds = []; }
}
function syncNotesFromAbsent(){
  state.notes = state.notes || [];
  const idx = state.notes.findIndex(n => n && n.id === absentIdsNoteId());
  if(state.absentIds && state.absentIds.length){
    const text = JSON.stringify(state.absentIds);
    if(idx >= 0) state.notes[idx].text = text;
    else state.notes.push({ id:absentIdsNoteId(), text });
  } else if(idx >= 0){
    state.notes.splice(idx, 1);
  }
}
// Tracks which call IDs were included in the last "Open .txt" — same reused-
// notes trick, scoped per date. Lets the export controls tell new calls
// (added after the last share) apart from ones already sent out, without a
// new backend field.
function syncExportedIdsFromNotes(){
  const entry = (state.notes||[]).find(n => n && n.id === exportedIdsNoteId());
  try{ state.exportedIds = entry ? (JSON.parse(entry.text)||[]) : []; }
  catch(e){ state.exportedIds = []; }
}
function syncNotesFromExportedIds(){
  state.notes = state.notes || [];
  const idx = state.notes.findIndex(n => n && n.id === exportedIdsNoteId());
  if(state.exportedIds && state.exportedIds.length){
    const text = JSON.stringify(state.exportedIds);
    if(idx >= 0) state.notes[idx].text = text;
    else state.notes.push({ id:exportedIdsNoteId(), text });
  } else if(idx >= 0){
    state.notes.splice(idx, 1);
  }
}
// Edits now stay local until the person explicitly clicks Save — nothing they
// type or change is visible to anyone else (or persists across a refresh)
// until that happens. This avoids half-finished edits going live mid-typing.
function markDirty(){
  state.dirty = true;
  // Any edit made after finalizing means the finalized .txt no longer reflects
  // the current data — automatically un-finalize so the button correctly goes
  // back to "Finalize all calls" instead of staying stuck on "Open .txt" with
  // no clear way back to re-finalizing the updated list.
  if(state.finalized) state.finalized = false;
}
async function saveAllChanges(){
  try{ if(window.deskPreSaveCheck) window.deskPreSaveCheck(); }catch(e){} // non-blocking heads-up toast
  state.saving = true;
  state.saveError = '';
  render();
  const sentRowCount = state.rows.length; // snapshot for verification below
  const sentDate = state.date;
  try{
    await Promise.all([saveDayNow(), saveRoster()]);
    state.dirty = false;
    // Closes the loop instead of just trusting the POST succeeded:
    // immediately re-fetch this date's calls from the database and
    // confirm the count matches what was just sent. A 200 response
    // doesn't guarantee the write actually landed correctly — this
    // catches a mismatch the moment it happens instead of someone
    // noticing missing calls the next time they open this date.
    if(API_BASE_URL){
      try{
        const verify = await apiCall('calls', {qs:'date='+encodeURIComponent(sentDate)});
        const savedCount = (verify.rows||[]).length;
        if(savedCount !== sentRowCount){
          state.saveError = `⚠ Save verification failed: sent ${sentRowCount} call(s) but the database now shows ${savedCount} for ${sentDate}. Please refresh and check carefully before continuing — do not assume the save worked.`;
          state.dirty = true;
        }
      }catch(e){
        // Couldn't verify — doesn't necessarily mean the save failed, just
        // that we can't confirm it right now. Don't block on this alone.
      }
    }
  }catch(e){
    // A real failure — keep dirty=true so the Save button still correctly
    // shows there's unsaved work, and surface a clear error instead of
    // quietly claiming success while the change never actually reached the
    // shared database.
    //
    // FIX (2026-09-30, offline resilience): a genuine connectivity failure
    // (offline, DNS/TLS refused, or the 20s "took too long to respond"
    // timeout) is different from a real server-side rejection (bad
    // credentials, a validation error, a 500) — retrying the exact same
    // save is the right move for the former and pointless for the latter.
    // Only the connectivity shape gets queued; anything else still shows
    // the plain error above exactly as before, since masking a real error
    // behind "will retry later" would hide something that actually needs
    // fixing, not waiting out.
    if(isLikelyOfflineError(e)){
      queueOfflineSave();
      state.saveError = '';
    } else {
      state.saveError = 'Save failed: ' + (e && e.message ? e.message : 'could not reach the server. Your changes are NOT saved yet — try Save again.');
    }
  }
  state.saving = false;
  render();
  // 2026-10-05: after a clean save, add brand-new candidates to Students Master
  // (doubtful ones go to a review window). Never blocks or fails the save itself.
  if(CURRENT_ROLE === 'admin' && !state.saveError && !state.dirty && sentDate === state.date){
    try{ if(window.studentAutoAddAfterSave) window.studentAutoAddAfterSave(state.rows.map(r => ({ candidate: r.candidate, country: r.country, doubts: r.doubts }))); }catch(e){ console.warn('[StudentAutoAdd] hook failed', e); }
  }
}
// ---------- Offline resilience (added 2026-09-30) ----------
// A dead connection mid-edit used to just mean a failed save and a red
// error banner, with no way to move forward except staying on this exact
// screen until connectivity returned — a real risk now that this is used
// from a phone, where connectivity is far less reliable than a desk. This
// queues the full day's rows/notes/finalized state locally (keyed by
// date — a solo user working one date at a time is the common case, but
// keying by date rather than a single slot means switching dates while
// offline doesn't clobber an earlier queued day) and retries automatically
// the moment the browser reports it's back online, with a periodic
// fallback retry in case that event doesn't fire reliably. A full
// snapshot, not a diff, matching the exact shape saveDayNow() already
// sends — so a later queued save for the same date simply replaces the
// earlier one, "last snapshot wins", same as two ordinary saves in a row
// would behave once connectivity is normal.
function isLikelyOfflineError(e){
  if(typeof navigator !== 'undefined' && navigator.onLine === false) return true;
  if(e instanceof TypeError) return true; // fetch's own network-failure shape ("Failed to fetch" / "NetworkError…")
  if(e && /took too long to respond/i.test(e.message||'')) return true; // apiCall's own 20s timeout wording
  return false;
}
function queueOfflineSave(){
  state.offlineQueue[state.date] = {
    rows: JSON.parse(JSON.stringify(state.rows)),
    notes: JSON.parse(JSON.stringify(state.notes)),
    finalized: state.finalized,
    queuedAt: Date.now(),
  };
  // FIX (2026-09-30, found on review): saveAllChanges() also saves the team
  // roster in the same Promise.all — a failed save could just as easily be
  // a roster edit (Team Roster panel) as a calls/notes edit. The first cut
  // of this feature only ever queued calls/notes/finalized, so a roster
  // change made while offline was silently dropped the moment ANY later
  // retry succeeded and cleared state.dirty — never resent, never flagged
  // again. Roster isn't date-scoped, so there's nothing to snapshot here;
  // retryOfflineQueue() below always resends the CURRENT state.roster.
  state.offlineRosterPending = true;
  try{ localStorage.setItem('cd_offline_queue', JSON.stringify(state.offlineQueue)); }catch(e){ /* best-effort */ }
  try{ localStorage.setItem('cd_offline_roster_pending', '1'); }catch(e){ /* best-effort */ }
}
function loadOfflineQueueFromStorage(){
  try{
    const raw = localStorage.getItem('cd_offline_queue');
    state.offlineQueue = raw ? (JSON.parse(raw) || {}) : {};
  }catch(e){ state.offlineQueue = {}; }
  try{ state.offlineRosterPending = localStorage.getItem('cd_offline_roster_pending') === '1'; }catch(e){ state.offlineRosterPending = false; }
}
async function retryOfflineQueue(){
  const dates = Object.keys(state.offlineQueue || {});
  if((!dates.length && !state.offlineRosterPending) || state.offlineQueueRetrying || !API_BASE_URL) return;
  state.offlineQueueRetrying = true;
  render();
  for(const d of dates){
    const entry = state.offlineQueue[d];
    if(!entry) continue;
    // FIX (2026-09-30, found on review): if this queued date is the one
    // currently open, state.rows may have moved on since the entry was
    // queued — more edits made while STILL offline, before this retry ran.
    // The original version always resent the stale queued snapshot and
    // then marked dirty=false on success, which would silently mark those
    // newer edits as "saved" when they were never actually sent — a real,
    // silent data-loss risk. Always prefer the LIVE in-memory rows/notes/
    // finalized for the currently-open date (a superset of whatever was
    // queued); only fall back to the queued snapshot for a date that isn't
    // open right now, since that's the only copy of it this session has.
    const rows = (d === state.date) ? state.rows : entry.rows;
    const notes = (d === state.date) ? state.notes : entry.notes;
    const finalized = (d === state.date) ? state.finalized : entry.finalized;
    try{
      await Promise.all([
        apiCall('calls', {method:'POST', body:{date: d, rows}}),
        apiCall('notes', {method:'POST', body:{date: d, rows: notes}}),
        apiCall('finalized', {method:'POST', body:{date: d, finalized}})
      ]);
      delete state.offlineQueue[d];
      if(d === state.date) state.dirty = false;
    }catch(e){
      // Still unreachable (or a real error now) — leave it queued, the next
      // retry (online event or the periodic fallback) will try again. Not
      // distinguishing further here: unlike the original save, there's no
      // person watching this particular attempt to read a live error
      // message, so silently staying queued is safer than guessing.
    }
  }
  if(state.offlineRosterPending){
    try{
      await apiCall('roster', {method:'POST', body:{rows: state.roster}}); // always the CURRENT roster — never date-scoped, so no staleness risk the way calls/notes have
      state.offlineRosterPending = false;
      try{ localStorage.removeItem('cd_offline_roster_pending'); }catch(e){}
    }catch(e){
      // still queued — same reasoning as above
    }
  }
  try{ localStorage.setItem('cd_offline_queue', JSON.stringify(state.offlineQueue)); }catch(e){ /* best-effort */ }
  state.offlineQueueRetrying = false;
  render();
}
function setupOfflineQueue(){
  loadOfflineQueueFromStorage();
  if(Object.keys(state.offlineQueue).length || state.offlineRosterPending) retryOfflineQueue();
  window.addEventListener('online', retryOfflineQueue);
  // Fallback for browsers/situations where the 'online' event doesn't fire
  // reliably (some mobile PWA contexts) — harmless no-op whenever the
  // queue is already empty, since retryOfflineQueue() returns immediately.
  setInterval(retryOfflineQueue, 30000);
}
function saveDaySoon(){
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDayNow, 400);
}
async function saveDayNow(){
  syncNotesFromShiftNote(); syncNotesFromAbsent(); syncNotesFromExportedIds();
  if(API_BASE_URL){
    // Same fix as saveRoster() above — a failed backend save must surface as
    // a real failure, not silently succeed into local-only storage while the
    // UI claims everything is saved.
    await Promise.all([
      apiCall('calls', {method:'POST', body:{date: state.date, rows: state.rows}}),
      apiCall('notes', {method:'POST', body:{date: state.date, rows: state.notes}}),
      apiCall('finalized', {method:'POST', body:{date: state.date, finalized: state.finalized}})
    ]);
    return;
  }
  await storageAdapter.set('day:'+state.date, JSON.stringify({rows: state.rows, finalized: state.finalized, notes: state.notes}), false);
  const idx = await storageAdapter.get('known-dates', false).catch(()=>null);
  const list = idx && idx.value ? JSON.parse(idx.value) : [];
  if(!list.includes(state.date)){
    list.push(state.date);
    await storageAdapter.set('known-dates', JSON.stringify(list), false);
  }
}
// Saves new rows straight into a date OTHER than whatever is currently
// open — used when one pasted list contains a "Call's for tomorrow
// (DATE)" section splitting it across several days. Fetches that date's
// existing calls first so nothing gets overwritten, runs the same
// auto-routing against THAT date's own existing rows (not today's), then
// saves the merged result. Returns the new total row count for that date.
// Snapshots the CURRENT state of a date's calls before a risky operation
// (import, clear all, finalize) — a real recovery point independent of
// whatever bug might cause data loss, since it's not relying on the same
// save path that could be the thing going wrong. Best-effort: a failed
// backup should never block the actual operation the person is trying to
// do, just gets logged to the console.
async function createBackup(reason, dateKey, rows){
  if(!API_BASE_URL) return;
  try{
    await apiCall('call_backups', {method:'POST', body:{date: dateKey || state.date, reason, rows: rows || state.rows}});
  }catch(e){
    console.error('Backup failed (operation continuing anyway):', e);
  }
}
async function loadBackupsList(dateKey){
  if(!API_BASE_URL) return [];
  try{
    const result = await apiCall('call_backups', {qs:'date='+encodeURIComponent(dateKey || state.date)});
    return result.backups || [];
  }catch(e){ return []; }
}
async function restoreBackup(backupId){
  const result = await apiCall('call_backups', {qs:'id='+encodeURIComponent(backupId)});
  const backup = result.backup;
  if(!backup) throw new Error('Backup not found');
  let rows;
  try{ rows = JSON.parse(backup.snapshot_json); }catch(e){ throw new Error('Backup data is corrupted'); }
  return { rows, callDate: backup.call_date, reason: backup.reason, createdAt: backup.created_at };
}
async function saveRowsToOtherDate(targetDateKey, newRows){
  if(API_BASE_URL){
    const existing = await apiCall('calls', {qs:'date='+targetDateKey}).catch(()=>({rows:[]}));
    const existingRows = existing.rows || [];
    const routed = await autoRouteRows(newRows, existingRows);
    const merged = existingRows.concat(routed);
    await apiCall('calls', {method:'POST', body:{date: targetDateKey, rows: merged}});
    return merged.length;
  }
  const r = await storageAdapter.get('day:'+targetDateKey, false).catch(()=>null);
  const parsedExisting = r && r.value ? JSON.parse(r.value) : null;
  const existingRows = Array.isArray(parsedExisting) ? parsedExisting : (parsedExisting && parsedExisting.rows) || [];
  const routed = await autoRouteRows(newRows, existingRows);
  const merged = existingRows.concat(routed);
  const payload = (parsedExisting && !Array.isArray(parsedExisting)) ? {...parsedExisting, rows: merged} : {rows: merged, finalized:false, notes:[]};
  await storageAdapter.set('day:'+targetDateKey, JSON.stringify(payload), false);
  const idx = await storageAdapter.get('known-dates', false).catch(()=>null);
  const list = idx && idx.value ? JSON.parse(idx.value) : [];
  if(!list.includes(targetDateKey)){
    list.push(targetDateKey);
    await storageAdapter.set('known-dates', JSON.stringify(list), false);
  }
  return merged.length;
}
// Moves the currently-selected rows OUT of today's list and INTO a
// different date entirely, preserving their assignee/round/etc as-is
// (a relocation, not a re-route) — exactly what's needed when calls got
// saved under the wrong date by mistake. Both the source and target
// dates are backed up first, since this touches two dates at once.
async function moveSelectedRowsToDate(targetDateKey){
  const idsToMove = new Set(state.selectedIds);
  const rowsToMove = state.rows.filter(r => idsToMove.has(r.id));
  if(!rowsToMove.length) return { movedCount: 0, targetTotal: 0 };

  await createBackup('pre-move-out', state.date, state.rows);

  let targetRows = [];
  if(API_BASE_URL){
    const existing = await apiCall('calls', {qs:'date='+encodeURIComponent(targetDateKey)}).catch(()=>({rows:[]}));
    targetRows = existing.rows || [];
  } else {
    const r = await storageAdapter.get('day:'+targetDateKey, false).catch(()=>null);
    const parsedExisting = r && r.value ? JSON.parse(r.value) : null;
    targetRows = Array.isArray(parsedExisting) ? parsedExisting : (parsedExisting && parsedExisting.rows) || [];
  }
  await createBackup('pre-move-in', targetDateKey, targetRows);

  const merged = targetRows.concat(rowsToMove);
  if(API_BASE_URL){
    await apiCall('calls', {method:'POST', body:{date: targetDateKey, rows: merged}});
  } else {
    const r = await storageAdapter.get('day:'+targetDateKey, false).catch(()=>null);
    const parsedExisting = r && r.value ? JSON.parse(r.value) : null;
    const payload = (parsedExisting && !Array.isArray(parsedExisting)) ? {...parsedExisting, rows: merged} : {rows: merged, finalized:false, notes:[]};
    await storageAdapter.set('day:'+targetDateKey, JSON.stringify(payload), false);
    const idx = await storageAdapter.get('known-dates', false).catch(()=>null);
    const list = idx && idx.value ? JSON.parse(idx.value) : [];
    if(!list.includes(targetDateKey)){ list.push(targetDateKey); await storageAdapter.set('known-dates', JSON.stringify(list), false); }
  }

  state.rows = state.rows.filter(r => !idsToMove.has(r.id));
  state.selectedIds.clear();
  markDirty();
  render();
  await saveAllChanges();

  return { movedCount: rowsToMove.length, targetTotal: merged.length };
}

// ---------- time helpers ----------
function timeToMinutes(t){
  if(!t) return 9999;
  // has an explicit AM/PM marker anywhere -> parse directly (handles "12.30 AM", "1 AM", "2:30 PM" etc)
  let m = t.match(/(\d{1,2})(?:[:.](\d{2}))?\s*([AaPp][Mm])/);
  if(m){
    let h = parseInt(m[1],10)%12;
    if(/PM/i.test(m[3])) h += 12;
    const min = m[2] ? parseInt(m[2],10) : 0;
    return h*60+min;
  }
  // no AM/PM given anywhere in the raw text (kept exactly as pasted) — heuristic for
  // sort order only, never shown: hours 1-11 sort as PM, 12 sorts as just-after-midnight
  m = t.match(/^(\d{1,2})(?:[:.](\d{2}))?/);
  if(m){
    let h = parseInt(m[1],10);
    let min = m[2] ? parseInt(m[2],10) : 0;
    if(h===12) return min;
    if(h>=1 && h<=11) return (h+12)*60+min;
  }
  return 9999;
}
// The actual work day here runs 1:30 PM -> midnight -> 2 AM, not midnight -> midnight.
// timeToMinutes() alone sorts AM times (0-711) before PM times (720-1439), which puts
// early-morning calls at the very TOP of the list — backwards from how the day actually
// runs. This re-bases the sort key to start at noon, so PM comes first and AM trails
// after, matching the real chronological order of the day. Only used for sort ordering
// — never shown, never affects the displayed time text.
function businessDayMinutes(t){
  const m = timeToMinutes(t);
  if(m===9999) return 9999;
  return (m + 720) % 1440;
}
// ---------- Time-sensitive foreground alerts (added 2026-09-30) ----------
// Everything else that flags "needs a look" (Data Health, Today's
// Briefing) is pull-based — you have to open the app to see it. This is
// the one push-shaped piece: a browser Notification fires on its own for
// an unassigned, still-live call once it's within ALERT_WINDOW_BEFORE_MIN
// minutes of its start time (or up to ALERT_WINDOW_AFTER_MIN minutes
// late), so a gap surfaces before it becomes a missed call instead of
// after. Deliberately scoped to what's actually buildable and verifiable
// from here: this fires only while the tab/PWA is open and running (the
// setInterval below has to actually execute) — a genuine "alert even with
// the app fully closed" push needs a service worker + VAPID keys + a
// server-side scheduler hitting real subscribers, none of which this
// session can deploy or test against a live backend. Worth building as a
// real follow-on once the basics here prove useful day to day.
const ALERT_WINDOW_BEFORE_MIN = 15; // fire once a call is this close to its start time
const ALERT_WINDOW_AFTER_MIN = 10;  // still fire up to this many minutes AFTER start if still unassigned
function checkTimeSensitiveAlerts(){
  if(!state.alertsEnabled) return;
  if(typeof Notification === 'undefined' || Notification.permission !== 'granted') return;
  if(state.date !== todayDateString()) return; // only meaningful for the day actually in progress
  const now = new Date();
  const nowMin = now.getHours()*60 + now.getMinutes();
  (state.rows||[]).forEach(r=>{
    if(r.woi || (r.assignee && r.assignee.trim()) || r.status) return; // only still-unassigned, still-live calls
    if(state.alertedRowIds.has(r.id)) return;
    const callMin = timeToMinutes(r.time);
    if(callMin === 9999) return; // unparseable time — nothing to compare against
    const diff = callMin - nowMin;
    if(diff <= ALERT_WINDOW_BEFORE_MIN && diff >= -ALERT_WINDOW_AFTER_MIN){
      state.alertedRowIds.add(r.id);
      try{
        const n = new Notification('Unassigned call coming up', {
          body: `${r.candidate||'(no name)'}${r.company?' — '+r.company:''} at ${r.time||'?'} still has no one assigned.`,
          tag: 'cd-alert-'+r.id,
        });
        n.onclick = ()=>{ try{ window.focus(); }catch(e){} };
      }catch(e){ /* Notification constructor can throw in some embedded/insecure contexts — fail quietly, nothing else depends on it */ }
    }
  });
}
function setupTimeSensitiveAlerts(){
  try{ state.alertsEnabled = localStorage.getItem('cd_alerts_enabled') === '1' && typeof Notification !== 'undefined' && Notification.permission === 'granted'; }catch(e){ state.alertsEnabled = false; }
  setInterval(checkTimeSensitiveAlerts, 60000);
  checkTimeSensitiveAlerts();
}
// ---------- Background push (added 2026-10-02) ----------
// The real follow-on flagged when foreground-only alerts shipped
// 2026-09-30: subscribes this device to Web Push (via the service worker)
// and saves the subscription on the backend, so a server-side check
// (api/check-push-alerts.js — hit every few minutes by an external
// scheduler, since Vercel's own Hobby-plan Cron Jobs only guarantee once-a-
// day firing) can reach this device even with the tab/app fully closed.
// Deliberately layered UNDER the same "🔔 Alerts" toggle rather than a
// second switch — from Saiteja's side this is still just "alerts on/off";
// whether the browser happens to support background Push is an
// implementation detail, not a decision he should have to make. A browser/
// context that doesn't support Push (e.g. iOS Safari outside an installed
// home-screen app) silently just keeps the foreground-only behavior that
// already existed — nothing regresses for it.
const VAPID_PUBLIC_KEY = 'BLNR3xtNZpdCEZMTKXzYqFWGwFiMXAisrwanST0R5MHpQ6occWEWn2zHL_w4J3sRIoBTsslAMmXYYOR57YXHPUI';
function urlBase64ToUint8Array(base64String){
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for(let i=0;i<rawData.length;i++) outputArray[i] = rawData.charCodeAt(i);
  return outputArray;
}
async function subscribeToPushAlerts(){
  try{
    if(!('serviceWorker' in navigator) || !('PushManager' in window)) return false;
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();
    if(!subscription){
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }
    await apiCall('push_subscription', { method:'POST', body:{ subscription: subscription.toJSON() } });
    return true;
  }catch(e){
    // Fails quietly — a device that can't subscribe (unsupported browser,
    // permission revoked at the OS level after the fact, etc.) still keeps
    // working exactly as before this feature existed: foreground alerts
    // via checkTimeSensitiveAlerts don't depend on this succeeding.
    console.error('Push subscribe failed', e);
    return false;
  }
}
async function unsubscribeFromPushAlerts(){
  try{
    if(!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    if(subscription){
      const endpoint = subscription.endpoint;
      await subscription.unsubscribe();
      await apiCall('push_subscription', { method:'POST', body:{ action:'delete', endpoint } });
    }
  }catch(e){ console.error('Push unsubscribe failed', e); }
}
async function toggleTimeSensitiveAlerts(){
  if(!state.alertsEnabled){
    if(typeof Notification === 'undefined'){
      alert('This browser does not support notifications.');
      return;
    }
    let perm = Notification.permission;
    if(perm === 'default'){ perm = await Notification.requestPermission(); }
    if(perm !== 'granted'){
      alert('Notifications are blocked — enable them for this site in your browser/PWA settings to use time-sensitive alerts.');
      return;
    }
    state.alertsEnabled = true;
    checkTimeSensitiveAlerts();
    subscribeToPushAlerts(); // fire-and-forget — foreground alerts above don't wait on this
  } else {
    state.alertsEnabled = false;
    unsubscribeFromPushAlerts(); // fire-and-forget — the toggle itself shouldn't block on a network round trip
  }
  try{ localStorage.setItem('cd_alerts_enabled', state.alertsEnabled ? '1' : '0'); }catch(e){ /* best-effort */ }
  render();
}
function hourBucketLabel(mins){
  if(mins===9999) return '?';
  let h = Math.floor(mins/60);
  const suffix = h>=12?'PM':'AM';
  let h12 = h%12; if(h12===0) h12=12;
  return h12+suffix;
}
// Same idea as hourBucketLabel() but at half-hour precision ("2:00PM",
// "2:30PM") instead of just the hour — the coverage graph needs this so
// "how many calls at 10:00 vs 10:30" is actually answerable at a glance.
function halfHourBucketLabel(mins){
  if(mins===9999) return '?';
  let h = Math.floor(mins/60);
  const m = mins % 60;
  const suffix = h>=12?'PM':'AM';
  let h12 = h%12; if(h12===0) h12=12;
  return h12+':'+String(m).padStart(2,'0')+suffix;
}

// ---------- parsing WhatsApp text ----------
function titleCase(s){
  return (s||'').replace(/\w\S*/g, w => w.charAt(0).toUpperCase()+w.slice(1).toLowerCase());
}
function normalizeTeamName(text){
  if(/hyd/i.test(text)) return 'HYD Team';
  if(/pradeep/i.test(text)) return 'Pradeep Anna Team';
  if(/development/i.test(text)) return 'Development Team';
  if(/marketing/i.test(text)) return 'Marketing Team';
  return null;
}
function matchRosterName(name){
  const found = state.roster.find(p=>p.name.toLowerCase()===name.toLowerCase());
  return found ? found.name : titleCase(name);
}
function matchOrCreateRosterName(name){
  const found = state.roster.find(p=>p.name.toLowerCase()===name.toLowerCase());
  if(found) return found.name;
  const canonical = titleCase(name);
  state.roster.push({id:uid(), name:canonical, team:'Needs Team Assignment', advanced:true});
  return canonical;
}
// A country parenthetical isn't always JUST the country name — real
// messages also write "(uk local)", "(UK Local)", or "(local uk)" to mean
// the candidate is a UK-based/local candidate. Stripping the word "local"
// (and the whitespace it leaves behind) before matching means all of those
// are recognized the same as a bare "(UK)", instead of only the exact
// bare-name form being detected and "uk local" silently falling through to
// the USA default.
function normalizeCountryParenText(text){
  return (text||'').trim().toLowerCase().replace(/\blocal\b/g,'').replace(/\s+/g,' ').trim();
}
function countryFromParens(parens){
  const p = (parens||[]).find(x=>/^(uk|ireland|canada|germany)$/i.test(normalizeCountryParenText(x)));
  if(!p) return 'USA';
  const t = normalizeCountryParenText(p);
  return t==='uk' ? 'UK' : (t.charAt(0).toUpperCase()+t.slice(1));
}
const MONTH_ABBR_MAP = {jan:0,feb:1,mar:2,apr:3,may:4,jun:5,jul:6,aug:7,sep:8,oct:9,nov:10,dec:11};
// Matches section headers like "Call's for tomorrow (2nd Sep)" that split
// one pasted list into calls for several different dates — a real pattern
// in the source WhatsApp text that was previously invisible to the parser
// entirely (the line itself would just become a garbage row, and every
// call under it got dumped into whichever date happened to be open in
// Coverage Desk, silently mixing days together).
function parseDateSectionHeader(line, baseDate){
  const m = line.match(/call'?s?\s+for\s+tomorrow\s*\(\s*(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]{3,9})\s*\)/i);
  if(!m) return null;
  const day = parseInt(m[1],10);
  const monthIdx = MONTH_ABBR_MAP[m[2].slice(0,3).toLowerCase()];
  if(monthIdx === undefined || !day) return null;
  const baseYear = new Date(baseDate).getFullYear();
  const d = new Date(baseYear, monthIdx, day);
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
}
function parseHeaderLine(line){
  const trimmed = line.trim();
  let m = trimmed.match(/^\*(.+?)\*$/);
  if(m){
    const raw = m[1].trim();
    return { type:'team', value: normalizeTeamName(raw) || titleCase(raw) };
  }
  // Only treat "@Name" as a plain header when the ENTIRE line is just a
  // short name — letters/spaces/periods, nothing else. Real reschedule/
  // reason lines look like "@Sashank Bava Sir, Nikhil Adhikrao Yadav
  // (Ireland) - 4:30 PM Call rescheduled..." — that's substantive call
  // data, not a header, and matching it here used to discard the entire
  // line with zero trace, not even a doubt. Requiring the whole line to
  // be just a name (no digits, dashes, commas, parens) means anything
  // with real content correctly falls through to normal parsing instead.
  let m2 = trimmed.match(/^@([A-Za-z][A-Za-z .]{1,40})$/);
  if(m2){
    const raw = m2[1].trim();
    const team = normalizeTeamName(raw);
    return team ? {type:'team', value:team} : {type:'person', value: titleCase(raw)};
  }
  // Plain, unmarked header line (no * or @) — only trigger on an exact match to a
  // known team/person name, never a loose "contains" match, so a candidate line
  // that happens to mention e.g. a company with "development" in it isn't mistaken
  // for a header.
  const PLAIN_HEADERS = {
    'hyd team': {type:'team', value:'HYD Team'},
    'pradeep anna team': {type:'team', value:'Pradeep Anna Team'},
    'pradeep anna': {type:'team', value:'Pradeep Anna Team'},
    'development team': {type:'team', value:'Development Team'},
    'marketing team': {type:'team', value:'Marketing Team'},
    'sai team': {type:'person', value:'Sai'},
    'sai': {type:'person', value:'Sai'},
    'sandeep anna team': {type:'person', value:'Sandeep Anna'},
    'sandeep anna': {type:'person', value:'Sandeep Anna'}
  };
  const key = trimmed.toLowerCase();
  if(PLAIN_HEADERS[key]) return PLAIN_HEADERS[key];
  return null;
}
function normalizeAssigneeText(raw){
  let t = (raw||'').replace(/\*/g,'').trim();
  t = t.replace(/^strictly\s+/i,'').trim();
  return t;
}
// Names that show up after the arrow in a call line but AREN'T actually the
// coordinator handling the call — they're technical points-of-contact from
// the Development Team, pulled in for coding/technical rounds. Hard-coded
// as an immediate fallback (works even before anyone's added to the roster)
// AND checked dynamically against the roster's Development Team membership,
// so this stays correct as the team changes without needing another edit.
const KNOWN_TECHNICAL_POC_NAMES = ['gopi', 'kishore', 'vamsi'];
function isTechnicalPOCName(name){
  const norm = (name||'').trim().toLowerCase();
  if(!norm) return false;
  if(KNOWN_TECHNICAL_POC_NAMES.includes(norm)) return true;
  const person = state.roster.find(p => p.name.toLowerCase() === norm);
  return !!(person && person.team === 'Development Team');
}
function parseDetailedLine(line, defaultRound){
  let clean = line.replace(/^\s*\d{1,3}[\.\)]?\s+/, '');

  // split off the assignment chain at the first arrow
  const arrowIdx = clean.search(/->|→/);
  const mainPart = arrowIdx>=0 ? clean.slice(0,arrowIdx).trim() : clean.trim();
  const afterArrowRaw = arrowIdx>=0 ? clean.slice(arrowIdx) : '';

  // pull out all parenthetical groups so internal dashes/slashes don't break segmenting
  // (handles nested parens by repeatedly stripping the innermost one)
  const parens = [];
  let skeleton = mainPart;
  let pm;
  while((pm = skeleton.match(/\(([^()]*)\)/))){
    parens.push(pm[1].trim());
    skeleton = skeleton.slice(0,pm.index) + ' ' + skeleton.slice(pm.index+pm[0].length);
  }
  skeleton = skeleton.replace(/\s+/g,' ').trim();

  // Splits on a plain hyphen only when surrounded by spaces on both sides
  // (so hyphenated names/words don't get broken apart), but splits on an
  // en-dash (–) or em-dash (—) with either side's whitespace optional —
  // real WhatsApp messages are inconsistent about spacing around these
  // ("Samala— Interview—Detroit..." with missing spaces was landing as one
  // giant unsplit blob before this fix). Also splits on a plain hyphen with
  // a space BEFORE it but none after ("Duration -1Hr -2nd Round") — that
  // pattern used to leave round/duration stuck inside one unsplit chunk,
  // undetectable by either the round or duration regex, silently
  // defaulting the round to 1st even when it was clearly stated.
  // Adjacent delimiters (e.g. an en-dash immediately followed by "- ", as
  // in "... – - Phn Interview - Procea Ltd ...") can leave a stray leading
  // hyphen stuck onto the front of a segment — the en-dash pattern's
  // trailing \s* greedily eats the space the following hyphen delimiter
  // needed to be recognized as its own split point. Left uncleaned, that
  // stray "- " breaks the "is this just a descriptor phrase" check below
  // (isDescriptorSegment expects the segment to START with the phrase),
  // which was causing the real company name one segment later to never be
  // reached — the loop stopped early on "- Phn Interview" instead of
  // skipping it and continuing on to "Procea Ltd".
  const segs = skeleton.split(/\s+-\s+|\s+-(?=\S)|\s*[–—]\s*|\s*--\s*/).map(s=>s.trim().replace(/^-+\s*/,'').replace(/\s*-+$/,'')).filter(Boolean);
  // Minutes are optional here ("11pm", no ":00") — a common shorthand in
  // real messages that previously meant the time (and therefore the row's
  // whole time field) was silently left blank. AM/PM stays mandatory,
  // which is what keeps this safe from matching an unrelated bare number
  // like "Round 2" as if it were a time.
  const timeRegex = /(\d{1,2})(?:[:.](\d{2}))?\s*([AaPp][Mm])/;
  let name = segs[0] || skeleton;
  // Defensive second pass: catches stray leading numbering the first strip
  // missed (different punctuation, extra spaces, etc.) so no "1. " ever
  // survives into the candidate name shown in the table.
  name = name.replace(/^\s*\d{1,3}\s*[\.\):\-]?\s+/, '').trim();
  name = name.replace(/[-–—]+\s*$/, '').trim();
  let timeIdx = segs.findIndex(s=>timeRegex.test(s));

  // Company extraction: scan forward past the name, skipping any segment that's
  // purely a "type" descriptor (Interview, Call, Technical Interview, Coding
  // Interview, Loop Interview, etc.) rather than assuming company always sits
  // immediately after the first "Interview" match. Real data has the descriptor
  // and company in either order ("Interview – Company" or "Company – Interview"),
  // and sometimes an extra descriptor segment sits between them ("Interview –
  // loop interview – Company") — a fixed-offset assumption breaks on those, this
  // scan doesn't care about order or extra descriptor segments.
  function isDescriptorSegment(seg){
    const s = (seg||'').trim();
    // Any "[qualifier] Interview/Call" phrase is a round-type descriptor, not a
    // company — broadened from just technical/coding/loop to cover the full
    // realistic range (final, video, screening, panel, HR, virtual, telephonic,
    // presentation, etc.) so a new qualifier word doesn't quietly slip through
    // as "company" the way "final interview" and "presentation interview" just
    // did — each time one was missing from this list, the real company after
    // it got skipped over entirely and the descriptor phrase became the wrong
    // "company" value instead. "phn" is a common WhatsApp shorthand for
    // "phone" — treated the same way.
    return /^((phone|phn)\s+)?(interview|call)s?$/i.test(s)
      || /^(technical|coding|loop|final|video|screening|panel|hr|telephonic|virtual|in-?person|onsite|group|initial|preliminary|presentation|case\s?study|behavioral|panel\s?discussion)\s+(interview|call|round)$/i.test(s);
  }
  let company = '';
  let companyEndIdx = -1;
  for(let i=1; i<segs.length; i++){
    if(i===timeIdx) continue;
    if(isDescriptorSegment(segs[i])) continue;
    if(/^duration:?/i.test(segs[i])) continue;
    // A stray leading hyphen ("- -Houston methodist") happens when the
    // source has a double-dash-like gap ("Interview - -Houston...") — a
    // company name should never actually start with a bare hyphen.
    company = segs[i].replace(/^-+\s*/, '');
    companyEndIdx = i;
    break;
  }
  // A hyphen INSIDE the company name itself (e.g. "The Co - operative
  // Bank") gets split apart by the exact same delimiter that separates
  // real fields, since the parser can't tell "a dash separating fields"
  // from "a dash that's part of this client's actual name" just from the
  // punctuation. If whatever comes right after the detected company is
  // ALSO not time/duration/round/descriptor, it's almost certainly a
  // continuation of that same name rather than a distinct new field —
  // rejoin it instead of silently losing it.
  if(companyEndIdx !== -1){
    let j = companyEndIdx + 1;
    while(
      j < segs.length && j !== timeIdx &&
      !isDescriptorSegment(segs[j]) &&
      !/^duration:?/i.test(segs[j]) &&
      !/^(final|\d+\w{0,4})\s*rounds?$/i.test(segs[j].trim()) &&
      !/^\d{1,2}[:.]\d{2}\s*[AaPp][Mm]?$/.test(segs[j].trim()) &&
      // A single bare word sitting as the very LAST segment in the whole
      // line, with nothing after it, is the exact shape of a trailing POC
      // name ("...- vamsi", "...- kumar") — reserved for the separate
      // trailing-POC check below, not something to absorb into company.
      !(j === segs.length - 1 && /^[A-Za-z]+$/.test(segs[j].trim()))
    ){
      company += ' - ' + segs[j];
      j++;
    }
  }

  const timeSource = timeIdx>=0 ? segs[timeIdx] : skeleton;
  const tm = timeSource.match(timeRegex);
  const time = tm ? `${tm[1]}:${tm[2] || '00'} ${tm[3].toUpperCase()}` : '';

  // round: usually a parenthetical mentioning "round", but real messages
  // sometimes just tack "1st Round" or "3RD Round" on as plain trailing text
  // with no parens at all — check the split segments for that pattern too
  // before giving up and defaulting to 1st.
  const roundParen = parens.find(p=>/round/i.test(p));
  // Same typo-tolerance as isAdvancedRound() — matches "2ns Round" (should be
  // "2nd") the same way it matches "2nd Round", since real source data has
  // inconsistent/typo'd ordinal suffixes and requiring an exact one meant
  // rounds like this silently defaulted to "1st" instead of being detected.
  const roundSegMatch = segs.find(s=>/^(final|\d+\w{0,4})\s*rounds?$/i.test(s.trim()));
  const roundFound = roundParen || roundSegMatch;
  let round = roundFound || (defaultRound || '1st');

  // Round TYPE (separate from round NUMBER) — a second parenthetical often
  // carries this ("(3rd Round) (Given Coderpad Link)", "(4th Round) (Loop
  // round)"), or it's folded into the same paren as the round number
  // ("(Not Provided; Discussion round)"). Scanned across every paren plus
  // the main text so it's found regardless of which paren it landed in.
  const roundType = detectRoundType(parens, mainPart);

  // A line explicitly saying "(Candidate 1st Interview)" / "(Candidate 1st
  // inteview)" (real source data has that typo) is stating plainly that
  // this is this candidate's very first interview with us — that's a
  // stronger, more direct signal than any other round detection or default,
  // and overrides it even if e.g. the 2nd Round Import button was used or
  // the line separately (contradictorily) mentions another round.
  const candidateFirstInterview = /candidate['\u2019]?s?\s*(1st|first)\s*int\w*/i.test(clean);
  if(candidateFirstInterview) round = '1st';

  const country = countryFromParens(parens);

  // Real messages often carry a THIRD kind of parenthetical besides country
  // and round — the student's target role for this interview, e.g.
  // "(Marketing Operations Specialist)". Whatever's left over after country/
  // round/duration are matched is that role — captured here since it was
  // previously just discarded.
  const countryParenRaw = (parens||[]).find(x=>/^(uk|ireland|canada|germany)$/i.test(normalizeCountryParenText(x)));
  const durParenForRole = parens.find(p=>/^[0-9]+\s*(hrs?|hours?|mins?|minutes?)$/i.test(p));
  // A paren that's purely a round-TYPE note ("Given Coderpad Link", "Loop
  // round") isn't the candidate's target role — exclude it here so it
  // doesn't get mislabeled as the role field just because it's the
  // "leftover" paren after country/round-number/duration are matched.
  const roleParen = parens.find(p => p !== countryParenRaw && p !== roundParen && p !== durParenForRole && !isRoundTypeOnlyParen(p) && p.trim().length>0);
  const role = (roleParen||'').trim();

  // duration: explicit "Duration: X" first, else a paren that's purely a duration token
  let duration = '';
  const durMatch = mainPart.match(/duration:?\s*-?\s*([0-9]+\s*(mins?|hrs?|hours?))/i);
  if(durMatch) duration = durMatch[1];
  else {
    const durParen = parens.find(p=>/^[0-9]+\s*(hrs?|hours?|mins?|minutes?)$/i.test(p));
    if(durParen) duration = durParen.replace(/([0-9])\s*([a-z])/i,'$1 $2');
    else{
      // Neither an explicit "Duration:" label nor a standalone parenthetical
      // — some messages just drop a bare "25mins" (no space, no label) as
      // plain trailing text instead. Only tried as a last resort, after
      // both stricter patterns above have already failed, so this can
      // never override a more explicit duration stated elsewhere in the
      // same line.
      const bareDurMatch = mainPart.match(/\b([0-9]+)\s*(mins?|minutes?|hrs?|hours?)\b/i);
      if(bareDurMatch) duration = `${bareDurMatch[1]} ${bareDurMatch[2]}`;
    }
  }

  // Broadened from the literal "waiting for invite" to the word stem
  // "invit" — real text varies ("invite", "invitation", "inviting"), and
  // the exact-substring version missed "Waiting for invitation", which
  // then fell all the way through to the raw-text fallback instead of
  // being recognized as a WOI call with its country/etc parsed properly.
  const woi = /waiting\s+for\s+invit\w*|\bwoi\b/i.test(clean);
  // Real messages sometimes explicitly say "(OnSite Interview)"/"(On-Site)"
  // — captured automatically when stated. When they don't (per real
  // experience, the 2nd-round supplementary details often skip it), the
  // Onsite checkbox in the table is there to set it manually.
  const onsite = /on\s*-?\s*site/i.test(clean);

  const doubts = [];
  if(!time && !woi) doubts.push('No time found in this line — check the original text.');
  if(!company.trim()) doubts.push('No company detected — check the original text.');
  if(!roundFound && !woi) doubts.push('Round wasn\u2019t stated in the source — defaulted to 1st, please verify.');
  if(!duration.trim() && !woi) doubts.push('Duration wasn\u2019t stated in the source — conflict detection can\u2019t check overlaps for this call without it.');

  // assignee: first token right after the first arrow. Anything after that
  // — whether combined with a hyphen ("gopi-Mary Joan Mostrey...") or a
  // second arrow ("Kumar -> Hiring manager") — is the interviewer, which
  // was previously just discarded even though it's stated in most records.
  // But that first name is sometimes actually a Technical POC (Gopi,
  // Kishore, Vamsi from Development Team), not the coordinator handling the
  // call — those go in their own field instead of assignee.
  let assignee = '', interviewer = '', technicalPOC = '';
  if(afterArrowRaw){
    const rest = afterArrowRaw.replace(/^\s*(->|→)\s*/, '');
    const arrowPieces = rest.split(/->|→/).map(s=>s.trim()).filter(Boolean);
    if(arrowPieces.length){
      // The FIRST piece can itself combine assignee and interviewer via a
      // plain hyphen or comma ("gopi- LaStarr Davis AVP of Operations").
      // Split there on a hyphen immediately followed by a capital letter —
      // a real first name is never followed by that pattern.
      const firstPieceParts = arrowPieces[0].split(/,|[-–—](?=\s*[A-Z])/).map(s=>s.trim()).filter(Boolean);
      const assigneeText = firstPieceParts[0] || '';
      if(assigneeText){
        if(isTechnicalPOCName(assigneeText)){
          technicalPOC = titleCase(assigneeText);
        } else {
          assignee = matchOrCreateRosterName(assigneeText);
        }
      }
      const interviewerParts = firstPieceParts.slice(1).concat(arrowPieces.slice(1));
      interviewer = interviewerParts.join(' — ').trim();
    }
  }
  // Same POC name can also show up as a bare trailing segment with no
  // "->" at all ("...(2nd Round)-vamsi") rather than after an arrow. Only
  // claims the LAST segment, and only if it's a single bare word matching
  // a known POC — never touches company/time/duration, which are already
  // resolved by this point.
  if(!technicalPOC && !assignee){
    const lastSeg = (segs[segs.length-1]||'').trim();
    if(lastSeg && segs.length-1 !== timeIdx && /^[A-Za-z]+$/.test(lastSeg) && isTechnicalPOCName(lastSeg)){
      technicalPOC = titleCase(lastSeg);
    }
  }

  return { id: uid(), time, company: company.trim(), candidate: name, round, duration, woi, assignee, country, doubts, raw: line, role, interviewer, technicalPOC, onsite, candidateFirstInterview, roundType };
}
// Detects a special round TYPE mentioned anywhere in the parenthetical
// notes — coding rounds (Coderpad-based), loop rounds, and
// discussion/final rounds carry different prep/duration expectations from
// a plain numbered round, so they're worth flagging visually instead of
// silently disappearing into whichever paren happened to also contain the
// word "round" (or, previously, into the unrelated "target role" field).
// Order matters: Coderpad is the most specific signal and is checked
// first, so a line mentioning both a round number and Coderpad doesn't get
// miscategorized.
function detectRoundType(parens, mainPart){
  const allText = (parens||[]).join(' | ') + ' ' + (mainPart||'');
  if(/coderpad/i.test(allText)) return 'coding';
  if(/\bloop\b/i.test(allText)) return 'loop';
  if(/\bfinal\b/i.test(allText)) return 'final';
  if(/\bdiscussion\b/i.test(allText)) return 'discussion';
  return null;
}
function isRoundTypeOnlyParen(p){
  return /coderpad|^\s*loop(\s+round)?\s*$|^\s*final(\s+round)?\s*$|^\s*discussion(\s+round)?\s*$/i.test((p||'').trim());
}
function roundTypeBadgeInfo(roundType){
  if(roundType==='coding') return { label:'Coding Round (Coderpad)', shortLabel:'CP' };
  if(roundType==='loop') return { label:'Loop Round', shortLabel:'LOOP' };
  if(roundType==='final') return { label:'Final Round', shortLabel:'FIN' };
  if(roundType==='discussion') return { label:'Discussion Round', shortLabel:'DISC' };
  return null;
}
// Selecting several WhatsApp messages at once (long-press one, tap the
// rest, then the copy icon) pastes ALL of them in one go \u2014 but WhatsApp
// prepends each line with a timestamp and sender name when copying more
// than one message this way, which a single-message copy never includes.
// Two known shapes, iOS and Android:
//   [2:32 PM, 9/21/26] Sashank Bava: Ruchitha Mandalapu - 11pm ist...
//   9/21/2026, 14:32 - Sashank Bava: Ruchitha Mandalapu - 11pm ist...
// Stripped before a line ever reaches a parser, so multi-select copy
// works the same as pasting one message at a time. Deliberately strict
// (date + time + a colon-terminated name, all anchored at the very
// start) so it can't accidentally eat real message content.
const WHATSAPP_EXPORT_PREFIX_RE = [
  /^\[\d{1,2}:\d{2}(?::\d{2})?\s*(?:[AaPp][Mm])?,\s*\d{1,2}\/\d{1,2}\/\d{2,4}\]\s*[^:\n]{1,60}:\s*/,
  /^\d{1,2}\/\d{1,2}\/\d{2,4},\s*\d{1,2}:\d{2}(?:\s*[AaPp][Mm])?\s*-\s*[^:\n]{1,60}:\s*/,
];
function isWhatsAppExportPrefixLine(line){
  return WHATSAPP_EXPORT_PREFIX_RE.some(re=>re.test(line));
}
function stripWhatsAppExportPrefix(line){
  let out = line;
  WHATSAPP_EXPORT_PREFIX_RE.forEach(re=>{ out = out.replace(re, ''); });
  return out.trim();
}
// Splits a clipboard paste into the distinct WhatsApp messages it holds,
// used by the "Paste from clipboard" picker so a person can choose which
// ones to actually bring in when they multi-selected more than they
// meant to. Only splits when WhatsApp's OWN multi-select-copy prefix
// marks each message boundary — that's the one reliable signal we have.
// Without it (a normal single-message copy, or a closure message that
// legitimately spans a blank line for its own salary line), splitting on
// blank lines would be a guess, and a wrong guess here means silently
// offering to drop half of someone's message — so a single chunk comes
// back untouched rather than risk that.
function splitClipboardIntoMessages(text){
  if(!text || !text.trim()) return [text ? text.trim() : ''].filter(Boolean);
  const rawLines = text.replace(/\r\n/g, '\n').split('\n').map(l=>l.replace(/[​‌‍⁠﻿]/g, ''));
  const hasAnyPrefix = rawLines.some(isWhatsAppExportPrefixLine);
  if(!hasAnyPrefix) return [text.trim()];
  const chunks = [];
  let current = [];
  rawLines.forEach(line=>{
    if(isWhatsAppExportPrefixLine(line)){
      if(current.length) chunks.push(current.join('\n').trim());
      current = [stripWhatsAppExportPrefix(line)];
    } else if(current.length){
      current.push(line);
    }
  });
  if(current.length) chunks.push(current.join('\n').trim());
  return chunks.filter(Boolean);
}
function parseImportText(text, baseDate, defaultRound){
  const lines = text.split('\n').map(l=>stripWhatsAppExportPrefix(l.trim().replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, ''))).filter(Boolean);
  const out = [];
  let currentDefault = null;
  let currentTargetDate = null; // null = whatever date the import panel targets
  let headerLineCount = 0; // team/person/date-section headers — not actual call records
  for(const line of lines){
    const dateHeader = parseDateSectionHeader(line, baseDate || state.date);
    if(dateHeader){ currentTargetDate = dateHeader; headerLineCount++; continue; }

    const header = parseHeaderLine(line);
    if(header){ currentDefault = header; headerLineCount++; continue; }

    // Reschedule/cancel-looking lines used to be skipped here entirely,
    // relying on the separate parseRescheduleText() pass to extract them
    // from the raw text. That extractor's candidate-name regex doesn't
    // handle a leading list number ("42.\tJanani Priya k – ..."), so
    // lines like that silently vanished with zero trace. Now every line
    // always goes through the same robust parsing below (which already
    // strips list numbers correctly); the caller in runImport() checks
    // afterward whether a reschedule-looking row actually matches a call
    // that already existed before this paste, and merges it into that
    // existing row instead of leaving a duplicate.

    // Try the specific "Name - Time (assignee)" shape first. The trailing $ anchor
    // means this only matches when there's nothing else on the line, so genuine
    // detailed-format lines (with company/duration/round text) never match here.
    const m = line.match(/^(.+?)\s+-\s+([0-9]{1,2}(?:[.:]\d{1,2})?(?:\s*[AaPp][Mm])?)\s*(\(([^)]*)\))?$/);
    if(m){
      let name = m[1].trim().replace(/^\s*\d{1,3}\s*[\.\):\-]?\s+/, '').trim();
      const timeRaw = m[2];
      const assigneeRaw = m[4];
      let country = 'USA';
      // Same "local" tolerance as countryFromParens() below — "(uk local)"
      // means the same thing as "(UK)" in real messages, not just the bare
      // country name.
      const countryMatch = name.match(/\(([^)]*)\)/);
      if(countryMatch && /^(uk|ireland|canada|germany)$/i.test(normalizeCountryParenText(countryMatch[1]))){
        const normalized = normalizeCountryParenText(countryMatch[1]);
        country = normalized==='uk' ? 'UK' : titleCase(normalized);
        name = name.replace(countryMatch[0],'').replace(/\s+/g,' ').trim();
      }
      let assignee = '';
      if(assigneeRaw){
        assignee = matchOrCreateRosterName(normalizeAssigneeText(assigneeRaw));
      } else if(currentDefault){
        assignee = currentDefault.value;
      }
      out.push({id:uid(), time:timeRaw, company:'', candidate:name, round: defaultRound || '1st', duration:'', woi:false, assignee, country, doubts:['Round and company weren\u2019t specified in this format — round defaulted to '+(defaultRound==='2nd'?'2nd':'1st')+', please verify.'], raw:line, _targetDate: currentTargetDate});
      continue;
    }

    if(/\d{1,2}[:.]\d{2}\s*[AaPp][Mm]/.test(line) || /waiting\s+for\s+invit\w*|\bwoi\b/i.test(line)){
      const detailed = parseDetailedLine(line, defaultRound);
      detailed._targetDate = currentTargetDate;
      out.push(detailed);
      continue;
    }

    // Fallback: this line didn't match any known format, but it's clearly
    // meant to be a call record (non-empty, not a header, not a
    // reschedule message). Previously lines like this were silently
    // dropped — with a large pasted list, that meant real interview
    // calls could vanish with zero trace. Instead, keep it as a row
    // flagged in Doubts with the original text preserved, so nothing is
    // ever lost — it just needs a quick manual look to fill in the
    // details the parser couldn't figure out on its own.
    out.push({
      id: uid(), time:'', company:'', candidate: line.length > 80 ? line.slice(0,80)+'…' : line,
      round: defaultRound || '1st', duration:'', woi:false,
      assignee: currentDefault ? currentDefault.value : '',
      country:'USA',
      doubts:['Could not automatically parse this line — please fill in candidate/time/company/round manually. Original text: "'+line+'"'],
      raw: line, _targetDate: currentTargetDate
    });
  }
  flagLikelyAmTimes(out);
  // Attached so the caller can mathematically verify nothing was dropped:
  // every non-header line always produces exactly one entry in `out` by
  // construction (clean, doubted, or fallback) — so out.length should
  // always equal lines.length - headerLineCount. If it ever doesn't, that
  // means a genuinely new, not-yet-seen edge case slipped past every
  // existing safety net, and the mismatch itself is the signal to go
  // looking for it rather than silently trusting the count is right.
  out._dataLineCount = lines.length - headerLineCount;
  return out;
}
// Bare times (no AM/PM in the source) default to PM per the heuristic in
// timeToMinutes(). That's right most of the time, but wrong for the tail end
// of a day that wraps past midnight — e.g. "1:00" appearing after "12:30" in
// the original paste almost always means 1:00 AM, not 1:00 PM. Rather than
// silently guessing (which has caused real mistakes before), this flags the
// suspicious ones as a doubt so it's visible and one click to fix — just edit
// the time field to add "AM" explicitly.
function flagLikelyAmTimes(rows){
  let runningMax = -Infinity;
  rows.forEach(r=>{
    if(!r.time) return;
    const hasExplicitAmPm = /[AaPp][Mm]/.test(r.time);
    const bdm = businessDayMinutes(r.time);
    if(!hasExplicitAmPm && bdm !== 9999){
      const hourMatch = r.time.match(/^(\d{1,2})/);
      const hour = hourMatch ? parseInt(hourMatch[1],10) : null;
      // A backward jump of 2+ hours right after other late entries, on an
      // hour in the 1-6 range, is the classic "meant to continue past
      // midnight" pattern seen repeatedly in real call lists.
      if(hour>=1 && hour<=6 && runningMax !== -Infinity && bdm < runningMax - 120){
        r.doubts = r.doubts || [];
        r.doubts.push(`Time "${r.time}" comes right after other late-night entries — this may actually mean ${r.time} AM. Edit the time field to add "AM" if so.`);
      }
    }
    if(bdm !== 9999) runningMax = Math.max(runningMax, bdm);
  });
}
function isHydCountry(country){
  return country==='UK' || country==='Ireland' || country==='Germany';
}
function autoRouteByCountry(row){
  if(row.woi) return row;
  if(isAdvancedRound(row.round)) return row; // 2nd round & above left for manual assignment
  if(row.assignee) return row; // don't override an explicit assignment
  row.assignee = isHydCountry(row.country) ? 'HYD Team' : 'Pradeep Anna Team';
  return row;
}

// Capacity- and hours-aware routing: HYD Team normally takes UK/Ireland 1st-round
// calls, Pradeep Anna Team takes everything else. But HYD only works afternoon
// through 12 AM IST (not the early-morning hours), and if a team's member count
// is already fully booked at a given exact time, the call overflows to the other
// team instead — same rule applies in both directions.
// HYD Team's working window: ~12 PM (noon) through 12 AM (midnight) IST.
// Extracted so the overload-suggestion logic can reuse the exact same
// definition the auto-router uses, instead of a second copy drifting out
// of sync with it.
function isWithinHydHours(time){
  const mins = timeToMinutes(time);
  return mins >= 720 || mins === 0;
}
// Downloads the currently-open date's calls as a formatted .xlsx — one
// sheet with every call (grouped by team, then time), one summary sheet
// with counts per team and per handler. Uses the SheetJS library already
// loaded for Students Master imports (see the <script src=".../xlsx...">
// tag near the top of the file) — nothing new to load, this just writes
// with it instead of only reading.
function exportDayToExcel(){
  if(typeof XLSX === 'undefined'){
    alert('The Excel library did not load (probably a network/ad-blocker issue) — try refreshing the page.');
    return;
  }
  if(!state.rows.length){
    alert(`There are no calls for ${state.date} to export.`);
    return;
  }
  const teamNames = new Set(state.roster.map(p=>p.team));
  const statusLabels = { rescheduled: 'Rescheduled', cancelled: 'Cancelled', not_responded: 'Not Responded', no_invite: 'Didn’t Receive Invite' };

  const callRows = state.rows.slice().sort((a,b)=>{
    const teamA = teamOfAssignee(a.assignee, teamNames) || 'Zzz Unassigned';
    const teamB = teamOfAssignee(b.assignee, teamNames) || 'Zzz Unassigned';
    if(teamA !== teamB) return teamA.localeCompare(teamB);
    return timeToMinutes(a.time) - timeToMinutes(b.time);
  }).map(r=>{
    const team = teamOfAssignee(r.assignee, teamNames);
    return {
      'Team': team || 'Unassigned',
      'Time': r.woi ? 'Waiting for Invite' : (r.time||''),
      'Candidate': r.candidate||'',
      'Company': r.company||'',
      'Round': r.round||'',
      'Duration': r.duration||'',
      'Assignee': r.assignee || (r.woi ? '' : 'Unassigned'),
      'Driving Person': r.drivingPerson||'',
      'Country': r.country||'',
      'Onsite': r.onsite ? 'Yes' : '',
      'Status': statusLabels[r.status] || '',
    };
  });

  // Per-handler and per-team counts, for a quick headcount view without
  // having to scroll/count the main sheet by hand.
  const byHandler = {};
  const byTeam = {};
  state.rows.forEach(r=>{
    if(!r.assignee || r.woi) return;
    const team = teamOfAssignee(r.assignee, teamNames);
    if(teamNames.has(r.assignee)) return; // a team-level assignment, not a person — skip in the per-handler count
    byHandler[r.assignee] = (byHandler[r.assignee]||0) + 1;
    if(team) byTeam[team] = (byTeam[team]||0) + 1;
  });
  const summaryRows = [
    ...Object.keys(byTeam).sort().map(team=>({ 'Team': team, 'Handler': '(team total)', 'Calls': byTeam[team] })),
    ...Object.keys(byHandler).sort().map(name=>({ 'Team': teamOfAssignee(name, teamNames)||'', 'Handler': name, 'Calls': byHandler[name] })),
  ];

  const wb = XLSX.utils.book_new();
  const callsSheet = XLSX.utils.json_to_sheet(callRows);
  callsSheet['!cols'] = [
    {wch:16},{wch:14},{wch:26},{wch:22},{wch:12},{wch:10},{wch:18},{wch:16},{wch:10},{wch:8},{wch:14}
  ];
  XLSX.utils.book_append_sheet(wb, callsSheet, 'Calls');

  const summarySheet = XLSX.utils.json_to_sheet(summaryRows);
  summarySheet['!cols'] = [{wch:22},{wch:22},{wch:8}];
  XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');

  XLSX.writeFile(wb, `Coverage-Desk-${state.date}.xlsx`);
}
// Same idea as exportDayToExcel, but for the Incentives panel's monthly
// data instead of a single day's calls — a per-handler sheet plus a
// per-team summary sheet, matching the numbers already shown in the panel
// exactly (same source data, just written to a file for management).
function exportIncentivesToExcel(){
  if(typeof XLSX === 'undefined'){
    alert('The Excel library did not load (probably a network/ad-blocker issue) — try refreshing the page.');
    return;
  }
  const d = state.incentivesData;
  const monthKey = state.incentivesMonth || currentMonthKey();
  const byHandler = (d && d.byHandler) || [];
  if(!byHandler.length){
    alert(`There is no incentive data loaded for ${monthKeyLabel(monthKey)} to export.`);
    return;
  }
  const byTeam = (d && d.byTeam) || {};
  const grandTotal = Number((d && d.grandTotal) || 0);

  const handlerRows = byHandler.slice().sort((a,b)=> Number(b.total||0) - Number(a.total||0)).map(r=>({
    'Team': r.team || r.teamCode || '',
    'Handler': r.handler || '',
    'Promotion': Number(r.promotion||0),
    'Selection': Number(r.selection||0),
    'Total': Number(r.total||0),
    'Records': Number(r.records||0),
  }));
  const teamRows = [
    { 'Team': 'Grand Total', 'Total': grandTotal },
    ...Object.keys(byTeam).map(code=>({ 'Team': byTeam[code].label || code, 'Total': Number(byTeam[code].total||0) })),
  ];

  const wb = XLSX.utils.book_new();
  const handlerSheet = XLSX.utils.json_to_sheet(handlerRows);
  handlerSheet['!cols'] = [{wch:20},{wch:22},{wch:12},{wch:12},{wch:12},{wch:10}];
  XLSX.utils.book_append_sheet(wb, handlerSheet, 'By Handler');

  const teamSheet = XLSX.utils.json_to_sheet(teamRows);
  teamSheet['!cols'] = [{wch:22},{wch:14}];
  XLSX.utils.book_append_sheet(wb, teamSheet, 'By Team');

  XLSX.writeFile(wb, `Coverage-Desk-Incentives-${monthKey}.xlsx`);
}
// Closures export (requested 2026-09-27) — every closure on file, with
// which handler it's credited to (using the same manual-override-aware
// matcher the on-screen By Handler view uses, so the file matches exactly
// what's shown) and its round count, plus a By Handler summary sheet.
function exportClosuresToExcel(){
  if(typeof XLSX === 'undefined'){
    alert('The Excel library did not load (probably a network/ad-blocker issue) — try refreshing the page.');
    return;
  }
  const list = state.closures || [];
  if(!list.length){
    alert('There are no closures recorded yet to export.');
    return;
  }
  const perf = state.closuresPerformance;
  const allRows = (perf && perf.allRowsSnapshot) || _allRowsAcrossDatesCache || [];
  const closureRows = list.slice()
    .sort((a,b)=> new Date(b.createdAt||0) - new Date(a.createdAt||0))
    .map(c=>{
      const found = allRows.length ? findClosureMatchWithOverride(c, allRows) : null;
      const match = found ? found.row : null;
      const timeline = buildClosureRoundTimeline(c.candidate, c.company);
      return {
        'Candidate': c.candidate || '',
        'Company': c.company || '',
        'Salary': c.salary || '',
        'Recorded': c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '',
        'Handler': match ? (match.assignee || '(no assignee on the matched call)') : '(not matched to a call record)',
        'Rounds on file': timeline.length || 0,
      };
    });
  const byHandlerRows = ((perf && perf.rows) || []).slice()
    .sort((a,b)=> b.closures - a.closures)
    .map(r=>({ 'Handler': r.handler, 'Team': r.team || '', 'Closures': r.closures }));

  const wb = XLSX.utils.book_new();
  const closuresSheet = XLSX.utils.json_to_sheet(closureRows);
  closuresSheet['!cols'] = [{wch:22},{wch:26},{wch:14},{wch:12},{wch:26},{wch:12}];
  XLSX.utils.book_append_sheet(wb, closuresSheet, 'Closures');
  if(byHandlerRows.length){
    const handlerSheet = XLSX.utils.json_to_sheet(byHandlerRows);
    handlerSheet['!cols'] = [{wch:20},{wch:18},{wch:10}];
    XLSX.utils.book_append_sheet(wb, handlerSheet, 'By Handler');
  }
  XLSX.writeFile(wb, `Coverage-Desk-Closures-${new Date().toISOString().slice(0,10)}.xlsx`);
}
function teamOfAssignee(assignee, teamNames){
  if(!assignee) return null;
  if(teamNames.has(assignee)) return assignee;
  const p = state.roster.find(p=>p.name===assignee);
  return p ? p.team : null;
}
async function autoRouteRows(newRows, existingRows){
  existingRows = existingRows || [];
  const teamNames = new Set(state.roster.map(p=>p.team));
  const hydRaw = state.roster.filter(p=>p.team==='HYD Team').length || 6;
  const paRaw = state.roster.filter(p=>p.team==='Pradeep Anna Team').length || 8;
  const hydAbsentCount = state.roster.filter(p=>p.team==='HYD Team' && state.absentIds.includes(p.id)).length;
  const paAbsentCount = state.roster.filter(p=>p.team==='Pradeep Anna Team' && state.absentIds.includes(p.id)).length;
  // Absent members reduce today's effective capacity, so auto-routing doesn't
  // keep stacking calls onto a team that's actually short-staffed today.
  const hydCount = Math.max(hydRaw - hydAbsentCount, 0);
  const paCount = Math.max(paRaw - paAbsentCount, 0);
  const occupied = {}; // "Team|time" -> count of people already busy at that exact time

  function seedFrom(rows){
    rows.forEach(r=>{
      if(r.woi || !r.assignee) return;
      const team = teamOfAssignee(r.assignee, teamNames);
      if(team){
        const key = team+'|'+r.time;
        occupied[key] = (occupied[key]||0)+1;
      }
    });
  }
  seedFrom(existingRows);
  seedFrom(newRows.filter(r=>r.assignee)); // rows already assigned in this same batch (e.g. via arrow-list merge)

  // Carry-forward assignee (2026-09-28) — if this exact candidate already
  // has real history at the same company, handled by a real individual
  // (not a team), assign the same person again instead of leaving it
  // blank. This is the strongest possible signal for who should run this
  // round, and it's the ONLY auto-assignment that applies to advanced
  // rounds at all — the specialist/team routing below deliberately skips
  // 2nd round and up entirely (`isAdvancedRound(row.round)` guard), so
  // without this, every follow-up round has always required a fully
  // manual pick.
  //
  // REAL BUG, found and fixed 2026-10-01 (reported: a 3rd-round "Helen of
  // Troy" call stayed unassigned despite two clearly-visible prior rounds
  // for the same candidate at the same company — confirmed NOT isolated to
  // that one client, it could silently affect any candidate/company).
  // findPriorOccurrence() depends entirely on state.notifications, which
  // this used to read AS-IS and do nothing further — originally relying on
  // a separate fire-and-forget scanForRepeatCandidates() call elsewhere to
  // have already finished warming it by the time an import happened. If
  // that background scan hadn't completed yet (import run within the first
  // second or two of a page load — a window that scales with how many
  // saved dates there are to fetch, so BUSIER accounts hit this more
  // often, not less), carry-forward silently did nothing and fell through
  // to routing below as if there were no prior history at all — with no
  // error, no doubt-note, nothing visibly different from a candidate who
  // genuinely had no history. That silent gap is exactly the failure shape
  // this app's own rules call out as critical. Fixed by actually awaiting
  // a real scan here (autoRouteRows is now async) whenever state.notifications
  // hasn't been warmed yet, instead of treating "not warmed yet" the same
  // as "no history exists" — scanForRepeatCandidates()'s own cache (see
  // fetchAllRowsAcrossDates()) makes this free once the page has been open
  // a few seconds, since by then the normal fire-and-forget scan has
  // usually already populated it; this await only ever costs real time on
  // a genuinely cold cache, which is exactly the moment it was silently
  // failing before.
  if(!state.notifications){
    try{ state.notifications = await scanForRepeatCandidates(); }
    catch(e){ /* leave state.notifications null — findPriorOccurrence() already handles that by returning null, same as before this fix existed */ }
  }
  newRows.forEach(row=>{
    if(row.woi || row.assignee || !row.candidate) return;
    const prior = findPriorOccurrence(row);
    if(!prior || !prior.assignee || teamNames.has(prior.assignee)) return;
    if(!fuzzyCompanyKeyMatch(row.company, prior.company)) return;
    row.assignee = prior.assignee;
    if(row.doubts) row.doubts.push(`Carried forward: ${prior.assignee} handled this candidate’s ${prior.round||'earlier round'} at this company on ${prior.date} — double-check before assuming.`);
  });

  function hasRoom(team, time){
    const size = team==='HYD Team' ? hydCount : (team==='Pradeep Anna Team' ? paCount : Infinity);
    return (occupied[team+'|'+time]||0) < size;
  }

  // Healthcare/Education specialist routing — Bharath handles Education/University
  // clients, Avinash handles Healthcare clients, automatically, in ANY round (not
  // just 1st round), and takes priority over the general team routing below.
  // Existing double-booking detection (computeConflicts, duration-aware) already
  // catches it if this ends up overlapping another of their calls — no separate
  // mechanism needed, that warning surfaces automatically once assigned.
  newRows.forEach(row=>{
    if(row.woi || row.assignee) return;
    const category = classifyCompany(row.company);
    if(category==='Education'){
      row.assignee = matchOrCreateRosterName('Bharath');
      if(row.doubts) row.doubts.push('Auto-assigned to Bharath — Education/University client.');
    } else if(category==='Healthcare'){
      row.assignee = matchOrCreateRosterName('Avinash');
      if(row.doubts) row.doubts.push('Auto-assigned to Avinash — Healthcare client.');
    }
  });

  newRows.forEach(row=>{
    if(row.woi || isAdvancedRound(row.round) || row.assignee) return;

    const primaryTeam = isHydCountry(row.country) ? 'HYD Team' : 'Pradeep Anna Team';
    const fallbackTeam = primaryTeam==='HYD Team' ? 'Pradeep Anna Team' : 'HYD Team';

    let chosenTeam = primaryTeam;
    if(primaryTeam==='HYD Team' && !isWithinHydHours(row.time)){
      chosenTeam = 'Pradeep Anna Team'; // outside HYD's hours entirely
      if(row.doubts) row.doubts.push('Outside HYD Team\u2019s usual afternoon\u2013midnight hours \u2014 routed to Pradeep Anna Team instead.');
    } else if(!hasRoom(chosenTeam, row.time)){
      chosenTeam = fallbackTeam; // primary team fully booked at this exact time
      if(row.doubts) row.doubts.push(`${primaryTeam} had no open slot at ${row.time} \u2014 overflowed to ${fallbackTeam}.`);
    }

    row.assignee = chosenTeam;
    occupied[chosenTeam+'|'+row.time] = (occupied[chosenTeam+'|'+row.time]||0)+1;
  });

  return newRows;
}

// ---------- derived data ----------
function parseDurationMinutes(text){
  if(!text) return null;
  const t = text.toLowerCase();
  let total = 0, found = false;
  const hrMatch = t.match(/([\d.]+)\s*(hr|hrs|hour|hours)/);
  const minMatch = t.match(/([\d.]+)\s*(min|mins|minute|minutes)/);
  if(hrMatch){ total += parseFloat(hrMatch[1])*60; found = true; }
  if(minMatch){ total += parseFloat(minMatch[1]); found = true; }
  if(!found){
    const bare = t.match(/^([\d.]+)$/);
    if(bare){ total = parseFloat(bare[1]); found = true; }
  }
  return found && total>0 ? total : null;
}

// For the conflict tooltip — instead of just flagging a double-booking, says
// who's actually free at that exact time, so resolving it is one glance
// instead of manually scanning the roster and every other row.
// Detects and parses WhatsApp-style reschedule/cancel messages mixed in
// with regular new-call lines in the SAME paste — handles the short form
// ("Name – Time – rescheduled from candidate side"), the "reschedule to
// [when]" form, and the fuller form with company/round/duration/reason,
// often split across a couple of lines with @mentions and "sir" mixed in.
function looksLikeRescheduleLine(line){
  // Broadened to also catch "not responding"/"no response" messages (a
  // genuinely distinct status from reschedule/cancel), typo'd variants
  // like "no responsing", to allow a bare time like "7:00" with no AM/PM,
  // and a bare-HOUR time like "11pm" with no minutes at all. Time is no
  // longer required at all — real messages sometimes omit it entirely
  // (e.g. "Call has rescheduled from candidate side sir", no clock time
  // anywhere); the name/status extraction further down still requires a
  // real match, so this doesn't introduce false positives. Also added a
  // pattern for a candidate who wants to handle the interview on their
  // own, unassisted — not a reschedule/cancel/no-response in the literal
  // sense, but tracked the same way (folded into 'rescheduled').
  // Added 2026-09-30: "call didn't happen... he didn't receive the
  // invitation link" — a real reported message that this parser was
  // silently dropping entirely (no "reschedule"/"cancel"/"not responding"
  // word anywhere in it). Catches the common phrasings for an invite/link
  // that never reached the candidate: "didn't receive/get the invite(link)",
  // "invite/link wasn't received/sent", "no invite received", plus a bare
  // "didn't happen" when the same line also mentions "invit\w*" or "link"
  // somewhere, so it's still scoped to an invite-related no-show, not any
  // arbitrary "didn't happen" text.
  const hasNoInviteWord = /didn.t\s+(?:receive|get)\s+(?:the\s+)?(?:invit\w*|link)/i.test(line)
    || /(?:invit\w*|link)\s+(?:wasn.t|was\s+not|never)\s+(?:received|sent|shared)/i.test(line)
    || /no\s+invit\w*\s+(?:received|sent)/i.test(line)
    || (/didn.t\s+happen/i.test(line) && /invit\w*|link/i.test(line));
  const hasStatusWord = /\b(reschedul\w*|cancel\w*|(?:not|no)\s+(?:\w+\s+){0,2}respon\w*)\b/i.test(line)
    || /candidate[\s\S]{0,40}?own\s+(?:end|behalf)/i.test(line)
    || hasNoInviteWord;
  return hasStatusWord;
}
function parseRescheduleText(text){
  const results = [];
  const lines = text.split('\n').map(l=>stripWhatsAppExportPrefix(l.trim().replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, '')));
  // Bare times (no AM/PM) default to PM — matches the app's existing
  // convention elsewhere for bare times, and these real messages very
  // often drop the AM/PM since it's understood to be an evening shift.
  // Minutes are also optional now — "11pm" (no ":00") is a very common
  // shorthand in these messages and was previously invisible to this
  // parser entirely, since it required an explicit ":mm" to recognize
  // anything as a time at all.
  const timeRe = /(\d{1,2}(?:[:.]\d{2})?\s*[AaPp][Mm]|\d{1,2}[:.]\d{2})/;
  const blocks = [];
  let current = [];
  for(const line of lines){
    if(!line){ if(current.length){ blocks.push(current); current=[]; } continue; }
    if(/^@/.test(line) && !timeRe.test(line)) continue; // pure @mention line, not data
    const isNewEntry = timeRe.test(line) && /[–\-]/.test(line);
    if(isNewEntry && current.length){ blocks.push(current); current=[]; }
    current.push(line);
  }
  if(current.length) blocks.push(current);

  function normalizeTime(raw){
    const tm = raw.match(/(\d{1,2})(?:[:.](\d{2}))?\s*([AaPp][Mm])?/);
    if(!tm) return raw.trim();
    const mins = tm[2] || '00'; // a bare-hour time like "11pm" implies :00
    const ampm = tm[3] ? tm[3].toUpperCase() : 'PM'; // default when omitted, e.g. "7:00" alone
    return `${tm[1]}:${mins} ${ampm}`;
  }

  blocks.forEach(blockLines=>{
    const full = blockLines.join(' ');
    if(!looksLikeRescheduleLine(full)) return; // not a reschedule/cancel/no-response message — skip

    const timeLine = (blockLines.find(l=>timeRe.test(l)) || full)
      .replace(/^\s*\d{1,3}[\.\)]?\s+/, ''); // strip a leading list number ("89. Name ...")
    // Handles a name followed directly by a dash-time ("Name - 7:30 PM"),
    // a name with a parenthetical country tag before the dash
    // ("Name (UK) - 7:30 PM"), or a name followed by a possessive time
    // with no dash at all ("Safiya Kamuluru's 8:30 PM IST call...").
    const nameMatch =
      timeLine.match(/^(?:@[\w\s]+?[,:]?\s*(?:sir)?[,:]?\s*)?([A-Za-z][A-Za-z .]+?)(?:\s*\([^)]*\))?(?:['\u2019]s)?\s*[–\-]/) ||
      timeLine.match(/^(?:@[\w\s]+?[,:]?\s*(?:sir)?[,:]?\s*)?([A-Za-z][A-Za-z .]+?)(?:\s*\([^)]*\))?(?:['\u2019]s)?\s+\d{1,2}[:.]\d{2}/);
    const candidate = nameMatch ? nameMatch[1].trim() : null;

    let company = null;
    const companyMatch = full.match(/Interview\s*[–\-]\s*([^–\-]+?)\s*[–\-]/i);
    if(companyMatch) company = companyMatch[1].trim();

    // Same phrasing set as hasNoInviteWord in looksLikeRescheduleLine()
    // above — checked before cancel/reschedule so a message mentioning
    // both ("didn't receive the invite, need to reschedule") is tagged by
    // its actual cause rather than the generic word that happens to also
    // appear.
    const noInviteMatch = /didn.t\s+(?:receive|get)\s+(?:the\s+)?(?:invit\w*|link)/i.test(full)
      || /(?:invit\w*|link)\s+(?:wasn.t|was\s+not|never)\s+(?:received|sent|shared)/i.test(full)
      || /no\s+invit\w*\s+(?:received|sent)/i.test(full);
    let status = null;
    if(/(?:not|no)\s+(?:\w+\s+){0,2}respon\w*/i.test(full)) status = 'not_responded';
    else if(/candidate[\s\S]{0,40}?own\s+(?:end|behalf)/i.test(full)) status = 'rescheduled'; // candidate handling it independently — tracked as a reschedule variant, see reason text below
    else if(noInviteMatch) status = 'no_invite';
    else if(/cancel/i.test(full)) status = 'cancelled';
    else if(/reschedul/i.test(full)) status = 'rescheduled';

    let side = null;
    if(/candidate\s*side/i.test(full)) side = 'candidate side';
    else if(/interviewer\s*side/i.test(full)) side = 'interviewer side';
    else if(/client\s*side/i.test(full)) side = 'client side';
    else if(/recruiter\s*(?:'s)?\s*side/i.test(full)) side = 'recruiter side';

    let reason = null;
    const reasonMatch = full.match(/due to\s+([^.]+?)(?:\s+sir\.?)?$/i);
    if(reasonMatch) reason = reasonMatch[1].trim();
    else if(/candidate[\s\S]{0,40}?own\s+(?:end|behalf)/i.test(full)) reason = 'Candidate handling interview independently';
    else if(status === 'no_invite') reason = 'Didn’t receive the invitation link'; // real messages for this case rarely use "due to..." phrasing, so default it directly rather than leaving it blank
    else {
      const toMatch = full.match(/reschedul\w*\s+to\s+([^.@]+?)(?:\s+sir\.?)?(?:\s*@|$)/i);
      if(toMatch) reason = 'Rescheduled to ' + toMatch[1].trim();
    }

    if(!candidate || !status) return;

    // Detect a SECOND time mentioned alongside the first via "X & Y" /
    // "X and Y" (e.g. "8:30 & 9:30 PM IST Both Interview was reschedule
    // ...") — the same candidate has two separate calls that both need
    // the same tag, not just whichever time the regex happened to grab.
    const dualMatch = full.match(/(\d{1,2}[:.]\d{2})\s*(?:&|and)\s*(\d{1,2}[:.]\d{2})\s*([AaPp][Mm])?/i);
    if(dualMatch){
      const ampm = dualMatch[3] ? dualMatch[3].toUpperCase() : 'PM';
      results.push({ candidate, time: normalizeTime(dualMatch[1]+' '+ampm), company, status, side, reason, raw: full });
      results.push({ candidate, time: normalizeTime(dualMatch[2]+' '+ampm), company, status, side, reason, raw: full });
      return;
    }

    const timeMatch = full.match(timeRe);
    const time = timeMatch ? normalizeTime(timeMatch[1]) : '';
    results.push({ candidate, time, company, status, side, reason, raw: full });
  });

  // "All calls reschedule from Interviewer side sir @Sashank Bava
  // @Pradeep Anna" — a single blanket line covering every OTHER call
  // listed in the same paste, instead of each one stating its own
  // status. That kind of line has a status word but deliberately no time
  // of its own, so it never satisfies looksLikeRescheduleLine() above and
  // was previously skipped with nothing recognized at all — same for
  // every plain call listing under it, since those have a time but no
  // status word of their own either.
  const blanketBlock = blocks.find(blockLines=>{
    const full = blockLines.join(' ');
    return /\ball\s+calls?\b/i.test(full) && /\b(reschedul\w*|cancel\w*|(?:not|no)\s+(?:\w+\s+){0,2}respon\w*)\b/i.test(full);
  });
  if(blanketBlock){
    const blanketFull = blanketBlock.join(' ');
    let blanketStatus = null;
    if(/(?:not|no)\s+(?:\w+\s+){0,2}respon\w*/i.test(blanketFull)) blanketStatus = 'not_responded';
    else if(/cancel/i.test(blanketFull)) blanketStatus = 'cancelled';
    else if(/reschedul/i.test(blanketFull)) blanketStatus = 'rescheduled';

    let blanketSide = null;
    if(/candidate\s*side/i.test(blanketFull)) blanketSide = 'candidate side';
    else if(/interviewer\s*side/i.test(blanketFull)) blanketSide = 'interviewer side';
    else if(/client\s*side/i.test(blanketFull)) blanketSide = 'client side';
    else if(/recruiter\s*(?:'s)?\s*side/i.test(blanketFull)) blanketSide = 'recruiter side';

    let blanketReason = null;
    const blanketReasonMatch = blanketFull.match(/due to\s+([^.]+?)(?:\s+sir\.?)?$/i);
    if(blanketReasonMatch) blanketReason = blanketReasonMatch[1].trim();

    if(blanketStatus){
      blocks.forEach(blockLines=>{
        if(blockLines === blanketBlock) return;
        const blockFull = blockLines.join(' ');
        if(looksLikeRescheduleLine(blockFull)) return; // already individually handled above

        const timeM = blockFull.match(timeRe);
        if(!timeM) return; // no time in this block — not a real call entry

        const lineForName = (blockLines.find(l=>timeRe.test(l)) || blockFull)
          .replace(/^\s*\d{1,3}[\.\)]?\s+/, '');
        const nameM = lineForName.match(/^([A-Za-z][A-Za-z .]+?)\s*[–\-]/);
        const candidate = nameM ? nameM[1].trim() : null;
        if(!candidate) return;

        let company = null;
        const companyM = blockFull.match(/Interview\s*[–\-]\s*([^–\-]+?)\s*[–\-]/i);
        if(companyM) company = companyM[1].trim();

        const time = normalizeTime(timeM[1]);
        const alreadyThere = results.some(r =>
          r.candidate.toLowerCase()===candidate.toLowerCase() && r.time.toUpperCase()===time.toUpperCase()
        );
        if(alreadyThere) return;

        results.push({ candidate, time, company, status: blanketStatus, side: blanketSide, reason: blanketReason, raw: blockFull });
      });
    }
  }

  // A short "Time – Name" line followed by a separate paragraph
  // explaining the reschedule/cancel reason (the actual status word only
  // shows up in that paragraph, not alongside the time) — neither block
  // is self-contained on its own, so looksLikeRescheduleLine() never
  // matches either one and the whole message was previously skipped
  // entirely. Pair an unclaimed time-only block with the very next block
  // if THAT one carries the status word instead.
  for(let i=0; i<blocks.length; i++){
    const blockLines = blocks[i];
    if(blockLines === blanketBlock) continue;
    const blockFull = blockLines.join(' ');
    const hasTimeHere = timeRe.test(blockFull);
    const hasStatusHere = /\b(reschedul\w*|cancel\w*|(?:not|no)\s+(?:\w+\s+){0,2}respon\w*)\b/i.test(blockFull);
    if(!hasTimeHere || hasStatusHere) continue; // only "time but no status word yet" blocks

    const lineForName = (blockLines.find(l=>timeRe.test(l)) || blockFull).replace(/^\s*\d{1,3}[\.\)]?\s+/, '');
    let candidate = null;
    let nm = lineForName.match(/^(?:@[\w\s]+?[,:]?\s*(?:sir)?[,:]?\s*)?([A-Za-z][A-Za-z .]+?)(?:\s*\([^)]*\))?(?:['\u2019]s)?\s*[–\-]/);
    if(nm) candidate = nm[1].trim();
    if(!candidate){
      // Also handle the reverse order — "6:30 PM – Pinky Sachdev", time
      // stated first and the name coming after the dash.
      nm = lineForName.match(/\d{1,2}[:.]\d{2}\s*(?:[AaPp][Mm])?(?:\s*IST)?\s*[–\-]\s*([A-Za-z][A-Za-z .]+)$/);
      if(nm) candidate = nm[1].trim();
    }
    if(!candidate) continue;
    if(results.some(r=>r.candidate.toLowerCase()===candidate.toLowerCase())) continue; // already resolved elsewhere

    const nextBlock = blocks[i+1];
    if(!nextBlock || nextBlock === blanketBlock) continue;
    const nextFull = nextBlock.join(' ');
    const nextIsNewEntry = timeRe.test(nextFull) && /[–\-]/.test(nextFull);
    if(nextIsNewEntry) continue; // that's the START of the next candidate's own block, not a reason paragraph
    let status = null;
    if(/(?:not|no)\s+(?:\w+\s+){0,2}respon\w*/i.test(nextFull)) status = 'not_responded';
    else if(/cancel/i.test(nextFull)) status = 'cancelled';
    else if(/reschedul/i.test(nextFull)) status = 'rescheduled';
    if(!status) continue;

    let side = null;
    if(/candidate\s*side/i.test(nextFull)) side = 'candidate side';
    else if(/interviewer\s*side/i.test(nextFull)) side = 'interviewer side';
    else if(/client\s*side/i.test(nextFull)) side = 'client side';
    else if(/recruiter\s*(?:'s)?\s*side/i.test(nextFull)) side = 'recruiter side';

    const timeM = blockFull.match(timeRe);
    const time = timeM ? normalizeTime(timeM[1]) : '';

    // No tidy "due to X" clause in these — the whole paragraph usually IS
    // the explanation, so that becomes the reason as-is (trimmed to a
    // sane length rather than truncated to one clause).
    let reason = nextFull.trim();
    if(reason.length > 220) reason = reason.slice(0,220) + '…';

    results.push({ candidate, time, company: null, status, side, reason, raw: blockFull + ' — ' + nextFull });
  }

  return results;
}
// Matches one line's closure/job-offer phrasing and pulls out the
// candidate and company. Tried in order — first pattern that matches
// wins. Extend this with another `if(m) return {...}` block, same shape,
// whenever a real message uses a phrasing none of these catch (the
// nature of parsing free-text messages: new phrasings turn up over time,
// and each one becomes a permanent case here plus a regression test).
function matchClosureLine(line){
  // A trailing inline salary or currency amount ("...from Acme at
  // $85,000", or "...from Acme Salary: 49$/Hr" with no line break at
  // all) was getting swallowed into the company capture below instead of
  // being recognized as the salary — stripped off here before company is
  // ever assigned, regardless of which pattern below matched. WhatsApp's
  // *bold* markdown around a company name ("*First port*") and a stray
  // trailing period from an over-eager capture ("*American University.*")
  // are cleaned up the same way.
  function cleanCompany(company){
    let c = company;
    c = c.replace(/\s+at\s+\$[\d,]+.*$/i, '');
    c = c.replace(/\bsalary\b.*$/i, '');
    c = c.replace(/\*/g, '');
    c = c.trim().replace(/\.$/, '');
    return c.trim();
  }
  // "X got offer letter from Y" / "X got the offer from Y" / "X has
  // received an offer from Y" / "X received offer from Y" / "X got an
  // offer with Y"
  // The leading \s* (not \s+) right before each keyword is deliberate —
  // a real message had the candidate's last name run straight into "got"
  // with no space at all ("...Jerom Mohangot offer letter from SMBC",
  // from fast WhatsApp typing). Allowing zero spaces there is safe even
  // though names can coincidentally contain "got" as a substring (e.g.
  // "Margot") — the rest of each pattern still has to match in full
  // right after the keyword, so a spurious mid-name split just fails to
  // complete and the regex backtracks to the real boundary.
  let m = line.match(/^(.+?)\s*(?:got|received|has\s+got|has\s+received)\s+(?:the\s+|an?\s+)?offer(?:\s+letter)?\s+(?:from|with|at)\s+(.+?)[.!]?\s*$/i);
  if(m) return { candidate: m[1].trim(), company: cleanCompany(m[2]) };
  // "X got selected in/at/by Y" / "X has been selected by Y" / "X is
  // selected by Y"
  m = line.match(/^(.+?)\s*(?:got\s+selected|has\s+been\s+selected|is\s+selected)\s+(?:in|at|by|with)\s+(.+?)[.!]?\s*$/i);
  if(m) return { candidate: m[1].trim(), company: cleanCompany(m[2]) };
  // "X closed with Y" / "X is closed with Y" / "X got closed at Y"
  m = line.match(/^(.+?)\s*(?:is\s+|got\s+)?closed\s+(?:with|at)\s+(.+?)[.!]?\s*$/i);
  if(m) return { candidate: m[1].trim(), company: cleanCompany(m[2]) };
  // "X placed at/with Y" / "X got placed at Y"
  m = line.match(/^(.+?)\s*(?:got\s+|is\s+)?placed\s+(?:at|with|in)\s+(.+?)[.!]?\s*$/i);
  if(m) return { candidate: m[1].trim(), company: cleanCompany(m[2]) };
  return null;
}
// Currency-agnostic — just grabs everything after "salary" + an optional
// colon, whatever currency or format it's actually written in ($, £,
// "49$/Hr" with the symbol AFTER the number, "112,000$ / yr", etc.) —
// simpler and more robust than trying to pattern-match every currency
// shape individually, and works whether the marker is on its own line or
// glued onto the same line as the offer itself.
function extractSalaryFromText(text){
  const m = text.match(/\bsalary\s*:?\s*(.+)$/i);
  return m ? m[1].replace(/\*/g, '').trim() : '';
}
// Parses a pasted closure/job-offer message into { candidate, company,
// salary, raw } entries — same overall shape as parseRescheduleText:
// blank-line-separated blocks, @mention-only lines ignored entirely. A
// salary line found on its own (not part of a closure line) attaches to
// whichever closure was found most recently above it in the same paste,
// which is the shape real messages actually take — "candidate got offer
// from company" on one line, "salary: $X" as its own line right after —
// though it's equally handled when there's no line break between them
// at all ("...from Acme Salary: $X" all run together).
function parseClosureText(text){
  if(!text || !text.trim()) return [];
  const lines = text.split('\n').map(l=>stripWhatsAppExportPrefix(l.trim().replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, '')));
  const blocks = [];
  let current = [];
  for(const line of lines){
    if(!line){ if(current.length){ blocks.push(current); current=[]; } continue; }
    if(/^@/.test(line)) continue; // pure @mention line, not data
    current.push(line);
  }
  if(current.length) blocks.push(current);

  const results = [];
  blocks.forEach(blockLines=>{
    const full = blockLines.join(' ')
      .replace(/^\s*\d{1,3}[\.\)]?\s+/, '')  // strip a leading list number
      .replace(/^\s*sir\s*[,:]?\s+/i, '');   // strip a leading "Sir," greeting
    const closureMatch = matchClosureLine(full);
    if(closureMatch && closureMatch.candidate && closureMatch.company){
      // Salary glued onto this same block, whatever currency/format it's
      // written in — falls back to a bare $-amount with no "salary:"
      // label at all, for a message that never uses the word.
      let salary = extractSalaryFromText(full);
      if(!salary){
        const inlineSalary = full.match(/\$\s*[\d,]+(?:\.\d+)?(?:\s*(?:per\s+annum|\/\s*year|\/\s*yr|k))?|£\s*[\d,]+(?:\.\d+)?(?:\s*\/\s*(?:year|yr))?/i);
        if(inlineSalary) salary = inlineSalary[0].replace(/\*/g, '').trim();
      }
      results.push({ candidate: closureMatch.candidate, company: closureMatch.company, salary, raw: full });
    } else if(results.length){
      const salaryMatch = extractSalaryFromText(full);
      if(salaryMatch && !results[results.length-1].salary){
        results[results.length-1].salary = salaryMatch;
      }
    }
  });
  return results;
}
// A reschedule/detail message is typed independently from the original
// call list, often by a different person on a different day, so an exact
// candidate-name match can miss a genuine spelling/abbreviation variant of
// the same person (the same gap crossReferenceClosure() had for closures).
// Falls back to the narrow, same-company-scoped sameCandidateFuzzyMatch
// check, and only when it resolves to exactly one candidate — otherwise
// refuses to guess, same as an exact miss would.
function findFuzzyCandidateRows(rows, candidateName, company){
  if(!candidateName) return [];
  const compKey = company ? normalizeCompanyKey(company) : null;
  const pool = compKey ? rows.filter(r => normalizeCompanyKey(r.company) === compKey) : rows;
  const uniqueFuzzy = new Map(); // normalized candidate name -> rows[]
  pool.forEach(r=>{
    if(!r.candidate) return;
    if(sameCandidateFuzzyMatch(candidateName, r.candidate)){
      const key = r.candidate.trim().toLowerCase();
      if(!uniqueFuzzy.has(key)) uniqueFuzzy.set(key, []);
      uniqueFuzzy.get(key).push(r);
    }
  });
  if(uniqueFuzzy.size !== 1) return [];
  return Array.from(uniqueFuzzy.values())[0];
}
// Matches a parsed reschedule message to an existing row — by candidate
// name (fuzzy/case-insensitive) and time. Company is used as a tiebreaker
// when there are multiple same-name/same-time matches.
function matchRescheduleToRow(parsed, rows){
  const key = parsed.candidate.trim().toLowerCase();
  let candidates = rows.filter(r => (r.candidate||'').trim().toLowerCase() === key);
  if(!candidates.length) candidates = findFuzzyCandidateRows(rows, parsed.candidate, parsed.company);
  if(!candidates.length) return null;
  const timeMatches = candidates.filter(r => (r.time||'').replace(/\s+/g,' ').toUpperCase() === parsed.time.toUpperCase());
  const pool = timeMatches.length ? timeMatches : candidates;
  if(pool.length === 1) return pool[0];
  if(parsed.company){
    const companyMatch = pool.find(r => normalizeCompanyKey(r.company) === normalizeCompanyKey(parsed.company));
    if(companyMatch) return companyMatch;
  }
  return pool[0];
}

// Detects when a freshly-parsed import line is actually describing a call
// that's ALREADY in today's list — the common case being: the plain call
// list went in earlier via a normal import, and this later paste (e.g. the
// "2nd Round Import" button) is just supplying details — role, interviewer,
// the real round — that weren't in the original message. Matching on
// candidate + time (company as a tiebreaker) means that call gets enriched
// in place instead of showing up twice.
function findExistingCallMatch(parsedRow, existingRows){
  const key = (parsedRow.candidate||'').trim().toLowerCase();
  if(!key) return null;
  let candidates = existingRows.filter(r => (r.candidate||'').trim().toLowerCase() === key);
  if(!candidates.length) candidates = findFuzzyCandidateRows(existingRows, parsedRow.candidate, parsedRow.company);
  if(!candidates.length) return null;
  const normTime = (t)=> (t||'').replace(/\s+/g,'').toUpperCase();
  const timeMatches = candidates.filter(r => normTime(r.time) === normTime(parsedRow.time));
  if(timeMatches.length === 1) return timeMatches[0];
  if(timeMatches.length > 1){
    if(parsedRow.company){
      const companyMatch = timeMatches.find(r => normalizeCompanyKey(r.company) === normalizeCompanyKey(parsedRow.company));
      if(companyMatch) return companyMatch;
    }
    return timeMatches[0];
  }
  // A WOI call ("Waiting for Invite") has no scheduled time yet by
  // definition — once the invite comes through and this same candidate
  // is pasted again with an actual time, the times will never match
  // (empty vs a real time), so the checks above alone would miss it and
  // create a duplicate instead of updating the WOI row into the now-
  // scheduled call. If there's exactly one existing WOI row for this
  // candidate and the new paste isn't itself WOI, that's almost
  // certainly the same call finally getting its invite.
  if(!parsedRow.woi){
    const woiCandidates = candidates.filter(r => r.woi);
    if(woiCandidates.length === 1) return woiCandidates[0];
    if(woiCandidates.length > 1 && parsedRow.company){
      const companyMatch = woiCandidates.find(r => normalizeCompanyKey(r.company) === normalizeCompanyKey(parsedRow.company));
      if(companyMatch) return companyMatch;
    }
  }
  // No exact time match, but if there's exactly one same-name candidate
  // today AND the client also matches, it's still almost certainly the
  // same call with a slightly reworded time — safe enough to merge.
  if(candidates.length === 1 && parsedRow.company && candidates[0].company &&
     normalizeCompanyKey(candidates[0].company) === normalizeCompanyKey(parsedRow.company)){
    return candidates[0];
  }
  return null;
}

// Finds groups of calls that are almost certainly the same call entered
// more than once — same candidate, same time, same round — regardless of
// how they got that way (two separate imports, a paste run twice, etc).
// This is a broader safety net than the "undo last import" banner, which
// only knows about the single most recent import.
function findDuplicateCallGroups(rows){
  // Group by time+round first (same as before), then cluster candidates
  // within each of those buckets — exact name match first, falling back to
  // the narrow sameCandidateFuzzyMatch check for a same-time,
  // same-round entry whose name is a spelling/abbreviation variant of one
  // already in the cluster. Same time AND round is already a strong-enough
  // anchor to allow that fuzzy check here, same reasoning as elsewhere.
  const byTimeRound = {};
  rows.forEach(r=>{
    if(!r.candidate) return;
    const trKey = (r.time||'').replace(/\s+/g,'').toUpperCase() + '|' + (r.round||'').trim().toLowerCase();
    byTimeRound[trKey] = byTimeRound[trKey] || [];
    byTimeRound[trKey].push(r);
  });
  const groups = [];
  Object.values(byTimeRound).forEach(bucket=>{
    const clusters = [];
    bucket.forEach(r=>{
      const key = r.candidate.trim().toLowerCase();
      let cluster = clusters.find(c => c.key === key) ||
        clusters.find(c => sameCandidateFuzzyMatch(c.rows[0].candidate, r.candidate));
      if(cluster){ cluster.rows.push(r); } else { clusters.push({ key, rows: [r] }); }
    });
    clusters.forEach(c=>{ if(c.rows.length>1) groups.push(c.rows); });
  });
  return groups;
}
// When collapsing a duplicate group down to one row, keep whichever copy
// has the most information filled in (interviewer/role/company/etc) rather
// than just an arbitrary one — so a de-dupe never throws away detail that
// only one of the copies happened to have.
function callCompletenessScore(r){
  let score = 0;
  if(r.interviewer) score++;
  if(r.role) score++;
  if(r.company) score++;
  if(r.assignee) score++;
  if(r.duration) score++;
  if(r.status) score++;
  return score;
}

function findFreePeopleAtTime(time, needsAdvanced){
  const busyNames = new Set(
    state.rows.filter(r => r.time === time && r.assignee && !r.woi).map(r => r.assignee)
  );
  return state.roster.filter(p =>
    !busyNames.has(p.name) &&
    !state.absentIds.includes(p.id) &&
    (!needsAdvanced || p.advanced)
  ).map(p => p.name);
}
// A different kind of conflict from the coordinator-double-booking check
// above — this flags when the same CLIENT has two different students both
// scheduled at the exact same time. That's a scheduling risk on the
// client's end (their interviewer likely can't run two interviews at once),
// not something about who on our side is handling the calls.
function computeClientTimeConflicts(rows){
  const byCompany = {};
  rows.forEach(r=>{
    if(!r.company || !r.time || r.woi) return;
    const key = normalizeCompanyKey(r.company);
    byCompany[key] = byCompany[key] || [];
    byCompany[key].push(r);
  });
  const conflictMap = new Map();
  Object.values(byCompany).forEach(calls=>{
    for(let i=0;i<calls.length;i++){
      for(let j=i+1;j<calls.length;j++){
        const a = calls[i], b = calls[j];
        // Same candidate, different rounds, isn't a client conflict — already
        // scoped to the same company (via byCompany above), so it's safe to
        // also catch a spelling/abbreviation variant of the same person here
        // rather than only an exact name match, to avoid a false alarm.
        const sameCandidate = (a.candidate||'').trim().toLowerCase() === (b.candidate||'').trim().toLowerCase() ||
          sameCandidateFuzzyMatch(a.candidate, b.candidate);
        if(sameCandidate) continue;
        if(timeToMinutes(a.time) !== timeToMinutes(b.time)) continue;
        const msg = (self, other) => `${self.company} also has ${other.candidate||'another candidate'} scheduled at the exact same time (${other.time}) — the client's interviewer may not be able to do both.`;
        conflictMap.set(a.id, msg(a, b));
        conflictMap.set(b.id, msg(b, a));
      }
    }
  });
  return conflictMap;
}

function computeConflicts(rows){
  const teamNames = new Set(state.roster.map(p=>p.team));
  const byAssignee = {};
  rows.forEach(r=>{
    if(!r.assignee || teamNames.has(r.assignee) || r.woi) return; // team-level assignments aren't a single-person conflict
    byAssignee[r.assignee] = byAssignee[r.assignee] || [];
    byAssignee[r.assignee].push(r);
  });
  const conflictMap = new Map();
  function reason(self, other, assignee){
    const overlapsExactly = timeToMinutes(self.time) === timeToMinutes(other.time);
    const suffix = overlapsExactly ? '' : ` (${self.duration||'?'} vs ${other.duration||'?'} \u2014 durations overlap)`;
    return `${assignee} is also booked on ${other.candidate||'another call'}${other.company?' ('+other.company+')':''} at ${other.time}${suffix}.`;
  }
  Object.entries(byAssignee).forEach(([assignee, calls])=>{
    for(let i=0;i<calls.length;i++){
      for(let j=i+1;j<calls.length;j++){
        const a = calls[i], b = calls[j];
        const aStart = timeToMinutes(a.time), bStart = timeToMinutes(b.time);
        let overlap = (aStart === bStart);
        if(!overlap){
          const aDur = parseDurationMinutes(a.duration), bDur = parseDurationMinutes(b.duration);
          if(aDur && bDur){
            const aEnd = aStart+aDur, bEnd = bStart+bDur;
            overlap = (aStart < bEnd && bStart < aEnd);
          }
        }
        if(overlap){
          conflictMap.set(a.id, reason(a,b,assignee));
          conflictMap.set(b.id, reason(b,a,assignee));
        }
      }
    }
  });
  return conflictMap;
}
// Same double-booking detection as computeConflicts above, but returns the
// actual conflicting row PAIRS rather than a reason string per id — what
// the Conflicts quick-fix panel needs to show both calls side by side.
function computeConflictPairs(rows){
  const teamNames = new Set(state.roster.map(p=>p.team));
  const byAssignee = {};
  rows.forEach(r=>{
    if(!r.assignee || teamNames.has(r.assignee) || r.woi) return;
    byAssignee[r.assignee] = byAssignee[r.assignee] || [];
    byAssignee[r.assignee].push(r);
  });
  const pairs = [];
  Object.entries(byAssignee).forEach(([assignee, calls])=>{
    for(let i=0;i<calls.length;i++){
      for(let j=i+1;j<calls.length;j++){
        const a = calls[i], b = calls[j];
        const aStart = timeToMinutes(a.time), bStart = timeToMinutes(b.time);
        let overlap = (aStart === bStart);
        if(!overlap){
          const aDur = parseDurationMinutes(a.duration), bDur = parseDurationMinutes(b.duration);
          if(aDur && bDur){
            const aEnd = aStart+aDur, bEnd = bStart+bDur;
            overlap = (aStart < bEnd && bStart < aEnd);
          }
        }
        if(overlap) pairs.push({ assignee, a, b });
      }
    }
  });
  return pairs;
}

// Flags anyone carrying a noticeably disproportionate share of today's
// calls — distinct from computeConflicts() above, which only catches
// literal double-bookings. This is about workload balance: someone with
// 10 calls while others have 3-4 is exactly the kind of overload that
// leads to a missed call, which becomes a reschedule message, which
// becomes another data-entry cycle — catching it at assignment time is
// cheaper than untangling it afterward.
function computeWorkloadWarnings(rows){
  const teamNames = new Set(state.roster.map(p=>p.team));
  const counts = {};
  rows.forEach(r=>{
    if(!r.assignee || teamNames.has(r.assignee) || r.woi) return; // only individual assignments count
    counts[r.assignee] = (counts[r.assignee] || 0) + 1;
  });
  const entries = Object.entries(counts);
  if(entries.length < 2) return [];
  const total = entries.reduce((s,[,c])=>s+c, 0);
  const avg = total / entries.length;
  return entries
    .filter(([,count]) => count >= 6 && count >= avg * 1.8)
    .sort((a,b)=>b[1]-a[1])
    .map(([name,count])=>({ name, count, avg: Math.round(avg*10)/10 }));
}
// Fires from today's roster availability alone — independent of how many
// calls have actually been entered yet. computeConflicts/suggestAlternativeTeam
// above are both reactive: they only speak up once a team's ALREADY overloaded
// against today's call volume. This one is meant to catch it earlier — a team
// that's lost most of its headcount to absences is a foreseeable overload risk
// even on a day with a perfectly normal number of calls, and that's knowable
// the moment absences are marked, before the calls even start coming in.
// Deliberately narrow (only OVERFLOW_ELIGIBLE_TEAMS, only a genuinely steep
// drop) so it doesn't nag over one routine day-off.
function computeCapacityRiskWarnings(){
  return OVERFLOW_ELIGIBLE_TEAMS.map(name=>{
    const total = state.roster.filter(p=>p.team===name).length;
    const capacity = computeTeamCapacity(name);
    return { name, total, capacity, absent: total - capacity };
  }).filter(t => t.total >= 3 && t.capacity > 0 && t.capacity <= Math.ceil(t.total * 0.5));
}
function summarize(rows, conflictIds){
  let assigned=0, unassigned=0, woi=0;
  const rowIds = new Set(rows.map(r=>r.id));
  let conflicts = 0;
  conflictIds.forEach((reason,id)=>{ if(rowIds.has(id)) conflicts++; });
  rows.forEach(r=>{
    if(r.woi) woi++;
    else if(r.assignee) assigned++;
    else unassigned++;
  });
  return { total: rows.length, assigned, unassigned, woi, conflicts };
}

function getTabRows(view){
  const all = state.rows.slice().sort((a,b)=>businessDayMinutes(a.time)-businessDayMinutes(b.time));
  if(view==='all') return all;
  if(view==='2nd') return all.filter(r=>isAdvancedRound(r.round));
  if(view==='doubts') return all.filter(r=>r.doubts && r.doubts.length>0);
  if(view==='rescheduled') return all.filter(r=>r.status==='rescheduled' || r.status==='cancelled' || r.status==='not_responded' || r.status==='no_invite');
  return all.filter(r=>!isAdvancedRound(r.round));
}

function findRepeatClients(rows){
  const byCompany = {};
  rows.forEach(r=>{
    if(!r.company || !r.company.trim()) return;
    const key = normalizeCompanyKey(r.company);
    byCompany[key] = byCompany[key] || [];
    byCompany[key].push(r);
  });
  const results = [];
  Object.values(byCompany).forEach(group=>{
    if(group.length>1){
      group.sort((a,b)=>businessDayMinutes(a.time)-businessDayMinutes(b.time));
      const timeCounts = {};
      group.forEach(r=>{ timeCounts[r.time] = (timeCounts[r.time]||0)+1; });
      const hasSameTimeOverlap = Object.values(timeCounts).some(c=>c>1);
      results.push({ company: group[0].company, occurrences: group, hasSameTimeOverlap });
    }
  });
  results.sort((a,b)=> (b.hasSameTimeOverlap - a.hasSameTimeOverlap) || a.company.localeCompare(b.company));
  return results;
}

async function getAllKnownDates(){
  let dates = [];
  if(API_BASE_URL){
    try{
      const data = await apiCall('dates', {});
      dates = data.dates || [];
    }catch(e){ dates = []; }
  } else {
    try{
      const idx = await storageAdapter.get('known-dates', false);
      dates = idx && idx.value ? JSON.parse(idx.value) : [];
    }catch(e){ dates = []; }
  }
  if(!dates.includes(state.date)) dates.push(state.date);
  return dates;
}

// Fetches every date's calls and flattens them into one list with a `_date`
// field tagged on each row, for the "All Dates" read-only overview. Separate
// from backupAllData() (which nests by date and includes roster/notes/status
// for a full backup) — this one's shaped for display, not export.
async function loadAllDatesFlat(){
  const dates = await getAllKnownDates();
  const allRows = [];
  for(const d of dates){
    let rows = [];
    if(d === state.date){
      rows = state.rows;
    } else if(API_BASE_URL){
      try{
        const data = await apiCall('calls', {qs:'date='+d});
        rows = data.rows || [];
      }catch(e){ rows = []; }
    } else {
      try{
        const r = await storageAdapter.get('day:'+d, false);
        const parsed = r && r.value ? JSON.parse(r.value) : null;
        rows = Array.isArray(parsed) ? parsed : (parsed ? parsed.rows||[] : []);
      }catch(e){ rows = []; }
    }
    rows.forEach(r => allRows.push(Object.assign({}, r, { _date: d })));
  }
  return allRows.sort((a,b)=> a._date===b._date ? businessDayMinutes(a.time)-businessDayMinutes(b.time) : a._date.localeCompare(b._date));
}

// CSV export for weekly/monthly reporting — separate from the WhatsApp .txt
// format, meant to be opened in Excel/Sheets rather than pasted anywhere.
function csvEscape(val){
  const s = String(val==null ? '' : val);
  if(/[",\n]/.test(s)) return '"' + s.replace(/"/g,'""') + '"';
  return s;
}
function buildCsvExport(rows){
  const headers = ['Date','Time','Candidate','Country','Company','Round','Duration','WOI','Assigned To','Status','Interviewer','Importance'];
  const lines = [headers.join(',')];
  rows.forEach(r=>{
    lines.push([
      r._date || state.date,
      r.time || '',
      r.candidate || '',
      r.country || '',
      r.company || '',
      r.round || '',
      r.duration || '',
      r.woi ? 'Yes' : 'No',
      r.assignee || '',
      r.status || '',
      r.interviewer || '',
      r.importance || ''
    ].map(csvEscape).join(','));
  });
  return lines.join('\n');
}

function renderAllDatesPanel(){
  if(state.allDatesLoading){
    return `<div class="import-panel"><div class="hint">Loading every date…</div></div>`;
  }
  if(!state.allDatesData){
    return `<div class="import-panel">
      <div class="strip-title" style="margin-bottom:8px"><span>🗓️ All Dates</span></div>
      <div class="hint" style="margin-bottom:10px">Loads every date you've ever saved calls for into one combined, searchable, read-only list — for manually scanning across days without switching the date picker back and forth.</div>
      <button class="btn primary" id="loadAllDatesBtn">Load all dates</button>
    </div>`;
  }
  const q = (state.allDatesSearch||'').trim().toLowerCase();
  let rows = state.allDatesData;
  if(q){
    rows = rows.filter(r =>
      (r.candidate||'').toLowerCase().includes(q) ||
      (r.company||'').toLowerCase().includes(q) ||
      (r.assignee||'').toLowerCase().includes(q)
    );
  }
  const rowsHtml = rows.map(r=>`
    <tr>
      <td style="font-family:var(--mono);color:var(--text-muted);white-space:nowrap">${escapeHtml(r._date)}</td>
      <td style="white-space:nowrap">${escapeHtml(r.time||'')}</td>
      <td>${escapeHtml(r.candidate||'')}</td>
      <td>${escapeHtml(r.company||'')}</td>
      <td>${escapeHtml(r.round||'')}</td>
      <td>${escapeHtml(r.assignee||'— unassigned —')}</td>
    </tr>
  `).join('');
  return `<div class="import-panel">
    <div class="strip-title" style="margin-bottom:8px"><span>🗓️ All Dates \u2014 ${state.allDatesData.length} calls across ${new Set(state.allDatesData.map(r=>r._date)).size} dates</span>
      <span style="display:flex;gap:6px"><button class="btn ghost" id="exportCsvBtn" style="font-size:11.5px">⬇ Export CSV</button><button class="btn ghost" id="reloadAllDatesBtn" style="font-size:11.5px">Reload</button></span>
    </div>
    <input type="text" id="allDatesSearch" placeholder="Search candidate, company, or assignee…" value="${escapeHtml(state.allDatesSearch||'')}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:8px;font-size:13px;margin-bottom:12px">
    <div class="table-scroll" style="max-height:480px;overflow-y:auto">
      <table style="min-width:640px">
        <thead><tr><th style="width:100px">Date</th><th style="width:90px">Time</th><th>Candidate</th><th>Company</th><th style="width:80px">Round</th><th style="width:140px">Assigned to</th></tr></thead>
        <tbody>${rowsHtml || '<tr><td colspan="6" style="text-align:center;color:var(--text-faint);padding:20px">No matches.</td></tr>'}</tbody>
      </table>
    </div>
  </div>`;
}

async function backupAllData(){
  const dates = await getAllKnownDates();
  const backup = { exportedAt: new Date().toISOString(), roster: state.roster, days: {} };
  for(const d of dates){
    if(d === state.date){
      backup.days[d] = { rows: state.rows, notes: state.notes, finalized: state.finalized };
      continue;
    }
    if(API_BASE_URL){
      try{
        const [callsData, notesData, finalData] = await Promise.all([
          apiCall('calls', {qs:'date='+d}),
          apiCall('notes', {qs:'date='+d}),
          apiCall('finalized', {qs:'date='+d})
        ]);
        backup.days[d] = { rows: callsData.rows||[], notes: notesData.rows||[], finalized: !!finalData.finalized };
      }catch(e){ backup.days[d] = { rows: [], notes: [], finalized: false, error: e.message }; }
    } else {
      try{
        const r = await storageAdapter.get('day:'+d, false);
        const parsed = r && r.value ? JSON.parse(r.value) : null;
        if(Array.isArray(parsed)) backup.days[d] = { rows: parsed, notes: [], finalized: false };
        else backup.days[d] = parsed || { rows: [], notes: [], finalized: false };
      }catch(e){ backup.days[d] = { rows: [], notes: [], finalized: false }; }
    }
  }
  return backup;
}
// When the last full backup was downloaded — tracked per-browser in
// localStorage, not in the database, since it's purely a local reminder of
// "did I take a safety-net copy", not app data anyone else needs to see.
// Deliberately best-effort: a browser that's cleared its storage, or a
// second device, will just re-prompt sooner than strictly necessary, which
// is the harmless direction for this kind of nudge to fail in.
function getLastBackupAt(){
  try{ return Number(localStorage.getItem('coverage-desk-last-backup-at') || 0); }catch(e){ return 0; }
}
function markBackupTaken(){
  try{ localStorage.setItem('coverage-desk-last-backup-at', String(Date.now())); }catch(e){}
}
const BACKUP_REMINDER_DAYS = 14;
// Same localStorage-timestamp pattern as the backup reminder above, but for
// nudging a "Check for Missed Messages" pass before the day is considered
// closed out — that check only actually helps if it gets run, and it's easy
// to forget on a busy day. Keyed per-date (not globally) since "did I check
// today" resets every day, unlike backups.
function getLastMissedCheckRunAt(dateKey){
  try{ return Number(localStorage.getItem('coverage-desk-missed-check-run-'+dateKey) || 0); }catch(e){ return 0; }
}
function markMissedCheckRun(){
  try{ localStorage.setItem('coverage-desk-missed-check-run-'+state.date, String(Date.now())); }catch(e){}
}
const MISSED_CHECK_NUDGE_HOUR = 18; // local hour (24h) after which the nudge starts showing, if not yet run today
// Shared by the "Backup all data" button in Database Settings and the
// quick-access one in the Reports menu — same download, two entry points,
// so it's actually easy to find instead of buried behind Connect Database.
async function downloadFullBackup(){
  state.backingUp = true;
  render();
  try{
    const backup = await backupAllData();
    const text = JSON.stringify(backup, null, 2);
    const blob = new Blob([text], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coverage-desk-backup-${state.date}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
    markBackupTaken();
  } finally {
    state.backingUp = false;
    render();
  }
}

// Shared by both cross-date scans below, so we only fetch every date's data
// once instead of twice.
// Cached so the candidate scan and client scan (which both need the exact
// same "every row across every date" dataset) don't each independently
// re-fetch everything from scratch — that was doubling the total load and
// slowing things down a lot for anyone with many saved dates.
let _allRowsAcrossDatesCache = null;
let _allRowsAcrossDatesCacheAt = 0;
let _allRowsAcrossDatesDebug = null; // last run's diagnostics — see fetchAllRowsAcrossDates()
// PERF (2026-10-02): computeClosuresPerformance() below matches every
// closure against every call on file (O(closures × allRows), with 2-3x
// that for each unmatched one) — and closures are append-only, so this
// cost only ever grows. It used to redo that full scan from scratch on
// every single call (e.g. just re-opening the By Handler tab, or a month
// nav click, with nothing having actually changed). Now memoized against a
// cheap signature of "what closures exist" + "which allRows snapshot this
// is" — see computeClosuresPerformance() for how the signature is built.
let _closuresPerfCache = null;
let _closuresPerfCacheSig = null;
// Bumped every time state.closureManualMatches changes (loadClosureManualMatches/
// saveClosureManualMatch) — included in computeClosuresPerformance()'s cache
// signature above/below, since a manual match can flip a closure's match
// result without state.closures or allRows themselves changing at all.
let _closureManualMatchesVersion = 0;
// Same reasoning as _closureManualMatchesVersion just above — a saved/
// removed Company alias can also flip a closure's match result (fuzzy
// company matching checks aliases first) without state.closures or
// allRows changing at all, so it needs its own cache-busting signal too.
let _companyAliasesVersion = 0;
async function fetchAllRowsAcrossDates(forceRefresh){
  const CACHE_MS = 60000; // 1 minute — long enough to cover both scans running back-to-back, short enough to stay fresh
  if(!forceRefresh && _allRowsAcrossDatesCache && (Date.now() - _allRowsAcrossDatesCacheAt) < CACHE_MS){
    return _allRowsAcrossDatesCache;
  }
  // DIAGNOSTIC (2026-10-02): "search not working, no records" reports from
  // Closures kept coming back even after the force-refresh fix, while every
  // OTHER cross-date feature (Stuck Pipeline, Company Scorecard, WOI Aging)
  // kept working fine on the same data — meaning something specific to
  // this call's path was quietly swallowing an error rather than this
  // function itself being broken in general. Every catch below now also
  // records into _allRowsAcrossDatesDebug (module-level, read by the
  // Closures picker's "no records" state) instead of just discarding the
  // error, so a real production failure is visible on-screen instead of
  // disappearing into an empty array with no trace.
  const debug = { datesApiError: null, dateFetchErrors: 0, datesAttempted: 0, at: Date.now(), batched: false };

  // PERF (2026-10-02): this used to always fetch the `dates` list and then
  // fire one apiCall('calls', {qs:'date='+d}) PER saved date, all in
  // parallel via Promise.all — correct, but every one of those requests
  // opens its own fresh database connection (api-data.js's getConnection()
  // deliberately never pools — see its comment on why), so a single "scan
  // everything" action could briefly open dozens of simultaneous
  // connections once history grows to months/years of dates. A new
  // `all_calls` endpoint now does the whole scan in ONE request / ONE
  // connection instead. Falls through to the old per-date fan-out below if
  // the batch endpoint fails for any reason (including a half-deployed
  // backend that doesn't have it yet) — so this can only ever get slower,
  // never actually break, if something goes wrong with the new path.
  if(API_BASE_URL){
    try{
      const data = await apiCall('all_calls', {});
      let allRows = (data.rows || []).slice();
      // Today's in-memory state.rows may hold edits not yet saved to the
      // database — same "today's live state wins" rule the old per-date
      // loop applied via `if(d === state.date) return state.rows;`.
      allRows = allRows.filter(r => r._date !== state.date);
      (state.rows || []).forEach(row => allRows.push(Object.assign({}, row, { _date: state.date })));
      debug.batched = true;
      debug.datesAttempted = new Set(allRows.map(r=>r._date)).size;
      debug.rowsReturned = allRows.length;
      _allRowsAcrossDatesDebug = debug;
      _allRowsAcrossDatesCache = allRows;
      _allRowsAcrossDatesCacheAt = Date.now();
      return allRows;
    }catch(e){
      debug.datesApiError = 'Batch fetch failed, falling back to per-date: ' + String(e && e.message || e);
      // fall through to the per-date path below
    }
  }

  let dates = [];
  if(API_BASE_URL){
    try{
      const data = await apiCall('dates', {});
      dates = data.dates || [];
    }catch(e){ dates = []; debug.datesApiError = String(e && e.message || e); }
  } else {
    try{
      const idx = await storageAdapter.get('known-dates', false);
      dates = idx && idx.value ? JSON.parse(idx.value) : [];
    }catch(e){ dates = []; debug.datesApiError = String(e && e.message || e); }
  }
  if(!dates.includes(state.date)) dates.push(state.date);
  debug.datesAttempted = dates.length;

  // Fetches every date IN PARALLEL instead of one at a time — with many
  // saved dates, sequential fetching could take many seconds, and any date
  // that happened to be slow risked the whole scan feeling stuck or a
  // single date silently dropping out.
  const perDateResults = await Promise.all(dates.map(async d=>{
    if(d === state.date) return state.rows;
    if(API_BASE_URL){
      try{
        const data = await apiCall('calls', {qs:'date='+d});
        return data.rows || [];
      }catch(e){ debug.dateFetchErrors++; return []; }
    }
    try{
      const r = await storageAdapter.get('day:'+d, false);
      const parsed = r && r.value ? JSON.parse(r.value) : null;
      return Array.isArray(parsed) ? parsed : (parsed && parsed.rows) || [];
    }catch(e){ debug.dateFetchErrors++; return []; }
  }));

  const allRows = [];
  dates.forEach((d, i)=>{
    (perDateResults[i]||[]).forEach(row => allRows.push(Object.assign({}, row, { _date: d })));
  });
  debug.rowsReturned = allRows.length;
  _allRowsAcrossDatesDebug = debug;
  _allRowsAcrossDatesCache = allRows;
  _allRowsAcrossDatesCacheAt = Date.now();
  return allRows;
}

async function scanForRepeatCandidates(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const byCandidate = {}; // normalized name -> [{date, round, time}]
  allRows.forEach(row=>{
    if(!row.candidate) return;
    const key = row.candidate.trim().toLowerCase();
    byCandidate[key] = byCandidate[key] || [];
    byCandidate[key].push({date: row._date, round: row.round, time: row.time, candidate: row.candidate, assignee: row.assignee, company: row.company, status: row.status, statusFields: row.statusFields});
  });

  const results = [];
  Object.values(byCandidate).forEach(occ=>{
    const uniqueDates = new Set(occ.map(o=>o.date));
    if(uniqueDates.size > 1){
      // Most recent first, both within each candidate's history AND across
      // the whole list — otherwise a candidate with a call TODAY could sit
      // buried under alphabetically-earlier names instead of showing first.
      occ.sort((a,b)=> b.date.localeCompare(a.date));
      results.push({ candidate: occ[0].candidate, occurrences: occ });
    }
  });
  results.sort((a,b)=> b.occurrences[0].date.localeCompare(a.occurrences[0].date));
  return results;
}

// Same client showing up for 2nd round & above more than once, across ANY
// dates (not just today) — flagged separately from the plain "repeat client
// today" check, since this specifically matters for advanced-round handling
// continuity (e.g. Motability showing up for two different candidates'
// 2nd rounds on different days).
async function scanRepeatClientsAdvancedRounds(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const byCompany = {};
  allRows.forEach(row=>{
    if(!row.company || !isAdvancedRound(row.round)) return;
    const key = normalizeCompanyKey(row.company);
    byCompany[key] = byCompany[key] || [];
    byCompany[key].push({date: row._date, round: row.round, time: row.time, candidate: row.candidate, assignee: row.assignee, company: row.company});
  });
  const results = [];
  Object.values(byCompany).forEach(occ=>{
    // Only a genuine match if it's more than one DIFFERENT candidate — a
    // single candidate progressing through their own 2nd round then 3rd
    // round at the same company is normal round progression, not a case of
    // "someone else went through this client before" (that's what the
    // Repeat Candidates tab is for). Clustered by exact name first, falling
    // back to sameCandidateFuzzyMatch (already scoped to this one
    // company via byCompany above) so a spelling/abbreviation variant of
    // the same candidate across two of their own rounds doesn't get
    // miscounted as two different people and trigger a false flag.
    const clusters = [];
    occ.forEach(o=>{
      const oKey = (o.candidate||'').trim().toLowerCase();
      let cluster = clusters.find(c => c.key === oKey) ||
        clusters.find(c => sameCandidateFuzzyMatch(c.key, o.candidate));
      if(cluster){ cluster.count++; } else { clusters.push({ key: oKey, count: 1 }); }
    });
    if(occ.length > 1 && clusters.length > 1){
      // Most recent date first — today's occurrence (like Reshma's) shows
      // before older ones, so the newest call is what you see immediately.
      occ.sort((a,b)=> b.date.localeCompare(a.date));
      results.push({ company: occ[0].company, occurrences: occ });
    }
  });
  // Same fix as the candidates scan above — sort the whole list by most
  // recent occurrence, not alphabetically by company name.
  results.sort((a,b)=> b.occurrences[0].date.localeCompare(a.occurrences[0].date));
  return results;
}

// Flat list of EVERY call ever tagged Rescheduled/Cancelled/Not Responded,
// across every saved date — one row per call, not grouped by candidate or
// client, so it's a plain "what happened, when, where" reference rather
// than a pattern-detection tool like the scans above.
async function scanAllReschedules(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const results = allRows
    .filter(r => r.status && ['rescheduled','cancelled','not_responded','no_invite'].includes(r.status))
    .map(r => ({ date: r._date, time: r.time, candidate: r.candidate, company: r.company, status: r.status, assignee: r.assignee, statusFields: r.statusFields }));
  results.sort((a,b)=> b.date.localeCompare(a.date) || String(b.time||'').localeCompare(String(a.time||'')));
  return results;
}
// Deliberately does NOT include 'no_invite' (added 2026-09-30, "call didn't
// happen because the invite/link never reached the candidate") — everything
// here is used to score client reliability (scanClientReliability) and flag
// a candidate's own repeat no-shows (findPriorRescheduleWarning), and an
// invite that never arrived is a coordination/technical failure, not the
// candidate or client being unreliable. It still shows up in the plain
// Rescheduled/Cancelled list views and the cross-date reschedule log above
// (scanAllReschedules) — just not counted as a "bad outcome" here.
const RESCHED_STATUSES = ['rescheduled','cancelled','not_responded'];
// One rollup per client, across every saved date: how many of their calls
// ended up Rescheduled/Cancelled/Not-Responded, as a rate rather than a flat
// list. Same underlying data as scanAllReschedules() above, just grouped by
// client and turned into a percentage instead of a chronological feed —
// meant to answer "should I think twice before committing a coordinator's
// slot to this client" rather than "what happened, when".
const CLIENT_RELIABILITY_MIN_CALLS = 4; // below this a rate isn't meaningful yet — 1 bad call out of 1 would show as "100%"
async function scanClientReliability(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const byCompany = {};
  allRows.forEach(row=>{
    if(!row.company || row.woi) return; // WOI rows aren't a committed scheduled slot yet
    const key = normalizeCompanyKey(row.company);
    if(!key) return;
    if(!byCompany[key]) byCompany[key] = { company: row.company, total: 0, bad: 0, breakdown: {rescheduled:0, cancelled:0, not_responded:0} };
    const c = byCompany[key];
    c.total++;
    // Client names get typed inconsistently across dates/coordinators —
    // keep whichever spelling is longest as the display label, since the
    // longer form is usually the fuller/more-correct one (matches the same
    // heuristic normalizeCompanyKey's own comment describes).
    if(row.company.length > c.company.length) c.company = row.company;
    if(row.status && RESCHED_STATUSES.includes(row.status)){
      c.bad++;
      c.breakdown[row.status]++;
    }
  });
  const results = Object.values(byCompany)
    .filter(c => c.total >= CLIENT_RELIABILITY_MIN_CALLS)
    .map(c => ({ ...c, rate: c.bad / c.total }))
    .sort((a,b)=> b.rate - a.rate || b.total - a.total);
  return results;
}
// Surfaces the same reliability signal the Client Reliability tab already
// computes, right on the row where a call is actually being assigned —
// looking it up separately used to mean opening a whole other tab before
// noticing a client reschedules constantly. Only flags companies already
// past scanClientReliability's own CLIENT_RELIABILITY_MIN_CALLS threshold
// (so a brand-new client with one bad call never shows as "unreliable"),
// and only once the rate is genuinely notable.
const COMPANY_RELIABILITY_FLAG_THRESHOLD = 0.3;
function findCompanyReliabilityFlag(company){
  if(!company || !state.clientReliabilityData) return null;
  const key = normalizeCompanyKey(company);
  if(!key) return null;
  const entry = state.clientReliabilityData.find(c => normalizeCompanyKey(c.company) === key);
  if(!entry || entry.rate < COMPANY_RELIABILITY_FLAG_THRESHOLD) return null;
  return entry;
}
// Closures (recorded job offers) don't carry a handler field of their own —
// they're keyed only by candidate/company/salary, from whatever closure
// message got pasted in. To answer "who's actually closing these", each
// closure is cross-referenced against every saved call record (candidate +
// company match, same idea as crossReferenceClosure() above) to recover the
// call's assignee. A team-level assignee (never an individual) can't be
// credited to any one person, so those — and any closure with no matching
// call at all — are counted separately rather than silently dropped.
// Checks a manual override (set via the "🔗 Match manually" flow in the
// Closures panel — see loadClosureManualMatches()/saveClosureManualMatch()
// below) before falling back to findClosureMatch()'s automatic matching.
// The override only ever stores the correct candidate/company SPELLING
// as it appears on a real call record (never a row id directly) — kept
// this way so it still works even if the underlying rows get re-fetched
// or slightly re-ordered, and so it degrades gracefully (falls through to
// automatic matching rather than silently crediting nothing) if that
// exact row is ever removed.
function findClosureMatchWithOverride(closure, allRows){
  const override = closure && closure.id != null ? state.closureManualMatches[closure.id] : null;
  if(override && override.candidate && override.company){
    const overrideCandKey = override.candidate.trim().toLowerCase();
    const overrideCompKey = normalizeCompanyKey(override.company);
    const row = allRows.find(r => (r.candidate||'').trim().toLowerCase() === overrideCandKey && normalizeCompanyKey(r.company) === overrideCompKey);
    if(row) return { row, matchType: 'manual' };
    // FIX (2026-09-28): a manual match confirmed against a Portal-only
    // record (see getClosureMatchCandidateList()) has no Coverage Desk row
    // to find here — the saved override still only ever stores the plain
    // candidate/company spelling (no schema change needed), so it's
    // resolved live against state.portalAssignments the same way, instead
    // of needing its own separate storage. Re-derived fresh every time
    // rather than frozen at save-time, same reasoning as the staleness fix
    // above — if a later, better sync updates who the Portal shows as the
    // handler, this picks that up automatically.
    const portalRow = (state.portalAssignments||[]).find(p => (p.candidate||'').trim().toLowerCase() === overrideCandKey && normalizeCompanyKey(p.client) === overrideCompKey);
    if(portalRow){
      return { row: {
        candidate: portalRow.candidate, company: portalRow.client||'',
        assignee: portalRow.handler||portalRow.assignee||'', drivingPerson: '',
        _date: portalRow.dateKey||'', time: portalRow.time||'', _portalOnly: true,
      }, matchType: 'manualPortal' };
    }
  }
  return findClosureMatch(closure.candidate, closure.company, allRows);
}
// A handful of plausible call records to offer in the "🔗 Match manually"
// picker for a closure that couldn't be auto-matched — anything sharing a
// first-name token with the closure's candidate, OR at a fuzzily-matching
// company, so a genuinely different spelling still shows up as an option
// to pick from by hand. Capped at 8 and sorted most-recent-first; this is
// just a shortlist for a human to choose from, so it's deliberately more
// permissive than the automatic matchers above — nothing here is ever
// applied without an explicit click.
function findClosureMatchSuggestions(closure, allRows){
  const candFirst = (closure.candidate||'').trim().toLowerCase().split(/\s+/)[0] || '';
  const dedupeKey = r => r.candidate.trim().toLowerCase() + '|' + normalizeCompanyKey(r.company) + '|' + (r._date||'');
  const seen = new Set();
  const likely = [];
  allRows.forEach(r=>{
    if(!r.candidate) return;
    const key = dedupeKey(r);
    if(seen.has(key)) return;
    const companyLikely = fuzzyCompanyKeyMatch(r.company, closure.company) || normalizeCompanyKey(r.company).includes(normalizeCompanyKey(closure.company)) || normalizeCompanyKey(closure.company).includes(normalizeCompanyKey(r.company));
    const nameLikely = candFirst && r.candidate.trim().toLowerCase().split(/\s+/)[0] === candFirst;
    if(!companyLikely && !nameLikely) return;
    seen.add(key);
    likely.push(r);
  });
  likely.sort((a,b)=> (b._date||'').localeCompare(a._date||''));
  // FIX (2026-09-27): the picker used to show NOTHING at all whenever the
  // spelling drift was too large even for this loose heuristic — reported
  // as "no sign of records." Since this list is only ever a human-picked
  // shortlist (nothing here is ever applied automatically), it's safe to
  // pad it out with the most recent calls overall once the "likely" pool
  // runs short, rather than leaving a genuinely unmatched closure with no
  // way to be matched by hand at all.
  if(likely.length < 8){
    allRows
      .filter(r=>{
        if(!r.candidate) return false;
        const key = dedupeKey(r);
        if(seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a,b)=> (b._date||'').localeCompare(a._date||''))
      .slice(0, 8 - likely.length)
      .forEach(r=>likely.push(Object.assign({_fallback:true}, r)));
  }
  return likely.slice(0, 8);
}
// Shared between rendering the manual-match picker and resolving what was
// actually picked on Confirm, so both sides always agree on what option N
// in the <select> refers to. When state.closureMatchSearch has ≥2 chars,
// searches every call record on file by candidate/company substring
// (added 2026-09-27, after the pre-computed 8-suggestion shortlist alone
// still wasn't enough to reach some real records); otherwise falls back to
// the normal pre-computed suggestions for that closure.
function getClosureMatchCandidateList(closureId){
  const detail = (state.closuresPerformance && state.closuresPerformance.unmatchedDetails || []).find(d=>d.closure.id === closureId);
  if(!detail) return { list: [], searching: false };
  const q = (state.closureMatchSearch||'').trim().toLowerCase();
  const closureCandKey = (detail.closure.candidate||'').trim().toLowerCase();
  if(q.length >= 2){
    const allRows = (state.closuresPerformance && state.closuresPerformance.allRowsSnapshot) || [];
    // FIX (2026-09-27): searching by company text (e.g. "your golf" for
    // "Your Golf Travel") surfaces every call at that company — including
    // OTHER candidates' calls, which is exactly right when the person is
    // trying to find a call under a spelling variant, but reported as
    // confusing when a same-company-different-person result ranked above,
    // or looked identical to, the person they were actually searching for
    // ("this call is related to Reshma but... Srirama Dasu is appearing").
    // Same-candidate matches now always sort first, and every option is
    // tagged so a same-company-but-different-person result can't be
    // mistaken for the person being searched for.
    const coverageDeskList = allRows
      .filter(r=>r.candidate && (r.candidate.toLowerCase().includes(q) || (r.company||'').toLowerCase().includes(q)))
      .map(r=>({ ...r, _sameCandidate: closureCandKey && r.candidate.trim().toLowerCase() === closureCandKey }));
    // FIX (2026-09-28): "take portal data here if we not found proper
    // record in coverage desk" — sometimes the real call was never entered
    // into Coverage Desk's own board at all (or predates it), but it DOES
    // exist in the separate Interview Portal system that gets synced in via
    // 📡 Team Sync. Once a sync has been run this session (state.
    // portalAssignments), those records are searched too, as a genuinely
    // separate, clearly-labeled source — never silently merged with real
    // Coverage Desk rows, since a Portal-only record has no Coverage Desk
    // row backing it (see findClosureMatchWithOverride() for how picking
    // one of these still gets credited correctly).
    const cdKeys = new Set(coverageDeskList.map(r => r.candidate.trim().toLowerCase() + '|' + normalizeCompanyKey(r.company)));
    const portalList = (state.portalAssignments||[])
      .filter(p => p.candidate && ((p.candidate||'').toLowerCase().includes(q) || (p.client||'').toLowerCase().includes(q)))
      .map(p => ({
        candidate: p.candidate, company: p.client||'', assignee: p.handler||p.assignee||'',
        _date: p.dateKey||'', time: p.time||'',
        _sameCandidate: closureCandKey && p.candidate.trim().toLowerCase() === closureCandKey,
        _portalOnly: true,
      }))
      .filter(p => !cdKeys.has(p.candidate.trim().toLowerCase() + '|' + normalizeCompanyKey(p.company))); // already found as a real Coverage Desk row — don't show it twice
    const list = coverageDeskList.concat(portalList)
      .sort((a,b)=> (b._sameCandidate - a._sameCandidate) || (b._date||'').localeCompare(a._date||''))
      .slice(0, 30);
    return { list, searching: true, portalSearched: !!(state.portalAssignments && state.portalAssignments.length) };
  }
  return { list: detail.suggestions || [], searching: false };
}
// Same idea as getClosureMatchCandidateList() above, but for the closure
// REVIEW screen (before anything is saved) instead of the post-save
// "Unmatched closures" list — added 2026-10-02 so a closure that doesn't
// auto-match can be pointed at the right call record right there, rather
// than having to save it unmatched first and come back later to fix it.
// Keyed by the review item's index (it has no id yet, since it isn't saved)
// rather than a closure id, and reads from state.closureReviewAllRows
// (cached once per paste by the parse handler) instead of
// state.closuresPerformance, since that performance scan only exists for
// already-saved closures. Deliberately Coverage-Desk-only, not Portal —
// Portal-only matches stay a post-save-only option (findClosureMatchWithOverride's
// 'manualPortal' type needs a saved closure id to attach to).
function getReviewMatchCandidateList(idx){
  const item = state.closureReview && state.closureReview[idx];
  if(!item) return { list: [], searching: false };
  const allRows = state.closureReviewAllRows || [];
  const q = (state.closureReviewMatchSearch||'').trim().toLowerCase();
  const itemCandKey = (item.candidate||'').trim().toLowerCase();
  if(q.length >= 2){
    const list = allRows
      .filter(r=>r.candidate && (r.candidate.toLowerCase().includes(q) || (r.company||'').toLowerCase().includes(q)))
      .map(r=>({ ...r, _sameCandidate: itemCandKey && r.candidate.trim().toLowerCase() === itemCandKey }))
      .sort((a,b)=> (b._sameCandidate - a._sameCandidate) || (b._date||'').localeCompare(a._date||''))
      .slice(0, 30);
    return { list, searching: true };
  }
  return { list: findClosureMatchSuggestions(item, allRows), searching: false };
}
// Round-by-round timeline for one closure — "when did Round 1 happen, when
// did Round 2 happen, when did Round 3 happen" — requested 2026-09-27.
// Reuses the same candidate + fuzzy-company-match discipline as
// findClosureMatchSuggestions(), reading from the same cross-date call
// cache used everywhere else in the file (_allRowsAcrossDatesCache) rather
// than triggering its own async fetch, so it can be called synchronously
// from inside render().
function buildClosureRoundTimeline(candidate, company){
  const candKey = (candidate||'').trim().toLowerCase();
  if(!candKey) return [];
  const allRows = _allRowsAcrossDatesCache || [];
  const matches = allRows.filter(r=>{
    if(!r.candidate || r.candidate.trim().toLowerCase() !== candKey) return false;
    return fuzzyCompanyKeyMatch(r.company, company) || normalizeCompanyKey(r.company) === normalizeCompanyKey(company);
  });
  const seen = new Set();
  const entries = [];
  matches.forEach(r=>{
    const key = (r.round||'') + '|' + (r._date||'') + '|' + (r.time||'');
    if(seen.has(key)) return;
    seen.add(key);
    entries.push({ round: r.round || '1st Round', date: r._date || '', time: r.time || '' });
  });
  // Chronological order is what actually answers "when did round 2 happen
  // relative to round 1" — sorting by the round label's text would not,
  // since it's a free-typed string ("2nd Round", "2ns Round", etc.), not a
  // reliable number.
  entries.sort((a,b)=> (a.date||'').localeCompare(b.date||'') || (a.time||'').localeCompare(b.time||''));
  return entries;
}
async function computeClosuresPerformance(forceRefresh){
  if(!state.closuresLoaded) await loadClosures();
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  // PERF (2026-10-02): the actual closure↔call matching below is the
  // expensive part (O(closures × allRows)), not the fetch above (already
  // cached by fetchAllRowsAcrossDates). Signature is cheap to build —
  // closure count + last closure's id/createdAt (catches additions,
  // deletions, and edits-that-change-order) + allRows's own count and the
  // timestamp of whichever fetch produced it (catches a real data
  // refresh). If nothing meaningful changed since the last computation,
  // skip the O(closures × allRows) work entirely and return that result.
  const lastClosure = (state.closures && state.closures[state.closures.length-1]) || null;
  const sig = (state.closures||[]).length + ':' + (lastClosure ? lastClosure.id + '|' + (lastClosure.createdAt||'') : '') + '::' + allRows.length + ':' + _allRowsAcrossDatesCacheAt + ':' + _closureManualMatchesVersion + ':' + _companyAliasesVersion + ':' + (state.roster||[]).length;
  if(_closuresPerfCache && _closuresPerfCacheSig === sig){
    return _closuresPerfCache;
  }
  const teamNames = new Set(state.roster.map(p=>p.team));
  function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  }
  const byHandler = {};
  let unmatchedCount = 0;
  let teamOnlyCount = 0;
  let noAssigneeCount = 0;
  const unmatchedDetails = [];
  const noAssigneeDetails = [];
  const teamOnlyDetails = [];
  (state.closures || []).forEach(c=>{
    if(!c.candidate || !c.company){ unmatchedCount++; return; }
    const found = findClosureMatchWithOverride(c, allRows);
    const match = found ? found.row : null;
    if(!match){
      unmatchedCount++;
      const reasonDetail = crossReferenceClosure(c.candidate, c.company, allRows);
      unmatchedDetails.push({
        closure: c,
        reason: reasonDetail.message,
        reasonDetail,
        suggestions: findClosureMatchSuggestions(c, allRows),
      });
      return;
    }
    // FIX (2026-09-27): "most of the times calls will be assigned to
    // persons or driving person also" — Driving Person is who actually ran
    // the call and is frequently the only individual name on the record
    // (Assigned To is often just the team, or blank); crediting only
    // `assignee` meant plenty of genuinely-handled closures fell into the
    // no-handler bucket below even though the real handler was sitting
    // right there in Driving Person. Same drivingPerson-first precedence
    // computePersonCallCounts() already uses elsewhere in this file.
    const handler = match.drivingPerson || match.assignee;
    if(!handler){
      // A closure IS matched here — either automatically or via a manual
      // override the person already picked and saved — but the call
      // record it matched to has neither a driving person nor an assignee,
      // so there's no handler to credit. This used to be lumped in with
      // "couldn't be matched at all" and kept reappearing in the Unmatched
      // closures/manual-match list even right after a manual match was
      // successfully saved — reported as "i saved it but... still it is
      // visible in manual area." A resolved match (nothing more to pick)
      // is a different situation from a still-unresolved one, so it gets
      // its own bucket and is no longer shown as needing a match.
      noAssigneeCount++;
      // FIX (2026-09-29): "some calls gets after first round only" — a
      // closure this recent almost always has real Portal sync data behind
      // it (who the Portal shows as handling that exact call), but nothing
      // in the app ever surfaced that here — the per-row 📡 badge only
      // shows on whatever date is currently open on the board, and the
      // auto-fill-on-sync only ever touches 1st Round calls on the CURRENT
      // date too, so a closure pointing at a past date's row (any round)
      // never got the benefit of either. Recorded here so the UI can offer
      // a one-click "apply the Portal's driving person" action instead of
      // making the person navigate to that exact historical date to fix it
      // by hand.
      noAssigneeDetails.push({ closure: c, match });
      return;
    }
    if(teamNames.has(handler)){
      teamOnlyCount++;
      // FIX (2026-09-29): same situation as noAssigneeDetails above, just
      // one step further along — this call already has a Driving
      // Person/Assignee, it's just a TEAM name rather than a person, so
      // still no individual to credit. Recorded the same way so the "📡
      // Apply" action (see renderNoAssigneeClosuresHtml/the shared
      // [data-apply-portal-driving] handler) can offer to fill in the real
      // person's name from Portal here too — it overrides the team-level
      // value the same way it fills a blank one.
      teamOnlyDetails.push({ closure: c, match, team: handler });
      return;
    }
    if(!byHandler[handler]) byHandler[handler] = { handler, team: teamOf(handler) || '', closures: 0, records: [] };
    byHandler[handler].closures++;
    // Kept alongside the count so the "By Handler" list can show exactly
    // which closures make up that number (on hover), not just the total —
    // requested 2026-09-26 after the count alone left no way to see the
    // actual records behind it.
    byHandler[handler].records.push({ candidate: c.candidate, company: c.company, salary: c.salary || '', createdAt: c.createdAt || null });
  });
  const rows = Object.values(byHandler).sort((a,b)=> b.closures - a.closures);
  // Kept so the manual-match picker's search box (added 2026-09-27) can
  // filter across every call record on file, not just the up-to-8
  // pre-computed suggestions — a real record that didn't make the
  // suggestion shortlist is still just a search away instead of unreachable.
  const result = { rows, unmatchedCount, teamOnlyCount, noAssigneeCount, totalClosures: (state.closures||[]).length, unmatchedDetails, noAssigneeDetails, teamOnlyDetails, allRowsSnapshot: allRows };
  _closuresPerfCache = result;
  _closuresPerfCacheSig = sig;
  return result;
}
// ---------- Weekly/monthly Closures summary (added 2026-09-29) ----------
// One consolidated view of who closed what and total credit per period,
// instead of assembling it by hand from By Handler (all-time only) +
// Incentives (this month only, $ not counts) + Data Health (issues, no
// period breakdown) separately — the last item from the "so much process
// going on... what do you suggest" shortlist. Deliberately reuses the
// exact same computeClosuresPerformance() result the By Handler tab
// already computed (records-per-handler plus the three "still needs
// fixing" buckets) rather than re-scanning or re-matching anything — this
// is purely a different grouping of that same result, so it can never
// disagree with what By Handler shows for the same data.
function startOfWeekMonday(d){
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? -6 : 1) - day; // shift back to Monday
  date.setDate(date.getDate() + diff);
  return date;
}
function closuresPeriodKeyFor(dateVal, periodType){
  const d = dateVal instanceof Date ? dateVal : new Date(dateVal);
  if(periodType === 'week'){
    const start = startOfWeekMonday(d);
    const end = new Date(start); end.setDate(end.getDate() + 6);
    const key = start.getFullYear() + '-' + String(start.getMonth()).padStart(2,'0') + '-' + String(start.getDate()).padStart(2,'0');
    const label = `${start.toLocaleDateString('en-US',{month:'short',day:'numeric'})} – ${end.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}`;
    return { key, label, sortKey: start.getTime() };
  }
  const key = d.getFullYear() + '-' + String(d.getMonth()).padStart(2,'0');
  const label = d.toLocaleString('en-US',{month:'long',year:'numeric'});
  return { key, label, sortKey: d.getFullYear()*12 + d.getMonth() };
}
// Buckets `perf` (a computeClosuresPerformance() result) into periods.
// Each period tracks: total closures recorded, a per-handler count map
// (from the already-credited records), and stuckCount — closures that
// landed in perf's unmatched/no-assignee/team-only buckets for that same
// period, i.e. still need attention rather than being real, done credit.
function computeClosuresPeriodSummary(perf, periodType){
  if(!perf || !perf.rows) return [];
  const periods = {};
  // FIX (2026-09-29): a closure with no `createdAt` at all (older records
  // imported before that field existed, same case the List tab's own
  // "Undated" group already handles) used to just vanish from this bucket
  // function entirely — `bucket()` returned null and the closure was
  // silently skipped, which meant a real database full of closures could
  // legitimately show the Summary tab's empty state ("Nothing recorded
  // yet") if enough of them predated createdAt being recorded. Every
  // closure now lands somewhere: a genuinely missing/unparseable date goes
  // into its own "Undated" period instead of disappearing.
  function bucket(dateVal){
    if(!dateVal){
      if(!periods['undated']) periods['undated'] = { key: 'undated', label: 'Undated', sortKey: -Infinity, total: 0, byHandler: {}, stuckCount: 0 };
      return periods['undated'];
    }
    const parsed = new Date(dateVal);
    if(isNaN(parsed.getTime())){
      if(!periods['undated']) periods['undated'] = { key: 'undated', label: 'Undated', sortKey: -Infinity, total: 0, byHandler: {}, stuckCount: 0 };
      return periods['undated'];
    }
    const info = closuresPeriodKeyFor(parsed, periodType);
    if(!periods[info.key]) periods[info.key] = { key: info.key, label: info.label, sortKey: info.sortKey, total: 0, byHandler: {}, stuckCount: 0 };
    return periods[info.key];
  }
  (perf.rows || []).forEach(r=>{
    (r.records || []).forEach(rec=>{
      const p = bucket(rec.createdAt);
      if(!p) return;
      p.total++;
      p.byHandler[r.handler] = (p.byHandler[r.handler] || 0) + 1;
    });
  });
  [...(perf.unmatchedDetails||[]), ...(perf.noAssigneeDetails||[]), ...(perf.teamOnlyDetails||[])].forEach(d=>{
    const p = bucket(d.closure && d.closure.createdAt);
    if(!p) return;
    p.total++;
    p.stuckCount++;
  });
  return Object.values(periods).sort((a,b)=> b.sortKey - a.sortKey);
}
function renderClosuresSummaryHtml(){
  const perf = state.closuresPerformance;
  if(!perf || perf.loading){
    return `<div class="hint">${perf && perf.loading ? '<span class="spinner"></span>Cross-referencing closures against call records…' : 'Loading…'}</div>`;
  }
  if(perf.error) return `<div class="hint" style="color:var(--coral)">⚠ ${escapeHtml(perf.error)}</div>`;
  const periodType = state.closuresSummaryPeriod || 'month';
  const periods = computeClosuresPeriodSummary(perf, periodType);
  const toggle = `<div class="notif-tabs" style="margin-bottom:10px">
    <button class="notif-tab-btn ${periodType==='month'?'active':''}" data-closuressummaryperiod="month">Monthly</button>
    <button class="notif-tab-btn ${periodType==='week'?'active':''}" data-closuressummaryperiod="week">Weekly</button>
  </div>`;
  if(!periods.length){
    return toggle + `<div class="hint">Nothing recorded yet — paste a message in 📋 All Closures to add one.</div>`;
  }
  const MAX_HANDLERS = 6;
  const cardsHtml = periods.map(p=>{
    const handlerEntries = Object.entries(p.byHandler).sort((a,b)=> b[1]-a[1]);
    const shown = handlerEntries.slice(0, MAX_HANDLERS);
    const extra = handlerEntries.length - shown.length;
    const handlersHtml = shown.length
      ? shown.map(([name,count])=> `<span class="notif-chip">${escapeHtml(name)}: ${count}</span>`).join(' ') + (extra > 0 ? ` <span class="hint" style="font-size:11px">+${extra} more</span>` : '')
      : `<span class="hint" style="font-size:11px">No credited closures yet</span>`;
    return `<div style="margin-bottom:14px;padding:10px 12px;border:1px solid var(--border);border-radius:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:6px">
        <div style="font-weight:700;font-size:13px">${escapeHtml(p.label)}</div>
        <div class="mini-badge">${p.total} total</div>
      </div>
      <div style="margin-bottom:${p.stuckCount?'6px':'0'}">${handlersHtml}</div>
      ${p.stuckCount ? `<div class="hint" style="color:var(--amber);font-size:11px">⚠ ${p.stuckCount} not yet credited to anyone (unmatched, team-only, or no handler) — see 🏆 By Handler for the fix-it list.</div>` : ''}
    </div>`;
  }).join('');
  return toggle + cardsHtml;
}
// ---------- Small self-contained SVG chart helpers (2026-09-24, pipeline-
// visibility batch) — no external chart library (nothing on the CDN
// allowlist is guaranteed to actually load, see the Incentives-export XLSX
// note elsewhere), just plain inline SVG so a trend is a real visual shape
// instead of a table of numbers someone has to scan line-by-line. ----------
// A single-series line chart. `points` is [{label, value}], oldest first.
function svgLineChart(points, opts){
  opts = opts || {};
  const width = opts.width || 560, height = opts.height || 130;
  const padL = 34, padR = 14, padT = 14, padB = 22;
  const color = opts.color || 'var(--teal)';
  const valueSuffix = opts.valueSuffix || '';
  if(!points || !points.length){
    return `<div class="hint" style="padding:20px;text-align:center">Not enough data yet for a chart.</div>`;
  }
  const values = points.map(p=>p.value);
  const maxV = Math.max(...values, 1);
  const minV = Math.min(0, ...values);
  const range = (maxV - minV) || 1;
  const innerW = width - padL - padR, innerH = height - padT - padB;
  const n = points.length;
  const xAt = i => n > 1 ? padL + (i/(n-1))*innerW : padL + innerW/2;
  const yAt = v => padT + innerH - ((v - minV)/range)*innerH;
  const plotted = points.map((p,i)=>({ x: xAt(i), y: yAt(p.value), ...p }));
  const pathD = plotted.map((p,i)=> (i===0?'M':'L') + p.x.toFixed(1) + ',' + p.y.toFixed(1)).join(' ');
  const areaD = pathD + ` L${plotted[plotted.length-1].x.toFixed(1)},${(padT+innerH).toFixed(1)} L${plotted[0].x.toFixed(1)},${(padT+innerH).toFixed(1)} Z`;
  const dots = plotted.map(p=>`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="3.5" fill="${color}" stroke="var(--surface)" stroke-width="1.5"><title>${escapeHtml(p.label)}: ${escapeHtml(String(p.value))}${valueSuffix}</title></circle>`).join('');
  const labelStep = n > 8 ? Math.ceil(n/8) : 1;
  const xLabels = plotted.filter((p,i)=> i%labelStep===0 || i===n-1).map(p=>
    `<text x="${p.x.toFixed(1)}" y="${height-4}" font-size="9.5" fill="var(--text-faint)" text-anchor="middle">${escapeHtml(p.label)}</text>`
  ).join('');
  const maxLabel = `<text x="${padL-4}" y="${(padT+6).toFixed(1)}" font-size="9.5" fill="var(--text-faint)" text-anchor="end">${escapeHtml(String(maxV))}${valueSuffix}</text>`;
  const zeroY = yAt(0);
  return `<svg viewBox="0 0 ${width} ${height}" style="width:100%;height:${height}px;display:block" preserveAspectRatio="none">
    <line x1="${padL}" y1="${zeroY.toFixed(1)}" x2="${width-padR}" y2="${zeroY.toFixed(1)}" stroke="var(--border)" stroke-width="1"/>
    <path d="${areaD}" fill="${color}" opacity="0.08" stroke="none"/>
    <path d="${pathD}" fill="none" stroke="${color}" stroke-width="2"/>
    ${dots}
    ${maxLabel}
    ${xLabels}
  </svg>`;
}
// A grouped two-series horizontal bar chart — one pair of bars per label,
// e.g. "last week" vs "this week" per team.
function svgGroupedBarChart(rows, opts){
  opts = opts || {};
  const colorA = opts.colorA || 'var(--text-faint)', colorB = opts.colorB || 'var(--teal)';
  const labelA = opts.labelA || 'Previous', labelB = opts.labelB || 'Current';
  if(!rows || !rows.length){
    return `<div class="hint" style="padding:20px;text-align:center">No data yet.</div>`;
  }
  const max = Math.max(1, ...rows.map(r=> Math.max(r.a||0, r.b||0)));
  const barsHtml = rows.map(r=>{
    const pctA = Math.round(((r.a||0)/max)*100), pctB = Math.round(((r.b||0)/max)*100);
    return `<div style="margin-bottom:12px">
      <div style="font-size:12.5px;font-weight:600;margin-bottom:4px">${escapeHtml(r.label)}</div>
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">
        <div style="width:70px;font-size:10.5px;color:var(--text-faint);flex-shrink:0">${escapeHtml(labelA)}</div>
        <div style="flex:1;background:var(--surface-2);border-radius:4px;height:9px;overflow:hidden"><div style="width:${pctA}%;height:100%;background:${colorA}"></div></div>
        <div style="width:28px;text-align:right;font-size:11px;flex-shrink:0">${r.a||0}</div>
      </div>
      <div style="display:flex;align-items:center;gap:6px">
        <div style="width:70px;font-size:10.5px;color:var(--text-faint);flex-shrink:0">${escapeHtml(labelB)}</div>
        <div style="flex:1;background:var(--surface-2);border-radius:4px;height:9px;overflow:hidden"><div style="width:${pctB}%;height:100%;background:${colorB}"></div></div>
        <div style="width:28px;text-align:right;font-size:11px;flex-shrink:0">${r.b||0}</div>
      </div>
    </div>`;
  }).join('');
  return `<div>${barsHtml}</div>`;
}
// Monday-anchored week key for bucketing calls into weeks. Dates are stored
// as plain YYYY-MM-DD calendar-date strings (no time component), so this
// works entirely in UTC-space (Date.UTC in, getUTCDay/setUTCDate/toISOString
// out) rather than parsing as local midnight — parsing as local midnight
// and then calling toISOString() rolls the date back a day for anyone in a
// UTC+ timezone (IST included), since local midnight is still "yesterday"
// in UTC. Staying in UTC the whole way through avoids that entirely.
function weekStartDateKey(dateStr){
  const parts = (dateStr||'').split('-').map(Number);
  if(parts.length !== 3 || parts.some(n=>isNaN(n))) return dateStr;
  const [y,m,day] = parts;
  const d = new Date(Date.UTC(y, m-1, day));
  const dow = d.getUTCDay(); // 0=Sun..6=Sat
  const diff = (dow === 0 ? -6 : 1 - dow); // shift back to that week's Monday
  d.setUTCDate(d.getUTCDate() + diff);
  return d.toISOString().slice(0,10);
}
const TRENDS_MIN_HANDLER_CALLS = 5; // below this a per-handler rate is too noisy to mean anything
// Weekly rollups from data that's already tagged day-by-day today (status,
// round type) but never aggregated past a single date — call volume per
// week, reschedule rate per week, and which individual handler's calls get
// rescheduled most often (team-level assignments excluded — same
// exclusion computeWorkloadWarnings() above uses, since a team name isn't a
// person to hold accountable for a rate).
async function scanCallTrends(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const teamNames = new Set(state.roster.map(p=>p.team));
  function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  }
  const byWeek = {};
  // Per-team weekly volume, alongside the overall per-week rollup above —
  // feeds computePredictiveCapacityWarnings() below. Only rows with a
  // resolvable team (an actual assignee, not left blank) count, same as
  // the per-handler reschedule-rate breakdown just below.
  const byTeamWeek = {};
  allRows.forEach(row=>{
    if(!row._date || row.woi) return;
    const wk = weekStartDateKey(row._date);
    if(!byWeek[wk]) byWeek[wk] = { week: wk, total: 0, bad: 0, roundTypeCounts: {} };
    const w = byWeek[wk];
    w.total++;
    if(row.status && RESCHED_STATUSES.includes(row.status)) w.bad++;
    if(row.roundType) w.roundTypeCounts[row.roundType] = (w.roundTypeCounts[row.roundType]||0) + 1;
    const team = teamOf(row.assignee);
    if(team){
      byTeamWeek[team] = byTeamWeek[team] || {};
      byTeamWeek[team][wk] = (byTeamWeek[team][wk] || 0) + 1;
    }
  });
  const weeks = Object.values(byWeek).sort((a,b)=> a.week.localeCompare(b.week));
  const teamWeeks = {};
  Object.entries(byTeamWeek).forEach(([team, wkMap])=>{
    teamWeeks[team] = Object.entries(wkMap).map(([week,total])=>({week,total})).sort((a,b)=>a.week.localeCompare(b.week));
  });

  const handlerTotals = {}, handlerBad = {};
  allRows.forEach(row=>{
    if(!row.assignee || row.woi || teamNames.has(row.assignee)) return; // only individual assignments count
    handlerTotals[row.assignee] = (handlerTotals[row.assignee]||0) + 1;
    if(row.status && RESCHED_STATUSES.includes(row.status)) handlerBad[row.assignee] = (handlerBad[row.assignee]||0) + 1;
  });
  const handlerRates = Object.keys(handlerTotals)
    .filter(name => handlerTotals[name] >= TRENDS_MIN_HANDLER_CALLS)
    .map(name => ({ name, total: handlerTotals[name], bad: handlerBad[name]||0, rate: (handlerBad[name]||0) / handlerTotals[name] }))
    .sort((a,b)=> b.rate - a.rate);

  return { weeks, handlerRates, teamWeeks };
}
// Trend-only capacity warning — deliberately NOT based on any assumed
// "calls per person" ceiling (nothing in this app establishes what that
// ceiling should be, and inventing one would be a guess dressed up as a
// rule). Instead this only flags a team whose weekly volume has risen for
// 3 straight weeks in a row, paired with today's headcount for context, so
// a human can judge whether that's actually a problem — same "flag it,
// don't decide it" approach as computeWorkloadWarnings/computeCapacityRiskWarnings.
function computePredictiveCapacityWarnings(trendsData){
  if(!trendsData || !trendsData.teamWeeks) return [];
  const results = [];
  Object.entries(trendsData.teamWeeks).forEach(([team, weeks])=>{
    if(weeks.length < 3) return; // not enough history for a real trend
    const last3 = weeks.slice(-3);
    const risingEachWeek = last3[0].total < last3[1].total && last3[1].total < last3[2].total;
    if(!risingEachWeek) return;
    const growthPct = last3[0].total > 0 ? Math.round(((last3[2].total - last3[0].total) / last3[0].total) * 100) : null;
    const headcount = state.roster.filter(p=>p.team===team).length;
    results.push({ team, weeks: last3.map(w=>w.total), growthPct, headcount });
  });
  return results;
}
// WOI ("Waiting for Invite") rows have no scheduled time yet, so they're
// easy to lose track of once they've scrolled off the day they were first
// logged — this pulls every WOI row across every saved date and sorts by
// how long it's been waiting, oldest first, so nothing sits forgotten.
async function scanWoiAging(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const todayKey = todayStr();
  const daysBetween = (a,b)=>{
    const da = new Date(a+'T00:00:00Z').getTime();
    const db = new Date(b+'T00:00:00Z').getTime();
    return Math.max(0, Math.round((db-da)/86400000));
  };
  return allRows
    .filter(r => r.woi && r.candidate)
    .map(r => ({
      candidate: r.candidate,
      company: r.company || '',
      round: r.round || '',
      date: r._date || '',
      daysWaiting: r._date ? daysBetween(r._date, todayKey) : 0,
    }))
    .sort((a,b)=> a.date.localeCompare(b.date)); // oldest first
}
// Per-coordinator call count for the currently selected date — deliberately
// synchronous/instant (no cross-date fetch) since it's meant to be glanced
// at constantly, not run as a manual scan like the other Reports tools.
function computeAssigneeWorkloadToday(){
  const teamNames = new Set(state.roster.map(p=>p.team));
  const counts = {};
  state.rows.forEach(r=>{
    if(!r.assignee || r.woi || teamNames.has(r.assignee)) return; // individual assignments only, same exclusion used elsewhere
    counts[r.assignee] = (counts[r.assignee]||0) + 1;
  });
  return Object.entries(counts)
    .map(([name,count])=>({ name, count, team: (state.roster.find(p=>p.name===name)||{}).team || '' }))
    .sort((a,b)=> b.count - a.count);
}
// A weekly recap per team, built from the same trend + closure data the
// Trends and Closures tabs already compute — just re-shaped into one
// "how did this week go, per team" summary instead of requiring five
// different panels to piece it together.
async function scanWeeklyRecap(forceRefresh){
  const [trends, closuresPerf] = await Promise.all([
    scanCallTrends(forceRefresh),
    computeClosuresPerformance(forceRefresh),
  ]);
  const teamNames = state.roster.map(p=>p.team).filter((t,i,arr)=>arr.indexOf(t)===i);
  const handlerTeam = {};
  state.roster.forEach(p=>{ handlerTeam[p.name] = p.team; });
  const closuresByTeam = {};
  (closuresPerf.rows||[]).forEach(r=>{
    const team = r.team || handlerTeam[r.handler];
    if(!team) return;
    closuresByTeam[team] = (closuresByTeam[team]||0) + r.closures;
  });
  const teams = teamNames.map(team=>{
    const weeks = (trends.teamWeeks && trends.teamWeeks[team]) || [];
    const thisWeek = weeks.length ? weeks[weeks.length-1].total : 0;
    const lastWeek = weeks.length > 1 ? weeks[weeks.length-2].total : null;
    const changePct = (lastWeek !== null && lastWeek > 0) ? Math.round(((thisWeek-lastWeek)/lastWeek)*100) : null;
    return {
      team,
      callsThisWeek: thisWeek,
      callsLastWeek: lastWeek,
      changePct,
      closures: closuresByTeam[team] || 0,
      headcount: state.roster.filter(p=>p.team===team).length,
    };
  }).filter(t=>t.callsThisWeek>0 || t.closures>0);
  return { teams, generatedAt: new Date().toISOString() };
}
// ---------- Candidate profile timeline (2026-09-24, pipeline-visibility
// batch) ---------- A single candidate's full story — every call/round
// they've ever had, across every saved date, plus any closure recorded for
// them — currently lives split across the daily board, Search Everywhere,
// and Closures, connected only by name-matching under the hood. This pulls
// it all into one chronological read. Deliberately an EXACT (case/
// whitespace-insensitive) name match, not a fuzzy one: this is opened from
// an already-exact search result, so there's no ambiguity to resolve —
// fuzzy matching is for connecting two independently-typed records (see
// sameCandidateFuzzyMatch), not for widening a lookup that's already
// anchored to one specific name.
async function computeCandidateProfile(name, forceRefresh){
  const key = (name||'').trim().toLowerCase();
  if(!key) return { name: name||'', calls: [], closures: [] };
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const calls = allRows
    .filter(r => (r.candidate||'').trim().toLowerCase() === key)
    .slice()
    .sort((a,b)=> (a._date||'').localeCompare(b._date||'') || businessDayMinutes(a.time)-businessDayMinutes(b.time));
  const closureMatches = (state.closures||[])
    .filter(c => (c.candidate||'').trim().toLowerCase() === key)
    .slice()
    .sort((a,b)=> (a.createdAt||'').localeCompare(b.createdAt||''));
  return { name: calls[0] ? calls[0].candidate : (name||''), calls, closures: closureMatches };
}
// ---------- Conversion / funnel rate (2026-09-24, pipeline-visibility
// batch) ---------- Closures already shows a COUNT (how many closures, per
// handler/team). That answers "how much did we close" but not "of what we
// actually put into the pipeline, what fraction converts" — a very
// different, more useful number for judging whether a client or a team is
// actually converting well, not just producing raw volume. A "pipeline
// entry" here is one candidate at one company (their rounds at that
// company collapse into a single entry — three rounds for the same person
// at the same client is one shot at a closure, not three), matched to a
// closure the same way crossReferenceClosure() does (exact candidate name +
// normalized company). Deliberately exact-match only, same reasoning as
// computeCandidateProfile() above: this already has a real company anchor,
// so there's no ambiguity a fuzzy fallback would need to resolve.
const CONVERSION_MIN_COMPANY_ENTRIES = 3; // below this a company's rate is too small a sample to mean anything — same "don't fabricate a stat from noise" guard TRENDS_MIN_HANDLER_CALLS and the reliability tab already use
// Shared by computeConversionFunnel() and computeTimeToClose() below — both
// need the exact same "one candidate at one company is one pipeline entry,
// matched to a closure the same way crossReferenceClosure() does" logic,
// and duplicating it in two places would risk the two silently disagreeing
// on what counts as closed if one is ever edited without the other.
function buildPipelineEntries(allRows, teamOf){
  const pipelineMap = {};
  allRows.forEach(row=>{
    const candKey = (row.candidate||'').trim().toLowerCase();
    if(!candKey) return;
    const compKey = normalizeCompanyKey(row.company);
    const key = candKey + '|' + compKey;
    const existing = pipelineMap[key];
    if(!existing){
      pipelineMap[key] = {
        candidate: row.candidate, company: row.company || '',
        firstDate: row._date || '', latestDate: row._date || '',
        assignee: row.assignee || '', team: teamOf(row.assignee) || '',
        closed: false, closedAt: null,
      };
    } else {
      if(row._date && (!existing.firstDate || row._date < existing.firstDate)) existing.firstDate = row._date;
      if(row._date && (!existing.latestDate || row._date >= existing.latestDate)){
        existing.latestDate = row._date;
        existing.assignee = row.assignee || existing.assignee;
        existing.team = teamOf(row.assignee) || existing.team;
      }
    }
  });
  (state.closures||[]).forEach(c=>{
    if(!c.candidate || !c.company) return;
    // Uses the same shared matcher (plus manual-override support) as
    // computeClosuresPerformance() and crossReferenceClosure() — see
    // findClosureMatchWithOverride() — instead of requiring an exact
    // candidate+company key match here too, so a closure that's typed
    // slightly differently (or whose company is "Bimbo Bakeries" here vs.
    // "Bimbo Bakeries Inc" on the call) still marks the right pipeline
    // entry as closed instead of silently leaving it open.
    const found = findClosureMatchWithOverride(c, allRows);
    if(!found) return;
    const key = (found.row.candidate||'').trim().toLowerCase() + '|' + normalizeCompanyKey(found.row.company);
    if(pipelineMap[key]){ pipelineMap[key].closed = true; pipelineMap[key].closedAt = c.createdAt || null; }
  });
  return Object.values(pipelineMap);
}
function makeTeamOf(){
  const teamNames = new Set(state.roster.map(p=>p.team));
  return function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  };
}
async function computeConversionFunnel(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const entries = buildPipelineEntries(allRows, makeTeamOf());
  const total = entries.length;
  const closed = entries.filter(e=>e.closed).length;
  const overallRate = total ? Math.round((closed/total)*100) : 0;

  const byCompany = {};
  entries.forEach(e=>{
    if(!e.company) return;
    byCompany[e.company] = byCompany[e.company] || { company: e.company, total: 0, closed: 0 };
    byCompany[e.company].total++;
    if(e.closed) byCompany[e.company].closed++;
  });
  const companyRows = Object.values(byCompany)
    .filter(c=>c.total >= CONVERSION_MIN_COMPANY_ENTRIES)
    .map(c=>({ ...c, rate: c.total ? Math.round((c.closed/c.total)*100) : 0 }))
    .sort((a,b)=> b.rate - a.rate);

  const byTeam = {};
  entries.forEach(e=>{
    if(!e.team) return;
    byTeam[e.team] = byTeam[e.team] || { team: e.team, total: 0, closed: 0 };
    byTeam[e.team].total++;
    if(e.closed) byTeam[e.team].closed++;
  });
  const teamRows = Object.values(byTeam)
    .map(t=>({ ...t, rate: t.total ? Math.round((t.closed/t.total)*100) : 0 }))
    .sort((a,b)=> b.rate - a.rate);

  return { total, closed, overallRate, companyRows, teamRows };
}
// ---------- Time-to-close metric (2026-09-24, pipeline-visibility batch)
// ---------- How long does it actually take, from a candidate's first call
// to the closure being recorded? A single average without a spread would
// hide a lot (one very fast and one very slow closure can average out to
// something misleading), so this reports median alongside average, plus
// the min/max range, and a per-company breakdown for spotting a client
// that consistently drags out. Reuses the same pipeline entries
// computeConversionFunnel() builds — a closure's date minus its pipeline
// entry's FIRST call date, only for entries that are actually closed.
const TIME_TO_CLOSE_MIN_COMPANY_CLOSURES = 2; // below this a company's average is one data point away from being meaningless
async function computeTimeToClose(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const entries = buildPipelineEntries(allRows, makeTeamOf());
  const daysBetween = (a,b)=>{
    if(!a || !b) return null;
    const da = new Date(a+'T00:00:00Z').getTime();
    const db = new Date(String(b).slice(0,10)+'T00:00:00Z').getTime();
    if(isNaN(da) || isNaN(db)) return null;
    return Math.round((db-da)/86400000);
  };
  const closedEntries = entries
    .filter(e=>e.closed && e.firstDate && e.closedAt)
    .map(e=>({ ...e, days: daysBetween(e.firstDate, e.closedAt) }))
    .filter(e=> e.days !== null && e.days >= 0);
  if(!closedEntries.length){
    return { count: 0, avgDays: null, medianDays: null, minDays: null, maxDays: null, byCompany: [] };
  }
  const daysList = closedEntries.map(e=>e.days).sort((a,b)=>a-b);
  const avgDays = Math.round(daysList.reduce((s,d)=>s+d,0)/daysList.length);
  const mid = Math.floor(daysList.length/2);
  const medianDays = daysList.length % 2 === 1 ? daysList[mid] : Math.round((daysList[mid-1]+daysList[mid])/2);
  const minDays = daysList[0], maxDays = daysList[daysList.length-1];
  const byCompanyMap = {};
  closedEntries.forEach(e=>{
    if(!e.company) return;
    (byCompanyMap[e.company] = byCompanyMap[e.company] || []).push(e.days);
  });
  const byCompany = Object.entries(byCompanyMap)
    .filter(([,days])=>days.length >= TIME_TO_CLOSE_MIN_COMPANY_CLOSURES)
    .map(([company,days])=>({ company, count: days.length, avgDays: Math.round(days.reduce((s,d)=>s+d,0)/days.length) }))
    .sort((a,b)=> a.avgDays - b.avgDays);
  return { count: closedEntries.length, avgDays, medianDays, minDays, maxDays, byCompany };
}
// ---------- Company scorecard (2026-09-24, pipeline-visibility batch)
// ---------- Volume, reliability, conversion rate and time-to-close for one
// company currently live in three separate tabs (Client Reliability, the
// new Conversion Funnel, and Time to Close), each with its own minimum-
// sample-size guard, so "how is this client, really" means checking three
// places and remembering three different thresholds. This pulls all three
// together for ONE named company. Below-threshold figures are shown as
// "not enough history yet" rather than omitted outright, so a newer client
// isn't a blank scorecard — you can at least see the raw volume.
async function computeCompanyScorecard(companyName, forceRefresh){
  const key = normalizeCompanyKey(companyName);
  if(!key) return null;
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const [reliabilityRows, funnel, timeToClose] = await Promise.all([
    scanClientReliability(false), // shares fetchAllRowsAcrossDates' cache, see the CACHE_MS comment there
    computeConversionFunnel(false),
    computeTimeToClose(false),
  ]);
  const matchingRows = allRows.filter(r => normalizeCompanyKey(r.company) === key);
  if(!matchingRows.length) return { company: companyName, found: false };
  // Longest spelling on file as the display label — same heuristic
  // scanClientReliability already uses for the same reason.
  const displayName = matchingRows.reduce((best,r)=> (r.company||'').length > best.length ? r.company : best, matchingRows[0].company||companyName);
  const totalCalls = matchingRows.filter(r=>!r.woi).length;
  const reliability = reliabilityRows.find(r=>normalizeCompanyKey(r.company)===key) || null;
  const funnelRow = funnel.companyRows.find(c=>normalizeCompanyKey(c.company)===key) || null;
  const timeRow = timeToClose.byCompany.find(c=>normalizeCompanyKey(c.company)===key) || null;
  return {
    company: displayName, found: true, totalCalls,
    reliability: reliability ? { rate: Math.round(reliability.rate*100), bad: reliability.bad, total: reliability.total } : null,
    reliabilityBelowThreshold: !reliability && totalCalls > 0,
    conversion: funnelRow ? { rate: funnelRow.rate, closed: funnelRow.closed, total: funnelRow.total } : null,
    conversionBelowThreshold: !funnelRow,
    timeToClose: timeRow ? { avgDays: timeRow.avgDays, count: timeRow.count } : null,
    timeToCloseBelowThreshold: !timeRow,
  };
}
// ---------- Stuck-in-pipeline flag (2026-09-24, pipeline-visibility batch)
// ---------- WOI Aging already catches a candidate still literally marked
// "Waiting for Invite". This catches the broader, easier-to-miss case: a
// candidate who HAD a real call — not WOI — and then just... nothing.
// No further round logged, no closure recorded, no explicit cancel/no-show
// tag either. That's the case most likely to be genuinely forgotten rather
// than deliberately dropped, since nothing else in the app currently
// surfaces it at all.
const STUCK_PIPELINE_MIN_DAYS = 14; // same 14-day cadence already established for the backup reminder elsewhere — long enough that it's clearly not just normal turnaround, not a newly-invented number
const STUCK_PIPELINE_EXCLUDE_STATUSES = ['cancelled','not_responded']; // terminal outcomes — already resolved, not "stuck"; 'rescheduled' is deliberately NOT excluded, since a reschedule that never got rebooked is exactly the stuck case this is meant to catch
async function computeStuckPipeline(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const todayKey = todayStr();
  // Latest row per candidate (across every company) — a candidate is
  // "stuck" based on their most recent touchpoint, not their oldest one.
  const byCandidate = {};
  allRows.forEach(row=>{
    const key = (row.candidate||'').trim().toLowerCase();
    if(!key || row.woi) return; // WOI is WOI Aging's job, not this one's
    const existing = byCandidate[key];
    if(!existing || (row._date && row._date >= (existing._date||''))){
      byCandidate[key] = row;
    }
  });
  const closedCandidates = new Set((state.closures||[]).map(c=>(c.candidate||'').trim().toLowerCase()));
  const daysBetween = (a,b)=>{
    const da = new Date(a+'T00:00:00Z').getTime(), db = new Date(b+'T00:00:00Z').getTime();
    return Math.max(0, Math.round((db-da)/86400000));
  };
  return Object.values(byCandidate)
    .filter(row=>{
      const key = (row.candidate||'').trim().toLowerCase();
      if(closedCandidates.has(key)) return false;
      if(row.status && STUCK_PIPELINE_EXCLUDE_STATUSES.includes(row.status)) return false;
      if(!row._date) return false;
      return daysBetween(row._date, todayKey) >= STUCK_PIPELINE_MIN_DAYS;
    })
    .map(row=>({
      candidate: row.candidate, company: row.company||'', round: row.round||'',
      lastDate: row._date, daysSince: daysBetween(row._date, todayKey),
      status: row.status||'', assignee: row.assignee||'',
    }))
    .sort((a,b)=> b.daysSince - a.daysSince);
}
// ---------- Candidate Activity (added 2026-10-02, reworked same day) ----------
// Saiteja's actual ask, after the first cut of this (a plain "last call per
// candidate" lookup) wasn't it: "sai prassana P she has a call on sep 1 and
// 8... there is only calls happened for this candidate [and nothing since] —
// if we notice this we can check with team... get more interviewers for
// candidates" — i.e. a candidate whose calls have dried up should be
// noticeable so the team can go source them more interviews, same shape as
// 🧊 Stuck in Pipeline, but Stuck Pipeline only tracks each candidate's ONE
// latest touchpoint and groups by an EXACT lowercased name — his follow-up
// ("there are naming mismatches and for student and candidate") was that a
// candidate typed two slightly different ways (a typo, an abbreviation) gets
// silently split into two separate "candidates" that each look like a single
// isolated call, instead of one person with a real call history. Fixed by
// clustering every row by the SAME fuzzy "is this plausibly the same real
// person" check (sameCandidateFuzzyMatch) already used for repeat-candidate
// detection and duplicate-import detection elsewhere in this file — one
// cluster per real candidate, however many ways their name was typed, with
// every one of their calls (not just the latest) kept as a history. Also
// grouped by month (per his ask), keyed by the month of each candidate's
// MOST RECENT call, newest month first — so "who went quiet in September"
// is a glance, not a scroll through a flat list.
const CANDIDATE_ACTIVITY_STALE_DAYS = STUCK_PIPELINE_MIN_DAYS; // same 14-day bar Stuck Pipeline already uses — no second, uncoordinated threshold
async function computeCandidateActivity(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const todayKey = todayStr();
  const daysBetween = (a,b)=>{
    const da = new Date(a+'T00:00:00Z').getTime(), db = new Date(b+'T00:00:00Z').getTime();
    return Math.max(0, Math.round((db-da)/86400000));
  };
  // Cluster by fuzzy candidate identity — same pattern findDuplicateCallGroups()
  // already uses: exact normalized-name match first (cheap, the common
  // case), falling back to sameCandidateFuzzyMatch against the cluster's
  // first-seen spelling so a typo'd/abbreviated repeat still lands in the
  // same cluster instead of starting a new, falsely-isolated one.
  const clusters = [];
  allRows.forEach(row=>{
    if(!row.candidate || !row.candidate.trim()) return;
    const key = row.candidate.trim().toLowerCase();
    let cluster = clusters.find(c => c.key === key) ||
      clusters.find(c => sameCandidateFuzzyMatch(c.canonicalName, row.candidate));
    if(!cluster){ cluster = { key, canonicalName: row.candidate, rows: [] }; clusters.push(cluster); }
    cluster.rows.push(row);
  });
  // FIX (2026-10-02, follow-up): the first cut of the closed-candidate
  // exclusion below used an EXACT name match against state.closures — same
  // mistake already fixed once in this file for candidate clustering
  // itself (the Sai Prasanna / Ruchitha case): a closure recorded with a
  // slightly different spelling than the call record's candidate name
  // (typo, abbreviation, a middle/last name dropped) silently failed to
  // match, so Murali Krishna Mallipudi kept showing up as "stale" even
  // after getting an offer. Reuses the exact same matching this app
  // already trusts for closure↔call matching elsewhere (findClosureMatch):
  // same or fuzzy candidate name, AND same or fuzzy company — company is
  // required too so a name-only fuzzy match can't accidentally exclude an
  // unrelated person who just has a similar-sounding name.
  function clusterIsClosed(cluster){
    return (state.closures||[]).some(c=>{
      if(!c.candidate) return false;
      return cluster.rows.some(r=>{
        const nameMatch = (r.candidate||'').trim().toLowerCase() === c.candidate.trim().toLowerCase()
          || sameCandidateFuzzyMatch(r.candidate, c.candidate);
        if(!nameMatch) return false;
        return normalizeCompanyKey(r.company) === normalizeCompanyKey(c.company) || fuzzyCompanyKeyMatch(r.company, c.company);
      });
    });
  }
  return clusters
    // "murali krishna gets an offer, we don't want to count those members"
    // — a closed candidate (already placed) isn't someone to check in on
    // for more interviews, so this report drops them entirely rather than
    // just excluding them from the 🔴 stale flag.
    .filter(cluster => !clusterIsClosed(cluster))
    .map(cluster=>{
    const sorted = cluster.rows.slice().sort((a,b)=> (a._date||'').localeCompare(b._date||'') || (a.time||'').localeCompare(b.time||''));
    const last = sorted[sorted.length-1];
    const daysSince = last._date ? daysBetween(last._date, todayKey) : null;
    const isStale = daysSince !== null
      && !STUCK_PIPELINE_EXCLUDE_STATUSES.includes(last.status||'')
      && daysSince >= CANDIDATE_ACTIVITY_STALE_DAYS;
    return {
      candidate: cluster.canonicalName,
      company: last.company||'',
      lastDate: last._date||'',
      lastRound: last.round||'',
      lastStatus: last.status||'',
      lastWoi: !!last.woi,
      assignee: last.drivingPerson || last.assignee || '',
      totalCalls: sorted.length,
      daysSince,
      isStale,
      calls: sorted.map(r=>({ date:r._date||'', time:r.time||'', round:r.round||'', company:r.company||'', status:r.status||'', woi:!!r.woi })),
      monthKey: last._date ? last._date.slice(0,7) : 'Undated',
    };
  }).sort((a,b)=> (b.lastDate||'').localeCompare(a.lastDate||''));
}
// ---------- Final-round-no-closure nudge (2026-09-28) ---------- A narrower,
// earlier-warning sibling to Stuck Pipeline above: that one catches ANY
// candidate gone quiet 14+ days, regardless of round. This one is specific
// to the highest-stakes case — someone whose MOST RECENT touchpoint was
// already an advanced round (2nd+) and nothing's been recorded since,
// meaning either a closure or a next step is overdue. An advanced round
// should resolve far faster than a 1st round ever would, so this uses a
// much shorter threshold than Stuck Pipeline's 14 days — 5 days is enough
// to rule out normal turnaround (feedback, scheduling the next round,
// paperwork) without waiting long enough that the candidate's gone cold.
const FINAL_ROUND_NUDGE_MIN_DAYS = 5;
async function computeFinalRoundNudges(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const todayKey = todayStr();
  // Same "latest row per candidate" approach as Stuck Pipeline/Active
  // Pipeline — what matters is where the candidate stands NOW, not every
  // round they've ever had.
  const byCandidate = {};
  allRows.forEach(row=>{
    const key = (row.candidate||'').trim().toLowerCase();
    if(!key || row.woi) return;
    const existing = byCandidate[key];
    if(!existing || (row._date && row._date >= (existing._date||''))){
      byCandidate[key] = row;
    }
  });
  const closedCandidates = new Set((state.closures||[]).map(c=>(c.candidate||'').trim().toLowerCase()));
  const daysBetween = (a,b)=>{
    const da = new Date(a+'T00:00:00Z').getTime(), db = new Date(b+'T00:00:00Z').getTime();
    return Math.max(0, Math.round((db-da)/86400000));
  };
  return Object.values(byCandidate)
    .filter(row=>{
      const key = (row.candidate||'').trim().toLowerCase();
      if(closedCandidates.has(key)) return false;
      if(row.status && STUCK_PIPELINE_EXCLUDE_STATUSES.includes(row.status)) return false;
      if(!row._date || !isAdvancedRound(row.round)) return false;
      return daysBetween(row._date, todayKey) >= FINAL_ROUND_NUDGE_MIN_DAYS;
    })
    .map(row=>({
      candidate: row.candidate, company: row.company||'', round: row.round||'',
      lastDate: row._date, daysSince: daysBetween(row._date, todayKey),
      status: row.status||'', assignee: row.assignee||'',
    }))
    .sort((a,b)=> b.daysSince - a.daysSince);
}
// NOTE (2026-09-29): the "Active Pipeline" view that used to live here
// (computeActivePipeline() + renderActivePipelinePanel(), added 2026-09-28)
// was removed at Saiteja's request — real overlap with Data Health/WOI
// Aging/Stuck Pipeline, which already flag the same "needs attention"
// candidates; this was mostly a separate browsing view he confirmed he
// didn't use. See "Header/menu cleanup + feature trim" in the architecture
// doc for the full removal writeup.
const DOW_NAMES = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
// Absences are stored as a per-date note entry (see absentIdsNoteId) holding
// a JSON array of roster person IDs — this reads that same entry back for
// every saved date, groups hits by person + day-of-week, and surfaces any
// person who's been absent on the SAME weekday 2+ times. A manual scan
// (like the other cross-date checks) rather than something that runs on
// every load, since it means fetching every date's notes.
async function scanAbsencePatterns(){
  const dates = await getAllKnownDates();
  const perDateNotes = await Promise.all(dates.map(async d=>{
    if(d === state.date) return state.notes;
    if(API_BASE_URL){
      try{ const data = await apiCall('notes', {qs:'date='+d}); return data.rows || []; }catch(e){ return []; }
    }
    try{
      const r = await storageAdapter.get('day:'+d, false);
      const parsed = r && r.value ? JSON.parse(r.value) : null;
      return (parsed && !Array.isArray(parsed) && parsed.notes) || [];
    }catch(e){ return []; }
  }));
  const absencesByPersonId = {};
  dates.forEach((d, i)=>{
    const notes = perDateNotes[i] || [];
    const entry = notes.find(n => n && n.id === (d + '-absent-ids'));
    if(!entry) return;
    let ids = [];
    try{ ids = JSON.parse(entry.text) || []; }catch(e){}
    const dow = new Date(d + 'T00:00:00').getDay();
    ids.forEach(id=>{
      absencesByPersonId[id] = absencesByPersonId[id] || [];
      absencesByPersonId[id].push({ date: d, dow });
    });
  });
  const patterns = [];
  Object.entries(absencesByPersonId).forEach(([personId, occ])=>{
    const person = state.roster.find(p=>p.id===personId);
    const byDow = {};
    occ.forEach(o=>{ byDow[o.dow] = byDow[o.dow] || []; byDow[o.dow].push(o.date); });
    Object.entries(byDow).forEach(([dow, dowDates])=>{
      if(dowDates.length >= 2){
        patterns.push({
          personId, name: person ? person.name : '(no longer on the roster)',
          dow: Number(dow), dowName: DOW_NAMES[Number(dow)], dates: dowDates.sort()
        });
      }
    });
  });
  patterns.sort((a,b)=> b.dates.length - a.dates.length);
  return patterns;
}
function buildTeamGroupedExportText(rows){
  // Sort the entire day chronologically FIRST, before any grouping happens.
  // This was missing entirely before — calls were pushed into each team's list
  // in raw import order, so whenever a 1st round and a 2nd round call landed
  // under the same team, they came out in whatever order they were originally
  // typed/pasted in, not the order they actually happen during the day.
  rows = rows.slice().sort((a,b)=>businessDayMinutes(a.time)-businessDayMinutes(b.time));
  const knownOrder = ["HYD Team","Pradeep Anna Team","Development Team","Marketing Team","Sai Team","Sandeep Anna Team"];
  // Union of known team names + any team a roster member belongs to — a team with
  // zero members assigned yet (e.g. a fresh Development Team) still counts as a team.
  const teamNames = new Set([...knownOrder, ...state.roster.map(p=>p.team)]);
  // Sai and Sandeep Anna work independently, not as multi-person teams — heading
  // is just their name, and calls under them skip the redundant assignee suffix.
  const soloTeams = new Set(["Sai Team","Sandeep Anna Team"]);
  const headingOverrides = { "Sai Team": "Sai", "Sandeep Anna Team": "Sandeep Anna" };
  const groups = {};
  const unresolved = [];

  // AM/PM stripped only for this final WhatsApp-ready text — the stored time
  // stays exactly as originally pasted everywhere else in the tool.
  const cleanTime = (t)=> (t||'').replace(/\s*[AaPp][Mm]\s*$/,'').trim();

  rows.forEach(r=>{
    let label = r.country && r.country!=='USA' ? `${r.candidate} (${r.country})` : r.candidate;
    if(r.candidateFirstInterview) label += ' (*Candidate 1st Interview*)'; // *text* renders bold in WhatsApp
    const time = cleanTime(r.time);
    if(r.woi){
      unresolved.push(`${label} - Waiting for Invite`);
      return;
    }
    if(!r.assignee){
      unresolved.push(`${label} - ${time} (UNASSIGNED)`);
      return;
    }
    let groupKey, line;
    if(teamNames.has(r.assignee)){
      groupKey = r.assignee;
      line = `${label} - ${time}`;
    } else {
      const person = state.roster.find(p=>p.name===r.assignee);
      groupKey = person ? person.team : 'Other';
      line = soloTeams.has(groupKey)
        ? `${label} - ${time}`
        : `${label} - ${time} (*${r.assignee}*)`; // *name* = bold in WhatsApp
    }
    groups[groupKey] = groups[groupKey] || [];
    groups[groupKey].push(line);
  });

  const order = [...knownOrder, ...Object.keys(groups).filter(g=>!knownOrder.includes(g))];
  const out = [];
  order.forEach(team=>{
    if(groups[team] && groups[team].length){
      out.push(`*${headingOverrides[team] || team}*`);
      out.push(...groups[team]);
      out.push('');
    }
  });
  if(unresolved.length){
    out.push('*Unassigned / WOI*');
    out.push(...unresolved);
  }
  return out.join('\n').trim();
}

function downloadTextFile(filename, text){
  const blob = new Blob([text], {type:'text/plain'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 1000);
}

function renderFinalizeControls(){
  if(!state.finalized){
    return `<button class="btn primary" id="finalizeBtn">✅ Finalize all calls</button>`;
  }
  const newCount = state.rows.filter(r => !state.exportedIds.includes(r.id)).length;
  if(newCount > 0 && state.exportedIds.length > 0){
    // Some calls were exported before, and more have been added since —
    // offer both: just the new ones (the common case), or the whole list.
    return `<button class="btn" id="downloadNewTxt" style="color:var(--teal);border-color:#1F4A43">📄 Open .txt (${newCount} new)</button>
      <button class="btn" id="downloadTxt">📋 Open full list (${state.rows.length})</button>
      <button class="btn ghost" id="reopenBtn" style="color:var(--text-faint)">Re-open for editing</button>`;
  }
  return `<button class="btn" id="downloadTxt" style="color:var(--teal);border-color:#1F4A43">📄 Open .txt</button>
    <button class="btn ghost" id="reopenBtn" style="color:var(--text-faint)">Re-open for editing</button>`;
}

// ---------- render ----------
function renderLoginScreen(app){
  app.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <h1 style="font-family:var(--display);font-size:22px;margin-bottom:4px">Coverage Desk</h1>
        <div style="color:var(--text-muted);font-size:13px;margin-bottom:20px">Sign in to continue. If you're the admin, leave Username blank and just enter the shared password.</div>
        <input type="text" id="loginUserInput" placeholder="Username (leave blank for the master password)" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);padding:10px 12px;border-radius:8px;width:100%;font-size:14px;margin-bottom:10px">
        <input type="password" id="loginPwInput" placeholder="Password" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);padding:10px 12px;border-radius:8px;width:100%;font-size:14px;margin-bottom:10px">
        ${state.loginError ? `<div style="color:var(--coral);font-size:12.5px;margin-bottom:10px">${escapeHtml(state.loginError)}</div>` : ''}
        <button class="btn primary" id="loginSubmit" style="width:100%;justify-content:center">Log in</button>
      </div>
    </div>
  `;
  const submitBtn = document.getElementById('loginSubmit');
  const userInput = document.getElementById('loginUserInput');
  const pwInput = document.getElementById('loginPwInput');
  pwInput.focus();
  const doLogin = async ()=>{
    CURRENT_USERNAME = userInput.value.trim();
    ADMIN_PASSWORD = pwInput.value;
    try{
      localStorage.setItem('coverage-desk-admin-pw', ADMIN_PASSWORD);
      localStorage.setItem('coverage-desk-username', CURRENT_USERNAME);
    }catch(e){}
    submitBtn.textContent = 'Checking…';
    await loadRoster();
    await loadDay(state.date);
    if(state.needsLogin){
      state.loginError = 'Incorrect username or password — try again.';
    } else {
      state.loginError = '';
      await refreshRole();
    }
    render();
  };
  submitBtn.onclick = doLogin;
  userInput.onkeydown = (e)=>{ if(e.key==='Enter') pwInput.focus(); };
  pwInput.onkeydown = (e)=>{ if(e.key==='Enter') doLogin(); };
}

// Exactly one of these full-screen panels can be open at a time — opening
// any one of them closes the others and hides the call table entirely,
// instead of everything stacking onto one long, slow-to-render page.
function closeAllPanels(){
  state.showAllDates = false;
  state.showSummary = false;
  state.showUsers = false;
  state.showDbSettings = false;
  state.showNotifications = false;
  state.showPortalSync = false;
  state.showIncentives = false;
  state.showBackups = false;
  state.showRoster = false;
  state.showImport = false;
  state.showRescheduleImport = false;
  state.showNavAddMenu = false;
  state.rescheduleReview = null;
  state.closureReview = null;
  state.showClosures = false;
  state.showExpectedClosures = false;
  state.showStudentsMaster = false;
  state.showConflicts = false;
  state.showUniversalSearch = false;
  state.showCalendarView = false;
  state.showHelp = false;
  state.showMissedCheck = false;
  state.missedCheckReviewItems = null;
  state.duplicatesReview = null;
  state.clearAllReview = null;
  state.showCandidateProfile = false;
  state.showCompanyScorecard = false;
  state.showDataHealth = false;
  state.showDailyDigest = false;
  state.showEodWrapup = false;
  state.showMoreMenu = false;
  state.showToolsMenu = false;
  state.showImportMenu = false;
  stopPortalSyncPolling();
}
function getActivePanelName(){
  if(state.showAllDates) return 'allDates';
  if(state.showSummary) return 'summary';
  if(state.showUsers) return 'users';
  if(state.showDbSettings) return 'dbSettings';
  if(state.showNotifications) return 'notifications';
  if(state.showPortalSync) return 'portalSync';
  if(state.showIncentives) return 'incentives';
  if(state.showBackups) return 'backups';
  if(state.showRoster) return 'roster';
  if(state.showImport || state.showRescheduleImport) return 'importHub';
  if(state.rescheduleReview) return 'rescheduleReview';
  if(state.closureReview) return 'closureReview';
  if(state.showClosures) return 'closures';
  if(state.showExpectedClosures) return 'expectedClosures';
  if(state.showStudentsMaster) return 'studentsMaster';
  if(state.showConflicts) return 'conflicts';
  if(state.showUniversalSearch) return 'universalSearch';
  if(state.showCalendarView) return 'calendarView';
  if(state.showHelp) return 'help';
  if(state.missedCheckReviewItems) return 'missedCheckReview';
  if(state.showMissedCheck) return 'missedCheck';
  if(state.duplicatesReview) return 'duplicatesReview';
  if(state.clearAllReview) return 'clearAllReview';
  if(state.showCandidateProfile) return 'candidateProfile';
  if(state.showCompanyScorecard) return 'companyScorecard';
  if(state.showDataHealth) return 'dataHealth';
  if(state.showDailyDigest) return 'dailyDigest';
  if(state.showEodWrapup) return 'eodWrapup';
  return null;
}
// Opens exactly one panel: closes everything else first, then — unless
// this same panel was already the one open (a second click = close it) —
// turns this one on.
function openOnlyPanel(flagName){
  const wasOpen = !!state[flagName];
  closeAllPanels();
  if(!wasOpen){ state[flagName] = true; }
}
function renderActivePanel(name){
  if(name === 'allDates') return renderAllDatesPanel();
  if(name === 'summary') return renderSummaryPanel();
  if(name === 'users') return renderUsersPanel();
  if(name === 'dbSettings') return renderDbSettingsPanel();
  if(name === 'notifications') return renderNotificationsPanel();
  if(name === 'portalSync') return renderPortalSyncPanel();
  if(name === 'incentives') return renderIncentivesPanel();
  if(name === 'backups') return renderBackupsPanel();
  if(name === 'roster') return renderRosterPanel();
  if(name === 'importHub') return renderImportHubPanel();
  if(name === 'rescheduleReview') return renderRescheduleConfirmPanel();
  if(name === 'closureReview') return renderClosureConfirmPanel();
  if(name === 'closures') return renderClosuresPanel();
  if(name === 'expectedClosures') return renderExpectedClosuresPanel();
  if(name === 'studentsMaster') return renderStudentsMasterPanel();
  if(name === 'conflicts') return renderConflictsPanel();
  if(name === 'universalSearch') return renderUniversalSearchPanel();
  if(name === 'calendarView') return renderCalendarViewPanel();
  if(name === 'help') return renderHelpPanel();
  if(name === 'missedCheck') return renderMissedCheckPanel();
  if(name === 'missedCheckReview') return renderMissedCheckReviewPanel();
  if(name === 'duplicatesReview') return renderDuplicatesReviewPanel();
  if(name === 'clearAllReview') return renderClearAllReviewPanel();
  if(name === 'candidateProfile') return renderCandidateProfilePanel();
  if(name === 'companyScorecard') return renderCompanyScorecardPanel();
  if(name === 'dataHealth') return renderDataHealthPanel();
  if(name === 'dailyDigest') return renderDailyDigestPanel();
  if(name === 'eodWrapup') return renderEodWrapupPanel();
  return '';
}
function panelTitle(name){
  const titles = {
    allDates:'All Dates', summary:'Summary', users:'Users', dbSettings:'Database Settings',
    notifications:'Notifications', portalSync:'Team Sync', incentives:'Incentives', backups:'Backups',
    roster:'Team Roster', importHub:'Import',
    rescheduleReview:'Confirm Reschedule/Cancel', closureReview:'Confirm Closures',
    closures:'Closures / Job Offers', expectedClosures:'Expected Closures',
    studentsMaster:'Students Master', conflicts:'Resolve Conflicts',
    universalSearch:'Search Everywhere', missedCheck:'Check for Missed Messages', missedCheckReview:'Confirm Missing Calls',
    duplicatesReview:'Confirm Remove Duplicates', clearAllReview:'Confirm Clear All', calendarView:'Calendar', help:'Help & Shortcuts',
    candidateProfile: state.candidateProfileName ? `Timeline — ${state.candidateProfileName}` : 'Candidate Timeline',
    companyScorecard: 'Company Scorecard',
    dataHealth: 'Data Health',
    dailyDigest: "Today's Briefing",
    eodWrapup: "End-of-Day Wrap-Up"
  };
  return titles[name] || '';
}
// ---------- Data Health triage view (2026-09-27) ---------- Saiteja is the
// sole day-to-day user of this app, and several "things worth a look" were
// already computable — unmatched closures, no-handler-credit closures, WOI
// aging, stuck pipeline, today's absences, today's conflicts — but each one
// lived behind its own tab, so actually catching all of them meant
// remembering to check five different places every day. This pulls the
// COUNTS into one glance, with a one-click jump into whichever tab has the
// detail, instead of duplicating that detail here. Deliberately reuses the
// exact same state fields (state.closuresPerformance, state.woiAgingData,
// state.stuckPipelineData) that Closures/Notifications already populate —
// so a scan here also warms those tabs, and opening them afterward doesn't
// re-fetch.
function dataHealthIssueCount(){
  if(state.closuresPerformance === null || state.woiAgingData === null || state.stuckPipelineData === null || state.finalRoundNudgeData === null) return null;
  return (state.closuresPerformance.unmatchedDetails.length || 0)
    + (state.closuresPerformance.noAssigneeCount || 0)
    + state.woiAgingData.length
    + state.stuckPipelineData.length
    + state.finalRoundNudgeData.length
    + state.absentIds.length
    + computeConflicts(state.rows).size;
}
async function runDataHealthScan(){
  state.dataHealthLoading = true;
  render();
  const [closuresPerf, woi, stuck, finalRoundNudges] = await Promise.all([
    computeClosuresPerformance(true),
    scanWoiAging(true),
    computeStuckPipeline(true),
    computeFinalRoundNudges(true),
  ]);
  state.closuresPerformance = closuresPerf;
  state.woiAgingData = woi;
  state.stuckPipelineData = stuck;
  state.finalRoundNudgeData = finalRoundNudges;
  state.dataHealthLoading = false;
  state.dataHealthGeneratedAt = new Date().toISOString();
  render();
}
// Shared by renderDataHealthPanel() and renderDailyDigestPanel() below — both
// need the exact same six-category list, and duplicating it would risk the
// two silently disagreeing (e.g. one counting a WOI candidate the other
// doesn't) if either is ever edited without the other.
function buildDataHealthItems(){
  const closuresPerf = state.closuresPerformance;
  const woi = state.woiAgingData;
  const stuck = state.stuckPipelineData;
  const conflictsCount = computeConflicts(state.rows).size;
  return [
    { icon:'🔗', label:'Unmatched closures', count: closuresPerf.unmatchedDetails.length,
      desc: "Closures that couldn't be matched to a call record — need a manual match.", action:'closures' },
    { icon:'🙈', label:'No handler credited', count: closuresPerf.noAssigneeCount,
      desc: 'Matched to a call record, but that record has no individual assignee or driving person — no one gets credit.', action:'closures' },
    { icon:'⏳', label:'Waiting for invite too long', count: woi.length,
      desc: 'Still marked "Waiting for Invite" — easy to lose track of once it scrolls off the day it was logged.', action:'notif:woiAging' },
    { icon:'🧊', label:'Gone quiet (14+ days)', count: stuck.length,
      desc: `Had a real call, then nothing for ${STUCK_PIPELINE_MIN_DAYS}+ days — no closure, no reschedule, no explicit outcome.`, action:'notif:stuckPipeline' },
    { icon:'🎯', label:'Final round, no closure', count: state.finalRoundNudgeData.length,
      desc: `Most recent round was already 2nd round or later, ${FINAL_ROUND_NUDGE_MIN_DAYS}+ days ago, with no closure recorded since.`, action:'notif:finalRoundNudge' },
    { icon:'🚫', label:'Absent today', count: state.absentIds.length,
      desc: "Marked absent on today's board.", action:'notif:absent' },
    { icon:'⚠️', label:'Scheduling conflicts today', count: conflictsCount,
      desc: 'Two calls overlapping for the same person today.', action:'conflicts' },
  ];
}
function renderDataHealthItemsHtml(items){
  return items.map(it=>`
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-bottom:1px solid var(--border)">
      <div>
        <div style="font-weight:600">${it.icon} ${it.label} <span class="n" style="background:${it.count>0?'var(--coral)':'var(--teal)'}">${it.count}</span></div>
        <div class="hint" style="margin:2px 0 0">${it.desc}</div>
      </div>
      ${it.count ? `<button class="btn ghost" data-datahealth-open="${it.action}" style="flex-shrink:0">Open →</button>` : ''}
    </div>
  `).join('');
}
function renderDataHealthPanel(){
  if(state.dataHealthLoading){
    return `<div class="hint">🔍 Scanning closures, WOI, and stalled candidates…</div>`;
  }
  if(state.closuresPerformance === null || state.woiAgingData === null || state.stuckPipelineData === null || state.finalRoundNudgeData === null){
    return `
      <div class="hint" style="margin-bottom:10px">One scan across everything that tends to get missed day to day: closures waiting on a manual match, closures with no one to credit, candidates waiting on an invite too long, candidates that have gone quiet, advanced rounds overdue for a closure, plus today's absences and conflicts.</div>
      <button class="btn primary" id="runDataHealthScan">🩺 Run Data Health scan</button>
    `;
  }
  const items = buildDataHealthItems();
  const totalIssues = items.reduce((sum,it)=>sum+(it.count||0), 0);
  return `
    <div class="hint" style="margin-bottom:10px">${totalIssues ? `${totalIssues} item(s) worth a look.` : "✅ Nothing outstanding right now."}${state.dataHealthGeneratedAt ? ` Last scanned ${new Date(state.dataHealthGeneratedAt).toLocaleTimeString()}.` : ''}</div>
    ${renderDataHealthItemsHtml(items)}
    <button class="btn ghost" id="runDataHealthScan" style="margin-top:12px">↻ Re-scan</button>
  `;
}
// ---------- Daily Digest / "Today's Briefing" (2026-09-27) ---------- The
// Summary panel already answers "what does today's board look like"; Data
// Health above already answers "what's been quietly slipping through the
// cracks across every date." Neither alone is the one-glance morning read
// Saiteja actually asked for — this is that: today's headline numbers PLUS
// the Data Health issue list, together, so opening this one panel first
// thing is enough to know whether anything needs attention before diving
// into the board. Reuses the exact same state (state.closuresPerformance /
// woiAgingData / stuckPipelineData) and the exact same jump-to-panel
// buttons as Data Health, rather than re-deriving or re-rendering its own
// copy of that list.
// "End-of-Day Wrap-Up" (added 2026-09-30) — the evening-facing counterpart
// to Today's Briefing (which is morning-facing: today's numbers plus what
// needs a look). This answers a different question — "how did today
// actually go" — rather than duplicating the morning view. Deliberately
// reads straight off state.rows for whichever date is currently open (no
// new scan/state needed): "handled" is any row with a real assignee or a
// status (rescheduled/cancelled/etc — those were dealt with, just not via
// assignment); "slipped" is anything left with neither, excluding WOI rows
// (a WOI is expected to be waiting, not slipped). Tomorrow's count reuses
// the exact same state.tomorrowPreview the home-screen banner already
// shows, so it's never a second copy of that fetch.
function computeEodWrapup(){
  const rows = state.rows || [];
  const handled = rows.filter(r => (r.assignee && r.assignee.trim()) || r.status);
  const slipped = rows.filter(r => !r.woi && !(r.assignee && r.assignee.trim()) && !r.status);
  const woi = rows.filter(r => r.woi);
  return { total: rows.length, handled: handled.length, slipped, woi: woi.length };
}
function renderEodWrapupPanel(){
  const w = computeEodWrapup();
  return `
    <div class="strip-title" style="margin-bottom:6px"><span>🌙 ${escapeHtml(state.date)}</span></div>
    <div class="summary-big-grid" style="margin-bottom:14px">
      <div class="summary-big-cell"><div class="summary-big-num">${w.total}</div><div class="summary-big-lbl">Total Calls</div></div>
      <div class="summary-big-cell sbg-teal"><div class="summary-big-num">${w.handled}</div><div class="summary-big-lbl">Handled</div></div>
      <div class="summary-big-cell sbg-coral"><div class="summary-big-num">${w.slipped.length}</div><div class="summary-big-lbl">Slipped</div></div>
      <div class="summary-big-cell sbg-amber"><div class="summary-big-num">${w.woi}</div><div class="summary-big-lbl">WOI</div></div>
    </div>
    ${w.slipped.length ? `<div class="hint" style="color:var(--coral);background:var(--coral-dim);border:1px solid #5A2A24;padding:10px 14px;border-radius:8px;margin-bottom:14px">
      <b>⚠ ${w.slipped.length} call(s) still need a decision:</b>
      <div style="margin-top:6px;display:flex;flex-direction:column;gap:3px;font-size:12.5px">
        ${w.slipped.slice(0,25).map(r=>`<div>${escapeHtml(r.time||'')} — <b>${escapeHtml(r.candidate||'(no name)')}</b>${r.company?' — '+escapeHtml(r.company):''}</div>`).join('')}
        ${w.slipped.length > 25 ? `<div>…and ${w.slipped.length - 25} more</div>` : ''}
      </div>
    </div>` : `<div class="hint" style="color:var(--teal);background:var(--teal-dim);border:1px solid #1F4A43;padding:10px 14px;border-radius:8px;margin-bottom:14px">✅ Nothing slipped — every non-WOI call has an owner or a status.</div>`}
    <div class="hint" style="background:var(--surface-2);border:1px solid var(--border);padding:10px 14px;border-radius:8px">
      📅 Tomorrow: ${state.tomorrowPreviewLoading ? 'loading…' : (state.tomorrowPreview ? `<b>${state.tomorrowPreview.total}</b> scheduled${state.tomorrowPreview.woi?`, <b>${state.tomorrowPreview.woi}</b> already WOI`:''}` : 'not available yet — open this from today\'s date to load it')}
    </div>
  `;
}
function renderDailyDigestPanel(){
  const all = state.rows;
  const conflictIds = computeConflicts(all);
  const sum = summarize(all, conflictIds);
  const dataReady = state.closuresPerformance !== null && state.woiAgingData !== null && state.stuckPipelineData !== null && state.finalRoundNudgeData !== null;
  const items = dataReady ? buildDataHealthItems() : [];
  const totalIssues = items.reduce((s,it)=>s+(it.count||0), 0);
  return `
    <div class="strip-title" style="margin-bottom:6px"><span>📋 Today — ${escapeHtml(state.date)}</span></div>
    <div class="summary-big-grid" style="margin-bottom:14px">
      <div class="summary-big-cell"><div class="summary-big-num">${sum.total}</div><div class="summary-big-lbl">Total Calls</div></div>
      <div class="summary-big-cell sbg-teal"><div class="summary-big-num">${sum.assigned}</div><div class="summary-big-lbl">Assigned</div></div>
      <div class="summary-big-cell sbg-coral"><div class="summary-big-num">${sum.unassigned}</div><div class="summary-big-lbl">Unassigned</div></div>
      <div class="summary-big-cell sbg-amber"><div class="summary-big-num">${sum.woi}</div><div class="summary-big-lbl">WOI</div></div>
      <div class="summary-big-cell sbg-violet"><div class="summary-big-num">${sum.conflicts}</div><div class="summary-big-lbl">Conflicts</div></div>
    </div>
    <div class="strip-title" style="margin-bottom:6px"><span>🩺 Needs a look</span></div>
    ${!dataReady
      ? `<div class="hint" style="margin-bottom:10px">Hasn't been scanned yet this session — pulls in unmatched closures, stale WOIs, stalled candidates, absences and conflicts.</div><button class="btn primary" id="runDataHealthScan">🩺 Scan now</button>`
      : (totalIssues
          ? renderDataHealthItemsHtml(items.filter(it=>it.count))
          : `<div class="hint" style="color:var(--teal)">✅ Nothing outstanding — closures, WOI, and stalled candidates all clear.</div>`)
    }
    ${dataReady ? `<div class="hint" style="margin-top:10px">Last scanned ${state.dataHealthGeneratedAt ? new Date(state.dataHealthGeneratedAt).toLocaleTimeString() : 'just now'}. <button class="btn ghost" id="runDataHealthScan" style="margin-left:6px">↻ Re-scan</button></div>` : ''}
  `;
}

function render(){
  const app = document.getElementById('app');
  const active = document.activeElement;
  const activeId = active && active.id;
  const activeSelStart = (active && typeof active.selectionStart === 'number') ? active.selectionStart : null;
  // Every render rebuilds the whole innerHTML from scratch — if the new
  // content ends up a different height than before (very common: a row
  // gets added/removed, a panel opens, a doubt note appears), the browser
  // can otherwise leave the scroll position sitting in the wrong spot,
  // which reads as a jarring jump rather than a smooth update. Restoring
  // the exact scroll position afterward keeps that from happening.
  const savedScrollY = window.scrollY;

  if(state.needsLogin){
    renderLoginScreen(app);
    return;
  }

  const conflictIds = computeConflicts(state.rows);
  const clientConflicts = computeClientTimeConflicts(state.rows);
  const sortedAll = state.rows.slice().sort((a,b)=>businessDayMinutes(a.time)-businessDayMinutes(b.time));
  const firstRoundRows = sortedAll.filter(r=>!isAdvancedRound(r.round));
  const advancedRows = sortedAll.filter(r=>isAdvancedRound(r.round));
  const doubtRows = sortedAll.filter(r=>r.doubts && r.doubts.length>0);
  const statusRows = sortedAll.filter(r=>r.status);
  const rescheduledRows = sortedAll.filter(r=>r.status==='rescheduled' || r.status==='cancelled' || r.status==='not_responded' || r.status==='no_invite');
  const sortedRows = getTabRows(state.view);
  const sum = summarize(sortedRows, conflictIds);

  let filtered = sortedRows;
  if(state.filter==='unassigned') filtered = sortedRows.filter(r=>!r.assignee && !r.woi);
  else if(state.filter==='woi') filtered = sortedRows.filter(r=>r.woi);
  else if(state.filter==='conflict') filtered = sortedRows.filter(r=>conflictIds.has(r.id));
  else if(state.filter==='recentImport') filtered = sortedRows.filter(r=>state.recentImportIds && state.recentImportIds.has(r.id));
  else if(state.filter==='recentResched') filtered = sortedRows.filter(r=>state.recentReschedIds && state.recentReschedIds.has(r.id));

  if(state.assigneeFilter){
    // Matches Coverage Desk's own local assignee field, the Driving
    // Person (the individual actually running the call, separate from a
    // team-level Assigned To), OR the Portal-synced handler — a name only
    // visible via one of those should still be findable here. Tolerates
    // spelling variants (Bharat/Bharath) the same way the Portal column does.
    filtered = filtered.filter(r => {
      if(namesEquivalent(r.assignee, state.assigneeFilter)) return true;
      if(namesEquivalent(r.drivingPerson, state.assigneeFilter)) return true;
      const pm = findPortalMatch(r);
      return !!(pm && namesEquivalent(pm.handler, state.assigneeFilter));
    });
  }
  if(state.clientFilter){
    filtered = filtered.filter(r => r.company === state.clientFilter);
  }
  if(state.teamFilter){
    const allTeamNames = new Set(state.roster.map(p=>p.team));
    filtered = filtered.filter(r => teamOfAssignee(r.assignee, allTeamNames) === state.teamFilter);
  }
  if(state.groupByCompany){
    filtered = filtered.slice().sort((a,b)=>
      (a.company||'').localeCompare(b.company||'') || businessDayMinutes(a.time)-businessDayMinutes(b.time)
    );
  }

  const q = (state.search||'').trim().toLowerCase();
  if(q){
    filtered = filtered.filter(r =>
      (r.candidate||'').toLowerCase().includes(q) ||
      (r.company||'').toLowerCase().includes(q)
    );
  }

  // Priority auto-sort (added 2026-09-30): surfaces unassigned-and-soonest
  // calls at the top instead of pure chronological order, so the 2 calls
  // that actually need a decision aren't buried under 40 already-handled
  // rows. Deliberately skipped when groupByCompany is active — that's a
  // different, already-explicit sort choice, and stacking this on top of
  // it would fight the very thing the person just asked for.
  if(state.prioritySort && !state.groupByCompany){
    filtered = filtered.slice().sort((a,b)=>{
      const aNeeds = !a.woi && !a.assignee && !a.status ? 0 : 1;
      const bNeeds = !b.woi && !b.assignee && !b.status ? 0 : 1;
      if(aNeeds !== bNeeds) return aNeeds - bNeeds; // unassigned-and-live first
      return businessDayMinutes(a.time) - businessDayMinutes(b.time); // soonest first within each group
    });
  }

  const activePanel = getActivePanelName();

  app.innerHTML = `
    ${(ADMIN_PASSWORD || CURRENT_USERNAME) ? `<div class="account-chip">
      <span class="account-name">👤 ${escapeHtml(CURRENT_USERNAME || 'Admin')}</span>
      <span class="account-role">${CURRENT_ROLE==='admin'?'Admin':CURRENT_ROLE==='team_lead'?'Team Lead':'Read-only'}</span>
      <button class="account-logout-btn" id="topLogoutBtn">Log out</button>
    </div>` : ''}
    <div class="header">
      <div>
        <h1>Coverage Desk</h1>
        <div class="sub">Every scheduled call, one owner each. ⚕ Healthcare &nbsp; 🎓 Education/University — highlighted in any round.</div>
      </div>
      <div class="date-row">
        <button class="btn primary" id="goHomeBtn" title="Go back to the main view — saves any pending changes first">🏠 Home</button>
        <button class="arrow-btn" id="prevDay">‹</button>
        <input type="date" id="datePicker" value="${state.date}">
        <button class="arrow-btn" id="nextDay">›</button>
        ${(CURRENT_ROLE!=='user' && CURRENT_ROLE!=='team_lead') ? `<div class="more-menu-wrap" id="importHubWrap">
          <button class="btn ${(state.showImport||state.showRescheduleImport||state.showImportMenu)?'active':''}" id="toggleImportHub" title="Import new calls or a reschedule/cancel message">📥 Import</button>
          ${state.showImportMenu ? `<div class="more-menu-backdrop" data-close-menu="showImportMenu"></div><div class="more-menu-dropdown">
            <button class="more-menu-item" id="importMenuNewCalls">＋ Add Calls</button>
            <button class="more-menu-item" id="importMenuReschedule">↻ Reschedule / Cancel</button>
          </div>` : ''}
        </div>` : ''}
        <button class="btn ${state.showClosures?'active':''}" id="toggleClosures" title="Import a closure/job-offer message and view all recorded closures" style="${state.closuresLoaded && state.closures.length ? 'color:var(--teal);border-color:#1F4A43' : ''}">🏆 Closures${state.closuresLoaded ? ` (${closuresThisMonthCount()})` : ''}</button>
        <button class="btn ${state.showExpectedClosures?'active':''}" id="toggleExpectedClosures" title="Calls flagged as 'expecting this to become a closure' based on handler/driving-person feedback — follow up on them here" style="${state.expectedClosuresLoaded && expectedClosuresPendingCount() ? 'color:var(--amber);border-color:#5A4420' : ''}">🎯 Expected${state.expectedClosuresLoaded ? ` (${expectedClosuresPendingCount()})` : ''}</button>
        <button class="btn" id="toggleQuickSearch" title="Search any candidate, company, or assignee across every date — opens right here, without leaving this page. Today's matches can be assigned right from the results.">🔍 Quick Search</button>
        <div class="more-menu-wrap">
          <!-- FIX (2026-09-29): header cleanup — "so many options" complaint.
               Notifications, Data Health, and DB status moved in here from
               the top-level toolbar (they're all getElementById-wired, not
               position-wired, so moving their markup doesn't touch any
               handler). Quick Search stays top-level by explicit request.
               Active Pipeline removed entirely (real overlap with Data
               Health/WOI Aging/Stuck Pipeline — Saiteja confirmed removal). -->
          <button class="btn ${state.showMoreMenu?'active':''} ${(state.absentIds.length || (CURRENT_ROLE==='admin' && !API_BASE_URL) || dataHealthIssueCount()>0) ? 'notif-alert' : ''}" id="toggleMoreMenu" title="Notifications, Data Health, DB status, and other summaries/lookups">📊 Reports</button>
          ${state.showMoreMenu ? `<div class="more-menu-backdrop" data-close-menu="showMoreMenu"></div><div class="more-menu-dropdown">
            <div class="more-menu-section-label">Today</div>
            <button class="more-menu-item ${state.absentIds.length ? 'notif-alert' : ''}" id="toggleNotifications" title="Check for candidates seen on a previous date">🔔 Notifications${state.absentIds.length ? ` <span class="notif-info-badge">${state.absentIds.length} absent</span>` : (state.notifications && state.notifications.length ? ` <span class="notif-info-badge">${state.notifications.length}</span>` : '')}</button>
            ${(()=>{ const c = dataHealthIssueCount(); return `<button class="more-menu-item" id="toggleDataHealth" title="One place for what tends to get missed day to day — unmatched closures, stale WOIs, stalled candidates, absences, conflicts">🩺 Data Health${c!==null ? ` <span class="notif-info-badge">${c}</span>` : ''}</button>`; })()}
            ${CURRENT_ROLE==='admin' ? `<button class="more-menu-item" id="toggleDbSettings" title="Connect a real MySQL database">${API_BASE_URL?'🗄️ DB Connected':'🗄️ Connect Database'}${!API_BASE_URL ? ' <span class="notif-info-badge">not connected</span>' : ''}</button>` : ''}
            <button class="more-menu-item" id="toggleDailyDigest" title="Today's headline numbers plus anything that needs a look, in one glance — the first thing to open each day">📋 Today's Briefing</button>
            <button class="more-menu-item" id="openDeskTools" title="Suggest assignees, workload checks, loose ends, reschedule tracker, candidate timeline, weekly report and an end-of-day message — in one window">🧰 Desk Tools</button>
            <button class="more-menu-item" id="toggleEodWrapup" title="How today went — handled vs. slipped, plus a peek at tomorrow. The evening-facing counterpart to Today's Briefing">🌙 End-of-Day Wrap-Up</button>
            <button class="more-menu-item" id="toggleTimeSensitiveAlerts" title="A notification when an unassigned call is close to its start time — fires in the open tab/app immediately, and as a real background push to every device that's subscribed (needs the server-side check set up — see the deploy notes) even once closed.">${state.alertsEnabled ? '🔔 Alerts: On' : '🔕 Alerts: Off'}</button>
            <div class="more-menu-section-label">Look up</div>
            <button class="more-menu-item" id="toggleUniversalSearch" title="Search candidate, company, or assignee across every saved date at once — includes a company-only fuzzy mode for client lookups">🔎 Search Everywhere</button>
            <button class="more-menu-item" id="openQuickJumpFromMenu" title="Jump straight to a date, a panel, or a candidate — same as pressing Ctrl/Cmd+K anywhere">⌘ Quick Jump <span class="notif-info-badge" title="Keyboard shortcut">Ctrl/⌘+K</span></button>
            <button class="more-menu-item" id="toggleCalendarView" title="See call volume across a whole month at a glance, and jump straight to any date">🗓️ Calendar</button>
            <button class="more-menu-item" id="toggleCompanyScorecard" title="Volume, reliability, conversion rate, and time-to-close for one client — in one place instead of three tabs">🏢 Company Scorecard</button>
            <button class="more-menu-item" id="toggleAllDates">🗓️ All Dates</button>
            <div class="more-menu-section-label">Tools</div>
            <button class="more-menu-item" id="toggleMissedCheck" title="Upload a WhatsApp 'Export Chat' file and check for call messages that don't have a matching row yet">🔍 Check for Missed Messages${(new Date().getHours() >= MISSED_CHECK_NUDGE_HOUR && !getLastMissedCheckRunAt(state.date)) ? ` <span class="notif-info-badge" title="Not yet run for ${escapeHtml(state.date)} today">not run today</span>` : ''}</button>
            <button class="more-menu-item" id="togglePortalSync" title="Pull assignments &amp; incentives from the Interview Portal — also refreshes the 📡 badge on any row where the Portal shows a different assignee">📡 Team Sync</button>
            ${CURRENT_ROLE==='admin' ? `<button class="more-menu-item" id="toggleStudentsMaster">🎓 Students Master</button>` : ''}
            ${CURRENT_ROLE==='admin' ? `<div class="more-menu-section-label">Admin</div><button class="more-menu-item" id="toggleSummary">📊 Summary</button>` : ''}
            ${CURRENT_ROLE==='admin' ? `<button class="more-menu-item" id="exportExcelBtn" title="Download this date's calls as an Excel file, grouped by team">📊 Export to Excel</button>` : ''}
            ${CURRENT_ROLE==='admin' ? (()=>{
              const lastBackupAt = getLastBackupAt();
              const daysSince = lastBackupAt ? Math.floor((Date.now()-lastBackupAt)/86400000) : null;
              const overdue = daysSince === null || daysSince >= BACKUP_REMINDER_DAYS;
              const overdueLabel = overdue ? (daysSince===null ? 'never backed up' : `${daysSince}d since backup`) : '';
              const title = overdue
                ? (daysSince===null ? "You haven't taken a full backup yet — downloads every date you've ever saved (calls, roster, notes) as one JSON file, for safekeeping outside this app" : `It's been ${daysSince} days since your last full backup — downloads every date you've ever saved (calls, roster, notes) as one JSON file, for safekeeping outside this app`)
                : "Downloads every date you've ever saved — calls, roster, notes — as one JSON file, for safekeeping outside this app";
              return `<button class="more-menu-item" id="quickBackupBtn" ${state.backingUp?'disabled':''} title="${escapeHtml(title)}">${state.backingUp?'⬇ Preparing backup…':'🗄️ Backup All Data'}${overdue ? ` <span class="notif-info-badge" title="${escapeHtml(title)}">${escapeHtml(overdueLabel)}</span>` : ''}</button>`;
            })() : ''}
            <div class="more-menu-section-label">Reference</div>
            <button class="more-menu-item" id="toggleHelp" title="Keyboard shortcuts and a quick reference for where things live">❔ Help &amp; Shortcuts</button>
            ${(ADMIN_PASSWORD || CURRENT_USERNAME) ? `<div class="more-menu-divider"></div><button class="more-menu-item" id="headerLogoutBtn" style="color:var(--coral)">🚪 Log out${CURRENT_USERNAME ? ' ('+escapeHtml(CURRENT_USERNAME)+')' : ''}</button>` : ''}
          </div>` : ''}
        </div>
        ${CURRENT_ROLE==='admin' ? `<button class="btn ${state.dirty ? 'save-pending' : ''}" id="saveAllBtn" ${state.saving?'disabled':''}>${state.saving ? '<span class="spinner"></span>Saving…' : (state.dirty ? '💾 Save changes' : '✓ All saved')}</button>` : ''}
        <button class="arrow-btn" id="toggleThemeBtn" title="${state.theme==='light' ? 'Switch to dark mode' : 'Switch to light mode'}">${state.theme==='light' ? '🌙' : '☀️'}</button>
      </div>
    </div>
    ${state.showNavAddMenu ? `<div class="more-menu-backdrop" data-close-menu="showNavAddMenu"></div><div class="more-menu-dropdown">
      <button class="more-menu-item" id="navAddMenuNewCall">＋ Add call</button>
      <button class="more-menu-item" id="navAddMenuReschedule">↻ Reschedule / Cancel</button>
    </div>` : ''}
    ${state.showDailyDigestBanner ? `<div class="hint" style="color:var(--teal);background:var(--teal-dim);border:1px solid #1F4A43;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <span>📋 Today's Briefing is ready — today's numbers plus anything that needs a look, in one glance.</span>
      <span style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn ghost" id="openDailyDigestBannerBtn" style="color:var(--teal);border-color:#1F4A43">View briefing →</button>
        <button class="btn ghost" id="dismissDailyDigestBannerBtn">Dismiss</button>
      </span>
    </div>` : ''}
    ${state.loadError ? `<div class="hint" style="color:var(--coral);background:var(--coral-dim);border:1px solid #5A2A24;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <span>⚠ Couldn't load today's data: ${escapeHtml(state.loadError)}</span>
      <button class="btn ghost" id="retryLoadBtn">↻ Retry</button>
    </div>` : ''}
    ${state.saveError ? `<div class="hint" style="color:var(--coral);background:var(--coral-dim);border:1px solid #5A2A24;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;font-weight:600">⚠ ${escapeHtml(state.saveError)}</div>` : ''}
    ${(Object.keys(state.offlineQueue||{}).length || state.offlineRosterPending) ? `<div class="hint" style="color:var(--amber);background:var(--amber-dim);border:1px solid #5A4A24;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <span>📡 Offline — ${[Object.keys(state.offlineQueue).length ? `${Object.keys(state.offlineQueue).length} day(s) of call changes` : '', state.offlineRosterPending ? 'roster changes' : ''].filter(Boolean).join(' and ')} saved locally, will sync automatically once you're back online.</span>
      <button class="btn ghost" id="retryOfflineQueueBtn" ${state.offlineQueueRetrying?'disabled':''}>${state.offlineQueueRetrying ? '<span class="spinner"></span>Retrying…' : '🔄 Retry now'}</button>
    </div>` : ''}
    ${state.lastImportedIds && state.lastImportedIds.length ? `<div class="hint" style="color:var(--teal);background:var(--teal-dim);border:1px solid #1F4A43;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <span>✅ Last import added ${state.lastImportedIds.length} new call(s)${state.lastImportMergedCount?` and updated ${state.lastImportMergedCount} existing call(s) with role/interviewer/round info`:''}.</span>
      <span style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn ghost" id="undoLastImportBtn" style="color:var(--coral);border-color:var(--coral)">↩ Undo import (remove ${state.lastImportedIds.length})</button>
        <button class="btn ghost" id="dismissLastImportBtn">Dismiss</button>
      </span>
    </div>` : ''}
    ${state.lastReschedItems && state.lastReschedItems.items.length ? `<div class="hint" style="color:var(--teal);background:var(--teal-dim);border:1px solid #1F4A43;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <span>✅ Saved ${state.lastReschedItems.items.length} reschedule/cancel update(s)${state.lastReschedItems.skippedCount ? ` (${state.lastReschedItems.skippedCount} message(s) were skipped)` : ''}:</span>
        <button class="btn ghost" id="dismissLastReschedBtn">Dismiss</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;font-size:12.5px;color:var(--text)">
        ${state.lastReschedItems.items.map(it=>`<div>${statusBadgeInfo(it.status).icon} <b>${escapeHtml(it.candidate)}</b>${it.time?' — '+escapeHtml(it.time):''}${it.company?' — '+escapeHtml(it.company):''} → ${statusBadgeInfo(it.status).label}</div>`).join('')}
      </div>
    </div>` : ''}
    ${state.lastDedupeInfo && state.lastDedupeInfo.removed.length ? `<div class="hint" style="color:var(--teal);background:var(--teal-dim);border:1px solid #1F4A43;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;display:flex;flex-direction:column;gap:8px">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
        <span>✅ Removed ${state.lastDedupeInfo.removed.length} duplicate call(s) and saved. A backup was taken — use 🕐 Backups to restore if needed.</span>
        <button class="btn ghost" id="dismissLastDedupeBtn">Dismiss</button>
      </div>
      <div style="display:flex;flex-direction:column;gap:3px;font-size:12.5px;color:var(--text)">
        ${state.lastDedupeInfo.removed.map(r=>`<div>✕ <b>${escapeHtml(r.candidate)}</b>${r.time?' — '+escapeHtml(r.time):''}${r.company?' — '+escapeHtml(r.company):''}</div>`).join('')}
      </div>
    </div>` : ''}
    ${state.portalSyncError ? (()=>{
      // FIX (2026-09-30): a plain timeout ("server's slow to wake up, try
      // again") isn't a real error — it used to get the same loud red
      // coral banner as an actual failure (bad credentials, connection
      // refused), which reads as alarming for something that just needs a
      // retry. Timeouts now get the calmer amber "taking a while" styling
      // (same language already used for the cache-warning banner below)
      // and softer copy; a genuine error keeps the red banner so it still
      // stands out.
      const isTimeout = /took too long to respond/i.test(state.portalSyncError);
      const label = isTimeout ? '⏳ Sync is taking longer than usual' : '📡 Portal sync error';
      const color = isTimeout ? 'var(--amber)' : 'var(--coral)';
      const bg = isTimeout ? 'var(--amber-dim)' : 'var(--coral-dim)';
      const border = isTimeout ? '#5A4A24' : '#5A2A24';
      return `<div class="hint" style="color:${color};background:${bg};border:1px solid ${border};padding:10px 14px;border-radius:8px;margin:-10px 0 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <span>${label}: ${escapeHtml(state.portalSyncError)}</span>
      <button class="btn ghost" id="portalSyncErrorRetryBtn" style="flex-shrink:0">↻ Retry</button>
    </div>`;
    })() : ''}
    ${(state.portalSyncCacheWarning && !state.portalSyncError) ? `<div class="hint" style="color:var(--amber);background:var(--amber-dim);border:1px solid #5A4A24;padding:10px 14px;border-radius:8px;margin:-10px 0 16px;font-weight:600;display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
      <span>⚠ ${escapeHtml(state.portalSyncCacheWarning)}</span>
      <button class="btn ghost" id="dismissPortalCacheWarningBtn" style="flex-shrink:0">Dismiss</button>
    </div>` : ''}
    ${(state.portalSyncedAt && !state.portalSyncError) ? `<div class="hint" style="background:var(--panel-2,rgba(255,255,255,0.04));border:1px solid var(--border);padding:8px 14px;border-radius:8px;margin:-10px 0 16px">📡 Last synced from Portal: ${escapeHtml(state.portalSyncedAt)} (${(state.portalAssignments||[]).length} records)</div>` : ''}
    ${activePanel ? `
    <div class="panel-header-bar">
      <button class="btn ghost" id="backToCalls">← Back to calls</button>
      <div class="panel-header-title">${escapeHtml(panelTitle(activePanel))}</div>
    </div>
    ${renderActivePanel(activePanel)}
    ` : `
    ${(()=>{
      // Staffing/capacity alerts used to each render as their own fully
      // separate bordered box, stacked with a gap between — fine with one,
      // but three at once (a real possibility: overloaded handler + low
      // capacity + a rising trend can all be true the same day) looked like
      // three unrelated pop-ups rather than one coherent "today's staffing
      // picture". Now grouped under one shared card (2+ active) so they
      // read as one alert with a few lines, not three; severity colors
      // (coral for capacity risk, amber for the other two) are kept per
      // row so nothing gets visually downgraded.
      const items = [];
      const warnings = computeWorkloadWarnings(state.rows);
      if(warnings.length) items.push({ color:'var(--amber)', icon:'⚠', text: `${warnings.map(w=>`${escapeHtml(w.name)} has ${w.count} calls today — well above the team average of ${w.avg}`).join('. ')}. Consider redistributing before it leads to a missed call.` });
      const risk = computeCapacityRiskWarnings();
      if(risk.length) items.push({ color:'var(--coral)', icon:'🚨', text: `${risk.map(t=>`${escapeHtml(t.name)} is down to ${t.capacity} of ${t.total} today (${t.absent} absent)`).join('. ')} — even a normal day's volume could overload them. Worth planning overflow ahead of time rather than after calls start piling up.` });
      const pred = state.predictiveCapacityWarnings||[];
      if(pred.length) items.push({ color:'var(--amber)', icon:'📈', text: `${pred.map(p=>`${escapeHtml(p.team)}'s weekly volume has risen for 3 weeks running (${p.weeks.join(' → ')}), headcount is ${p.headcount}`).join('. ')} — from the last Trends scan. Worth a look before it becomes a capacity problem. See Reports → Trends Over Time.` });
      if(!items.length) return '';
      if(items.length === 1){
        const it = items[0];
        return `<div class="hint" style="color:${it.color};background:var(--surface-2);border:1px solid ${it.color};padding:10px 14px;border-radius:8px;margin-bottom:16px">${it.icon} ${it.text}</div>`;
      }
      return `<div class="alert-group" style="border:1px solid var(--border);border-radius:8px;margin-bottom:16px;overflow:hidden">
        <div style="padding:8px 14px;background:var(--surface-2);font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:var(--text-faint)">Today's staffing alerts</div>
        ${items.map(it=>`<div class="hint" style="color:${it.color};padding:9px 14px;border-top:1px solid var(--border-soft)">${it.icon} ${it.text}</div>`).join('')}
      </div>`;
    })()}
    ${(state.date === todayDateString() && state.tomorrowPreview) ? `<div class="hint" style="background:var(--surface-2);border:1px solid var(--border);padding:8px 14px;border-radius:8px;margin-bottom:16px;display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span>📅 Tomorrow (${escapeHtml(state.tomorrowPreview.date)}): <b>${state.tomorrowPreview.total}</b> scheduled${state.tomorrowPreview.woi ? `, <b>${state.tomorrowPreview.woi}</b> already WOI` : ''}.</span>
    </div>` : ''}
    <div class="shift-note-box ${state.mobileNoteExpanded?'mobile-expanded':''}">
      <label for="shiftNoteInput" class="shift-note-label-row">
        <span>📝 Note for next shift <span class="hint" style="display:inline">(visible to anyone who opens this date — not tied to any specific call)</span></span>
        <button type="button" class="mobile-collapse-toggle" id="toggleMobileNote" title="Show/hide on mobile">${state.mobileNoteExpanded?'▴':'▾'}</button>
      </label>
      ${(!state.mobileNoteExpanded && state.shiftNote) ? `<div class="mobile-collapsed-preview">${escapeHtml(state.shiftNote.slice(0,60))}${state.shiftNote.length>60?'…':''}</div>` : ''}
      <div class="shift-note-collapsible">
        <textarea id="shiftNoteInput" placeholder="e.g. 'Ran out of Marketing Team capacity after 9 PM, overflowed a few to Pradeep Anna' or 'Client X asked to push their whole batch to tomorrow'" ${CURRENT_ROLE!=='admin'?'disabled':''}>${escapeHtml(state.shiftNote||'')}</textarea>
      </div>
    </div>

    <div class="tabs-wrap" id="tabsWrap">
      <div class="tabs" id="mainTabs">
        <button class="tab-btn ${state.view==='all'?'active':''}" data-view="all" title="Both 1st and 2nd round together — handy when searching, so you don't have to remember which tab a call is in. Shortcut: 1">All Calls <span class="n">${sortedAll.length}</span></button>
        <button class="tab-btn ${state.view==='1st'?'active':''}" data-view="1st" title="Shortcut: 2">1st Round <span class="n">${firstRoundRows.length}</span></button>
        <button class="tab-btn ${state.view==='2nd'?'active':''}" data-view="2nd" title="Shortcut: 3">2nd Round &amp; Above <span class="n">${advancedRows.length}</span></button>
        <button class="tab-btn ${state.view==='doubts'?'active':''}" data-view="doubts" style="${doubtRows.length?'color:var(--amber)':''}" title="Shortcut: 4">Doubts <span class="n">${doubtRows.length}</span></button>
        <button class="tab-btn ${state.view==='rescheduled'?'active':''}" data-view="rescheduled" style="${rescheduledRows.length?'color:var(--violet)':''}" title="Shortcut: 5 — also includes 📨 Didn't Receive Invite">↻ Rescheduled/Cancelled/No Response <span class="n">${rescheduledRows.length}</span></button>
      </div>
    </div>
    <div class="hint keyboard-hint" style="margin:-10px 0 16px;font-size:11px">Keyboard: 1\u20135 to switch tabs, Ctrl/Cmd+S to save \u2014 works whenever you're not typing in a field. Swipe the tabs above if some are scrolled off-screen.</div>

    ${state.view!=='notes' ? renderStrip(sortedAll, conflictIds) : ''}

    ${state.dateSwitching ? renderDateSwitchSkeleton() : renderCallsView(sum, sortedRows, filtered, conflictIds, sortedAll, clientConflicts)}
    `}

    <div class="footer-note">Saved automatically for ${state.date} · only visible to you</div>
    ${state.lastDeleted ? (()=>{
      // Visual countdown (2026-10-02): the toast used to give no warning
      // before "Undo" vanished — a shrinking bar now shows how much time
      // is actually left, computed fresh from the stored expiresAt (see
      // deleteCallRow's comment) rather than a fixed-duration CSS
      // animation, so it stays accurate across any unrelated re-render.
      const remainingMs = Math.max(0, state.lastDeleted.expiresAt - Date.now());
      const elapsedMs = UNDO_TOAST_MS - remainingMs;
      return `<div class="undo-toast">
        <span>Removed "${escapeHtml(state.lastDeleted.row.candidate||'call')}"</span>
        <span class="undo-toast-bar-track" aria-hidden="true"><span class="undo-toast-bar" style="animation-duration:${UNDO_TOAST_MS}ms;animation-delay:-${elapsedMs}ms"></span></span>
        <button id="undoDeleteBtn">Undo</button>
      </div>`;
    })() : ''}
    ${state.showSwipeAssignPicker ? (()=>{
      const pendingRow = state.rows.find(r=>r.id===state.pendingSwipeAssignRowId);
      return `<div class="my-name-picker-overlay" id="myNamePickerOverlay">
      <div class="my-name-picker-card">
        <div class="my-name-picker-title">Assign to…</div>
        <div class="my-name-picker-sub">${pendingRow ? escapeHtml(pendingRow.candidate||'This call') : 'This call'} — tap a team or person.</div>
        <div class="my-name-picker-list">
          ${renderSwipeAssignGroups(pendingRow ? pendingRow.round : '1st')}
        </div>
        <button class="btn ghost" id="myNamePickerCancel" style="margin-top:10px;width:100%">Cancel</button>
      </div>
    </div>`;
    })() : ''}
    ${state.showClipboardPicker ? (()=>{
      const msgs = state.clipboardPickerMessages || [];
      const sel = state.clipboardPickerSelected || new Set();
      return `<div class="my-name-picker-overlay" id="clipboardPickerOverlay">
      <div class="my-name-picker-card" style="max-width:480px;width:92vw">
        <div class="my-name-picker-title">Clipboard has ${msgs.length} messages</div>
        <div class="my-name-picker-sub">Pick which one(s) to paste in — all are selected by default.</div>
        <div class="my-name-picker-list" style="max-height:50vh;overflow-y:auto;display:flex;flex-direction:column;gap:8px;margin:10px 0">
          ${msgs.map((m,i)=>`
            <label style="display:flex;gap:8px;align-items:flex-start;padding:10px;border:1px solid var(--border);border-radius:10px;background:var(--surface-2);cursor:pointer">
              <input type="checkbox" class="clipboard-picker-check" data-idx="${i}" ${sel.has(i)?'checked':''} style="margin-top:3px;flex:none">
              <span style="font-size:12.5px;line-height:1.4;white-space:pre-wrap;word-break:break-word;color:var(--text-2)">${escapeHtml(m.length > 220 ? (m.slice(0,220) + '…') : m)}</span>
            </label>
          `).join('')}
        </div>
        <div style="display:flex;gap:8px">
          <button class="btn ghost" id="clipboardPickerCancel" style="flex:1">Cancel</button>
          <button class="btn primary" id="clipboardPickerInsert" style="flex:1">Insert selected (${sel.size})</button>
        </div>
      </div>
    </div>`;
    })() : ''}
    ${state.showQuickSearchModal ? renderQuickSearchModal() : ''}
    ${state.quickActionRowId ? renderQuickActionSheet() : ''}
    ${state.expectClosureRowId ? renderExpectClosureNoteSheet() : ''}
    ${state.showQuickJump ? renderQuickJumpOverlay() : ''}
  `;

  attachHandlers(conflictIds);
  updateBodyScrollLock();

  if(activeId){
    const el = document.getElementById(activeId);
    if(el && el.focus){
      el.focus();
      if(activeSelStart!=null && el.setSelectionRange){
        try{ el.setSelectionRange(activeSelStart, activeSelStart); }catch(e){}
      }
    }
  }
  // Deferred for the same reason as the two fixes above — window.scrollY
  // forces the identical whole-document layout flush. Safe to defer
  // without introducing a visible jump: requestAnimationFrame runs before
  // the browser's next paint, so this correction still lands before the
  // user ever sees the wrong scroll position, exactly as it did running
  // synchronously — it just no longer blocks the rest of render() first.
  requestAnimationFrame(()=>{
    if(window.scrollY !== savedScrollY){
      window.scrollTo({ top: savedScrollY, behavior: 'instant' });
    }
  });
}

function renderBulkBar(){
  return `<div class="bulk-bar">
    <span class="bulk-count">${state.selectedIds.size} selected</span>
    <select id="bulkAssignSelect" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);max-width:220px">
      <option value="">Assign to…</option>
      ${buildRosterOptions('1st', '')}
    </select>
    <button class="btn primary" id="bulkApplyBtn">Apply to ${state.selectedIds.size}</button>
    <span style="width:1px;height:20px;background:var(--border);margin:0 4px"></span>
    <select id="distributeTeamSelect" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);max-width:200px">
      <option value="">Distribute evenly among…</option>
      <option value="HYD Team">HYD Team</option>
      <option value="Pradeep Anna Team">Pradeep Anna Team</option>
    </select>
    <button class="btn" id="distributeApplyBtn" title="Spreads the selected calls one-by-one across that team's available (non-absent) members">🔀 Distribute</button>
    <span style="width:1px;height:20px;background:var(--border);margin:0 4px"></span>
    <button class="btn" id="bulkMarkOnsiteBtn" style="color:var(--onsite);border-color:var(--onsite)" title="Mark all selected calls as Onsite Interview">🏢 Mark Onsite</button>
    <button class="btn" id="bulkMarkWoiBtn" style="color:var(--amber);border-color:var(--amber)" title="Mark all selected calls as Waiting for Invite (clears their assignee)">⏳ Mark WOI</button>
    <span style="width:1px;height:20px;background:var(--border);margin:0 4px"></span>
    <input type="date" id="moveToDateInput" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);width:auto">
    <button class="btn" id="moveToDateBtn" title="Move the selected calls to a different date entirely — fixes calls that got saved under the wrong date without losing any data">📅 Move to date</button>
    <button class="btn ghost" id="bulkDeleteBtn" style="color:var(--coral);border-color:var(--coral)" title="Delete all selected calls — a backup is saved first">🗑 Delete Selected</button>
    <button class="btn ghost" id="bulkClearBtn">Clear selection</button>
  </div>`;
}

function renderDateSwitchSkeleton(){
  return `<div>
    ${[1,2,3,4,5,6].map(()=>`<div class="skeleton-row"></div>`).join('')}
  </div>`;
}

function renderCallsView(sum, sortedRows, filtered, conflictIds, allRowsToday, clientConflicts){
  const isReadOnly = CURRENT_ROLE === 'user' || CURRENT_ROLE === 'team_lead';
  const teamLoad = computeTeamLoadCounts(allRowsToday || sortedRows);
  const DISPLAY_TEAMS = [
    { name: 'HYD Team', color: 'var(--teal)' },
    { name: 'Pradeep Anna Team', color: 'var(--blue)' },
    { name: 'Development Team', color: 'var(--green)' },
    { name: 'Marketing Team', color: 'var(--sky)' },
  ];
  const teamStats = DISPLAY_TEAMS.map(t => ({
    name: t.name, color: t.color, count: teamLoad[t.name]||0, capacity: computeTeamCapacity(t.name)
  }));
  // Suggestion logic runs on 1st-round calls only, and only weighs HYD
  // Team / Pradeep Anna Team / Marketing Team against each other — see
  // suggestAlternativeTeam's own comment for why.
  const firstRoundToday = (allRowsToday || sortedRows).filter(r=>!isAdvancedRound(r.round));
  const teamSuggestion = suggestAlternativeTeam(firstRoundToday);
  return `
    <div class="search-row">
      <span class="search-icon">🔍</span>
      <input type="text" id="searchBox" class="search-box" placeholder="Search candidate or client…" value="${escapeHtml(state.search||'')}">
      ${state.search ? `<button class="search-clear" id="clearSearch" title="Clear search">✕</button>` : ''}
      ${state.search ? `<span class="search-count">${filtered.length} match${filtered.length===1?'':'es'}</span>` : ''}
    </div>

    <div class="summary">
      <div class="cell total ${state.filter==='all'?'cell-active':''}" data-f="all"><div class="num">${sum.total}</div><div class="lbl">Total calls</div></div>
      <div class="cell assigned"><div class="num">${sum.assigned}</div><div class="lbl">Assigned</div></div>
      <div class="cell unassigned ${state.filter==='unassigned'?'cell-active':''}" data-f="unassigned"><div class="num">${sum.unassigned}</div><div class="lbl">Unassigned</div></div>
      <div class="cell woi ${state.filter==='woi'?'cell-active':''}" data-f="woi"><div class="num">${sum.woi}</div><div class="lbl">WOI</div></div>
      <div class="cell conflict ${state.filter==='conflict'?'cell-active':''}" data-f="conflict"><div class="num">${sum.conflicts}</div><div class="lbl">Conflicts</div></div>
    </div>

    <div class="team-load-strip">
      ${teamStats.map(t => `<div class="team-load-cell ${teamSuggestion && teamSuggestion.full===t.name ? 'team-load-full' : ''} ${state.teamFilter===t.name ? 'team-load-active' : ''}" data-team="${escapeHtml(t.name)}" title="${t.capacity} available today${teamSuggestion && teamSuggestion.full===t.name ? ' — running heavy relative to headcount' : ''} — click to show only ${escapeHtml(t.name)}'s calls"><span class="team-load-dot" style="background:${t.color}"></span>${escapeHtml(t.name)}<span class="team-load-num">${t.count}</span>${t.capacity?`<span class="team-load-capacity">/${t.capacity}</span>`:''}</div>`).join('')}
      ${state.teamFilter ? `<button class="filter-chip" id="clearTeamFilterBtn" style="margin-left:2px">✕ Clear (${escapeHtml(state.teamFilter)})</button>` : ''}
    </div>
    ${teamSuggestion ? `<div class="hint" style="color:var(--amber);background:var(--amber-dim);border:1px solid #5A4A1E;padding:8px 12px;border-radius:8px;margin:-10px 0 ${teamSuggestion.outsideHydHoursCount?'6px':'16px'};font-size:12px">⚠ ${escapeHtml(teamSuggestion.full)} is carrying a heavy 1st-round load for today's headcount — ${escapeHtml(teamSuggestion.suggest)} has more room right now, worth routing new calls there instead.</div>` : ''}
    ${(teamSuggestion && teamSuggestion.outsideHydHoursCount) ? `<div class="hint" style="color:var(--text-muted);background:var(--surface-2);border:1px solid var(--border);padding:8px 12px;border-radius:8px;margin:0 0 16px;font-size:12px">⏰ ${teamSuggestion.outsideHydHoursCount} of ${escapeHtml(teamSuggestion.full)}'s ${teamSuggestion.outsideHydHoursTotal} 1st-round calls today fall outside HYD Team's working hours (before noon or after midnight IST) — those were never going to land on HYD regardless of headcount, so that's a structural reason for the load difference, not just uneven sharing.</div>` : ''}

    <div class="toolbar">
      ${isReadOnly ? `<span class="read-only-badge">👁 Read-only — ask an admin for edit access</span>` : `
      <button class="btn" id="addRow">＋ Add call</button>
      ${renderFinalizeControls()}`}
      ${(CURRENT_ROLE==='admin' && sum.conflicts) ? `<button class="btn" id="toggleConflicts" style="color:var(--violet);border-color:var(--violet)" title="Focused view to resolve double-bookings">⚠ Resolve Conflicts (${sum.conflicts})</button>` : ''}
      <div class="more-menu-wrap">
        <button class="btn ${state.showToolsMenu?'active':''}" id="toggleToolsMenu" title="Team, users, incentives, backups, and account maintenance">🔧 Admin</button>
        ${state.showToolsMenu ? `<div class="more-menu-backdrop" data-close-menu="showToolsMenu"></div><div class="more-menu-dropdown">
          <button class="more-menu-item" id="toggleRoster">👥 Team (${state.roster.length})</button>
          ${(CURRENT_ROLE==='admin' && API_BASE_URL) ? `<button class="more-menu-item" id="toggleUsers">👤 Users</button>` : ''}
          ${CURRENT_ROLE==='admin' ? `<button class="more-menu-item" id="toggleIncentives">💰 Incentives</button>` : ''}
          ${CURRENT_ROLE==='admin' ? `<button class="more-menu-item" id="toggleBackups">🕐 Backups</button>` : ''}
          ${CURRENT_ROLE==='admin' ? `<div class="more-menu-divider"></div><button class="more-menu-item" id="removeDuplicatesBtn">🧹 Remove Duplicates</button>` : ''}
          ${!isReadOnly ? `<button class="more-menu-item" id="clearAll" style="color:var(--coral)">🗑 Clear all calls</button>` : ''}
        </div>` : ''}
      </div>
    </div>

    <div class="filter-bar">
      <select id="assigneeFilterSelect" class="filter-bar-select" style="background:var(--surface);border:1px solid var(--border);color:var(--text);width:auto;flex:1 1 140px;min-width:0;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;padding:8px 30px 8px 12px;border-radius:8px;font-family:var(--body);cursor:pointer;box-shadow:var(--shadow-sm);appearance:none;-webkit-appearance:none;background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235C6672' stroke-width='1.5' fill='none'/%3E%3C/svg%3E&quot;);background-repeat:no-repeat;background-position:right 12px center;">
        <option value="">Filter by person…</option>
        ${buildCombinedAssigneeFilterOptions()}
      </select>
      <select id="clientFilterSelect" class="filter-bar-select" style="background:var(--surface);border:1px solid var(--border);color:var(--text);width:auto;flex:1 1 140px;min-width:0;max-width:220px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:12.5px;padding:8px 30px 8px 12px;border-radius:8px;font-family:var(--body);cursor:pointer;box-shadow:var(--shadow-sm);appearance:none;-webkit-appearance:none;background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235C6672' stroke-width='1.5' fill='none'/%3E%3C/svg%3E&quot;);background-repeat:no-repeat;background-position:right 12px center;">
        <option value="">Filter by client…</option>
        ${Array.from(new Set(state.rows.map(r=>r.company).filter(Boolean))).sort((a,b)=>a.localeCompare(b)).map(c=>`<option value="${escapeHtml(c)}" ${state.clientFilter===c?'selected':''}>${escapeHtml(c)}</option>`).join('')}
      </select>
      <button class="btn ${state.groupByCompany?'active':''}" id="groupByCompanyBtn" style="${state.groupByCompany?'background:var(--teal-dim);border-color:#1F4A43;color:var(--teal)':''}" title="Sort the table by client instead of time, so same-client calls sit next to each other">${state.groupByCompany?'✓ ':''}Group by client</button>
      ${(()=>{
        // "My Calls" quick filter (2026-09-24, pipeline-visibility batch) —
        // one click to see just your own assigned calls for the day instead
        // of hunting your name in the "Filter by person…" dropdown every
        // time. Reuses the existing assigneeFilter mechanism entirely (same
        // namesEquivalent-tolerant match Team Sync badges use) — this is
        // just a fast, rememberable shortcut into it, not a new filter.
        const myName = getMyAssigneeName();
        const isActive = myName && namesEquivalent(state.assigneeFilter, myName);
        return `<button class="btn ${isActive?'active':''}" id="myCallsBtn" style="${isActive?'background:var(--teal-dim);border-color:#1F4A43;color:var(--teal)':''}" title="${myName ? `Show only ${escapeHtml(myName)}'s calls for today (click again to clear)` : 'Pick which roster name is you, then filter to just your own calls'}">${isActive?'✓ ':''}👤 My Calls</button>${myName ? `<button class="btn ghost" id="myCallsChangeBtn" title="Change which name 'My Calls' filters to" style="padding:8px 10px;font-size:11px">⚙</button>` : ''}`;
      })()}
      <div class="spacer"></div>
      <button class="filter-chip ${state.filter==='all'?'active':''}" data-f="all">All<span class="n">${sum.total}</span></button>
      <button class="filter-chip ${state.filter==='unassigned'?'active':''}" data-f="unassigned">Unassigned<span class="n">${sum.unassigned}</span></button>
      <button class="filter-chip ${state.filter==='woi'?'active':''}" data-f="woi">WOI<span class="n">${sum.woi}</span></button>
      <button class="filter-chip ${state.filter==='conflict'?'active':''}" data-f="conflict">Conflicts<span class="n">${sum.conflicts}</span></button>
      ${(state.recentImportIds && state.recentImportIds.size) ? `<button class="filter-chip ${state.filter==='recentImport'?'active':''}" data-f="recentImport" style="color:var(--teal)" title="Calls added or updated by the most recent import">🆕 Recent Import<span class="n">${state.recentImportIds.size}</span></button>` : ''}
      ${(state.recentReschedIds && state.recentReschedIds.size) ? `<button class="filter-chip ${state.filter==='recentResched'?'active':''}" data-f="recentResched" style="color:var(--teal)" title="Calls just marked rescheduled/cancelled/no-response">🔁 Recent Reschedule<span class="n">${state.recentReschedIds.size}</span></button>` : ''}
      <button class="filter-chip ${state.prioritySort?'active':''}" id="togglePrioritySort" style="${state.prioritySort?'color:var(--amber);border-color:#5A4A24':''}" title="Sort unassigned-and-soonest calls to the top instead of pure time order">⚡ Priority sort</button>
    </div>

    ${(!isReadOnly && state.selectedIds.size) ? renderBulkBar() : ''}

    <div class="${isReadOnly?'read-only-mode':''}">
    ${filtered.length ? renderTable(filtered, conflictIds, clientConflicts) : renderEmpty()}
    </div>
  `;
}

// Same candidate appearing twice on the same day — could be a legit 2nd/3rd
// round happening the same day, but could also just be an accidental double
// paste/entry. Flagged for a quick human check either way, not auto-resolved.
//
// This also computes actual TIME OVERLAP between the occurrences —
// distinct from just "appears twice" — because that's the gap
// computeConflicts() above doesn't cover: computeConflicts only flags one
// PERSON double-booked across different candidates, never the same
// CANDIDATE entered twice by two different coordinators (often on two
// different teams) who each booked their own slot without seeing the
// other's queue. When that overlap is genuinely across two different
// teams, it's flagged as the highest-risk case — exactly the
// accidental cross-team duplicate scenario neither coordinator's own view
// would ever surface on its own.
function findSameDayDuplicateCandidates(rows){
  const teamNames = new Set(state.roster.map(p=>p.team));
  const byName = {};
  rows.forEach(r=>{
    if(!r.candidate) return;
    const key = r.candidate.trim().toLowerCase();
    if(!key) return;
    byName[key] = byName[key] || [];
    byName[key].push(r);
  });
  return Object.values(byName)
    .filter(group => group.length > 1)
    .map(group => {
      let hasOverlap = false, crossTeamOverlap = false;
      for(let i=0;i<group.length;i++){
        for(let j=i+1;j<group.length;j++){
          const a = group[i], b = group[j];
          const aStart = timeToMinutes(a.time), bStart = timeToMinutes(b.time);
          let overlap = (aStart === bStart);
          if(!overlap){
            const aDur = parseDurationMinutes(a.duration), bDur = parseDurationMinutes(b.duration);
            if(aDur && bDur) overlap = (aStart < bStart+bDur && bStart < aStart+aDur);
          }
          if(overlap){
            hasOverlap = true;
            const aTeam = teamOfAssignee(a.assignee, teamNames), bTeam = teamOfAssignee(b.assignee, teamNames);
            if(aTeam && bTeam && aTeam !== bTeam) crossTeamOverlap = true;
          }
        }
      }
      return { candidate: group[0].candidate, occurrences: group, hasOverlap, crossTeamOverlap };
    })
    .sort((a,b) => (b.crossTeamOverlap - a.crossTeamOverlap) || (b.hasOverlap - a.hasOverlap));
}

function renderSameDayDuplicatesSection(){
  const dupes = findSameDayDuplicateCandidates(state.rows);
  if(!dupes.length){
    return `<div class="hint" style="margin-bottom:14px">No candidate appears more than once in today's list.</div>`;
  }
  const rowsHtml = dupes.map(d=>{
    const label = d.crossTeamOverlap
      ? `<span class="notif-warn" style="color:var(--coral)">🔴 same time, booked by two different teams — likely an accidental duplicate</span>`
      : d.hasOverlap
      ? `<span class="notif-warn" style="color:var(--coral)">🔴 overlapping times — check before both go ahead</span>`
      : `<span class="notif-warn">⚠ appears ${d.occurrences.length}×</span>`;
    return `
    <div class="notif-row">
      <div class="notif-name">${escapeHtml(d.candidate)} ${label}</div>
      <div class="notif-detail">${d.occurrences.map(o=>`<span class="notif-chip">${escapeHtml(o.time||'time n/a')} \u2014 ${escapeHtml(o.round||'round n/a')}${o.assignee?' \u2014 '+escapeHtml(o.assignee):''}</span>`).join(' ')}</div>
    </div>
  `;}).join('');
  const overlapCount = dupes.filter(d=>d.hasOverlap).length;
  return `<div style="margin-bottom:16px">
    <div class="hint" style="margin-bottom:8px">${dupes.length} candidate(s) appear more than once today${overlapCount ? `, ${overlapCount} with overlapping times` : ''} — verify these are genuinely separate rounds, not a duplicate entry.</div>
    ${rowsHtml}
  </div>`;
}

function renderAbsentWarningsSection(){
  if(!state.absentIds.length){
    return `<div class="hint" style="margin-bottom:14px">No one is marked absent for ${escapeHtml(state.date)}.</div>`;
  }
  const absentPeople = state.roster.filter(p=>state.absentIds.includes(p.id));
  const affectedCalls = state.rows.filter(r=>{
    const p = state.roster.find(rp=>rp.name===r.assignee);
    return p && state.absentIds.includes(p.id);
  });
  const peopleHtml = absentPeople.map(p=>`<span class="notif-chip">🚫 ${escapeHtml(p.name)} (${escapeHtml(p.team)})</span>`).join(' ');
  const callsHtml = affectedCalls.length ? affectedCalls.map(r=>`
    <div class="notif-row">
      <div class="notif-name">${escapeHtml(r.candidate||'Candidate')} <span class="notif-warn">🚫 assigned to ${escapeHtml(r.assignee)}, who's absent</span></div>
      <div class="notif-detail"><span class="notif-chip">${escapeHtml(r.time||'time n/a')}</span><span class="notif-chip">${escapeHtml(r.company||'company n/a')}</span></div>
    </div>
  `).join('') : `<div class="hint">No calls are currently assigned to anyone marked absent — good.</div>`;
  return `<div style="margin-bottom:16px">
    <div class="hint" style="margin-bottom:8px">Marked absent today: ${peopleHtml}</div>
    ${affectedCalls.length ? `<div class="hint" style="margin-bottom:8px;color:var(--coral)">${affectedCalls.length} call(s) need reassigning:</div>` : ''}
    ${callsHtml}
  </div>`;
}

function renderRepeatClientsSection(){
  const repeatClients = findRepeatClients(state.rows);
  if(!repeatClients.length){
    return `<div class="hint" style="margin-bottom:14px">No client shows up more than once in ${state.date}'s calls yet.</div>`;
  }
  const rowsHtml = repeatClients.map(c=>`
    <div class="notif-row ${c.hasSameTimeOverlap?'notif-urgent':''}">
      <div class="notif-name">${escapeHtml(c.company)}${c.hasSameTimeOverlap?' <span class="notif-warn">⚠ same time slot</span>':''}</div>
      <div class="notif-detail">${c.occurrences.map(o=>`<span class="notif-chip">${escapeHtml(o.candidate)} @ ${escapeHtml(o.time)}${o.assignee?' \u2014 '+escapeHtml(o.assignee):''}</span>`).join(' ')}</div>
    </div>
  `).join('');
  return `<div style="margin-bottom:16px">
    <div class="hint" style="margin-bottom:8px">${repeatClients.length} client(s) have more than one candidate scheduled today${state.date?' ('+state.date+')':''}.</div>
    ${rowsHtml}
  </div>`;
}

function renderSummaryPanel(){
  const all = state.rows;
  const conflictIds = computeConflicts(all);
  const sum = summarize(all, conflictIds);
  const firstRound = all.filter(r=>!isAdvancedRound(r.round));
  const advanced = all.filter(r=>isAdvancedRound(r.round));
  const doubts = all.filter(r=>r.doubts && r.doubts.length>0);
  const healthEdu = all.filter(r=>classifyCompany(r.company));

  const teamNames = new Set(state.roster.map(p=>p.team));
  function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  }
  const teamCounts = {};
  all.forEach(r=>{
    if(r.woi || !r.assignee) return;
    const t = teamOf(r.assignee) || r.assignee;
    teamCounts[t] = (teamCounts[t]||0)+1;
  });
  const teamRows = Object.entries(teamCounts).sort((a,b)=>b[1]-a[1]).map(([team,count])=>
    `<div class="summary-detail-row"><span>${escapeHtml(team)}</span><span>${count}</span></div>`
  ).join('');

  // "At a glance" pulls together everything that's already computed
  // elsewhere for individual banners/panels (absences, overload, capacity
  // risk, long calls, repeat clients) into one place — meant to answer
  // "what does today actually look like" without opening five different
  // panels to piece it together.
  const absentCount = state.absentIds.length;
  const workloadWarnings = computeWorkloadWarnings(all);
  const capacityRisk = computeCapacityRiskWarnings();
  const longCalls = findLongFirstRoundCalls(all);
  const repeatClientsToday = findRepeatClients(all);
  const glanceLines = [
    { ok: absentCount === 0, text: absentCount ? `🚫 ${absentCount} absent today` : '✓ Full attendance today' },
    { ok: capacityRisk.length === 0, text: capacityRisk.length ? `🚨 ${capacityRisk.map(t=>`${t.name} down to ${t.capacity}/${t.total}`).join(', ')}` : '✓ No team is down to critical capacity' },
    { ok: workloadWarnings.length === 0, text: workloadWarnings.length ? `⚠ ${workloadWarnings.map(w=>`${w.name} has ${w.count} calls (avg ${w.avg})`).join(', ')}` : '✓ No one is carrying a lopsided load' },
    { ok: longCalls.length === 0, text: longCalls.length ? `⏱ ${longCalls.length} 1st round call(s) running over 30 min` : '✓ No unusually long 1st round calls' },
    { ok: repeatClientsToday.length === 0, text: repeatClientsToday.length ? `🏢 ${repeatClientsToday.length} client(s) have more than one candidate today` : '✓ No client double-booked today' },
  ];
  const glanceHtml = glanceLines.map(l=>`<div class="summary-detail-row" style="${l.ok?'':'color:var(--amber)'}"><span>${escapeHtml(l.text)}</span></div>`).join('');

  return `<div class="import-panel summary-panel">
    <div class="strip-title" style="margin-bottom:12px"><span>📊 Daily Summary — ${escapeHtml(state.date)}</span>
      <span style="display:flex;gap:6px"><button class="btn ghost" id="copyDailySummaryBtn" style="font-size:11.5px">📋 Copy Daily</button><button class="btn ghost" id="copyWeeklySummaryBtn" style="font-size:11.5px">📋 Copy Weekly</button><button class="btn ghost" id="shareWhatsAppBtn" style="font-size:11.5px" title="Opens WhatsApp with the daily summary pre-filled — WhatsApp's own official share link, nothing automated">💬 Share via WhatsApp</button></span>
    </div>
    <div class="strip-title" style="margin-bottom:6px"><span>🚦 Today at a Glance</span></div>
    ${glanceHtml}
    <div class="summary-big-grid" style="margin-top:14px">
      <div class="summary-big-cell"><div class="summary-big-num">${sum.total}</div><div class="summary-big-lbl">Total Calls</div></div>
      <div class="summary-big-cell sbg-teal"><div class="summary-big-num">${sum.assigned}</div><div class="summary-big-lbl">Assigned</div></div>
      <div class="summary-big-cell sbg-coral"><div class="summary-big-num">${sum.unassigned}</div><div class="summary-big-lbl">Unassigned</div></div>
      <div class="summary-big-cell sbg-amber"><div class="summary-big-num">${sum.woi}</div><div class="summary-big-lbl">WOI</div></div>
      <div class="summary-big-cell sbg-violet"><div class="summary-big-num">${sum.conflicts}</div><div class="summary-big-lbl">Conflicts</div></div>
    </div>
    <div class="summary-detail-row"><span>1st Round</span><span>${firstRound.length}</span></div>
    <div class="summary-detail-row"><span>2nd Round & Above</span><span>${advanced.length}</span></div>
    <div class="summary-detail-row"><span>⚕🎓 Healthcare/Education</span><span>${healthEdu.length}</span></div>
    <div class="summary-detail-row"><span>❔ Doubts needing review</span><span>${doubts.length}</span></div>
    <div class="strip-title" style="margin:14px 0 6px;border-top:1px solid var(--border);padding-top:12px"><span>By Team</span></div>
    ${teamRows || '<div class="hint">No assignments yet.</div>'}
    <div id="summaryCopyToast" class="hint" style="margin-top:10px;display:none"></div>
  </div>`;
}
// Plain-text (not WhatsApp-bold-formatted) summary meant for pasting into an
// email or a status message — distinct from buildTeamGroupedExportText,
// which is specifically shaped for sharing the call list itself.
function buildDailySummaryText(dateKey, rows){
  const conflictIds = computeConflicts(rows);
  const sum = summarize(rows, conflictIds);
  const firstRound = rows.filter(r=>!isAdvancedRound(r.round)).length;
  const advanced = rows.filter(r=>isAdvancedRound(r.round)).length;
  const doubts = rows.filter(r=>r.doubts && r.doubts.length>0).length;
  const healthEdu = rows.filter(r=>classifyCompany(r.company)).length;
  const teamNames = new Set(state.roster.map(p=>p.team));
  function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  }
  const teamCounts = {};
  rows.forEach(r=>{
    if(r.woi || !r.assignee) return;
    const t = teamOf(r.assignee) || r.assignee;
    teamCounts[t] = (teamCounts[t]||0)+1;
  });
  const teamLines = Object.entries(teamCounts).sort((a,b)=>b[1]-a[1]).map(([t,c])=>`  ${t}: ${c}`);
  // Only meaningful for dateKey === state.date — absences, capacity risk,
  // and today's workload are all tied to today's live state, not to
  // whichever date's rows happen to be passed in. This function is only
  // ever called with (state.date, state.rows), so that always holds, but
  // it's guarded explicitly anyway rather than silently assuming a caller
  // never changes.
  const glanceLines = [];
  if(dateKey === state.date){
    const absentCount = state.absentIds.length;
    const workloadWarnings = computeWorkloadWarnings(rows);
    const capacityRisk = computeCapacityRiskWarnings();
    const longCalls = findLongFirstRoundCalls(rows);
    const repeatClientsToday = findRepeatClients(rows);
    glanceLines.push(
      '',
      'Today at a Glance:',
      `  ${absentCount ? `${absentCount} absent today` : 'Full attendance today'}`,
      `  ${capacityRisk.length ? capacityRisk.map(t=>`${t.name} down to ${t.capacity}/${t.total}`).join(', ') : 'No team down to critical capacity'}`,
      `  ${workloadWarnings.length ? workloadWarnings.map(w=>`${w.name} has ${w.count} calls (avg ${w.avg})`).join(', ') : 'No one carrying a lopsided load'}`,
      `  ${longCalls.length ? `${longCalls.length} 1st round call(s) running over 30 min` : 'No unusually long 1st round calls'}`,
      `  ${repeatClientsToday.length ? `${repeatClientsToday.length} client(s) have more than one candidate today` : 'No client double-booked today'}`
    );
  }
  return [
    `Coverage Desk — Daily Summary for ${dateKey}`,
    `Total calls: ${sum.total}`,
    `Assigned: ${sum.assigned} | Unassigned: ${sum.unassigned} | WOI: ${sum.woi}`,
    `Conflicts: ${sum.conflicts}`,
    `1st Round: ${firstRound} | 2nd Round & Above: ${advanced}`,
    `Healthcare/Education: ${healthEdu}`,
    `Doubts needing review: ${doubts}`,
    ...glanceLines,
    '',
    'By Team:',
    ...(teamLines.length ? teamLines : ['  No assignments yet.'])
  ].join('\n');
}
async function buildWeeklySummaryText(endDateKey){
  const dates = [];
  const end = new Date(endDateKey+'T00:00:00');
  for(let i=6;i>=0;i--){
    const d = new Date(end); d.setDate(d.getDate()-i);
    dates.push(d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'));
  }
  const perDateRows = await Promise.all(dates.map(async d=>{
    if(d === state.date) return state.rows;
    if(API_BASE_URL){
      try{ const data = await apiCall('calls', {qs:'date='+d}); return data.rows || []; }catch(e){ return []; }
    }
    try{
      const r = await storageAdapter.get('day:'+d, false);
      const parsed = r && r.value ? JSON.parse(r.value) : null;
      return Array.isArray(parsed) ? parsed : (parsed && parsed.rows) || [];
    }catch(e){ return []; }
  }));
  let totalAll = 0, totalAssigned = 0, totalUnassigned = 0, totalWoi = 0, totalConflicts = 0;
  const dayLines = dates.map((d,i)=>{
    const rows = perDateRows[i] || [];
    const conflictIds = computeConflicts(rows);
    const sum = summarize(rows, conflictIds);
    totalAll += sum.total; totalAssigned += sum.assigned; totalUnassigned += sum.unassigned;
    totalWoi += sum.woi; totalConflicts += sum.conflicts;
    return `  ${d}: ${sum.total} calls (${sum.assigned} assigned, ${sum.unassigned} unassigned, ${sum.woi} WOI)`;
  });
  return [
    `Coverage Desk — Weekly Summary (${dates[0]} to ${dates[dates.length-1]})`,
    `Total calls: ${totalAll}`,
    `Assigned: ${totalAssigned} | Unassigned: ${totalUnassigned} | WOI: ${totalWoi} | Conflicts: ${totalConflicts}`,
    '',
    'By day:',
    ...dayLines
  ].join('\n');
}

function renderUsersPanel(){
  const createFormHtml = state.showCreateUserForm ? `
    <div class="add-row" style="margin-top:12px">
      <input type="text" id="newUserName" placeholder="Username…" style="flex:1">
      <input type="password" id="newUserPw" placeholder="Password…" style="flex:1;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:8px;font-size:13px">
      <select id="newUserRole" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);flex:none;width:auto">
        <option value="user">User (read-only)</option>
        <option value="team_lead">Team Lead (can set Driving Person only)</option>
        <option value="admin">Admin</option>
      </select>
      <button class="btn primary" id="addUserBtn">Create</button>
    </div>
  ` : '';

  let listHtml = '';
  if(state.usersList !== null){
    const rowsHtml = state.usersList.map(u=>`
      <div class="user-row">
        <span class="user-name">${escapeHtml(u.username)}</span>
        <select class="cell-input user-role-select" data-id="${u.id}" style="background:var(--surface-2);border:1px solid var(--border);width:auto;flex:none">
          <option value="user" ${u.role==='user'?'selected':''}>User (read-only)</option>
          <option value="team_lead" ${u.role==='team_lead'?'selected':''}>Team Lead (Driving Person only)</option>
          <option value="admin" ${u.role==='admin'?'selected':''}>Admin (read + write)</option>
        </select>
        <button class="btn ghost user-reset-btn" data-id="${u.id}" data-username="${escapeHtml(u.username)}" style="font-size:11.5px">Reset password</button>
        <button class="btn ghost user-delete-btn" data-id="${u.id}" style="color:var(--coral);font-size:11.5px">Remove</button>
      </div>
    `).join('');
    listHtml = `<div class="users-list" style="margin-top:12px">${rowsHtml || '<div class="hint">No accounts exist yet.</div>'}</div>`;
  }

  return `<div class="import-panel">
    <div class="strip-title" style="margin-bottom:8px"><span>👥 Manage Users</span></div>
    <div class="hint" style="margin-bottom:10px">"Admin" can view and edit everything and manage other users. "User" can only view — no editing, no saving.</div>
    <div class="toolbar" style="margin:0">
      <button class="btn primary" id="toggleCreateUserBtn">➕ Create User</button>
      <button class="btn" id="loadUsersBtn">👥 Load Users (view / edit permissions)</button>
    </div>
    ${createFormHtml}
    ${listHtml}
    ${state.usersError ? `<div style="color:var(--coral);font-size:12.5px;margin-top:8px">${escapeHtml(state.usersError)}</div>` : ''}
  </div>`;
}

function renderDbSettingsPanel(){
  return `<div class="import-panel">
    <div class="strip-title" style="margin-bottom:8px"><span>Connect a MySQL database (via your Vercel backend)</span></div>
    <div class="hint" style="margin-bottom:10px">
      This connects to the shared team database by default (${escapeHtml(DEFAULT_API_BASE_URL)}) — everyone who opens
      this app sees the same live data automatically, no setup needed. Only change this if you want to point at a different backend.
      Leave blank and save to disconnect and use this browser's local storage instead.
    </div>
    <div class="add-row" style="margin-top:0">
      <input type="text" id="apiUrlInput" placeholder="${escapeHtml(DEFAULT_API_BASE_URL)}" value="${escapeHtml(API_BASE_URL)}" style="flex:1;min-width:220px">
      <button class="btn primary" id="saveApiUrl">Save</button>
      <button class="btn" id="testApiUrl">Test connection</button>
    </div>
    <div id="apiTestResult" style="margin-top:10px;font-size:12.5px;"></div>
    <div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
      <button class="btn" id="backupAllBtn" ${state.backingUp?'disabled':''}>${state.backingUp?'⬇ Preparing backup…':'⬇ Backup all data (every date)'}</button>
      <div class="hint" style="margin-top:8px">Downloads every date you've ever saved — calls, roster, notes — as one file, for safekeeping outside this app.</div>
    </div>
    ${(ADMIN_PASSWORD || CURRENT_USERNAME) ? `<div style="margin-top:14px;border-top:1px solid var(--border);padding-top:12px">
      <div class="hint" style="margin-bottom:8px">Logged in as: <strong>${escapeHtml(CURRENT_USERNAME || 'Admin (master password)')} — ${CURRENT_ROLE==='admin'?'Admin':CURRENT_ROLE==='team_lead'?'Team Lead':'User (read-only)'}</strong></div>
      <button class="btn ghost" id="logoutBtn" style="color:var(--coral)">🚪 Log out</button>
    </div>` : ''}
  </div>`;
}

function renderLongDurationSection(){
  const flagged = findLongFirstRoundCalls(state.rows);
  if(!flagged.length){
    return `<div class="hint">No 1st round calls over 30 minutes today.</div>`;
  }
  const priorityCount = flagged.filter(f=>f.category).length;
  const rowsHtml = flagged.map(f=>`
    <div class="notif-row ${f.category?'notif-urgent':''}">
      <div class="notif-name">${escapeHtml(f.row.candidate||'Candidate')}${f.category?` <span class="notif-warn">${f.category==='Healthcare'?'⚕':'🎓'} ${f.category}</span>`:''}</div>
      <div class="notif-detail"><span class="notif-chip">${escapeHtml(f.row.time||'time n/a')}</span><span class="notif-chip">${escapeHtml(f.row.duration)}</span><span class="notif-chip">${escapeHtml(f.row.company||'company n/a')}</span>${f.row.assignee?`<span class="notif-chip">${escapeHtml(f.row.assignee)}</span>`:''}</div>
    </div>
  `).join('');
  return `<div class="hint" style="margin-bottom:8px">${flagged.length} 1st round call(s) over 30 min${priorityCount?`, ${priorityCount} at a Healthcare/Education client — flagged first`:''}.</div>${rowsHtml}`;
}

// Focused view for double-bookings: shows each conflicting pair side by
// side with a "reassign to" dropdown pre-filled with who's actually free
// at that exact time — resolving one is a single select-and-done instead
// of hunting the pair down in the main table and cross-checking the roster
// by hand.
function renderConflictsPanel(){
  const pairs = computeConflictPairs(state.rows);
  if(!pairs.length){
    return `<div class="import-panel"><div class="empty-state"><h3>No conflicts right now</h3><p>Nobody on today's list is double-booked.</p></div></div>`;
  }
  const rowsHtml = pairs.map((pair, idx)=>{
    const freeForA = findFreePeopleAtTime(pair.a.time, isAdvancedRound(pair.a.round));
    const freeForB = findFreePeopleAtTime(pair.b.time, isAdvancedRound(pair.b.round));
    const optsFor = (free)=> free.length
      ? free.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('')
      : `<option value="" disabled>No one free right now</option>`;
    return `<div class="conflict-pair-card" data-pair="${idx}">
      <div class="conflict-pair-title">⚠ ${escapeHtml(pair.assignee)} is double-booked</div>
      <div class="conflict-pair-row">
        <div class="conflict-pair-info">
          <b>${escapeHtml(pair.a.candidate||'Candidate')}</b> — ${escapeHtml(pair.a.time||'time n/a')}${pair.a.company?' · '+escapeHtml(pair.a.company):''}${pair.a.duration?' · '+escapeHtml(pair.a.duration):''}
        </div>
        <select class="conflict-reassign" data-row-id="${pair.a.id}">
          <option value="">Reassign to…</option>
          ${optsFor(freeForA)}
        </select>
      </div>
      <div class="conflict-pair-row">
        <div class="conflict-pair-info">
          <b>${escapeHtml(pair.b.candidate||'Candidate')}</b> — ${escapeHtml(pair.b.time||'time n/a')}${pair.b.company?' · '+escapeHtml(pair.b.company):''}${pair.b.duration?' · '+escapeHtml(pair.b.duration):''}
        </div>
        <select class="conflict-reassign" data-row-id="${pair.b.id}">
          <option value="">Reassign to…</option>
          ${optsFor(freeForB)}
        </select>
      </div>
    </div>`;
  }).join('');
  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:12px">${pairs.length} conflict(s) found. Pick a replacement for either call in each pair — the dropdown only lists people who are actually free at that exact time.</div>
    ${rowsHtml}
  </div>`;
}

// A single box that scans candidate, company, AND assignee together across
// every saved date at once — meant to be the first place to check "have I
// seen this person/company before, anywhere", instead of having to first
// decide whether that's a job for Client History Search (company-only,
// fuzzy-normalized) or the All Dates browse list (today's date range only
// unless you load everything). Deliberately a plain case-insensitive
// substring match on all three fields rather than fuzzy normalization —
// simpler to reason about for a "search everything" box, and the other two
// panels remain available for their more specific fuzzy-matching behavior.
// Shared by the full 🔎 Search Everywhere panel and the 🔍 Quick Search
// modal below — both need the exact same search-across-every-date logic
// against the exact same state fields, so a person can start typing in
// one and see the identical result if they open the other.
async function executeUniversalSearch(query){
  const q = (query||'').trim();
  state.universalSearchQuery = q;
  if(!q){ state.universalSearchResults = []; render(); return; }
  state.universalSearchLoading = true;
  render();
  const allRows = await fetchAllRowsAcrossDates(true);
  let results;
  if(state.universalSearchCompanyOnly){
    const qKey = normalizeCompanyKey(q);
    results = allRows.filter(r => r.company && normalizeCompanyKey(r.company).includes(qKey));
  } else {
    const qLower = q.toLowerCase();
    results = allRows.filter(r => (r.candidate||'').toLowerCase().includes(qLower) || (r.company||'').toLowerCase().includes(qLower) || (r.assignee||'').toLowerCase().includes(qLower));
  }
  results.sort((a,b)=> b._date.localeCompare(a._date) || String(b.time||'').localeCompare(String(a.time||'')));
  state.universalSearchResults = results;
  state.universalSearchLoading = false;
  render();
}
function renderUniversalSearchPanel(){
  const q = (state.universalSearchQuery||'').trim();
  let body;
  if(state.universalSearchLoading){
    body = `<div class="hint">Searching every saved date…</div>`;
  } else if(state.universalSearchResults === null){
    body = `<div class="hint">Type a candidate name, company, or assignee — this checks every date you've ever saved calls for, not just today.</div>`;
  } else if(state.universalSearchResults.length === 0){
    body = `<div class="hint">No calls found matching "${escapeHtml(q)}".</div>`;
  } else {
    const rowsHtml = state.universalSearchResults.map(r=>`
      <div class="notif-row">
        <div class="notif-name" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
          <span>${escapeHtml(r.candidate||'Candidate')}${r.status?` <span class="notif-warn" style="color:${statusBadgeInfo(r.status).colorVar}">${statusBadgeInfo(r.status).icon} ${statusBadgeInfo(r.status).label}</span>`:''}</span>
          <span style="display:flex;gap:6px;flex-shrink:0">
            ${r.candidate ? `<button class="btn ghost" data-view-timeline-closure="${escapeHtml(r.candidate)}" data-company="${escapeHtml(r.company||'')}" style="font-size:11px;padding:4px 10px">🏆 Closure</button>` : ''}
            ${r.candidate ? `<button class="btn ghost" data-view-timeline="${escapeHtml(r.candidate)}" style="font-size:11px;padding:4px 10px">📋 Timeline</button>` : ''}
          </span>
        </div>
        <div class="notif-detail">
          <span class="notif-chip">${escapeHtml(r._date)}</span>
          <span class="notif-chip">${escapeHtml(r.time||'time n/a')}</span>
          <span class="notif-chip">${escapeHtml(r.company||'no company')}</span>
          <span class="notif-chip">${escapeHtml(r.round||'round n/a')}</span>
          ${r.assignee?`<span class="notif-chip">${escapeHtml(r.assignee)}</span>`:''}
        </div>
      </div>
    `).join('');
    const uniqueCandidates = new Set(state.universalSearchResults.map(r=>(r.candidate||'').trim().toLowerCase()).filter(Boolean)).size;
    const uniqueDates = new Set(state.universalSearchResults.map(r=>r._date)).size;
    body = `<div class="hint" style="margin-bottom:10px">${state.universalSearchResults.length} call(s) across ${uniqueDates} date(s)${uniqueCandidates?`, ${uniqueCandidates} matching candidate(s)`:''}, most recent first.</div>${rowsHtml}`;
  }
  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:10px">${state.universalSearchCompanyOnly ? 'Company-only mode: fuzzy-matches client/company names (tolerates slightly different spelling or punctuation).' : 'Searches candidate, company, and assignee together, across every saved date.'}</div>
    <div class="add-row" style="margin-top:0;margin-bottom:12px">
      <input type="text" id="universalSearchInput" placeholder="${state.universalSearchCompanyOnly ? 'Client / company name…' : 'Candidate, company, or assignee…'}" value="${escapeHtml(state.universalSearchQuery||'')}" style="flex:1">
      <button class="btn primary" id="runUniversalSearchBtn">🔎 Search</button>
    </div>
    <label style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--text-muted);margin:-6px 0 14px;cursor:pointer">
      <input type="checkbox" id="universalSearchCompanyOnlyToggle" ${state.universalSearchCompanyOnly?'checked':''}>
      Company only (fuzzy match) — for looking up a client's history specifically
    </label>
    ${body}
  </div>`;
}
// ---------- Quick Search modal (2026-09-28) ---------- Saiteja's report:
// checking a candidate's round history currently means leaving whatever
// page he's on (🔎 Search Everywhere replaces the whole screen, same as
// every other panel), searching, then navigating back to find and assign
// the call he actually came from — losing his place every single time.
// This is a genuine floating overlay instead — same pattern as the
// existing swipe-assign picker (.my-name-picker-overlay) below, which
// already proved out "shows on top of whatever's on screen, closes back to
// exactly where you were, no navigation" for that picker. Deliberately
// shares state.universalSearchQuery/Results/Loading with the full panel
// above (via the shared executeUniversalSearch()) rather than keeping its
// own copy, so searching in one place is reflected in the other too.
// Today's matches get a real inline "Assigned to" dropdown, wired through
// the exact same delegated change handler every other assignee dropdown
// uses (see the `data-quicksearch-id` case in handleFieldEvent below) — so
// picking a name here is a real, saved assignment, not a preview. A match
// from a different date can't be safely edited from here (that date's rows
// aren't loaded into state), so it gets a "Go to that date" jump instead —
// still one click, still from inside the same search, never a dead end.
function renderQuickSearchModal(){
  const q = (state.universalSearchQuery||'').trim();
  let body;
  if(state.universalSearchLoading){
    body = `<div class="hint">Searching every saved date…</div>`;
  } else if(state.universalSearchResults === null){
    body = `<div class="hint">Type a candidate, company, or assignee — checks every date you've ever saved. A match on today's board can be assigned right here.</div>`;
  } else if(state.universalSearchResults.length === 0){
    body = `<div class="hint">No calls found matching "${escapeHtml(q)}".</div>`;
  } else {
    const rowsHtml = state.universalSearchResults.map(r=>{
      const isToday = r._date === state.date;
      return `
      <div class="notif-row">
        <div class="notif-name" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
          <span>${escapeHtml(r.candidate||'Candidate')}${r.status?` <span class="notif-warn" style="color:${statusBadgeInfo(r.status).colorVar}">${statusBadgeInfo(r.status).icon} ${statusBadgeInfo(r.status).label}</span>`:''}</span>
          <span style="display:flex;gap:6px;flex-shrink:0">
            ${r.candidate ? `<button class="btn ghost" data-view-timeline-closure="${escapeHtml(r.candidate)}" data-company="${escapeHtml(r.company||'')}" style="font-size:11px;padding:4px 10px">🏆 Closure</button>` : ''}
            ${r.candidate ? `<button class="btn ghost" data-quicksearch-view-timeline="${escapeHtml(r.candidate)}" style="font-size:11px;padding:4px 10px">📋 Timeline</button>` : ''}
          </span>
        </div>
        <div class="notif-detail">
          <span class="notif-chip">${escapeHtml(r._date)}${isToday?' (today)':''}</span>
          <span class="notif-chip">${escapeHtml(r.time||'time n/a')}</span>
          <span class="notif-chip">${escapeHtml(r.company||'no company')}</span>
          <span class="notif-chip">${escapeHtml(r.round||'round n/a')}</span>
          ${(!isToday && r.assignee) ? `<span class="notif-chip">${escapeHtml(r.assignee)}</span>` : ''}
        </div>
        <div style="margin-top:6px">
          ${isToday
            ? `<div data-quicksearch-id="${escapeHtml(r.id)}">
                 <select class="cell-input ${(!r.assignee && !r.woi)?'empty':''}" data-field="assignee" ${r.woi?'disabled':''} style="width:100%">
                   <option value="">${r.woi?'— WOI —':'— unassigned —'}</option>
                   ${buildRosterOptions(r.round, r.assignee)}
                 </select>
               </div>`
            : `<button class="btn ghost" data-jump-to-quick-search-date="${escapeHtml(r._date)}" style="font-size:11.5px;padding:5px 10px">📅 Go to ${escapeHtml(r._date)} to assign →</button>`
          }
        </div>
      </div>
    `;
    }).join('');
    const uniqueDates = new Set(state.universalSearchResults.map(r=>r._date)).size;
    body = `<div class="hint" style="margin-bottom:10px">${state.universalSearchResults.length} call(s) across ${uniqueDates} date(s), most recent first.</div>${rowsHtml}`;
  }
  return `<div class="my-name-picker-overlay" id="quickSearchOverlay">
    <div class="my-name-picker-card quick-search-card">
      <div class="my-name-picker-title" style="display:flex;justify-content:space-between;align-items:center;gap:10px">
        <span>🔍 Quick Search</span>
        <button class="btn ghost" id="closeQuickSearchBtn" style="font-size:12px;padding:4px 10px;flex-shrink:0">✕ Close</button>
      </div>
      <div class="my-name-picker-sub">Search any date without leaving this page — a match on today's board can be assigned right here.</div>
      <div class="add-row" style="margin:10px 0 8px">
        <input type="text" id="quickSearchInput" placeholder="Candidate, company, or assignee…" value="${escapeHtml(state.universalSearchQuery||'')}" style="flex:1">
        <button class="btn primary" id="runQuickSearchBtn">Search</button>
      </div>
      <div class="my-name-picker-list">${body}</div>
    </div>
  </div>`;
}
// "..." quick-action sheet for a single call card (mobile) — the fewer-
// taps alternative to the swipe gesture: reassign, mark a status, jump to
// that candidate's Timeline, or delete, all from one tap on the ⋯ button
// instead of remembering which direction to swipe for which action (and
// swipe only ever covered assign/delete — there was never a swipe-based
// way to mark a status or open the Timeline at all). Reuses the same
// .my-name-picker-overlay/-card bottom-sheet chrome the swipe-assign
// picker and Quick Search already use, but its own .quick-action-item
// class for the buttons themselves — see the CSS comment above for why
// that has to be a distinct class, not a shared one.
//
// Always reads the row live from state.rows (never a snapshot), so if
// something else changes or removes the row while this happens to still
// be open, the sheet reflects that rather than acting on stale data.
// ---------- Quick-jump command bar (added 2026-09-30) ----------
// Ctrl/Cmd+K. A step beyond 🔍 Quick Search (which only ever finds a
// candidate) — this also reaches a specific date or a specific panel/tool
// without going through the header menus at all. Three things it can match
// against, checked together on every keystroke: a parsed date (see
// parseQuickJumpDate below), a fixed list of named commands (substring
// match against the label), and — same as Quick Search — a live cross-date
// candidate/company search, debounced and capped at 6 results so it never
// turns into a second full search panel.
const QUICK_JUMP_COMMANDS = [
  { label: '📥 Import calls', keywords: 'import paste new calls', action: ()=>{ closeAllPanels(); state.showImport = true; } },
  { label: '🏆 Closures', keywords: 'closures closure job offers placements', action: ()=>{ openOnlyPanel('showClosures'); } },
  { label: '🎯 Expected Closures', keywords: 'expected closures expect follow up followup reminder flag', action: ()=>{ openOnlyPanel('showExpectedClosures'); if(!state.expectedClosuresLoaded) loadExpectedClosures(); } },
  { label: '🔔 Notifications', keywords: 'notifications notif absent absences', action: ()=>{ openOnlyPanel('showNotifications'); } },
  { label: '🩺 Data Health', keywords: 'data health triage unmatched stale', action: ()=>{
    const wasOpen = state.showDataHealth;
    openOnlyPanel('showDataHealth');
    if(!wasOpen && (state.closuresPerformance===null || state.woiAgingData===null || state.stuckPipelineData===null || state.finalRoundNudgeData===null)) runDataHealthScan();
  } },
  { label: "📋 Today's Briefing", keywords: 'briefing digest today', action: ()=>{
    const wasOpen = state.showDailyDigest;
    openOnlyPanel('showDailyDigest');
    if(!wasOpen && (state.closuresPerformance===null || state.woiAgingData===null || state.stuckPipelineData===null || state.finalRoundNudgeData===null)) runDataHealthScan();
  } },
  { label: '🌙 End-of-Day Wrap-Up', keywords: 'wrapup wrap up end of day eod', action: ()=>{
    openOnlyPanel('showEodWrapup');
    if(!state.tomorrowPreview && !state.tomorrowPreviewLoading) loadTomorrowPreview();
  } },
  { label: '🗓️ Calendar', keywords: 'calendar month view', action: ()=>{ openOnlyPanel('showCalendarView'); } },
  { label: '🏢 Company Scorecard', keywords: 'company scorecard client reliability', action: ()=>{ openOnlyPanel('showCompanyScorecard'); } },
  { label: '🗓️ All Dates', keywords: 'all dates history', action: ()=>{ openOnlyPanel('showAllDates'); } },
  { label: '🎓 Students Master', keywords: 'students master', action: ()=>{ openOnlyPanel('showStudentsMaster'); } },
  { label: '📡 Team Sync', keywords: 'team sync portal', action: ()=>{ openOnlyPanel('showPortalSync'); } },
  { label: '❔ Help & Shortcuts', keywords: 'help shortcuts keyboard', action: ()=>{ openOnlyPanel('showHelp'); } },
  { label: '🏠 Home / board', keywords: 'home board close', action: ()=>{ closeAllPanels(); } },
];
function parseQuickJumpDate(text){
  const t = (text||'').trim().toLowerCase();
  if(!t) return null;
  if(t === 'today') return todayDateString();
  if(t === 'tomorrow') return addDaysToDateStr(todayDateString(), 1);
  if(t === 'yesterday') return addDaysToDateStr(todayDateString(), -1);
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/); // ISO
  if(m){
    const y=+m[1], mo=+m[2], d=+m[3];
    if(mo>=1 && mo<=12 && d>=1 && d<=31) return `${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }
  m = t.match(/^(\d{1,2})\/(\d{1,2})(?:\/(\d{2,4}))?$/); // MM/DD[/YYYY]
  if(m){
    const mo=+m[1], d=+m[2];
    const y = m[3] ? (m[3].length===2 ? 2000+(+m[3]) : +m[3]) : new Date().getFullYear();
    if(mo>=1 && mo<=12 && d>=1 && d<=31) return `${y}-${String(mo).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }
  const months = ['jan','feb','mar','apr','may','jun','jul','aug','sep','oct','nov','dec'];
  m = t.match(/^([a-z]{3,9})\.?\s+(\d{1,2})(?:,?\s*(\d{4}))?$/); // "aug 12", "august 12 2026"
  if(m){
    const monIdx = months.findIndex(mo=>m[1].startsWith(mo));
    if(monIdx>=0){
      const d=+m[2];
      const y = m[3] ? +m[3] : new Date().getFullYear();
      if(d>=1 && d<=31) return `${y}-${String(monIdx+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    }
  }
  return null;
}
let quickJumpSearchTimer = null;
function runQuickJumpSearch(q){
  clearTimeout(quickJumpSearchTimer);
  const query = (q||'').trim();
  if(query.length < 2){ state.quickJumpResults = null; state.quickJumpLoading = false; render(); return; }
  quickJumpSearchTimer = setTimeout(async ()=>{
    state.quickJumpLoading = true;
    render();
    const allRows = await fetchAllRowsAcrossDates(false); // cached is fine here — this is a lookup aid, not a data-integrity-sensitive read
    const qLower = query.toLowerCase();
    let results = allRows.filter(r => (r.candidate||'').toLowerCase().includes(qLower) || (r.company||'').toLowerCase().includes(qLower));
    results.sort((a,b)=> b._date.localeCompare(a._date));
    state.quickJumpResults = results.slice(0,6);
    state.quickJumpLoading = false;
    render();
  }, 250);
}
function renderQuickJumpOverlay(){
  const q = state.quickJumpQuery||'';
  const qLower = q.trim().toLowerCase();
  const matchedCommands = qLower ? QUICK_JUMP_COMMANDS.filter(c=>c.label.toLowerCase().includes(qLower) || c.keywords.includes(qLower)) : QUICK_JUMP_COMMANDS.slice(0,6);
  const parsedDate = parseQuickJumpDate(q);
  return `<div class="my-name-picker-overlay" id="quickJumpOverlay">
    <div class="my-name-picker-card" style="max-width:480px;width:92vw;max-height:74vh;display:flex;flex-direction:column">
      <div class="my-name-picker-title">⌘ Quick Jump</div>
      <input type="text" id="quickJumpInput" placeholder="A date, a command, or a candidate/company…" value="${escapeHtml(q)}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);border-radius:8px;padding:10px 12px;font-size:14px;margin:8px 0;font-family:inherit" autocomplete="off">
      <div class="my-name-picker-list" style="overflow-y:auto;flex:1">
        ${parsedDate ? `<button class="quick-action-item" data-qj-date="${parsedDate}">📅 Go to ${escapeHtml(parsedDate)}</button>` : ''}
        ${matchedCommands.map(c=>`<button class="quick-action-item" data-qj-cmd="${escapeHtml(c.label)}">${c.label}</button>`).join('')}
        ${!matchedCommands.length && !parsedDate && !qLower ? `<div class="hint" style="padding:6px 4px">Start typing…</div>` : ''}
        ${state.quickJumpLoading ? `<div class="hint" style="padding:10px 4px">Searching calls…</div>` : ''}
        ${(state.quickJumpResults && state.quickJumpResults.length) ? `
          <div class="quick-action-status-label">Calls</div>
          ${state.quickJumpResults.map(r=>`<button class="quick-action-item" data-qj-candidate="${escapeHtml(r.candidate||'')}">📋 ${escapeHtml(r.candidate||'(no name)')}${r.company?' — '+escapeHtml(r.company):''} <span style="opacity:.6">(${escapeHtml(r._date)})</span></button>`).join('')}
        ` : ''}
        ${(qLower.length>=2 && state.quickJumpResults && !state.quickJumpResults.length && !state.quickJumpLoading) ? `<div class="hint" style="padding:10px 4px">No matching calls found.</div>` : ''}
      </div>
      <button class="btn ghost" id="quickJumpCancel" style="margin-top:10px;width:100%">Cancel</button>
    </div>
  </div>`;
}
function renderQuickActionSheet(){
  const row = state.rows.find(r=>r.id===state.quickActionRowId);
  if(!row) return '';
  const canEdit = CURRENT_ROLE !== 'user';
  const statusOptions = [
    { v:'rescheduled', icon:'↻', label:'Rescheduled' },
    { v:'cancelled', icon:'✕', label:'Cancelled' },
    { v:'not_responded', icon:'☎', label:'Not Responded' },
    { v:'no_invite', icon:'📨', label:'No Invite' },
  ];
  return `<div class="my-name-picker-overlay" id="quickActionSheetOverlay">
    <div class="my-name-picker-card">
      <div class="my-name-picker-title">${escapeHtml(row.candidate||'(no name)')}</div>
      <div class="my-name-picker-sub">${escapeHtml(row.time||'')}${row.company?' — '+escapeHtml(row.company):''}${row.status?` · currently ${escapeHtml(statusBadgeInfo(row.status).icon+' '+statusBadgeInfo(row.status).label)}`:''}</div>
      <div class="my-name-picker-list">
        ${canEdit ? `<button class="quick-action-item" data-qa="assign" data-id="${row.id}"><span>🔁 Assign / Reassign</span><span>›</span></button>` : ''}
        <button class="quick-action-item" data-qa="timeline" data-id="${row.id}"><span>📋 View Timeline</span><span>›</span></button>
        ${canEdit ? `<button class="quick-action-item" data-qa="expectclosure" data-id="${row.id}"><span>🎯 Flag as Expected Closure</span><span>›</span></button>` : ''}
        ${canEdit ? `<div class="quick-action-status-label">Mark status</div>
        <div class="quick-action-status-row">
          ${statusOptions.map(s=>`<button class="quick-action-status-chip" data-qa="status" data-status="${s.v}" data-id="${row.id}">${s.icon} ${escapeHtml(s.label)}</button>`).join('')}
        </div>` : ''}
        ${(canEdit && row.status) ? `<button class="quick-action-item" data-qa="clearstatus" data-id="${row.id}"><span>Clear current status</span></button>` : ''}
        ${canEdit ? `<button class="quick-action-item" data-qa="delete" data-id="${row.id}" style="color:var(--coral)"><span>🗑 Delete call</span></button>` : ''}
        <button class="quick-action-item" data-qa="cancel"><span>Cancel</span></button>
      </div>
    </div>
  </div>`;
}
// Small note-capture overlay for the 🎯 "flag as expected closure" action
// (added 2026-10-01) — same floating-overlay pattern as the swipe-assign
// picker and quick-action sheet above, opened from either the 🎯 button in
// the desktop Actions column or "🎯 Flag as Expected Closure" in the
// mobile ⋯ sheet. Deliberately just one free-text note field (what the
// handler/driving person actually said) rather than a longer form — the
// whole point is this takes a few seconds, right after the call, not a
// second data-entry chore.
function renderExpectClosureNoteSheet(){
  const row = state.rows.find(r=>r.id===state.expectClosureRowId);
  if(!row) return '';
  return `<div class="my-name-picker-overlay" id="expectClosureSheetOverlay">
    <div class="my-name-picker-card">
      <div class="my-name-picker-title">🎯 Flag as Expected Closure</div>
      <div class="my-name-picker-sub">${escapeHtml(row.candidate||'(no name)')}${row.company?' — '+escapeHtml(row.company):''}${row.round?' · '+escapeHtml(row.round):''}</div>
      <div class="hint" style="margin:8px 0">What did the handler/driving person say that makes this look like a closure? This shows up on the 🎯 Expected list so you can follow up later.</div>
      <textarea id="expectClosureNoteInput" rows="3" placeholder="e.g. Client verbally confirmed, offer letter expected this week…" style="width:100%;box-sizing:border-box;resize:vertical"></textarea>
      ${state.expectClosureError ? `<div class="hint" style="color:var(--coral);margin-top:6px">⚠ ${escapeHtml(state.expectClosureError)}</div>` : ''}
      <div class="row" style="margin-top:12px;gap:8px">
        <button class="btn ghost" id="expectClosureCancelBtn" style="flex:1">Cancel</button>
        <button class="btn primary" id="expectClosureSaveBtn" ${state.expectClosureSaving?'disabled':''} style="flex:1">${state.expectClosureSaving?'<span class="spinner"></span>Saving…':'🎯 Flag it'}</button>
      </div>
    </div>
  </div>`;
}
// Same dirty-check / date-switching sequence the date picker itself uses
// (see the #datePicker onchange handler) — a standalone copy rather than a
// shared refactor, so this new "jump from Quick Search" flow can't
// accidentally change how the date picker/prev/next-day buttons behave.
async function jumpToDateFromQuickSearch(dateStr){
  if(state.dirty && !confirm('You have unsaved changes that will be lost if you switch dates without saving. Switch anyway?')){
    return;
  }
  state.showQuickSearchModal = false;
  state.date = dateStr;
  state.dirty = false;
  state.lastImportedIds = null;
  state.dateSwitching = true;
  render();
  await loadDay(state.date);
  state.dateSwitching = false;
  render();
  scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
  scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
}
// Candidate profile timeline (2026-09-24, pipeline-visibility batch) — see
// computeCandidateProfile() above for why this is an exact-name lookup,
// not a fuzzy one. Opened via "📋 Timeline" on a Search Everywhere result.
function renderCandidateProfilePanel(){
  if(state.candidateProfileLoading){
    return `<div class="import-panel"><div class="hint"><span class="spinner"></span> Building ${escapeHtml(state.candidateProfileName)}'s timeline…</div></div>`;
  }
  const data = state.candidateProfileData;
  if(!data || (!data.calls.length && !data.closures.length)){
    return `<div class="import-panel"><div class="hint">No calls or closures found for "${escapeHtml(state.candidateProfileName)}".</div></div>`;
  }
  // A single merged, chronological timeline — calls by date/time, closures
  // by their own recorded date — rather than two separate lists, since the
  // whole point is seeing the journey in one continuous read.
  const events = [
    ...data.calls.map(c => ({ kind:'call', sortKey: (c._date||'')+' '+String(businessDayMinutes(c.time)).padStart(5,'0'), data:c })),
    ...data.closures.map(c => ({ kind:'closure', sortKey: (c.createdAt||'9999').slice(0,10)+' 99999', data:c })),
  ].sort((a,b)=> a.sortKey.localeCompare(b.sortKey));
  const firstCallDate = data.calls.length ? data.calls[0]._date : null;
  const hasClosure = data.closures.length > 0;
  const daysBetween = (a,b)=>{
    if(!a||!b) return null;
    const da = new Date(a+'T00:00:00Z').getTime(), db = new Date(String(b).slice(0,10)+'T00:00:00Z').getTime();
    if(isNaN(da)||isNaN(db)) return null;
    return Math.round((db-da)/86400000);
  };
  const timeToClose = (hasClosure && firstCallDate) ? daysBetween(firstCallDate, data.closures[0].createdAt) : null;
  const summaryChips = [
    `<span class="notif-chip">${data.calls.length} call${data.calls.length===1?'':'s'}</span>`,
    firstCallDate ? `<span class="notif-chip">first call ${escapeHtml(firstCallDate)}</span>` : '',
    hasClosure ? `<span class="notif-chip" style="color:var(--teal);border-color:var(--teal)">🏆 ${data.closures.length} closure${data.closures.length===1?'':'s'}</span>` : '',
    (timeToClose !== null && timeToClose >= 0) ? `<span class="notif-chip">${timeToClose} day${timeToClose===1?'':'s'} to close</span>` : '',
  ].filter(Boolean).join(' ');
  const eventsHtml = events.map(ev=>{
    if(ev.kind === 'closure'){
      const c = ev.data;
      return `<div class="notif-row" style="border-left:3px solid var(--teal);padding-left:10px">
        <div class="notif-name">🏆 Closure recorded${c.company?` — ${escapeHtml(c.company)}`:''}</div>
        <div class="notif-detail">
          ${c.createdAt?`<span class="notif-chip">${escapeHtml(String(c.createdAt).slice(0,10))}</span>`:''}
          ${c.salary?`<span class="notif-chip">${escapeHtml(c.salary)}</span>`:''}
        </div>
      </div>`;
    }
    const r = ev.data;
    return `<div class="notif-row">
      <div class="notif-name">${escapeHtml(r.round || 'Call')}${r.status?` <span class="notif-warn" style="color:${statusBadgeInfo(r.status).colorVar}">${statusBadgeInfo(r.status).icon} ${statusBadgeInfo(r.status).label}</span>`:''}</div>
      <div class="notif-detail">
        <span class="notif-chip">${escapeHtml(r._date)}</span>
        <span class="notif-chip">${escapeHtml(r.time||'time n/a')}</span>
        <span class="notif-chip">${escapeHtml(r.company||'no company')}</span>
        ${r.assignee?`<span class="notif-chip">${escapeHtml(r.assignee)}</span>`:''}
      </div>
    </div>`;
  }).join('');
  // Quick-add a closure right from the timeline (2026-09-28) — the whole
  // point is that a closure shouldn't need a separate trip to Closures'
  // paste-in import when you're already looking at the exact candidate and
  // already know the company. Only offered when no closure exists yet
  // (hasClosure) — once one's on file, this isn't the place to add another.
  const lastCallCompany = data.calls.length ? data.calls[data.calls.length-1].company : '';
  let closureFormHtml = '';
  if(!hasClosure){
    const form = state.candidateProfileClosureForm;
    if(form){
      closureFormHtml = `
        <div style="border:1px solid var(--border);border-radius:8px;padding:12px;margin-bottom:12px;background:var(--surface-2)">
          <div style="font-weight:700;font-size:13px;margin-bottom:8px">🏆 Record a closure for ${escapeHtml(state.candidateProfileName)}</div>
          <label class="hint">Company</label>
          <input class="cell-input" id="closureQuickAddCompany" value="${escapeHtml(form.company||'')}" style="width:100%;margin-bottom:8px">
          <label class="hint">Salary (optional)</label>
          <input class="cell-input" id="closureQuickAddSalary" value="${escapeHtml(form.salary||'')}" placeholder="e.g. $75,000 per annum" style="width:100%;margin-bottom:10px">
          <div style="display:flex;gap:8px">
            <button class="btn primary" id="closureQuickAddSave" ${state.candidateProfileClosureSaving?'disabled':''}>${state.candidateProfileClosureSaving?'Saving…':'Save closure'}</button>
            <button class="btn ghost" id="closureQuickAddCancel" ${state.candidateProfileClosureSaving?'disabled':''}>Cancel</button>
          </div>
        </div>`;
    } else {
      closureFormHtml = `<button class="btn ghost" id="closureQuickAddOpen" style="margin-bottom:12px">🏆 Record closure</button>`;
    }
  }
  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:10px">Every call and closure on file for <b>${escapeHtml(state.candidateProfileName)}</b>, oldest first.</div>
    <div style="margin-bottom:12px">${summaryChips}</div>
    ${closureFormHtml}
    ${eventsHtml}
  </div>`;
}
async function openCandidateProfile(name, opts){
  closeAllPanels();
  state.showCandidateProfile = true;
  state.candidateProfileName = name;
  state.candidateProfileLoading = true;
  state.candidateProfileData = null;
  state.candidateProfileClosureForm = null;
  render();
  try{
    state.candidateProfileData = await computeCandidateProfile(name, false);
  }catch(e){
    state.candidateProfileData = { name, calls: [], closures: [] };
  }
  state.candidateProfileLoading = false;
  // Opened from a "🏆 Closure" shortcut elsewhere (Quick Search, Search
  // Everywhere) — go straight to the pre-filled form instead of making the
  // person find and click "Record closure" a second time.
  if(opts && opts.openClosureForm){
    const lastCall = state.candidateProfileData.calls.length ? state.candidateProfileData.calls[state.candidateProfileData.calls.length-1] : null;
    state.candidateProfileClosureForm = {
      company: (opts.company || (lastCall && lastCall.company) || ''),
      salary: '',
    };
  }
  render();
}
// Company scorecard (2026-09-24, pipeline-visibility batch) — see
// computeCompanyScorecard() above. A simple type-a-name-and-search panel,
// same shape as Search Everywhere, rather than a dropdown of every company
// ever seen (that list can get long, and typing is faster once you know
// roughly what you're looking for).
function renderCompanyScorecardPanel(){
  let body;
  if(state.companyScorecardLoading){
    body = `<div class="hint"><span class="spinner"></span> Building the scorecard…</div>`;
  } else if(state.companyScorecardData === null){
    body = `<div class="hint">Type a client/company name — pulls together volume, reliability, conversion rate, and time-to-close for that one client, instead of checking three separate tabs.</div>`;
  } else if(!state.companyScorecardData.found){
    body = `<div class="hint">No calls found for "${escapeHtml(state.companyScorecardQuery)}".</div>`;
  } else {
    const d = state.companyScorecardData;
    const statCard = (label, value, sub, color)=> `<div style="flex:1;min-width:120px;border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center">
      <div style="font-size:24px;font-weight:800;${color?`color:${color}`:''}">${value}</div>
      <div class="hint" style="margin-top:2px">${label}</div>
      ${sub?`<div class="hint" style="font-size:10.5px;margin-top:1px">${sub}</div>`:''}
    </div>`;
    const reliabilityCard = d.reliability
      ? statCard('reschedule/cancel rate', d.reliability.rate+'%', `${d.reliability.bad} of ${d.reliability.total} calls`, d.reliability.rate>=30?'var(--coral)':d.reliability.rate>=15?'var(--amber)':'var(--teal)')
      : statCard('reschedule/cancel rate', '—', d.reliabilityBelowThreshold ? `fewer than ${CLIENT_RELIABILITY_MIN_CALLS} calls on file` : 'no data', 'var(--text-faint)');
    const conversionCard = d.conversion
      ? statCard('conversion rate', d.conversion.rate+'%', `${d.conversion.closed} of ${d.conversion.total} closed`, d.conversion.rate>=20?'var(--teal)':d.conversion.rate>=8?'var(--amber)':'var(--coral)')
      : statCard('conversion rate', '—', d.conversionBelowThreshold ? `fewer than ${CONVERSION_MIN_COMPANY_ENTRIES} pipeline entries` : 'no data', 'var(--text-faint)');
    const timeCard = d.timeToClose
      ? statCard('avg time to close', d.timeToClose.avgDays+'d', `${d.timeToClose.count} closure${d.timeToClose.count===1?'':'s'}`, 'var(--sky)')
      : statCard('avg time to close', '—', d.timeToCloseBelowThreshold ? `fewer than ${TIME_TO_CLOSE_MIN_COMPANY_CLOSURES} closures` : 'no data', 'var(--text-faint)');
    body = `
      <div style="font-weight:800;font-size:18px;margin-bottom:2px">${escapeHtml(d.company)}</div>
      <div class="hint" style="margin-bottom:14px">${d.totalCalls} call${d.totalCalls===1?'':'s'} on file, all-time</div>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        ${reliabilityCard}
        ${conversionCard}
        ${timeCard}
      </div>`;
  }
  return `<div class="import-panel">
    <div class="add-row" style="margin-top:0;margin-bottom:12px">
      <input type="text" id="companyScorecardInput" placeholder="Client / company name…" value="${escapeHtml(state.companyScorecardQuery||'')}" style="flex:1">
      <button class="btn primary" id="runCompanyScorecardBtn">🏢 View Scorecard</button>
    </div>
    ${body}
  </div>`;
}
async function openCompanyScorecard(name){
  const q = (name||'').trim();
  state.companyScorecardQuery = q;
  if(!q){ state.companyScorecardData = null; render(); return; }
  state.companyScorecardLoading = true;
  render();
  try{
    state.companyScorecardData = await computeCompanyScorecard(q, false);
  }catch(e){
    state.companyScorecardData = { company: q, found: false };
  }
  state.companyScorecardLoading = false;
  render();
}

// A safety net against a missed WhatsApp message, without any live
// connection to WhatsApp — you export the group chat yourself (group name
// → More → Export Chat → Without Media, fully built into WhatsApp, no
// automation, no account risk) and upload that .txt (or paste a chunk of
// it) here. Every message in it is run through the same parser the normal
// import uses, then cross-checked against the currently selected date's
// rows — anything that looks like a real call but has no matching row yet
// gets flagged for a quick look. Only messages the parser recognized via a
// real structured shape count as "call-shaped" (the parser's own generic
// "could not parse this line" catch-all is excluded here) — otherwise
// ordinary chat ("ok", "thanks", emoji reactions typed as text) would
// flood the results with false positives.
function computeMissedMessages(exportText, rows){
  const messages = splitClipboardIntoMessages(exportText);
  const flagged = [];
  let checkedCount = 0;
  messages.forEach(msg=>{
    if(!msg || !msg.trim()) return;
    let parsed;
    try{ parsed = parseImportText(msg, state.date, '1st'); }catch(e){ return; }
    (parsed||[]).forEach(p=>{
      if(!p.candidate) return;
      const isUnrecognized = (p.doubts||[]).some(d => d.indexOf('Could not automatically parse this line') === 0);
      if(isUnrecognized) return; // not confidently a call — most likely ordinary chat, skip
      checkedCount++;
      const candKey = normalizeCandidateForMatch(p.candidate);
      const compKey = p.company ? normalizeCompanyKey(p.company) : null;
      const matched = rows.some(r=>{
        if(compKey){
          if(normalizeCandidateForMatch(r.candidate) === candKey && normalizeCompanyKey(r.company) === compKey) return true;
          // Same spelling/abbreviation-variant fallback used elsewhere,
          // anchored to the same company so it stays unambiguous.
          if(normalizeCompanyKey(r.company) === compKey && sameCandidateFuzzyMatch(p.candidate, r.candidate)) return true;
          return false;
        }
        // No company to anchor a fuzzy check against — exact match only,
        // same caution as everywhere else a company isn't available.
        return normalizeCandidateForMatch(r.candidate) === candKey;
      });
      if(!matched){
        // Keeps the full parsed row (round/duration/assignee/country/doubts
        // etc.), not just the display fields — needed so "Review & Add" can
        // turn this straight into a real call row without re-parsing.
        flagged.push({ candidate: p.candidate, company: p.company, time: p.time, raw: (p.raw || msg).trim(), row: p });
      }
    });
  });
  return { checkedCount, totalMessages: messages.length, flagged };
}
function renderMissedCheckPanel(){
  const r = state.missedCheckResults;
  let body = '';
  if(state.missedCheckLoading){
    body = `<div class="hint"><span class="spinner"></span> Checking…</div>`;
  } else if(state.missedCheckError){
    body = `<div class="hint" style="color:var(--coral)">${escapeHtml(state.missedCheckError)}</div>`;
  } else if(r){
    if(!r.checkedCount){
      body = `<div class="hint">No call-shaped messages recognized in that text — either nothing to check, or the export format wasn't recognized. If you pasted a genuine chat export and this looks wrong, paste a smaller chunk to double check.</div>`;
    } else if(!r.flagged.length){
      body = `<div class="hint" style="color:var(--teal)">✅ Nothing missed — all ${r.checkedCount} call-shaped message(s) found in that text already have a matching row for <b>${escapeHtml(state.date)}</b>.</div>`;
    } else {
      // Deliberately just the extracted fields, not the raw WhatsApp text —
      // that's already reflected in candidate/company/time below, and
      // showing both was pure clutter. The original text isn't lost: it's
      // still what the Copy button copies and what the review screen can
      // show on request, just not repeated inline here.
      const rowsHtml = r.flagged.map((f,i)=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(f.candidate)}${f.company?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(f.company)}</span>`:''}</div>
          <div class="notif-detail">
            ${f.time?`<span class="notif-chip">${escapeHtml(f.time)}</span>`:''}
          </div>
          <button type="button" class="btn ghost missed-copy-btn" data-idx="${i}" style="margin-top:6px;font-size:11.5px;padding:4px 10px">📋 Copy text</button>
        </div>
      `).join('');
      body = `<div class="hint" style="margin-bottom:10px">Checked ${r.checkedCount} call-shaped message(s) against <b>${escapeHtml(state.date)}</b>'s list — ${r.flagged.length} don't have a matching row yet:</div>${rowsHtml}
      <div class="row" style="margin-top:12px">
        <div class="hint">Copy any single one to bring it in via "📥 Import" → "📋 Paste from clipboard" — or review and add them all at once below.</div>
        <button type="button" class="btn primary" id="reviewMissedBtn">➕ Review &amp; Add Missing Calls</button>
      </div>`;
    }
  } else {
    body = `<div class="hint">Paste a WhatsApp chat export below, or upload the .txt file (group name → More → Export Chat → Without Media). This checks against whichever date is currently selected (<b>${escapeHtml(state.date)}</b>) — switch dates above first if you're checking a different day.</div>`;
  }
  return `<div class="import-panel">
    <div class="add-row" style="margin-top:0;margin-bottom:10px;flex-wrap:wrap;gap:10px;align-items:center">
      <label class="btn ghost" style="cursor:pointer;margin:0">
        ⬆ Upload .txt export
        <input type="file" id="missedCheckFileInput" accept=".txt" style="display:none">
      </label>
      <div class="hint" style="margin:0">or paste below</div>
    </div>
    <textarea id="missedCheckText" placeholder="Paste an exported chat, or a chunk of it…">${escapeHtml(state.missedCheckText||'')}</textarea>
    <div class="row">
      <div class="hint">Nothing here is sent anywhere automatically — this only checks the text you give it, once, when you tap Check.</div>
      <button class="btn primary" id="runMissedCheckBtn">🔍 Check</button>
    </div>
    ${body}
  </div>`;
}
// The review-before-commit screen for "Review & Add Missing Calls" — same
// pattern as the existing reschedule/closure confirm panels: nothing is
// written anywhere until "Confirm & Add" is tapped, every field is editable
// first, and any item can be excluded with its checkbox. Adding calls (not
// a status tag or a separate closures table) uses the exact same commit
// path the normal "📥 Import" → "Parse & add calls" button uses —
// auto-routing, a pre-add backup, and the same "↩ Undo import" banner —
// rather than a bespoke save path that would behave subtly differently.
function renderMissedCheckReviewPanel(){
  const items = state.missedCheckReviewItems || [];
  const includedCount = items.filter(it=>it.include).length;
  const itemsHtml = items.map((it, idx)=>`<div class="resched-item ${it.include?'':'unmatched'}" data-idx="${idx}">
      <details style="margin-bottom:8px">
        <summary style="cursor:pointer;font-size:11.5px;color:var(--text-muted)">Original message</summary>
        <div class="resched-raw" style="margin-top:6px">${escapeHtml(it.raw)}</div>
      </details>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <div style="flex:1;min-width:140px">
          <label class="hint" style="display:block;margin-bottom:4px">Candidate</label>
          <input type="text" class="missed-review-field" data-idx="${idx}" data-field="candidate" value="${escapeHtml(it.candidate)}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <div style="flex:1;min-width:140px">
          <label class="hint" style="display:block;margin-bottom:4px">Company</label>
          <input type="text" class="missed-review-field" data-idx="${idx}" data-field="company" value="${escapeHtml(it.company||'')}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <div style="flex:0 0 110px">
          <label class="hint" style="display:block;margin-bottom:4px">Time</label>
          <input type="text" class="missed-review-field" data-idx="${idx}" data-field="time" value="${escapeHtml(it.time||'')}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <div style="flex:0 0 90px">
          <label class="hint" style="display:block;margin-bottom:4px">Round</label>
          <input type="text" class="missed-review-field" data-idx="${idx}" data-field="round" value="${escapeHtml(it.round||'')}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <div style="flex:1;min-width:160px">
          <label class="hint" style="display:block;margin-bottom:4px">Assign to</label>
          <select class="missed-review-field" data-idx="${idx}" data-field="assignee" data-assignee-value="${escapeHtml(it.assignee||'')}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
            <option value="">— unassigned —</option>
            ${buildRosterOptions(it.round, it.assignee)}
          </select>
        </div>
      </div>
      <label style="font-size:12px;color:var(--text-muted);display:flex;align-items:center;gap:5px;white-space:nowrap;margin-top:8px">
        <input type="checkbox" class="missed-review-include" data-idx="${idx}" ${it.include?'checked':''}> Add this one
      </label>
    </div>`).join('');
  return `<div class="import-panel">
    <div class="resched-warning-banner">⚠ Confirm before saving: this will add ${includedCount} new call(s) to <b>${escapeHtml(state.date)}</b>, including who each one gets assigned to below — nothing is saved until you tap "Confirm &amp; Add".</div>
    ${itemsHtml || '<div class="hint">Nothing to review.</div>'}
    <div class="row">
      <div class="hint">Unchecked items are left out entirely — nothing is added for them. "Assign to" is a suggestion, same as the normal import's auto-routing — change it if it's wrong.</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ghost" id="cancelMissedCheckReview">Cancel</button>
        <button class="btn primary" id="confirmMissedCheckApply" ${state.missedCheckApplying || !includedCount ? 'disabled':''}>${state.missedCheckApplying?'<span class="spinner"></span>Saving…':`Confirm & Add (${includedCount})`}</button>
      </div>
    </div>
  </div>`;
}

// Shows exactly which rows "🧹 Remove Duplicates" is about to remove, and
// which copy of each duplicate it plans to keep, BEFORE anything is
// touched — same review-before-commit pattern as the Missed Check
// Review-and-Add screen above and the reschedule/closure confirm panels.
// Previously this action only asked a bare confirm()-dialog with a count,
// never showing the actual candidates/rows — a real gap given the app's
// own rule that a bulk/automated change must show the decision, not just
// go ahead on a count. Each group defaults to keeping whichever copy
// callCompletenessScore() picked as most complete, same logic as before,
// but now the person can pick a different copy to keep per group via the
// radio buttons before confirming — nothing is removed until "Confirm &
// Remove" is tapped, and a backup is still taken first either way.
function renderDuplicatesReviewPanel(){
  const groups = state.duplicatesReview || [];
  const totalRemove = groups.reduce((s,g)=>s+g.rows.length-1, 0);
  const groupsHtml = groups.map((g, gi)=>{
    const rowsHtml = g.rows.map(r=>{
      const keeping = r.id === g.keepId;
      return `<label class="dup-review-row" style="display:flex;gap:10px;align-items:flex-start;padding:8px 10px;border:1px solid ${keeping?'var(--teal)':'var(--border)'};border-radius:8px;margin-bottom:6px;cursor:pointer">
        <input type="radio" name="dupKeep_${gi}" class="dup-keep-radio" data-group="${gi}" value="${escapeHtml(r.id)}" ${keeping?'checked':''} style="margin-top:3px">
        <div style="flex:1;font-size:12px">
          <div style="font-weight:600;margin-bottom:2px;color:${keeping?'var(--teal)':'var(--coral)'}">${keeping?'✓ Keep this one':'✕ Remove this one'}</div>
          <div class="hint">Company: ${escapeHtml(r.company||'—')} · Interviewer: ${escapeHtml(r.interviewer||'—')} · Role: ${escapeHtml(r.role||'—')} · Assignee: ${escapeHtml(r.assignee||'—')} · Duration: ${escapeHtml(r.duration||'—')}</div>
        </div>
      </label>`;
    }).join('');
    return `<div class="resched-item" style="margin-bottom:14px">
      <div style="font-weight:600;margin-bottom:6px;font-size:13px">${escapeHtml(g.candidate)} — ${escapeHtml(g.time||'no time')} · ${escapeHtml(g.round||'')}</div>
      ${rowsHtml}
    </div>`;
  }).join('');
  return `<div class="import-panel">
    <div class="resched-warning-banner">⚠ Confirm before removing: ${groups.length} candidate(s) have duplicate entries (${totalRemove} row(s) will be removed). The row marked "Keep" is kept as-is for each — tap a different row to keep that one instead. A backup is saved first, so this can still be undone from 🕐 Backups afterward. Nothing is removed until you tap "Confirm &amp; Remove".</div>
    ${groupsHtml || '<div class="hint">Nothing to review.</div>'}
    <div class="row">
      <div style="display:flex;gap:8px;">
        <button class="btn ghost" id="cancelDuplicatesReview">Cancel</button>
        <button class="btn primary" id="confirmRemoveDuplicates" ${state.duplicatesRemoving || !totalRemove ? 'disabled':''}>${state.duplicatesRemoving?'<span class="spinner"></span>Removing…':`Confirm & Remove (${totalRemove})`}</button>
      </div>
    </div>
  </div>`;
}

function renderClearAllReviewPanel(){
  const rows = state.clearAllReview || [];
  const rowsHtml = rows.map(r=>`<div class="resched-item" style="margin-bottom:8px;padding:8px 10px">
    <div style="font-weight:600;font-size:13px">${escapeHtml(r.candidate||'(no name)')} — ${escapeHtml(r.time||'no time')} · ${escapeHtml(r.round||'')}</div>
    <div class="hint">Company: ${escapeHtml(r.company||'—')} · Assignee: ${escapeHtml(r.assignee||'—')}</div>
  </div>`).join('');
  return `<div class="import-panel">
    <div class="resched-warning-banner">⚠ Confirm before clearing: all ${rows.length} call(s) for ${escapeHtml(state.date)} will be removed — listed below. A backup is saved first, so this can still be undone from 🕐 Backups afterward. Nothing is removed until you tap "Confirm &amp; Clear All".</div>
    ${rowsHtml || '<div class="hint">Nothing to review.</div>'}
    <div class="row">
      <div style="display:flex;gap:8px;">
        <button class="btn ghost" id="cancelClearAllReview">Cancel</button>
        <button class="btn primary" id="confirmClearAll" ${state.clearAllRemoving || !rows.length ? 'disabled':''} style="background:var(--coral);border-color:var(--coral)">${state.clearAllRemoving?'<span class="spinner"></span>Clearing…':`Confirm & Clear All (${rows.length})`}</button>
      </div>
    </div>
  </div>`;
}

// FIX (2026-09-29): "so many options in the menu" — 17 top-level tabs in
// one panel was the worst offender. Three tabs asking essentially "have I
// seen this person/client before" (sameday/candidatesAcross/clientsAcross)
// and three asking "how busy has the team been" (trends/workloadHeatmap/
// weeklyRecap) are grouped under one tab button each here. Deliberately
// NOT a rewrite of any of the six leaf views below — every one of them
// keeps its own exact `else if(active === '<key>')` branch, state, scan
// trigger, and search box, completely unchanged. Grouping only changes
// which button gets clicked to reach a given leaf: the group's own button
// is "active" (highlighted) whenever any of its leaves is showing, jumps
// to whichever leaf was last open in that group (or the first one), and a
// slim secondary row of the real leaf tabs appears right above the content
// so switching between them stays one click, not a trip back to the outer
// tab bar.
const NOTIF_REPEATS_GROUP = ['sameday','candidatesAcross','clientsAcross'];
const NOTIF_REPEATS_LABELS = { sameday:'Same Day', candidatesAcross:'📅 All Dates', clientsAcross:'🎯 2nd Round+ (All Dates)' };
const NOTIF_TRENDS_GROUP = ['trends','workloadHeatmap','weeklyRecap'];
const NOTIF_TRENDS_LABELS = { trends:'📈 Trends Over Time', workloadHeatmap:'📶 Workload Heatmap', weeklyRecap:'📈 Weekly Recap' };
function renderNotificationsPanel(){
  const tabs = [
    { key:'absent', label:'🚫 Absent', count: state.absentIds.length },
    { key:'long', label:'⏱ Long Calls' },
    { key:'sameday', label:'🔁 Repeats', group: NOTIF_REPEATS_GROUP },
    { key:'clientsToday', label:'🏢 Repeat Clients Today' },
    { key:'allResched', label:'↻ All Rescheduled/Cancelled' },
    { key:'absencePatterns', label:'🔁 Recurring Absences' },
    { key:'clientReliability', label:'📊 Client Reliability' },
    { key:'trends', label:'📈 Team Trends', group: NOTIF_TRENDS_GROUP },
    { key:'woiAging', label:'⏳ WOI Aging' },
    { key:'conversionFunnel', label:'🎯 Conversion Funnel' },
    { key:'stuckPipeline', label:'🧊 Stuck in Pipeline' },
    { key:'finalRoundNudge', label:'🎯 Final Round, No Closure' },
    { key:'timeToClose', label:'⏱ Time to Close' },
    { key:'candidateLastStatus', label:'📋 Candidate Activity' }
  ];
  const active = state.notifTab || 'absent';
  const tabsHtml = tabs.map(t=>{
    const isGroupActive = t.group ? t.group.includes(active) : active===t.key;
    // Clicking a group's own button goes to whichever leaf is already
    // showing (if any), otherwise the group's first/default leaf.
    const clickKey = t.group ? (t.group.includes(active) ? active : t.group[0]) : t.key;
    return `<button class="notif-tab-btn ${isGroupActive?'active':''}" data-notiftab="${clickKey}">${t.label}${t.count?` <span class="n">${t.count}</span>`:''}</button>`;
  }).join('');
  let subTabsHtml = '';
  if(NOTIF_REPEATS_GROUP.includes(active)){
    subTabsHtml = `<div class="notif-tabs" style="margin:0 0 10px;opacity:.85">${NOTIF_REPEATS_GROUP.map(k=>
      `<button class="notif-tab-btn ${active===k?'active':''}" data-notiftab="${k}" style="font-size:11.5px;padding:4px 9px">${escapeHtml(NOTIF_REPEATS_LABELS[k])}</button>`
    ).join('')}</div>`;
  } else if(NOTIF_TRENDS_GROUP.includes(active)){
    subTabsHtml = `<div class="notif-tabs" style="margin:0 0 10px;opacity:.85">${NOTIF_TRENDS_GROUP.map(k=>
      `<button class="notif-tab-btn ${active===k?'active':''}" data-notiftab="${k}" style="font-size:11.5px;padding:4px 9px">${escapeHtml(NOTIF_TRENDS_LABELS[k])}</button>`
    ).join('')}</div>`;
  }

  let content = '';
  if(active === 'absent'){
    content = renderAbsentWarningsSection();
  } else if(active === 'long'){
    content = renderLongDurationSection();
  } else if(active === 'sameday'){
    content = renderSameDayDuplicatesSection();
  } else if(active === 'clientsToday'){
    content = renderRepeatClientsSection();
  } else if(active === 'candidatesAcross'){
    if(state.notifications === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Scans every date you've saved calls for and flags candidates appearing on more than one day — useful for tracking loop rounds like "2nd round on Aug 3, 3rd round on Aug 7."</div>
        <button class="btn primary" id="runNotifScan">🔍 Scan for repeat candidates across dates</button>`;
    } else if(state.notifications.length===0){
      content = `<div class="hint">No repeat candidates found across your saved dates yet. <button class="btn ghost" id="runNotifScan" style="margin-left:8px">Re-scan</button></div>`;
    } else if(state.hideAllNotifCandidates){
      content = `<div class="hint">Hidden. <button class="btn ghost" id="unhideAllCandidates">Show ${state.notifications.length} result(s) again</button></div>`;
    } else {
      const q = (state.notifSearchCandidates||'').trim().toLowerCase();
      const visible = q ? state.notifications.filter(n => n.candidate.toLowerCase().includes(q)) : state.notifications;
      const rowsHtml = visible.map(n=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(n.candidate)}</div>
          <div class="notif-detail">${n.occurrences.map(o=>`<span class="notif-chip">${escapeHtml(o.date)} \u2014 ${escapeHtml(o.round||'round n/a')}${o.time?' @ '+escapeHtml(o.time):''}${o.company?' \u2014 '+escapeHtml(o.company):''}</span>`).join(' <span class="notif-arrow">\u2192</span> ')}</div>
        </div>
      `).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.notifications.length} candidate(s) appear on more than one saved date, most recent first.</div>
          <span style="display:flex;gap:6px"><button class="btn ghost" id="hideAllCandidates">Hide all</button><button class="btn ghost" id="runNotifScan">Re-scan</button></span>
        </div>
        <input type="text" class="notif-search" id="notifSearchCandidates" placeholder="Search candidate…" value="${escapeHtml(state.notifSearchCandidates||'')}">
        ${rowsHtml || '<div class="hint">No matches.</div>'}`;
    }
  } else if(active === 'clientsAcross'){
    if(state.repeatClientsAdvanced === null || state.repeatClientsAdvanced === undefined){
      content = `
        <div class="hint" style="margin-bottom:10px">Scans every date for the same client appearing more than once for 2nd round & above — e.g. Motability showing up for two different candidates' 2nd rounds on different days.</div>
        <button class="btn primary" id="runNotifScanClients">🔍 Scan for repeat clients across dates</button>`;
    } else if(state.repeatClientsAdvanced.length===0){
      content = `<div class="hint">No client shows up more than once for 2nd round & above across your saved dates. <button class="btn ghost" id="runNotifScanClients" style="margin-left:8px">Re-scan</button></div>`;
    } else if(state.hideAllNotifClients){
      content = `<div class="hint">Hidden. <button class="btn ghost" id="unhideAllClients">Show ${state.repeatClientsAdvanced.length} result(s) again</button></div>`;
    } else {
      const q = (state.notifSearchClients||'').trim().toLowerCase();
      const visible = q ? state.repeatClientsAdvanced.filter(n => n.company.toLowerCase().includes(q)) : state.repeatClientsAdvanced;
      const rowsHtml = visible.map(n=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(n.company)}</div>
          <div class="notif-detail">${n.occurrences.map(o=>`<span class="notif-chip">${escapeHtml(o.date)} \u2014 ${escapeHtml(o.candidate||'candidate n/a')} \u2014 ${escapeHtml(o.round||'round n/a')}${o.assignee?' \u2014 '+escapeHtml(o.assignee):''}</span>`).join(' <span class="notif-arrow">\u2192</span> ')}</div>
        </div>
      `).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.repeatClientsAdvanced.length} client(s) appear more than once for 2nd round & above, most recent first.</div>
          <span style="display:flex;gap:6px"><button class="btn ghost" id="hideAllClients">Hide all</button><button class="btn ghost" id="runNotifScanClients">Re-scan</button></span>
        </div>
        <input type="text" class="notif-search" id="notifSearchClients" placeholder="Search client…" value="${escapeHtml(state.notifSearchClients||'')}">
        ${rowsHtml || '<div class="hint">No matches.</div>'}`;
    }
  } else if(active === 'allResched'){
    if(state.allReschedulesData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Scans every date you've saved calls for and lists every call ever marked Rescheduled, Cancelled, Not Responded, or Didn't Receive Invite — candidate, date, time, and client, all in one place.</div>
        <button class="btn primary" id="runAllReschedScan">🔍 Scan for all rescheduled/cancelled calls</button>`;
    } else if(state.allReschedulesData.length===0){
      content = `<div class="hint">No rescheduled/cancelled/no-response/no-invite calls found across your saved dates yet. <button class="btn ghost" id="runAllReschedScan" style="margin-left:8px">Re-scan</button></div>`;
    } else if(state.hideAllNotifAllResched){
      content = `<div class="hint">Hidden. <button class="btn ghost" id="unhideAllResched">Show ${state.allReschedulesData.length} result(s) again</button></div>`;
    } else {
      const q = (state.notifSearchAllResched||'').trim().toLowerCase();
      const visible = q ? state.allReschedulesData.filter(n => (n.candidate||'').toLowerCase().includes(q) || (n.company||'').toLowerCase().includes(q)) : state.allReschedulesData;
      const rowsHtml = visible.map(n=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(n.candidate||'Candidate')} <span class="notif-warn" style="color:${statusBadgeInfo(n.status).colorVar}">${statusBadgeInfo(n.status).icon} ${statusBadgeInfo(n.status).label}</span></div>
          <div class="notif-detail">
            <span class="notif-chip">${escapeHtml(n.date)}</span>
            <span class="notif-chip">${escapeHtml(n.time||'time n/a')}</span>
            <span class="notif-chip">${escapeHtml(n.company||'client n/a')}</span>
            ${n.assignee?`<span class="notif-chip">${escapeHtml(n.assignee)}</span>`:''}
          </div>
        </div>
      `).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.allReschedulesData.length} rescheduled/cancelled/no-response/no-invite call(s) across your saved dates, most recent first.</div>
          <span style="display:flex;gap:6px"><button class="btn ghost" id="hideAllResched">Hide all</button><button class="btn ghost" id="runAllReschedScan">Re-scan</button></span>
        </div>
        <input type="text" class="notif-search" id="notifSearchAllResched" placeholder="Search candidate or client…" value="${escapeHtml(state.notifSearchAllResched||'')}">
        ${rowsHtml || '<div class="hint">No matches.</div>'}`;
    }
  } else if(active === 'absencePatterns'){
    if(state.absencePatterns === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Scans every date you've saved for who's been marked absent on the SAME weekday more than once — a gentle heads-up rather than noticing the pattern by memory and re-entering it manually each time.</div>
        <button class="btn primary" id="runAbsencePatternScan">🔍 Scan for recurring absence patterns</button>`;
    } else if(state.absencePatterns.length === 0){
      content = `<div class="hint">No one has been marked absent on the same weekday more than once yet. <button class="btn ghost" id="runAbsencePatternScan" style="margin-left:8px">Re-scan</button></div>`;
    } else {
      const rowsHtml = state.absencePatterns.map(p=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(p.name)} <span class="notif-warn">🔁 ${escapeHtml(p.dowName)}s — ${p.dates.length} time(s)</span></div>
          <div class="notif-detail">${p.dates.map(d=>`<span class="notif-chip">${escapeHtml(d)}</span>`).join(' ')}</div>
        </div>
      `).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.absencePatterns.length} recurring pattern(s) found. If today matches one and that person isn't marked absent, a hint shows next to their name in the Team panel.</div>
          <button class="btn ghost" id="runAbsencePatternScan">Re-scan</button>
        </div>
        ${rowsHtml}`;
    }
  } else if(active === 'clientReliability'){
    if(state.clientReliabilityData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Scans every date you've saved and rolls up, per client, how many of their calls ended up Rescheduled/Cancelled/Not-Responded — a rate, not just a list, so a flaky client stands out before you commit a coordinator's slot to them. Clients with fewer than ${CLIENT_RELIABILITY_MIN_CALLS} calls on file aren't shown — not enough history for the rate to mean anything yet.</div>
        <button class="btn primary" id="runReliabilityScan">\U0001f50d Scan client reliability</button>`;
    } else if(state.clientReliabilityData.length === 0){
      content = `<div class="hint">No client has ${CLIENT_RELIABILITY_MIN_CALLS}+ calls on file yet. <button class="btn ghost" id="runReliabilityScan" style="margin-left:8px">Re-scan</button></div>`;
    } else if(state.hideAllNotifReliability){
      content = `<div class="hint">Hidden. <button class="btn ghost" id="unhideAllReliability">Show ${state.clientReliabilityData.length} result(s) again</button></div>`;
    } else {
      const q = (state.notifSearchReliability||'').trim().toLowerCase();
      const visible = q ? state.clientReliabilityData.filter(c => c.company.toLowerCase().includes(q)) : state.clientReliabilityData;
      const rowsHtml = visible.map(c=>{
        const pct = Math.round(c.rate*100);
        const barColor = pct>=50 ? 'var(--coral)' : pct>=25 ? 'var(--amber)' : 'var(--teal)';
        const breakdownChips = [
          c.breakdown.rescheduled ? `<span class="notif-chip">${c.breakdown.rescheduled} rescheduled</span>` : '',
          c.breakdown.cancelled ? `<span class="notif-chip">${c.breakdown.cancelled} cancelled</span>` : '',
          c.breakdown.not_responded ? `<span class="notif-chip">${c.breakdown.not_responded} no-response</span>` : ''
        ].join('');
        return `<div class="notif-row">
          <div class="notif-name">${escapeHtml(c.company)} <span class="notif-warn" style="color:${barColor}">${pct}% (${c.bad} of ${c.total})</span></div>
          <div style="background:var(--surface-2);border-radius:4px;height:6px;margin:4px 0 6px;overflow:hidden;max-width:240px"><div style="width:${pct}%;height:100%;background:${barColor}"></div></div>
          ${breakdownChips ? `<div class="notif-detail">${breakdownChips}</div>` : ''}
        </div>`;
      }).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.clientReliabilityData.length} client(s) with ${CLIENT_RELIABILITY_MIN_CALLS}+ calls on file, worst reliability first.</div>
          <span style="display:flex;gap:6px"><button class="btn ghost" id="hideAllReliability">Hide all</button><button class="btn ghost" id="runReliabilityScan">Re-scan</button></span>
        </div>
        <input type="text" class="notif-search" id="notifSearchReliability" placeholder="Search client…" value="${escapeHtml(state.notifSearchReliability||'')}">
        ${rowsHtml || '<div class="hint">No matches.</div>'}`;
    }
  } else if(active === 'trends'){
    if(state.trendsData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Scans every date you've saved and rolls it up by week — call volume, reschedule/cancel rate, round-type mix, and which handler's calls get rescheduled most (5+ individually-assigned calls needed for a handler's rate to count). Nothing exported — just something to open and read.</div>
        <button class="btn primary" id="runTrendsScan">\U0001f50d Scan for trends</button>`;
    } else if(!state.trendsData.weeks.length){
      content = `<div class="hint">No dated calls on file yet. <button class="btn ghost" id="runTrendsScan" style="margin-left:8px">Re-scan</button></div>`;
    } else {
      const weeksHtml = state.trendsData.weeks.map(w=>{
        const pct = w.total ? Math.round(w.bad/w.total*100) : 0;
        const barColor = pct>=30 ? 'var(--coral)' : pct>=15 ? 'var(--amber)' : 'var(--teal)';
        const rtChips = Object.entries(w.roundTypeCounts).map(([rt,n])=>{
          const info = roundTypeBadgeInfo(rt);
          return info ? `<span class="notif-chip">${escapeHtml(info.shortLabel)}: ${n}</span>` : '';
        }).join('');
        return `<div class="notif-row">
          <div class="notif-name">Week of ${escapeHtml(w.week)} <span class="notif-warn">${w.total} call(s)${w.bad?`, ${pct}% rescheduled/cancelled`:''}</span></div>
          <div style="background:var(--surface-2);border-radius:4px;height:6px;margin:4px 0 6px;overflow:hidden;max-width:240px"><div style="width:${pct}%;height:100%;background:${barColor}"></div></div>
          ${rtChips ? `<div class="notif-detail">${rtChips}</div>` : ''}
        </div>`;
      }).join('');
      const handlerHtml = state.trendsData.handlerRates.length ? state.trendsData.handlerRates.map(h=>{
        const pct = Math.round(h.rate*100);
        const barColor = pct>=30 ? 'var(--coral)' : pct>=15 ? 'var(--amber)' : 'var(--teal)';
        return `<div class="notif-row">
          <div class="notif-name">${escapeHtml(h.name)} <span class="notif-warn" style="color:${barColor}">${pct}% (${h.bad} of ${h.total})</span></div>
        </div>`;
      }).join('') : `<div class="hint">No handler has ${TRENDS_MIN_HANDLER_CALLS}+ individually-assigned calls on file yet.</div>`;
      const predWarnings = state.predictiveCapacityWarnings || [];
      const predHtml = predWarnings.length ? `
        <div style="font-weight:700;font-size:13px;margin:14px 0 6px">📈 Predictive capacity warnings</div>
        <div class="hint" style="margin-bottom:8px">A team whose weekly volume has risen for 3 weeks running — not a hard rule, just a heads-up worth a look before it becomes a same-day scramble.</div>
        ${predWarnings.map(p=>`<div class="notif-row">
          <div class="notif-name">${escapeHtml(p.team)} <span class="notif-warn" style="color:var(--amber)">${p.weeks.join(' → ')} calls/week${p.growthPct!=null?` (+${p.growthPct}%)`:''}</span></div>
          <div class="notif-detail"><span class="notif-chip">Current headcount: ${p.headcount}</span></div>
        </div>`).join('')}` : '';
      // Actual line charts (2026-09-24, pipeline-visibility batch) — the
      // per-week list below still has the exact numbers, but a shape you
      // can see at a glance surfaces a rising/falling pattern far faster
      // than reading a column of numbers top to bottom.
      const volumeChartHtml = svgLineChart(
        state.trendsData.weeks.map(w=>({ label: w.week.slice(5), value: w.total })),
        { color: 'var(--sky)', height: 120 }
      );
      const rateChartHtml = svgLineChart(
        state.trendsData.weeks.map(w=>({ label: w.week.slice(5), value: w.total ? Math.round(w.bad/w.total*100) : 0 })),
        { color: 'var(--coral)', height: 120, valueSuffix: '%' }
      );
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.trendsData.weeks.length} week(s) on file, oldest first.</div>
          <button class="btn ghost" id="runTrendsScan">Re-scan</button>
        </div>
        <div style="font-weight:700;font-size:13px;margin:6px 0">Call volume by week</div>
        <div style="border:1px solid var(--border);border-radius:8px;padding:8px 4px;margin-bottom:14px">${volumeChartHtml}</div>
        <div style="font-weight:700;font-size:13px;margin:6px 0">Reschedule/cancel rate by week</div>
        <div style="border:1px solid var(--border);border-radius:8px;padding:8px 4px;margin-bottom:14px">${rateChartHtml}</div>
        <div style="font-weight:700;font-size:13px;margin:6px 0">Call volume &amp; reschedule rate by week (detail)</div>
        ${weeksHtml}
        <div style="font-weight:700;font-size:13px;margin:14px 0 6px">Reschedule rate by handler</div>
        ${handlerHtml}
        ${predHtml}`;
    }
  } else if(active === 'woiAging'){
    if(state.woiAgingLoading){
      content = `<div class="hint"><span class="spinner"></span> Scanning every saved date for WOI candidates…</div>`;
    } else if(state.woiAgingData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Scans every saved date for candidates still marked "Waiting for Invite" and lists them oldest-first, so none sit forgotten.</div>
        <button class="btn primary" id="runWoiAgingScan">🔍 Scan for WOI candidates</button>`;
    } else if(!state.woiAgingData.length){
      content = `<div class="hint" style="color:var(--teal)">✅ No WOI candidates outstanding on any saved date. <button class="btn ghost" id="runWoiAgingScan" style="margin-left:8px">Re-scan</button></div>`;
    } else {
      const rowsHtml = state.woiAgingData.map(w=>{
        const urgent = w.daysWaiting >= 7;
        return `<div class="notif-row">
          <div class="notif-name">${escapeHtml(w.candidate)}${w.company?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(w.company)}</span>`:''}</div>
          <div class="notif-detail">
            <span class="notif-chip" style="${urgent?'color:var(--coral);border-color:var(--coral)':''}">${w.daysWaiting} day${w.daysWaiting===1?'':'s'} waiting</span>
            ${w.date?`<span class="notif-chip">since ${escapeHtml(w.date)}</span>`:''}
            ${w.round?`<span class="notif-chip">${escapeHtml(w.round)}</span>`:''}
          </div>
        </div>`;
      }).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.woiAgingData.length} WOI candidate(s) outstanding, oldest first.</div>
          <button class="btn ghost" id="runWoiAgingScan">Re-scan</button>
        </div>
        ${rowsHtml}`;
    }
  } else if(active === 'workloadHeatmap'){
    const workload = computeAssigneeWorkloadToday();
    if(!workload.length){
      content = `<div class="hint">No individual assignments yet for ${escapeHtml(state.date)}.</div>`;
    } else {
      const max = Math.max(...workload.map(d=>d.count));
      const barsHtml = workload.map(d=>{
        const pct = max ? Math.round((d.count/max)*100) : 0;
        return `<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:12.5px;margin-bottom:3px">
            <span>${escapeHtml(d.name)}${d.team?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(d.team)}</span>`:''}</span>
            <span class="notif-detail">${d.count} call${d.count===1?'':'s'}</span>
          </div>
          <div style="background:var(--surface-2);border-radius:6px;height:10px;overflow:hidden">
            <div style="background:var(--teal);height:100%;width:${pct}%"></div>
          </div>
        </div>`;
      }).join('');
      content = `
        <div class="hint" style="margin-bottom:10px">Individual call count for <b>${escapeHtml(state.date)}</b>, most-loaded first. Team-level assignments aren't counted here since there's no single person to compare against.</div>
        ${barsHtml}`;
    }
  } else if(active === 'weeklyRecap'){
    if(state.weeklyRecapLoading){
      content = `<div class="hint"><span class="spinner"></span> Building this week's recap…</div>`;
    } else if(state.weeklyRecapData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Pulls this week's call volume (vs. last week) and closures per team into one recap, instead of checking Trends and Closures separately.</div>
        <button class="btn primary" id="runWeeklyRecapScan">🔍 Build this week's recap</button>`;
    } else if(!state.weeklyRecapData.teams.length){
      content = `<div class="hint">No team activity found for this week yet. <button class="btn ghost" id="runWeeklyRecapScan" style="margin-left:8px">Re-build</button></div>`;
    } else {
      const rowsHtml = state.weeklyRecapData.teams.map(t=>{
        const changeLabel = t.changePct === null ? '' : `<span class="notif-chip" style="${t.changePct>0?'color:var(--amber);border-color:var(--amber)':(t.changePct<0?'color:var(--teal);border-color:var(--teal)':'')}">${t.changePct>0?'▲':(t.changePct<0?'▼':'—')} ${Math.abs(t.changePct)}% vs last week</span>`;
        return `<div class="notif-row">
          <div class="notif-name">${escapeHtml(t.team)} <span class="notif-detail" style="font-weight:400">— ${t.headcount} on team</span></div>
          <div class="notif-detail">
            <span class="notif-chip">${t.callsThisWeek} call${t.callsThisWeek===1?'':'s'} this week</span>
            ${changeLabel}
            ${t.closures?`<span class="notif-chip" style="color:var(--teal);border-color:var(--teal)">🏆 ${t.closures} closure${t.closures===1?'':'s'}</span>`:''}
          </div>
        </div>`;
      }).join('');
      // Visual last-week-vs-this-week comparison (2026-09-24, pipeline-
      // visibility batch) — the numbers above already say the delta, this
      // makes the actual size of it visible at a glance across every team.
      const barChartHtml = svgGroupedBarChart(
        state.weeklyRecapData.teams.map(t=>({ label: t.team, a: t.callsLastWeek || 0, b: t.callsThisWeek })),
        { labelA: 'Last week', labelB: 'This week', colorA: 'var(--text-faint)', colorB: 'var(--sky)' }
      );
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">Week of ${escapeHtml(weekStartDateKey(state.date))} onward.</div>
          <button class="btn ghost" id="runWeeklyRecapScan">Rebuild</button>
        </div>
        <div style="font-weight:700;font-size:13px;margin:6px 0">Call volume, last week vs. this week</div>
        <div style="border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:14px">${barChartHtml}</div>
        ${rowsHtml}`;
    }
  } else if(active === 'conversionFunnel'){
    if(state.conversionFunnelLoading){
      content = `<div class="hint"><span class="spinner"></span> Building the conversion funnel…</div>`;
    } else if(state.conversionFunnelData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Of everyone actually interviewed, what fraction eventually closes? A closure COUNT (see 🏆 Closures) says how much got closed; this says how well the pipeline actually converts — very different, and more useful for judging a client or a team. Each candidate's rounds at one company collapse into one shot at a closure, so re-interviewing the same person for the same client isn't counted twice.</div>
        <button class="btn primary" id="runConversionFunnelScan">🔍 Build conversion funnel</button>`;
    } else if(!state.conversionFunnelData.total){
      content = `<div class="hint">No candidate/company pipeline entries on file yet. <button class="btn ghost" id="runConversionFunnelScan" style="margin-left:8px">Re-build</button></div>`;
    } else {
      const d = state.conversionFunnelData;
      const overallColor = d.overallRate>=20 ? 'var(--teal)' : d.overallRate>=8 ? 'var(--amber)' : 'var(--coral)';
      const companyHtml = d.companyRows.length ? d.companyRows.map(c=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(c.company)} <span class="notif-warn" style="color:${c.rate>=20?'var(--teal)':c.rate>=8?'var(--amber)':'var(--coral)'}">${c.rate}% (${c.closed} of ${c.total})</span></div>
        </div>`).join('') : `<div class="hint">No company has ${CONVERSION_MIN_COMPANY_ENTRIES}+ pipeline entries on file yet — too little data for a rate to mean anything per client.</div>`;
      const teamHtml = d.teamRows.length ? d.teamRows.map(t=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(t.team)} <span class="notif-warn" style="color:${t.rate>=20?'var(--teal)':t.rate>=8?'var(--amber)':'var(--coral)'}">${t.rate}% (${t.closed} of ${t.total})</span></div>
        </div>`).join('') : `<div class="hint">No team-attributable pipeline entries yet.</div>`;
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${d.total} candidate/company pipeline entr${d.total===1?'y':'ies'} on file, all-time.</div>
          <button class="btn ghost" id="runConversionFunnelScan">Re-build</button>
        </div>
        <div style="border:1px solid var(--border);border-radius:8px;padding:16px;margin-bottom:14px;text-align:center">
          <div style="font-size:34px;font-weight:800;color:${overallColor}">${d.overallRate}%</div>
          <div class="hint" style="margin-top:2px">overall conversion — ${d.closed} closure${d.closed===1?'':'s'} out of ${d.total} pipeline entr${d.total===1?'y':'ies'}</div>
        </div>
        <div style="font-weight:700;font-size:13px;margin:6px 0">By company (${CONVERSION_MIN_COMPANY_ENTRIES}+ entries only)</div>
        ${companyHtml}
        <div style="font-weight:700;font-size:13px;margin:14px 0 6px">By team</div>
        ${teamHtml}`;
    }
  } else if(active === 'stuckPipeline'){
    if(state.stuckPipelineLoading){
      content = `<div class="hint"><span class="spinner"></span> Scanning every saved date for stalled candidates…</div>`;
    } else if(state.stuckPipelineData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Finds candidates who had a real (non-WOI) call, then nothing since — no further round, no closure, no explicit cancel/no-response tag — for ${STUCK_PIPELINE_MIN_DAYS}+ days. WOI candidates are covered by the ⏳ WOI Aging tab instead; this catches the case that currently surfaces nowhere else.</div>
        <button class="btn primary" id="runStuckPipelineScan">🔍 Scan for stalled candidates</button>`;
    } else if(!state.stuckPipelineData.length){
      content = `<div class="hint" style="color:var(--teal)">✅ Nothing appears stalled — every non-closed candidate has either moved recently or been explicitly resolved. <button class="btn ghost" id="runStuckPipelineScan" style="margin-left:8px">Re-scan</button></div>`;
    } else {
      const rowsHtml = state.stuckPipelineData.map(s=>{
        const urgent = s.daysSince >= 30;
        return `<div class="notif-row">
          <div class="notif-name">${escapeHtml(s.candidate)}${s.company?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(s.company)}</span>`:''}</div>
          <div class="notif-detail">
            <span class="notif-chip" style="${urgent?'color:var(--coral);border-color:var(--coral)':'color:var(--amber);border-color:var(--amber)'}">${s.daysSince} days since last contact</span>
            <span class="notif-chip">since ${escapeHtml(s.lastDate)}</span>
            ${s.round?`<span class="notif-chip">${escapeHtml(s.round)}</span>`:''}
            ${s.status?`<span class="notif-chip">last status: ${escapeHtml(statusBadgeInfo(s.status).label)}</span>`:''}
            ${s.assignee?`<span class="notif-chip">${escapeHtml(s.assignee)}</span>`:''}
            ${s.candidate?`<button class="btn ghost" data-view-timeline="${escapeHtml(s.candidate)}" style="font-size:10.5px;padding:3px 8px;margin-left:4px">📋 Timeline</button>`:''}
          </div>
        </div>`;
      }).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.stuckPipelineData.length} candidate(s) stalled ${STUCK_PIPELINE_MIN_DAYS}+ days, worst first.</div>
          <button class="btn ghost" id="runStuckPipelineScan">Re-scan</button>
        </div>
        ${rowsHtml}`;
    }
  } else if(active === 'finalRoundNudge'){
    if(state.finalRoundNudgeLoading){
      content = `<div class="hint"><span class="spinner"></span> Scanning advanced rounds for missing closures…</div>`;
    } else if(state.finalRoundNudgeData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Finds candidates whose most recent touchpoint was already a 2nd round or later, with no closure recorded since — for ${FINAL_ROUND_NUDGE_MIN_DAYS}+ days. This is the same idea as 🧊 Stuck in Pipeline, but narrower and earlier: it only looks at advanced rounds (which should resolve fast) and fires much sooner.</div>
        <button class="btn primary" id="runFinalRoundNudgeScan">🔍 Scan advanced rounds</button>`;
    } else if(!state.finalRoundNudgeData.length){
      content = `<div class="hint" style="color:var(--teal)">✅ No advanced-round candidate is overdue for a closure right now. <button class="btn ghost" id="runFinalRoundNudgeScan" style="margin-left:8px">Re-scan</button></div>`;
    } else {
      const rowsHtml = state.finalRoundNudgeData.map(s=>{
        const urgent = s.daysSince >= 10;
        return `<div class="notif-row">
          <div class="notif-name">${escapeHtml(s.candidate)}${s.company?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(s.company)}</span>`:''}</div>
          <div class="notif-detail">
            <span class="notif-chip" style="${urgent?'color:var(--coral);border-color:var(--coral)':'color:var(--amber);border-color:var(--amber)'}">${s.daysSince} days since last round, no closure</span>
            <span class="notif-chip">${escapeHtml(s.round||'advanced round')} on ${escapeHtml(s.lastDate)}</span>
            ${s.status?`<span class="notif-chip">last status: ${escapeHtml(statusBadgeInfo(s.status).label)}</span>`:''}
            ${s.assignee?`<span class="notif-chip">${escapeHtml(s.assignee)}</span>`:''}
            ${s.candidate?`<button class="btn ghost" data-view-timeline="${escapeHtml(s.candidate)}" style="font-size:10.5px;padding:3px 8px;margin-left:4px">📋 Timeline</button>`:''}
          </div>
        </div>`;
      }).join('');
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${state.finalRoundNudgeData.length} candidate(s) overdue for a closure after their last round, worst first.</div>
          <button class="btn ghost" id="runFinalRoundNudgeScan">Re-scan</button>
        </div>
        ${rowsHtml}`;
    }
  } else if(active === 'timeToClose'){
    if(state.timeToCloseLoading){
      content = `<div class="hint"><span class="spinner"></span> Computing time-to-close…</div>`;
    } else if(state.timeToCloseData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">How long does it actually take from a candidate's first call to a recorded closure? Median is shown alongside the average since one very fast or very slow closure can skew an average on its own.</div>
        <button class="btn primary" id="runTimeToCloseScan">🔍 Compute time-to-close</button>`;
    } else if(!state.timeToCloseData.count){
      content = `<div class="hint">No closures with a matching call on file yet. <button class="btn ghost" id="runTimeToCloseScan" style="margin-left:8px">Re-compute</button></div>`;
    } else {
      const d = state.timeToCloseData;
      const companyHtml = d.byCompany.length ? d.byCompany.map(c=>`
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(c.company)} <span class="notif-warn">${c.avgDays} day${c.avgDays===1?'':'s'} avg (${c.count} closure${c.count===1?'':'s'})</span></div>
        </div>`).join('') : `<div class="hint">No company has ${TIME_TO_CLOSE_MIN_COMPANY_CLOSURES}+ closures on file yet — too little data for an average to mean anything per client.</div>`;
      content = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">Based on ${d.count} closure${d.count===1?'':'s'} with a matching call on file.</div>
          <button class="btn ghost" id="runTimeToCloseScan">Re-compute</button>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px">
          <div style="flex:1;min-width:100px;border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:26px;font-weight:800;color:var(--sky)">${d.avgDays}</div>
            <div class="hint" style="margin-top:2px">avg days</div>
          </div>
          <div style="flex:1;min-width:100px;border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:26px;font-weight:800">${d.medianDays}</div>
            <div class="hint" style="margin-top:2px">median days</div>
          </div>
          <div style="flex:1;min-width:100px;border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:26px;font-weight:800;color:var(--teal)">${d.minDays}</div>
            <div class="hint" style="margin-top:2px">fastest</div>
          </div>
          <div style="flex:1;min-width:100px;border:1px solid var(--border);border-radius:8px;padding:12px;text-align:center">
            <div style="font-size:26px;font-weight:800;color:var(--amber)">${d.maxDays}</div>
            <div class="hint" style="margin-top:2px">slowest</div>
          </div>
        </div>
        <div style="font-weight:700;font-size:13px;margin:6px 0">By company (${TIME_TO_CLOSE_MIN_COMPANY_CLOSURES}+ closures only)</div>
        ${companyHtml}`;
    }
  } else if(active === 'candidateLastStatus'){
    if(state.candidateLastStatusLoading){
      content = `<div class="hint"><span class="spinner"></span> Scanning every saved date and grouping each candidate's full call history…</div>`;
    } else if(state.candidateLastStatusData === null){
      content = `
        <div class="hint" style="margin-bottom:10px">Every open (not yet closed) candidate's full call history, grouped by the month of their most recent call — name typos/abbreviations are matched to the same person, so a candidate's calls aren't silently split into separate "people". Already-closed candidates (a real offer recorded) are left out entirely — nothing more to chase there. A candidate with no new call in ${CANDIDATE_ACTIVITY_STALE_DAYS}+ days (and no cancel/not-responded tag) is flagged 🔴 stale — worth checking with the team to get them more interviews.</div>
        <button class="btn primary" id="runCandidateLastStatusScan">🔍 Scan candidate activity</button>`;
    } else if(!state.candidateLastStatusData.length){
      content = `<div class="hint">No candidates found yet. <button class="btn ghost" id="runCandidateLastStatusScan" style="margin-left:8px">Re-scan</button></div>`;
    } else {
      // Month nav (same pattern as the Closures List tab's month-at-a-time
      // nav): defaults to showing every month at once — important here,
      // since the whole point of this report is spotting a candidate whose
      // LAST call was a while ago, and narrowing to "this month only" by
      // default would hide exactly the stale candidates it exists to
      // surface. Prev/Next/toggle let you narrow down on top of that when
      // you want to look at one month specifically.
      const candidateActivityShowAll = state.candidateActivityShowAll !== false;
      const candidateActivityMonth = state.candidateActivityMonth || currentMonthKey();
      const monthScoped = candidateActivityShowAll ? state.candidateLastStatusData : state.candidateLastStatusData.filter(s => s.monthKey === candidateActivityMonth);
      const staleOnly = !!state.candidateActivityStaleOnly;
      const staleScoped = staleOnly ? monthScoped.filter(s=>s.isStale) : monthScoped;
      const q = (state.notifSearchLastStatus||'').trim().toLowerCase();
      const visible = q ? staleScoped.filter(s => (s.candidate||'').toLowerCase().includes(q) || (s.company||'').toLowerCase().includes(q)) : staleScoped;
      const staleCount = monthScoped.filter(s=>s.isStale).length;
      const navHtml = `<div class="row" style="margin-bottom:10px;flex-wrap:wrap;gap:8px;align-items:center">
        <button class="btn ghost" id="candidateActivityPrevMonth" title="Previous month" ${candidateActivityShowAll?'disabled':''}>◀</button>
        <div style="font-weight:700;font-size:14px;min-width:150px;text-align:center">${candidateActivityShowAll ? 'All months' : escapeHtml(monthKeyLabel(candidateActivityMonth))}</div>
        <button class="btn ghost" id="candidateActivityNextMonth" title="Next month" ${candidateActivityShowAll?'disabled':''}>▶</button>
        <button class="btn ghost" id="candidateActivityToggleAll" style="margin-left:auto">${candidateActivityShowAll ? '📅 Show one month at a time' : '📋 Show all months'}</button>
      </div>`;
      // Clicking the 🔴 stale count filters down to just those candidates —
      // click again (the button relabels to say so) to clear the filter
      // and see everyone again. Shown even when the count is 0 for THIS
      // scope but the filter is already on, so turning it back off is
      // always reachable.
      const staleFilterHtml = (staleCount || staleOnly)
        ? `<button class="btn ${staleOnly?'primary':'ghost'}" id="candidateActivityStaleOnlyToggle" style="margin-bottom:8px;color:${staleOnly?'':'var(--coral)'};border-color:var(--coral)">${staleOnly ? `✕ Showing only ${staleCount} stale — click to show all` : `🔴 ${staleCount} stale (${CANDIDATE_ACTIVITY_STALE_DAYS}+ days, no new calls) — click to filter`}</button>`
        : '';
      // The search box and the month-nav/stale-filter controls must stay on
      // screen even when the CURRENT query happens to match nothing — they
      // used to live only inside this "got results" branch, so typing a
      // query with zero matches (even transiently, character by character)
      // made the entire search box vanish along with the list, with no
      // visible way to clear it. Now only the "No candidates..." vs. the
      // grouped list toggles; the input/nav/filter are built once, always
      // shown, below.
      let listHtml;
      if(!visible.length){
        listHtml = `<div class="hint">No candidates${candidateActivityShowAll?'':' with a last call in '+escapeHtml(monthKeyLabel(candidateActivityMonth))} found${staleOnly?' (stale filter is on)':''}${q?' matching your search':''}.</div>`;
      } else {
        // Group into months, in the order candidates already come in (most
        // recent lastDate first — computeCandidateActivity's own sort), so
        // the month headers themselves fall out newest-first with no extra
        // sort step here.
        const monthOrder = [];
        const byMonth = {};
        visible.forEach(s=>{
          if(!byMonth[s.monthKey]){ byMonth[s.monthKey] = []; monthOrder.push(s.monthKey); }
          byMonth[s.monthKey].push(s);
        });
        const monthSectionsHtml = monthOrder.map(mk=>{
          const label = mk === 'Undated' ? 'Undated' : monthKeyLabel(mk);
          const rowsHtml = byMonth[mk].map(s=>{
            const statusChip = s.lastStatus
              ? `<span class="notif-chip" style="color:${statusBadgeInfo(s.lastStatus).colorVar};border-color:${statusBadgeInfo(s.lastStatus).colorVar}">${statusBadgeInfo(s.lastStatus).icon} ${statusBadgeInfo(s.lastStatus).label}</span>`
              : (s.lastWoi ? `<span class="notif-chip" style="color:var(--amber);border-color:var(--amber)">⏳ Waiting on Invite</span>` : `<span class="notif-chip">no status tagged</span>`);
            const historyStr = s.calls.map(c=>`${c.date}${c.round?' ('+c.round+')':''}`).join('  →  ');
            return `<div class="notif-row">
              <div class="notif-name">${escapeHtml(s.candidate)}${s.company?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(s.company)}</span>`:''}
                ${s.isStale?`<span class="notif-warn" style="color:var(--coral)">🔴 ${s.daysSince}d, no new calls</span>`:''}
              </div>
              <div class="notif-detail">
                <span class="notif-chip">${s.totalCalls} call${s.totalCalls===1?'':'s'} total</span>
                <span class="notif-chip">last: ${escapeHtml(s.lastDate||'date n/a')}${s.lastRound?' — '+escapeHtml(s.lastRound):''}</span>
                ${statusChip}
                ${s.assignee?`<span class="notif-chip">${escapeHtml(s.assignee)}</span>`:''}
                ${s.candidate?`<button class="btn ghost" data-view-timeline="${escapeHtml(s.candidate)}" style="font-size:10.5px;padding:3px 8px;margin-left:4px">📋 Timeline</button>`:''}
              </div>
              ${s.calls.length>1?`<div class="hint" style="margin-top:2px;font-size:11px" title="${escapeHtml(historyStr)}">${s.calls.length} touchpoints: ${escapeHtml(historyStr)}</div>`:''}
            </div>`;
          }).join('');
          return `<div style="font-weight:700;font-size:13px;margin:14px 0 6px">${escapeHtml(label)} <span class="hint" style="font-weight:400">(${byMonth[mk].length})</span></div>${rowsHtml}`;
        }).join('');
        listHtml = `
        <div class="row" style="margin-bottom:8px">
          <div class="hint">${visible.length} candidate(s)${candidateActivityShowAll?' — grouped by month of last call, newest first.':''}</div>
          <button class="btn ghost" id="runCandidateLastStatusScan">Re-scan</button>
        </div>
        ${monthSectionsHtml}`;
      }
      content = navHtml + staleFilterHtml + `
        <input type="text" class="notif-search" id="notifSearchLastStatus" placeholder="Search candidate or client…" value="${escapeHtml(state.notifSearchLastStatus||'')}">
        ${listHtml}`;
    }
  }

  return `<div class="import-panel">
    <div class="notif-tabs">${tabsHtml}</div>
    <div class="notif-tab-content">${subTabsHtml}${content}</div>
  </div>`;
}

function renderStrip(rows, conflictIds){
  if(!rows.length){
    return `<div class="strip-wrap"><div class="strip-title"><span>Coverage by hour</span></div><div class="strip-empty">No calls loaded for this day yet.</div></div>`;
  }
  const teamNames = new Set(state.roster.map(p=>p.team));
  const hydRaw = state.roster.filter(p=>p.team==='HYD Team').length || 6;
  const paRaw = state.roster.filter(p=>p.team==='Pradeep Anna Team').length || 8;
  const hydAbsentCount = state.roster.filter(p=>p.team==='HYD Team' && state.absentIds.includes(p.id)).length;
  const paAbsentCount = state.roster.filter(p=>p.team==='Pradeep Anna Team' && state.absentIds.includes(p.id)).length;
  const hydCount = Math.max(hydRaw - hydAbsentCount, 0);
  const paCount = Math.max(paRaw - paAbsentCount, 0);
  const devCount = computeTeamCapacity('Development Team');
  const mktCount = computeTeamCapacity('Marketing Team');
  function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  }
  const buckets = {};
  rows.forEach(r=>{
    const m = timeToMinutes(r.time);
    // 30-minute buckets instead of hourly — "how many calls at 10:00 vs
    // 10:30" was previously invisible, both got merged into one "10PM" bar.
    const h = m===9999 ? '?' : Math.floor(m/30);
    buckets[h] = buckets[h] || {assigned:0, unassigned:0, woi:0, advanced:0, advancedNames:[], callDetails:[], mins:businessDayMinutes(r.time), hyd:0, pa:0, hydAssigned:0, paAssigned:0, devAssigned:0, mktAssigned:0, otherAssigned:0};
    buckets[h].callDetails.push({ mins: timeToMinutes(r.time), time: r.time || '(no time)', candidate: r.candidate || 'candidate' });
    const isAdv = isAdvancedRound(r.round);
    if(isAdv){
      buckets[h].advanced++;
      const who = r.assignee ? r.assignee : 'unassigned';
      buckets[h].advancedNames.push(`${who} (${r.candidate||'candidate'})`);
    } else {
      if(r.woi) buckets[h].woi++;
      else if(r.assignee){
        buckets[h].assigned++;
        const team = teamOf(r.assignee);
        if(team==='HYD Team') buckets[h].hydAssigned++;
        else if(team==='Pradeep Anna Team') buckets[h].paAssigned++;
        else if(team==='Development Team') buckets[h].devAssigned++;
        else if(team==='Marketing Team') buckets[h].mktAssigned++;
        else buckets[h].otherAssigned++;
      }
      else buckets[h].unassigned++;
    }
    if(!r.woi){
      const team = teamOf(r.assignee);
      if(team==='HYD Team') buckets[h].hyd++;
      else if(team==='Pradeep Anna Team') buckets[h].pa++;
    }
  });
  const keys = Object.keys(buckets).sort((a,b)=>{
    if(a==='?') return 1; if(b==='?') return -1;
    return buckets[a].mins - buckets[b].mins;
  });
  const maxCount = Math.max(...keys.map(k=>buckets[k].assigned+buckets[k].unassigned+buckets[k].woi+buckets[k].advanced));
  const barsHtml = keys.map(k=>{
    const b = buckets[k];
    const total = b.assigned+b.unassigned+b.woi+b.advanced;
    const unit = 58/maxCount;
    const hydFree = Math.max(hydCount - b.hyd, 0);
    const paFree = Math.max(paCount - b.pa, 0);
    const anyFree = hydFree>0 || paFree>0;
    const label = k==='?' ? 'Unknown time' : halfHourBucketLabel(k*30);
    let tooltip = `${label} \u2014 ${total} call${total===1?'':'s'} \u2014 click to jump to these calls\n`
      + `HYD Team: ${b.hyd}/${hydCount} booked (${hydFree} free)\n`
      + `Pradeep Anna Team: ${b.pa}/${paCount} booked (${paFree} free)`;
    if(b.devAssigned) tooltip += `\nDevelopment Team: ${b.devAssigned} booked`;
    if(b.mktAssigned) tooltip += `\nMarketing Team: ${b.mktAssigned} booked`;
    // This bar covers a 30-minute window, so a 9:00 call and a 9:15 call
    // land in the same bar — list the actual distinct times when they
    // differ, so hovering still shows exactly when within the window
    // each call really is, not just the rounded-down bucket time.
    const byExactTime = {};
    b.callDetails.forEach(c=>{
      byExactTime[c.time] = byExactTime[c.time] || { mins: c.mins, names: [] };
      byExactTime[c.time].names.push(c.candidate);
    });
    const exactTimeKeys = Object.keys(byExactTime).sort((a,b2)=> byExactTime[a].mins - byExactTime[b2].mins);
    if(exactTimeKeys.length > 1){
      tooltip += `\n\nExact times in this slot:\n` + exactTimeKeys.map(t => `${t} \u2014 ${byExactTime[t].names.join(', ')}`).join('\n');
    }
    if(b.advanced){
      tooltip += `\n\n2nd Round & Above (${b.advanced}):\n` + b.advancedNames.join('\n');
    }
    return `<div class="hour" data-bucket="${k}" style="height:${total*unit}px;cursor:pointer" title="${escapeHtml(tooltip)}">
      ${b.hydAssigned?`<div class="seg" style="background:var(--teal);height:${b.hydAssigned*unit}px"></div>`:''}
      ${b.paAssigned?`<div class="seg" style="background:var(--blue);height:${b.paAssigned*unit}px"></div>`:''}
      ${b.devAssigned?`<div class="seg" style="background:var(--green);height:${b.devAssigned*unit}px"></div>`:''}
      ${b.mktAssigned?`<div class="seg" style="background:var(--sky);height:${b.mktAssigned*unit}px"></div>`:''}
      ${b.otherAssigned?`<div class="seg" style="background:var(--text-faint);height:${b.otherAssigned*unit}px"></div>`:''}
      ${b.woi?`<div class="seg" style="background:var(--amber);height:${b.woi*unit}px"></div>`:''}
      ${b.unassigned?`<div class="seg" style="background:var(--coral);height:${b.unassigned*unit}px"></div>`:''}
      ${b.advanced?`<div class="seg seg-advanced" style="background:var(--violet);height:${b.advanced*unit}px"></div>`:''}
      <div class="hour-free-dot" style="background:${anyFree?'var(--teal)':'var(--coral)'}"></div>
    </div>`;
  }).join('');
  const lblsHtml = keys.map(k=>`<div class="hour-lbl">${k==='?'?'?':halfHourBucketLabel(k*30)}</div>`).join('');
  const minW = Math.max(keys.length*46, 260);
  return `<div class="strip-wrap ${state.mobileStripExpanded?'mobile-expanded':''}">
    <div class="strip-title"><span>Coverage by half hour (IST) \u2014 all rounds combined</span><span class="strip-title-legend"><span class="legend-chip"><i style="background:var(--teal)"></i>HYD</span><span class="legend-chip"><i style="background:var(--blue)"></i>Pradeep Anna</span><span class="legend-chip"><i style="background:var(--green)"></i>Development</span><span class="legend-chip"><i style="background:var(--sky)"></i>Marketing</span><span class="legend-chip"><i style="background:var(--amber)"></i>WOI</span><span class="legend-chip"><i style="background:var(--coral)"></i>Unassigned</span><span class="legend-chip"><i style="background:var(--violet)"></i>2nd round+</span></span><button type="button" class="mobile-collapse-toggle" id="toggleMobileStrip" title="Show/hide on mobile">${state.mobileStripExpanded?'▴':'▾'}</button></div>
    <div class="strip-collapsible">
    <div class="strip-scroll"><div style="min-width:${minW}px">
    <div class="strip">${barsHtml}</div>
    <div class="strip-hours">${lblsHtml}</div>
    </div></div>
    <div class="strip-hint">Hover a bar for free-slot details, or click it to jump straight to those calls below.</div>
    </div>
  </div>`;
}
// A one-tap "paste from clipboard" button dropped just above any import
// textarea — the actual speed-up for "I keep copying from WhatsApp and
// pasting in here every time": one tap instead of long-press → Paste,
// and it works the same on every import panel (calls, reschedule/cancel,
// closures) since they all just fill a textarea by id.
function pasteButtonHtml(targetId){
  return `<div style="display:flex;justify-content:flex-end;gap:6px;margin-bottom:4px">
    ${micButtonHtml(targetId)}
    <button type="button" class="btn ghost paste-clipboard-btn" data-target="${targetId}" style="font-size:11.5px;padding:5px 10px" title="Paste the WhatsApp message you just copied">📋 Paste from clipboard</button>
  </div>`;
}
// Hands-free capture for logging a call detail while mid-conversation —
// uses the browser's own built-in speech-to-text (Web Speech API), nothing
// server-side and nothing sent anywhere outside the browser. Only rendered
// where the browser actually supports it (feature-detected in JS at click
// time, not here, since SSR-style string building can't check for
// `window.SpeechRecognition` — the button always renders, and a click on
// an unsupported browser just shows a plain explanation instead of failing
// silently).
function micButtonHtml(targetId){
  const listening = state.micListening && state.micTargetId === targetId;
  return `<button type="button" class="btn ghost mic-capture-btn ${listening?'active':''}" data-target="${targetId}" style="font-size:11.5px;padding:5px 10px${listening?';color:var(--coral);border-color:var(--coral)':''}" title="Speak the call details instead of typing — uses your browser's built-in speech-to-text">${listening?'⏹ Listening… (tap to stop)':'🎤 Speak'}</button>`;
}

function renderRescheduleImportPanel(){
  const dayRows = state.rows.slice().sort((a,b)=>businessDayMinutes(a.time)-businessDayMinutes(b.time));
  const manualOptionsHtml = `<option value="">— Select a call —</option>` + dayRows.map(r=>
    `<option value="${r.id}">${escapeHtml(r.candidate||'(no name)')} — ${escapeHtml(r.time||'')}${r.company?' — '+escapeHtml(r.company):''}</option>`
  ).join('');
  return `<div class="import-panel" style="border:none;padding:0;margin-bottom:0;box-shadow:none">
    <div class="hint" style="margin-bottom:10px">Paste WhatsApp-style reschedule/cancel messages for calls that are <b>already saved</b> in this day's list — this only updates the status/tag on matching calls, it does not create new calls. Existing calls in the DB will be scanned for a match by candidate name and time.</div>
    ${pasteButtonHtml('rescheduleImportText')}
    <textarea id="rescheduleImportText" placeholder="Paste reschedule/cancel messages, e.g.:&#10;Vamsi Rokkam – 2:30 PM IST – rescheduled from candidate side, reschedule to tomorrow sir&#10;Lakshmi Prasanna Potla – 10:00 PM IST – cancelled due to client side sir&#10;Rohit Garjakuntla (UK) – 4:30 PM call didn't happen as he didn't receive the invitation link"></textarea>
    <div class="row">
      <div class="hint">Each message must include a name, a time (e.g. 2:30 PM, or a bare "7:00"), and the word "reschedule", "cancel", "not responding"/"no response", or a mention of not receiving the invite/link.</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ghost" id="cancelRescheduleImport">Cancel</button>
        <button class="btn primary" id="parseRescheduleBtn">Parse messages</button>
      </div>
    </div>
    <div style="border-top:1px solid var(--border);margin-top:16px;padding-top:16px">
      <div style="font-weight:600;font-size:13px;margin-bottom:8px">Can't find the message, or the system won't recognize it? Mark a call manually instead:</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:flex-end">
        <div style="flex:2;min-width:200px">
          <label class="hint" style="display:block;margin-bottom:4px">Which call</label>
          <select id="manualReschedCall" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">${manualOptionsHtml}</select>
        </div>
        <div style="flex:1;min-width:140px">
          <label class="hint" style="display:block;margin-bottom:4px">Status</label>
          <select id="manualReschedStatus" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
            <option value="rescheduled">↻ Rescheduled</option>
            <option value="cancelled">✕ Cancelled</option>
            <option value="not_responded">☎ Not Responded</option>
            <option value="no_invite">📨 Didn't Receive Invite</option>
          </select>
        </div>
        <div style="flex:2;min-width:200px">
          <label class="hint" style="display:block;margin-bottom:4px">Reason (optional)</label>
          <input id="manualReschedReason" type="text" placeholder="e.g. candidate side, reschedule tomorrow" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <button class="btn primary" id="addManualReschedBtn">Add</button>
      </div>
    </div>
  </div>`;
}

function renderRescheduleConfirmPanel(){
  const items = state.rescheduleReview || [];
  const dayRows = state.rows.slice().sort((a,b)=>businessDayMinutes(a.time)-businessDayMinutes(b.time));
  const optionsHtml = (selectedId)=>{
    let html = `<option value="">— Select a call —</option>`;
    dayRows.forEach(r=>{
      html += `<option value="${r.id}" ${selectedId===r.id?'selected':''}>${escapeHtml(r.candidate||'(no name)')} — ${escapeHtml(r.time||'')}${r.company?' — '+escapeHtml(r.company):''}</option>`;
    });
    return html;
  };
  const unmatchedCount = items.filter(it=>!it.selectedRowId).length;
  const itemsHtml = items.map((it, idx)=>{
    const matched = !!it.selectedRowId;
    return `<div class="resched-item ${matched?'':'unmatched'}" data-idx="${idx}">
      <div class="resched-raw">${escapeHtml(it.raw)}</div>
      <div class="resched-meta">
        <span><b>Candidate:</b> ${escapeHtml(it.candidate||'—')}</span>
        <span><b>Time:</b> ${escapeHtml(it.time||'—')}</span>
        ${it.company?`<span><b>Client:</b> ${escapeHtml(it.company)}</span>`:''}
        <span><b>Status:</b> ${statusBadgeInfo(it.status).icon} ${statusBadgeInfo(it.status).label}</span>
        ${it.side?`<span><b>Side:</b> ${escapeHtml(it.side)}</span>`:''}
        ${it.reason?`<span><b>Reason:</b> ${escapeHtml(it.reason)}</span>`:''}
      </div>
      <select class="resched-target-select" data-idx="${idx}" ${it.skip?'disabled':''}>${optionsHtml(it.selectedRowId)}</select>
      <div class="resched-flags">
        ${matched && it.autoMatched ? `<span class="resched-match-badge">✓ Auto-matched to an existing call — check it's the right one</span>` : `<span class="resched-unmatch-badge">⚠ No automatic match found — pick the call this refers to</span>`}
        <label style="font-size:12px;color:var(--text-muted);display:flex;align-items:center;gap:5px;white-space:nowrap"><input type="checkbox" class="resched-skip" data-idx="${idx}" ${it.skip?'checked':''}> Skip this one</label>
      </div>
    </div>`;
  }).join('');
  return `<div class="import-panel">
    <div class="resched-warning-banner">⚠ Confirm before saving: this will overwrite the status on ${items.length} call(s) in the database${unmatchedCount?`, and ${unmatchedCount} message(s) still need a call selected manually`:''}. Double-check each match below.</div>
    ${itemsHtml || '<div class="hint">No reschedule/cancel messages were detected in that text.</div>'}
    <div class="row">
      <div class="hint">Calls without a selected match will be skipped and nothing will be saved for them.</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ghost" id="cancelRescheduleConfirm">Cancel</button>
        <button class="btn primary" id="confirmRescheduleApply" ${state.rescheduleApplying?'disabled':''}>${state.rescheduleApplying?'<span class="spinner"></span>Saving…':'Confirm & save'}</button>
      </div>
    </div>
  </div>`;
}

function renderClosureImportSection(){
  return `<div style="margin-bottom:18px;padding-bottom:16px;border-bottom:1px solid var(--border-soft)">
    <div class="hint" style="margin-bottom:10px">Paste a closure/job-offer message — a candidate name, a company, and (optionally) a salary line. This creates new closure records; it doesn't touch today's calls.</div>
    ${pasteButtonHtml('closureImportText')}
    <textarea id="closureImportText" placeholder="Paste closure/offer messages, e.g.:&#10;Rohini sura got offer letter from Capitol bridge&#10;&#10;salary: $75,000 per annum"></textarea>
    <div class="row">
      <div class="hint">Recognizes phrasings like "got offer letter from", "received offer from", "selected by", "closed with", "placed at".</div>
      <button class="btn primary" id="parseClosureBtn">Parse messages</button>
    </div>
  </div>`;
}
function renderClosureConfirmPanel(){
  const items = state.closureReview || [];
  function crossRefBadge(cr){
    if(!cr) return '';
    const styles = {
      checking: {bg:'var(--surface-2)', color:'var(--text-muted)', icon:'⏳'},
      match: {bg:'var(--green-dim)', color:'var(--green)', icon:'✓'},
      mismatch: {bg:'var(--amber-dim)', color:'var(--amber)', icon:'⚠'},
      // FIX (2026-09-29): no_match used to share the same neutral gray as
      // the transient "checking…" state, even though it's the single
      // strongest predictor of this exact row ending up stuck in Unmatched
      // closures right after saving — task-list item from "so much process
      // going on... what do you suggest": surface that risk BEFORE saving,
      // not just after. Same amber weight as mismatch now, since both
      // predict the identical downstream problem.
      no_match: {bg:'var(--amber-dim)', color:'var(--amber)', icon:'❓'},
      error: {bg:'var(--surface-2)', color:'var(--text-muted)', icon:'ℹ'},
    };
    const s = styles[cr.status] || styles.no_match;
    return `<div style="background:${s.bg};color:${s.color};border-radius:8px;padding:7px 10px;font-size:12px;margin-top:8px">${s.icon} ${escapeHtml(cr.message)}</div>`;
  }
  // Inline "🔗 Pick the right call" picker for a review item that didn't
  // auto-match (or matched the wrong one) — lets this get fixed BEFORE
  // saving instead of only after, via the post-save Unmatched Closures
  // list. See getReviewMatchCandidateList() for where the options come from.
  function reviewMatchPickerHtml(it, idx){
    if(state.closureReviewMatchIdx !== idx) return '';
    // FIX (2026-10-02): same bug class as the post-save "🔗 Match manually"
    // picker fixed on 2026-09-28 — this picker's whole point is to search
    // against the CURRENT state of the board, so it force-refreshes on open
    // (see [data-open-review-match] below) rather than searching whatever
    // snapshot parseClosureBtn happened to capture when the text was pasted,
    // which can be a stale/empty fetchAllRowsAcrossDates() cache from
    // earlier in the session ("no records showing searching option").
    if(state.closureReviewMatchRefreshing){
      return `<div style="margin-top:8px;padding:10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--teal)">
        <div class="hint"><span class="spinner"></span> Pulling the latest calls before searching…</div>
      </div>`;
    }
    const allRows = state.closureReviewAllRows || [];
    if(!allRows.length){
      // DIAGNOSTIC (2026-10-02): this message kept appearing with real
      // calls plainly on the board elsewhere, so it now also prints exactly
      // what the last fetch found — which dates it saw, how many of those
      // per-date fetches failed, and any outright error from the dates
      // lookup — instead of just the one-line dead end. See
      // _allRowsAcrossDatesDebug in fetchAllRowsAcrossDates().
      const dbg = _allRowsAcrossDatesDebug;
      const dbgLine = dbg
        ? `Debug: saw ${dbg.datesAttempted} date(s) on file, ${dbg.dateFetchErrors} failed to load${dbg.datesApiError ? `, dates lookup error: "${escapeHtml(dbg.datesApiError)}"` : ''}.`
        : 'Debug: no fetch diagnostics recorded.';
      return `<div style="margin-top:8px;padding:10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--teal)">
        <div class="hint">No call records came back for the latest check — nothing to match this closure to. <button class="btn ghost" data-cancel-review-match="${idx}" style="margin-left:6px">Close</button></div>
        <div class="hint" style="margin-top:6px;font-size:11px;opacity:.75">${dbgLine}</div>
      </div>`;
    }
    const { list, searching } = getReviewMatchCandidateList(idx);
    const itemCandKey = (it.candidate||'').trim().toLowerCase();
    const options = list.map((r,i)=>{
      const differentCandidate = itemCandKey && r.candidate.trim().toLowerCase() !== itemCandKey;
      return `<option value="${i}">${escapeHtml(r.candidate)} — ${escapeHtml(r.company)} — ${escapeHtml(r._date||'')}${r.assignee?` — ${escapeHtml(r.assignee)}`:''}${differentCandidate?' ⚠ different candidate':''}</option>`;
    }).join('');
    const allFallback = !searching && list.length > 0 && list.every(r=>r._fallback);
    let hint;
    if(searching) hint = list.length ? 'Search results:' : 'No calls on file match that search. Try a different spelling.';
    else if(allFallback) hint = 'No obvious match by name or company — pick from the most recent calls on file, or search below:';
    else hint = 'Pick the call this closure actually belongs to, or search below:';
    return `<div style="margin-top:8px;padding:10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--teal)">
      <input type="text" data-review-match-search="${idx}" placeholder="🔎 Search by candidate or company name…" value="${escapeHtml(state.closureReviewMatchSearch||'')}" style="width:100%;margin-bottom:8px;padding:6px 8px;border-radius:6px;border:1px solid var(--border-soft);background:var(--surface);color:inherit">
      <div class="hint" style="margin-bottom:6px">${hint}</div>
      ${list.length ? `
        <select id="reviewMatchSelect-${idx}" style="width:100%;margin-bottom:8px">${options}</select>
        <div style="display:flex;gap:8px">
          <button class="btn primary" data-confirm-review-match="${idx}">Use this record</button>
          <button class="btn ghost" data-cancel-review-match="${idx}">Cancel</button>
        </div>
      ` : `<button class="btn ghost" data-cancel-review-match="${idx}">Close</button>`}
    </div>`;
  }
  const itemsHtml = items.map((it, idx)=>`<div class="resched-item" data-idx="${idx}">
      <div class="resched-raw">${escapeHtml(it.raw)}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:8px">
        <div style="flex:1;min-width:160px">
          <label class="hint" style="display:block;margin-bottom:4px">Candidate</label>
          <input type="text" class="closure-review-field" data-idx="${idx}" data-field="candidate" value="${escapeHtml(it.candidate)}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <div style="flex:1;min-width:160px">
          <label class="hint" style="display:block;margin-bottom:4px">Company</label>
          <input type="text" class="closure-review-field" data-idx="${idx}" data-field="company" value="${escapeHtml(it.company)}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <div style="flex:1;min-width:140px">
          <label class="hint" style="display:block;margin-bottom:4px">Salary (optional)</label>
          <input type="text" class="closure-review-field" data-idx="${idx}" data-field="salary" value="${escapeHtml(it.salary||'')}" placeholder="e.g. $75,000 per annum" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 10px;border-radius:8px;font-size:12.5px">
        </div>
        <button class="btn ghost closure-review-remove" data-idx="${idx}" title="Remove this one" style="align-self:flex-end">✕</button>
      </div>
      ${crossRefBadge(it.crossRef)}
      ${(it.crossRef && (it.crossRef.status==='no_match' || it.crossRef.status==='mismatch') && state.closureReviewMatchIdx!==idx) ? `<button class="btn ghost" data-open-review-match="${idx}" style="font-size:11px;padding:4px 10px;margin-top:6px">🔗 Pick the right call</button>` : ''}
      ${reviewMatchPickerHtml(it, idx)}
    </div>`).join('');
  return `<div class="import-panel">
    ${itemsHtml || '<div class="hint">No closure/offer messages were detected in that text.</div>'}
    <div class="row">
      <div class="hint">${items.length} closure${items.length===1?'':'s'} ready to save. Edit any field above before confirming — a ⚠ flag means the company doesn't match what's on file for that candidate, so double-check it's correct.</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ghost" id="cancelClosureConfirm">Cancel</button>
        <button class="btn primary" id="confirmClosureApply" ${state.closureApplying || !items.length ? 'disabled':''}>${state.closureApplying?'<span class="spinner"></span>Saving…':'Confirm & save'}</button>
      </div>
    </div>
  </div>`;
}
// The unmatched-closures review list on the "By Handler" tab — previously
// just a count ("N couldn't be matched"), which gave no way to actually do
// anything about it. Each row shows the specific closure, why it didn't
// match (crossReferenceClosure()'s own reason text), and a "🔗 Match
// manually" button that opens a small picker of plausible candidates
// (findClosureMatchSuggestions()) to point it at by hand.
function renderUnmatchedClosuresHtml(unmatchedDetails){
  if(!unmatchedDetails.length) return '';
  const pickerId = state.closureManualMatchPickerId;
  const hasAnyRecords = !!((state.closuresPerformance && state.closuresPerformance.allRowsSnapshot || []).length);
  const rowsHtml = unmatchedDetails.map(({closure, reason, reasonDetail})=>{
    const isOpen = pickerId === closure.id;
    // "🔗 Same company?" quick-alias buttons (2026-09-27) — requested as
    // "read the company mismatch or spelling automatically... example LSU
    // and LSUHSC-Shreveport". A fully-automatic guess isn't safe here (two
    // spellings this different can't be told apart from two genuinely
    // different companies without risking false matches elsewhere), but
    // when this candidate has a call on file at a DIFFERENT company, that's
    // a strong, human-reviewable hint (crossReferenceClosure() already
    // confirmed it's the same person) — one click saves it as a confirmed
    // Company alias instead of retyping both names into that form by hand.
    // Admin-only, same as the Company Aliases section itself.
    const quickAliasCompanies = (CURRENT_ROLE === 'admin' && reasonDetail && reasonDetail.companiesOnFile) ? reasonDetail.companiesOnFile : [];
    const quickAliasHtml = quickAliasCompanies.length ? `
      <div style="margin-top:4px;display:flex;gap:6px;flex-wrap:wrap;align-items:center">
        <span class="hint" style="font-size:11px">Same company as one of these, just spelled differently?</span>
        ${quickAliasCompanies.map(co=>`<button class="btn ghost" data-quick-alias-closure="${closure.id}" data-quick-alias-company="${escapeHtml(co)}" style="font-size:11px;padding:2px 8px">🔗 = "${escapeHtml(co)}"</button>`).join('')}
      </div>` : '';
    let pickerHtml = '';
    if(isOpen){
      // FIX (2026-09-28): "that particular name and record is not coming" /
      // "still it is not loading" — the whole point of opening this picker
      // is to find a record against the CURRENT state of the board, so it
      // force-refreshes on open (see [data-open-closure-match] below) rather
      // than searching whatever snapshot happened to be sitting around from
      // earlier in the session — a call added, edited, or a closure pasted
      // in since the last scan used to be silently invisible here.
      if(state.closureMatchRefreshing){
        pickerHtml = `<div style="margin-top:8px;padding:10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--teal)">
          <div style="font-weight:700;font-size:12px;margin-bottom:6px;color:var(--teal)">🔗 Matching: ${escapeHtml(closure.candidate)} — ${escapeHtml(closure.company)}</div>
          <div class="hint"><span class="spinner"></span> Pulling the latest calls and closures before searching…</div>
        </div>`;
      } else if(!hasAnyRecords){
        // DIAGNOSTIC (2026-10-02): same debug line as the pre-save picker —
        // see _allRowsAcrossDatesDebug in fetchAllRowsAcrossDates().
        const dbg = _allRowsAcrossDatesDebug;
        const dbgLine = dbg
          ? `Debug: saw ${dbg.datesAttempted} date(s) on file, ${dbg.dateFetchErrors} failed to load${dbg.datesApiError ? `, dates lookup error: "${escapeHtml(dbg.datesApiError)}"` : ''}.`
          : 'Debug: no fetch diagnostics recorded.';
        pickerHtml = `<div style="margin-top:8px;padding:10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--teal)">
          <div style="font-weight:700;font-size:12px;margin-bottom:6px;color:var(--teal)">🔗 Matching: ${escapeHtml(closure.candidate)} — ${escapeHtml(closure.company)}</div>
          <div class="hint">No call records came back for the latest check — nothing to match this closure to. <button class="btn ghost" data-cancel-closure-match="${closure.id}" style="margin-left:6px">Close</button></div>
          <div class="hint" style="margin-top:6px;font-size:11px;opacity:.75">${dbgLine}</div>
        </div>`;
      } else {
        // FIX (2026-09-27): the select used to only ever offer the up-to-8
        // pre-computed suggestions, with no way to reach a real record that
        // simply wasn't in that shortlist — reported as "records not
        // showing" a second time even after the earlier fallback fix. A
        // search box (getClosureMatchCandidateList()) now lets the person
        // search EVERY call record on file by candidate or company name,
        // not just the suggested handful.
        const { list, searching, portalSearched } = getClosureMatchCandidateList(closure.id);
        // FIX (2026-09-27): reported case — searching by company text
        // ("your golf" for "Your Golf Travel") surfaced another candidate's
        // call (Srirama Dasu) for a closure that was actually Reshma
        // Shaik's, and nothing in the option text called that out. Every
        // option for a different candidate than this closure's own now
        // says so explicitly, so a same-company-different-person result
        // can never be mistaken for a match on the right person.
        const closureCandKey = (closure.candidate||'').trim().toLowerCase();
        const options = list.map((r,i)=>{
          const differentCandidate = closureCandKey && r.candidate.trim().toLowerCase() !== closureCandKey;
          return `<option value="${i}">${escapeHtml(r.candidate)} — ${escapeHtml(r.company)} — ${escapeHtml(r._date||'')}${r.assignee?` — ${escapeHtml(r.assignee)}`:''}${differentCandidate?' ⚠ different candidate':''}${r._portalOnly?' 📡 Portal only (no Coverage Desk record)':''}</option>`;
        }).join('');
        const allFallback = !searching && list.length > 0 && list.every(r=>r._fallback);
        let hint;
        // FIX (2026-09-28): "take portal data here if we not found proper
        // record in coverage desk" — the search now also checks the
        // separately-synced Interview Portal data (state.portalAssignments)
        // once a sync has been run this session, for the case where a real
        // call was never entered into Coverage Desk's own board at all.
        // Portal-only results are always clearly labeled in the option text
        // itself (never silently blended with a real Coverage Desk record).
        if(searching){
          hint = list.length ? 'Search results (Coverage Desk, plus Portal-synced history where marked):' : (portalSearched ? 'No calls on file — Coverage Desk or Portal — match that search. Try a different spelling.' : 'No calls on file match that search. Portal history hasn\'t been synced this session yet — run 📡 Team Sync → Full Sync to also search Portal records, then search again.');
        }
        else if(allFallback) hint = 'No obvious match by name or company — pick from the most recent calls on file, or search below:';
        else hint = 'Pick the call this closure actually belongs to, or search below:';
        pickerHtml = `<div style="margin-top:8px;padding:10px;background:var(--surface-2);border-radius:8px;border:1px solid var(--teal)">
          <div style="font-weight:700;font-size:12px;margin-bottom:6px;color:var(--teal)">🔗 Matching: ${escapeHtml(closure.candidate)} — ${escapeHtml(closure.company)}</div>
          ${state.closureMatchError ? `<div class="hint" style="color:var(--coral);margin-bottom:8px">⚠ ${escapeHtml(state.closureMatchError)}</div>` : ''}
          <input type="text" id="closureMatchSearch-${closure.id}" class="closure-match-search-input" data-closure-match-search="${closure.id}" placeholder="🔎 Search by candidate or company name…" value="${escapeHtml(state.closureMatchSearch||'')}" style="width:100%;margin-bottom:8px;padding:6px 8px;border-radius:6px;border:1px solid var(--border-soft);background:var(--surface);color:inherit">
          <div class="hint" style="margin-bottom:6px">${hint}</div>
          ${list.length ? `
            <select id="closureMatchSelect-${closure.id}" style="width:100%;margin-bottom:8px">
              ${options}
            </select>
            <div style="display:flex;gap:8px">
              <button class="btn primary" data-confirm-closure-match="${closure.id}" ${state.closureManualMatchSaving?'disabled':''}>${state.closureManualMatchSaving?'<span class="spinner"></span>Saving…':'Confirm match'}</button>
              <button class="btn ghost" data-cancel-closure-match="${closure.id}">Cancel</button>
            </div>
          ` : `<button class="btn ghost" data-cancel-closure-match="${closure.id}">Close</button>`}
        </div>`;
      }
    }
    return `<div class="notif-row" style="flex-direction:column;align-items:stretch">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <div class="notif-name">${escapeHtml(closure.candidate)} <span class="notif-chip">${escapeHtml(closure.company)}</span></div>
        ${!isOpen ? `<button class="btn ghost" data-open-closure-match="${closure.id}" style="font-size:12px">🔗 Match manually</button>` : ''}
      </div>
      <div class="hint" style="margin-top:2px">${escapeHtml(reason)}</div>
      ${quickAliasHtml}
      ${pickerHtml}
    </div>`;
  }).join('');
  return `<div style="margin-top:14px">
    <div style="font-weight:700;font-size:13px;margin-bottom:6px">Unmatched closures</div>
    ${rowsHtml}
  </div>`;
}
// "No handler credited" closures (2026-09-29): matched to a real call
// record, but that record has neither a Driving Person nor an Assignee —
// "some calls gets after first round only" made clear this isn't only an
// advanced-round problem (where auto-fill is deliberately skipped
// everywhere else in this app), it's also just calls on a PAST date that
// never got a Sync run while that date happened to be open on the board,
// since the Portal auto-fill only ever touches whatever's in state.rows
// for the currently-viewed date. Cross-references state.portalAssignments
// (from the last 📡 Team Sync) for the same candidate+company and, when
// found, offers a one-click way to push that name into Driving Person on
// the call's own date — without needing to navigate there by hand.
// Shared by renderNoAssigneeClosuresHtml() and renderTeamOnlyClosuresHtml()
// below — both buckets are "matched to a call, but no individual to credit
// yet" and both are fixed the same way (apply the Portal's driving person,
// if one's on file for that exact call). `noteFn(match)` supplies the one
// line of explanation that differs between the two ("no one set at all" vs
// "only a team").
function renderCreditGapClosuresHtml(title, details, noteFn){
  if(!details.length) return '';
  const rowsHtml = details.map(({closure, match})=>{
    const portalRow = (state.portalAssignments||[]).find(p =>
      (p.candidate||'').trim().toLowerCase() === (match.candidate||'').trim().toLowerCase() &&
      normalizeCompanyKey(p.client) === normalizeCompanyKey(match.company)
    );
    const portalHandler = portalRow && (portalRow.handler || portalRow.assignee);
    const applying = state.noAssigneeApplyingId === closure.id;
    let actionHtml;
    if(portalHandler){
      actionHtml = `<button class="btn ghost" data-apply-portal-driving="${closure.id}" data-apply-portal-name="${escapeHtml(portalHandler)}" data-apply-portal-date="${escapeHtml(match._date||'')}" data-apply-portal-callid="${escapeHtml(String(match.id))}" ${applying?'disabled':''} style="font-size:12px">${applying?'<span class="spinner"></span>Applying…':`📡 Apply "${escapeHtml(portalHandler)}" as Driving Person`}</button>`;
    } else if(!state.portalAssignments || !state.portalAssignments.length){
      actionHtml = `<span class="hint" style="font-size:11px">Run 📡 Team Sync → Full Sync to check whether the Portal shows who handled this one.</span>`;
    } else {
      actionHtml = `<span class="hint" style="font-size:11px">No Portal record found for this call either — set Driving Person manually on ${escapeHtml(match._date||'that date')}.</span>`;
    }
    return `<div class="notif-row" style="flex-direction:column;align-items:stretch">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <div class="notif-name">${escapeHtml(closure.candidate)} <span class="notif-chip">${escapeHtml(closure.company)}</span></div>
        ${actionHtml}
      </div>
      <div class="hint" style="margin-top:2px">${noteFn(match)}</div>
    </div>`;
  }).join('');
  return `<div style="margin-top:14px">
    <div style="font-weight:700;font-size:13px;margin-bottom:6px">${escapeHtml(title)}</div>
    ${rowsHtml}
  </div>`;
}
function renderNoAssigneeClosuresHtml(noAssigneeDetails){
  return renderCreditGapClosuresHtml('No handler credited', noAssigneeDetails, match =>
    `Matched to a call on ${escapeHtml(match._date||'—')}${match.round?` (${escapeHtml(match.round)})`:''} — that record has no Driving Person or Assigned To set, so no one gets credit for this closure yet.`
  );
}
// "Team-only" closures itemized (added 2026-09-29, "so much process going
// on... what other things do you suggest") — previously just a bare count
// in the summary sentence, same visibility gap that made the "no handler
// credited" bucket hard to actually act on before its own itemized list
// was added. Reuses the exact same 📡 Apply action: a team-level Assignee
// with a real Portal-sourced Driving Person is fixed the identical way.
function renderTeamOnlyClosuresHtml(teamOnlyDetails){
  return renderCreditGapClosuresHtml('Matched to a team, not a person', teamOnlyDetails, match =>
    `Matched to a call on ${escapeHtml(match._date||'—')}${match.round?` (${escapeHtml(match.round)})`:''} — assigned to a team (${escapeHtml((match.drivingPerson||match.assignee)||'')}), not an individual, so no one specific gets credit yet.`
  );
}
function monthKeyOf(createdAt){
  if(!createdAt) return null;
  const d = new Date(createdAt);
  if(isNaN(d.getTime())) return null;
  return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
}
// Scopes an all-time computeClosuresPerformance() result down to one month
// (added 2026-10-02): "by handlers area it is showing september month
// calls" — the By Handler tab had always shown all-time totals by design
// (unlike the All Closures list tab, which already defaults to the current
// month with its own prev/next nav), so browsing it in October still
// surfaced September's numbers mixed in with no way to narrow it down. This
// re-derives the handler totals/tooltips and the three "still needs
// fixing" buckets from only the closures recorded in the given month,
// without re-fetching or re-matching anything — computeClosuresPerformance
// itself still always scans every call record on file (that part has to
// stay all-time, since a closure recorded this month can still belong to a
// call from any past date), only WHICH CLOSURES COUNT toward the display
// gets narrowed.
function filterClosuresPerfToMonth(perf, monthKey){
  if(!perf || perf.loading || perf.error) return perf;
  const inMonth = c => monthKeyOf(c && c.createdAt) === monthKey;
  const rows = perf.rows.map(r=>{
    const records = (r.records||[]).filter(inMonth);
    return records.length ? Object.assign({}, r, { closures: records.length, records }) : null;
  }).filter(Boolean).sort((a,b)=> b.closures - a.closures);
  const unmatchedDetails = (perf.unmatchedDetails||[]).filter(d=>inMonth(d.closure));
  const noAssigneeDetails = (perf.noAssigneeDetails||[]).filter(d=>inMonth(d.closure));
  const teamOnlyDetails = (perf.teamOnlyDetails||[]).filter(d=>inMonth(d.closure));
  return Object.assign({}, perf, {
    rows,
    unmatchedDetails,
    noAssigneeDetails,
    teamOnlyDetails,
    unmatchedCount: unmatchedDetails.length,
    noAssigneeCount: noAssigneeDetails.length,
    teamOnlyCount: teamOnlyDetails.length,
    totalClosures: rows.reduce((s,r)=>s+r.closures,0) + unmatchedDetails.length + noAssigneeDetails.length + teamOnlyDetails.length,
  });
}
function renderClosuresPanel(){
  const list = state.closures || [];
  // FIX (2026-10-01): the "Closures in <Month>" stat card used to always be
  // pinned to the real calendar month regardless of which month you'd
  // navigated the List tab to below it — so browsing to September still
  // showed "Closures in October" at the top. Now follows the same month
  // the List tab is currently showing (computed here, ahead of the groups
  // block below, so both the stat card and the list agree on one value).
  const closuresListMonthKey = state.closuresListMonth || currentMonthKey();
  const monthLabel = monthKeyLabel(closuresListMonthKey);
  const thisMonthCount = list.filter(c=>{
    if(!c.createdAt) return false;
    const d = new Date(c.createdAt);
    const key = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
    return key === closuresListMonthKey;
  }).length;

  // Grouped month-by-month (newest month first) instead of one long flat
  // table — each group keyed by "September 2026" so records are easy to
  // scan a month at a time as the list grows. Anything with no
  // createdAt (shouldn't normally happen) falls into its own trailing
  // "Undated" group rather than being silently dropped.
  const groups = [];
  const groupByKey = {};
  list.forEach(c=>{
    let key, label, sortKey;
    if(c.createdAt){
      const d = new Date(c.createdAt);
      // FIX (2026-10-01): must match currentMonthKey()/shiftMonthKey()'s
      // 1-indexed "YYYY-MM" convention (getMonth()+1) — this previously used
      // the raw 0-indexed getMonth(), which never mattered when groups were
      // just displayed, but silently mismatched the new month-nav filter
      // below (e.g. an October closure keyed as "2026-09").
      key = d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0');
      label = d.toLocaleString('en-US', { month: 'long', year: 'numeric' });
      sortKey = d.getFullYear() * 12 + d.getMonth();
    } else {
      key = 'undated'; label = 'Undated'; sortKey = -1;
    }
    if(!groupByKey[key]){
      groupByKey[key] = { key, label, sortKey, rows: [] };
      groups.push(groupByKey[key]);
    }
    groupByKey[key].rows.push(c);
  });
  groups.sort((a,b)=>b.sortKey - a.sortKey);

  // Month-at-a-time view for the List tab (added 2026-10-01): previously
  // every month's group rendered stacked on one page, so opening Closures
  // always showed the full all-time history at once. Defaults to the
  // current month, with ◀/▶ nav (same shiftMonthKey()/monthKeyLabel()
  // pattern the Incentives/Calendar panels already use) to step to any
  // other month — e.g. stepping back once from October shows September's
  // closures on their own. "Show all months" reverts to the old stacked
  // view for anyone who wants the full history in one scroll.
  // (closuresListMonthKey itself is computed above, ahead of the stat card.)
  const closuresListShowAll = !!state.closuresListShowAll;
  const groupsToRender = closuresListShowAll ? groups : groups.filter(g=>g.key === closuresListMonthKey);

  const groupsHtml = groupsToRender.map(g=>{
    const rowsHtml = g.rows.map(c=>{
      // Round-by-round timeline (requested 2026-09-27): a native tooltip on
      // the round count, same lightweight pattern as the By Handler
      // hover-tooltip added 2026-09-26 — no new state/popover needed.
      const timeline = buildClosureRoundTimeline(c.candidate, c.company);
      let roundsCell;
      if(!_allRowsAcrossDatesCache){
        roundsCell = `<span class="hint" style="font-size:11px">loading…</span>`;
      } else if(!timeline.length){
        roundsCell = `<span class="hint" style="font-size:11px">—</span>`;
      } else {
        const tooltip = timeline.map((t,i)=>
          `${t.round}${t.date ? ' — '+new Date(t.date+'T00:00:00').toLocaleDateString() : ''}${t.time ? ' at '+t.time : ''}`
        ).join('\n');
        roundsCell = `<span class="notif-warn" style="color:var(--teal);cursor:default;border-bottom:1px dotted currentColor" title="${escapeHtml(tooltip)}">${timeline.length} round${timeline.length===1?'':'s'}</span>`;
      }
      // Delete (admin-only, requested 2026-09-28) — a closure entered by
      // mistake (wrong candidate, duplicate paste-in) needs a way out, even
      // though the normal path is append-only by design. A native confirm()
      // guards it (same lightweight pattern used elsewhere in this app for
      // destructive actions) rather than a second custom "are you sure"
      // panel — this is a rare, deliberate action, not a frequent one.
      const deleting = state.closureDeletingId === c.id;
      const deleteCell = CURRENT_ROLE === 'admin' ? `<td>
        <button class="btn ghost" data-delete-closure="${c.id}" data-delete-closure-candidate="${escapeHtml(c.candidate)}" ${deleting?'disabled':''} title="Delete this closure — for a mistaken entry, not a real outcome you want to undo" style="font-size:11px;padding:3px 8px;color:var(--coral)">${deleting?'<span class="spinner"></span>':'🗑'}</button>
      </td>` : '';
      return `<tr>
        <td>${escapeHtml(c.candidate)}</td>
        <td>${escapeHtml(c.company)}</td>
        <td>${escapeHtml(c.salary||'—')}</td>
        <td>${c.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}</td>
        <td>${roundsCell}</td>
        ${deleteCell}
      </tr>`;
    }).join('');
    return `<div style="margin-bottom:16px">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
        <div style="font-weight:700;font-size:13px">${escapeHtml(g.label)}</div>
        <div class="mini-badge" style="opacity:.8">${g.rows.length}</div>
      </div>
      <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">
        <thead><tr style="text-align:left;color:var(--text-muted);font-size:11px;text-transform:uppercase">
          <th style="padding:6px 8px">Candidate</th><th style="padding:6px 8px">Company</th><th style="padding:6px 8px">Salary</th><th style="padding:6px 8px">Recorded</th><th style="padding:6px 8px">Rounds</th>${CURRENT_ROLE==='admin'?'<th style="padding:6px 8px"></th>':''}
        </tr></thead>
        <tbody style="font-size:13px">${rowsHtml}</tbody>
      </table></div>
    </div>`;
  }).join('');

  const closuresListNavHtml = list.length ? `<div class="row" style="margin-bottom:10px;flex-wrap:wrap;gap:8px;align-items:center">
    <button class="btn ghost" id="closuresListPrevMonth" title="Previous month" ${closuresListShowAll?'disabled':''}>◀</button>
    <div style="font-weight:700;font-size:14px;min-width:150px;text-align:center">${closuresListShowAll ? 'All months' : escapeHtml(monthKeyLabel(closuresListMonthKey))}</div>
    <button class="btn ghost" id="closuresListNextMonth" title="Next month" ${closuresListShowAll?'disabled':''}>▶</button>
    <button class="btn ghost" id="closuresListToggleAll" style="margin-left:auto">${closuresListShowAll ? '📅 Show one month at a time' : '📋 Show all months'}</button>
  </div>` : '';
  const closuresListBodyHtml = !list.length
    ? '<div class="hint">Nothing recorded yet — paste a message above to add one.</div>'
    : closuresListNavHtml + (groupsToRender.length
        ? groupsHtml
        : `<div class="hint">No closures recorded for ${escapeHtml(monthKeyLabel(closuresListMonthKey))}.</div>`);

  const view = state.closuresView || 'list';
  const rawPerf = state.closuresPerformance;
  // By Handler now follows the same month the All Closures list tab is on
  // (see filterClosuresPerfToMonth()) instead of always showing all-time —
  // "Show all months" (closuresListShowAll) still bypasses the scoping.
  const perf = (rawPerf && !closuresListShowAll) ? filterClosuresPerfToMonth(rawPerf, closuresListMonthKey) : rawPerf;
  let perfHtml;
  if(view === 'byHandler'){
    if(!perf || perf.loading){
      perfHtml = `<div class="hint">${perf && perf.loading ? '<span class="spinner"></span>Cross-referencing closures against call records…' : 'Loading…'}</div>`;
    } else if(perf.error){
      perfHtml = `<div class="hint" style="color:var(--coral)">⚠ ${escapeHtml(perf.error)}</div>`;
    } else if(!perf.rows.length && !(perf.unmatchedDetails && perf.unmatchedDetails.length) && !perf.teamOnlyCount && !perf.noAssigneeCount){
      perfHtml = `<div class="hint">No closure could be matched to a handler yet for ${closuresListShowAll ? 'any month' : escapeHtml(monthKeyLabel(closuresListMonthKey))} — either none are recorded in this period, or none matched a call record's candidate/company on file.</div>`;
    } else {
      const rowsHtml = perf.rows.map(r=>{
        // Hover the closure count to see exactly which records make it up —
        // requested 2026-09-26. A plain title attribute (native browser
        // tooltip) rather than a custom popover: zero new state/handlers,
        // works identically on every browser, and this is exactly the kind
        // of "just let me glance at it" info a tooltip is for.
        const sortedRecords = (r.records||[]).slice().sort((a,b)=> new Date(b.createdAt||0) - new Date(a.createdAt||0));
        const MAX_TOOLTIP_ROWS = 25;
        const tooltipLines = sortedRecords.slice(0, MAX_TOOLTIP_ROWS).map(rec=>
          `${rec.candidate} — ${rec.company}${rec.salary ? ' — '+rec.salary : ''}${rec.createdAt ? ' ('+new Date(rec.createdAt).toLocaleDateString()+')' : ''}`
        );
        if(sortedRecords.length > MAX_TOOLTIP_ROWS) tooltipLines.push(`…and ${sortedRecords.length - MAX_TOOLTIP_ROWS} more`);
        const tooltip = tooltipLines.join('\n');
        return `
        <div class="notif-row">
          <div class="notif-name">${escapeHtml(r.handler)}${r.team?` <span class="notif-chip">${escapeHtml(r.team)}</span>`:''} <span class="notif-warn" style="color:var(--teal);cursor:default;border-bottom:1px dotted currentColor" title="${escapeHtml(tooltip)}">${r.closures} closure${r.closures===1?'':'s'}</span></div>
        </div>
      `;
      }).join('');
      const notes = [];
      if(perf.teamOnlyCount) notes.push(`${perf.teamOnlyCount} matched only to a team-level assignment, not an individual`);
      if(perf.noAssigneeCount) notes.push(`${perf.noAssigneeCount} matched to a call record with no assignee, so no handler to credit`);
      if(perf.unmatchedCount) notes.push(`${perf.unmatchedCount} couldn't be matched to any call record (spelling difference, or predates your records)`);
      const periodLabel = closuresListShowAll ? 'all-time' : `in ${escapeHtml(monthKeyLabel(closuresListMonthKey))}`;
      perfHtml = `<div class="hint" style="margin-bottom:10px">${perf.totalClosures} closure(s) ${periodLabel}, ${rowsHtml ? perf.rows.reduce((s,r)=>s+r.closures,0) : 0} matched to a handler.${notes.length ? ' '+notes.join('; ')+'.' : ''} For $ incentive totals per handler by month, see Reports → 💰 Incentives.</div>${rowsHtml}`;
      perfHtml += renderUnmatchedClosuresHtml(perf.unmatchedDetails || []);
      perfHtml += renderNoAssigneeClosuresHtml(perf.noAssigneeDetails || []);
      perfHtml += renderTeamOnlyClosuresHtml(perf.teamOnlyDetails || []);
    }
  }
  return `<div class="import-panel">
    ${renderClosureImportSection()}
    ${state.closureDeleteError ? `<div class="hint" style="color:var(--coral);margin-bottom:10px">⚠ ${escapeHtml(state.closureDeleteError)}</div>` : ''}
    ${state.noAssigneeApplyError ? `<div class="hint" style="color:var(--coral);margin-bottom:10px">⚠ ${escapeHtml(state.noAssigneeApplyError)}</div>` : ''}
    <div class="summary" style="margin-bottom:14px">
      <div class="cell total"><div class="num">${thisMonthCount}</div><div class="lbl">Closures in ${escapeHtml(monthLabel)}</div></div>
      <div class="cell assigned"><div class="num">${list.length}</div><div class="lbl">All-time total</div></div>
    </div>
    ${renderClosuresGoalHtml(thisMonthCount)}
    <div class="notif-tabs" style="margin-bottom:10px">
      <button class="notif-tab-btn ${view==='list'?'active':''}" data-closuresview="list">📋 All Closures</button>
      <button class="notif-tab-btn ${view==='byHandler'?'active':''}" data-closuresview="byHandler">🏆 By Handler</button>
      <button class="notif-tab-btn ${view==='summary'?'active':''}" data-closuresview="summary">📅 Summary</button>
      ${(view==='byHandler' && CURRENT_ROLE==='admin') ? `<button class="btn ghost" id="runDrivingPersonBackfillBtn" title="Fill Driving Person from the last Portal sync for EVERY date on file, not just whatever's open — fixes closures stuck as 'no handler credited' because the call happened on a past date." ${state.drivingPersonBackfillRunning?'disabled':''}>${state.drivingPersonBackfillRunning?'<span class="spinner"></span>Backfilling…':'🔄 Backfill Driving Person'}</button>` : ''}
      ${list.length ? `<button class="btn ghost" id="exportClosuresExcelBtn" title="Download every closure on file as an Excel file" style="margin-left:${(view==='byHandler' && CURRENT_ROLE==='admin')?'0':'auto'}">📊 Export to Excel</button>` : ''}
    </div>
    ${view === 'byHandler' ? renderDrivingPersonBackfillResultHtml() : ''}
    ${view === 'byHandler' ? closuresListNavHtml : ''}
    ${view === 'byHandler' ? perfHtml : view === 'summary' ? renderClosuresSummaryHtml() : closuresListBodyHtml}
    <div class="hint" style="margin-top:14px">Looking for a closing-rate or time-to-close report across every candidate (not just closures)? See 🔔 Notifications → 🎯 Conversion Funnel / ⏱ Time to Close.</div>
    <div class="hint" style="margin-top:4px">Want to search any candidate/company and see their full call-by-call timeline? Use ⋯ More → 🔎 Search Everywhere, then tap 📋 Timeline on any result.</div>
    <div class="hint" style="margin-top:4px">Tip: recording a closure from a candidate's own 📋 Timeline (via 🔎 Search Everywhere → 🏆 Closure) links it straight to that exact call — it can never end up "unmatched" the way a pasted-in message sometimes can.</div>
    ${CURRENT_ROLE === 'admin' ? renderCompanyAliasesHtml() : ''}
  </div>`;
}
// Result area for the "🔄 Backfill Driving Person" button above —
// separate render function so it can sit above perfHtml regardless of
// whether perf itself is still loading.
function renderDrivingPersonBackfillResultHtml(){
  if(state.drivingPersonBackfillError){
    return `<div class="hint" style="color:var(--coral);margin-bottom:10px">⚠ ${escapeHtml(state.drivingPersonBackfillError)}</div>`;
  }
  const result = state.drivingPersonBackfillResult;
  if(!result) return '';
  if(result.needsSync){
    return `<div class="hint" style="margin-bottom:10px">Run 📡 Team Sync → Full Sync first — the backfill works off whatever that last sync found.</div>`;
  }
  const needsConfirm = result.needsConfirm || [];
  const confirmHtml = needsConfirm.length ? `<div style="margin-top:8px">
    <div class="hint" style="margin-bottom:6px">${needsConfirm.length} advanced-round call${needsConfirm.length===1?'':'s'} also has a Portal match — left for you to confirm rather than applied automatically, same as every other auto-assignment in this app skips advanced rounds:</div>
    ${needsConfirm.map(({row, handler})=>{
      const key = row._date + '|' + row.id;
      const applying = state.drivingPersonBackfillApplyingKey === key;
      return `<div class="notif-row">
        <div class="notif-name">${escapeHtml(row.candidate)} <span class="notif-chip">${escapeHtml(row.company||'')}</span></div>
        <div class="notif-detail">
          <span class="notif-chip">${escapeHtml(row._date||'')}</span>
          <span class="notif-chip">${escapeHtml(row.round||'')}</span>
          <button class="btn ghost" data-backfill-confirm-date="${escapeHtml(row._date||'')}" data-backfill-confirm-callid="${escapeHtml(String(row.id))}" data-backfill-confirm-name="${escapeHtml(handler)}" ${applying?'disabled':''} style="font-size:11px;padding:3px 8px">${applying?'<span class="spinner"></span>':`📡 Apply "${escapeHtml(handler)}"`}</button>
        </div>
      </div>`;
    }).join('')}
  </div>` : '';
  return `<div style="margin-bottom:10px">
    <div class="hint" style="color:var(--teal)">✅ Filled ${result.appliedCount} Driving Person value${result.appliedCount===1?'':'s'} from Portal across every date on file.</div>
    ${confirmHtml}
  </div>`;
}
// Admin-only "these two company spellings are the same client" list —
// added 2026-09-27 after "LSU Health Science" (calls) vs
// "LSUHSC-Shreveport" (closure) was reported as the same client not being
// recognized as such. See getCompanyAliasPairs()/companiesAreAliased() —
// this is just the management UI for that list.
function renderCompanyAliasesHtml(){
  const pairs = getCompanyAliasPairs();
  const rowsHtml = pairs.map(([a,b],i)=>`
    <div style="display:flex;align-items:center;gap:8px;padding:4px 0;font-size:12px">
      <span style="flex:1">${escapeHtml(a)}</span>
      <span class="hint">=</span>
      <span style="flex:1">${escapeHtml(b)}</span>
      <button class="btn ghost" data-remove-company-alias="${i}" title="Remove this alias" style="font-size:11px;padding:2px 8px">✕</button>
    </div>
  `).join('');
  return `<div style="margin-top:18px;padding-top:14px;border-top:1px solid var(--border-soft)">
    <div style="font-weight:700;font-size:13px;margin-bottom:4px">🔗 Company aliases</div>
    <div class="hint" style="margin-bottom:8px">For when the same client is spelled very differently between a call record and a closure (e.g. an abbreviation like "LSUHSC-Shreveport" vs. the full name "LSU Health Science") — too different for automatic spelling-match to catch safely, so add it here once and every closure/call match for that client uses it from then on.</div>
    ${rowsHtml || '<div class="hint" style="margin-bottom:8px">No aliases added yet.</div>'}
    <div style="display:flex;gap:6px;margin-top:8px;flex-wrap:wrap">
      <input type="text" id="companyAliasInputA" placeholder="Company name as it appears here…" style="flex:1;min-width:140px;padding:6px 8px;border-radius:6px;border:1px solid var(--border-soft);background:var(--surface);color:inherit">
      <input type="text" id="companyAliasInputB" placeholder="…and as it appears there" style="flex:1;min-width:140px;padding:6px 8px;border-radius:6px;border:1px solid var(--border-soft);background:var(--surface);color:inherit">
      <button class="btn ghost" id="addCompanyAliasBtn">＋ Add alias</button>
    </div>
    ${state.companyAliasError ? `<div class="hint" style="color:var(--coral);margin-top:6px">⚠ ${escapeHtml(state.companyAliasError)}</div>` : ''}
  </div>`;
}

// A month-at-a-glance view of call volume, so a busy/light day is visible
// without opening every date one by one. Shading is relative to this
// month's own busiest day (not a fixed scale), since "busy" varies a lot
// month to month; tapping any day jumps straight there, same confirm-if-
// dirty guard the date picker and prev/next day buttons already use.
function renderCalendarViewPanel(){
  const monthKey = state.calendarMonth || currentMonthKey();
  const [y, m] = monthKey.split('-').map(Number);
  const firstOfMonth = new Date(y, m - 1, 1);
  const daysInMonth = new Date(y, m, 0).getDate();
  const startWeekday = firstOfMonth.getDay(); // 0=Sun
  const counts = state.calendarData || {};
  const maxCount = Math.max(1, ...Object.values(counts));
  const today = todayDateString();

  const cells = [];
  for(let i=0;i<startWeekday;i++) cells.push('<div class="cal-cell cal-cell-empty"></div>');
  for(let day=1; day<=daysInMonth; day++){
    const dateStr = monthKey + '-' + String(day).padStart(2,'0');
    const count = counts[dateStr] || 0;
    const intensity = count ? Math.min(1, count / maxCount) : 0;
    const bg = count ? `rgba(94,209,178,${(0.12 + intensity*0.55).toFixed(2)})` : 'transparent';
    const isToday = dateStr === today;
    const isSelected = dateStr === state.date;
    cells.push(`<button class="cal-cell" data-cal-date="${dateStr}" style="background:${bg};${isSelected?'box-shadow:inset 0 0 0 2px var(--teal);':''}${isToday && !isSelected?'box-shadow:inset 0 0 0 1px var(--text-muted);':''}" title="${count} call(s) on ${dateStr}">
      <span class="cal-daynum">${day}</span>
      ${count ? `<span class="cal-count">${count}</span>` : ''}
    </button>`);
  }

  return `<div class="import-panel">
    <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:14px">
      <button class="btn ghost" id="calendarPrevMonth">‹</button>
      <div style="font-weight:700">${escapeHtml(monthKeyLabel(monthKey))}</div>
      <button class="btn ghost" id="calendarNextMonth">›</button>
    </div>
    ${state.calendarError ? `<div class="hint" style="color:var(--coral);margin-bottom:10px">⚠ ${escapeHtml(state.calendarError)}</div>` : ''}
    ${state.calendarLoading ? `<div class="hint" style="margin-bottom:10px"><span class="spinner"></span>Loading…</div>` : ''}
    <div class="cal-grid cal-grid-header">
      ${['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map(d=>`<div class="cal-weekday">${d}</div>`).join('')}
    </div>
    <div class="cal-grid">${cells.join('')}</div>
    <div class="hint" style="margin-top:12px">Tap a day to open it. Shading shows call volume relative to this month's busiest day.</div>
    ${renderCalendarComparisonHtml()}
  </div>`;
}
// A ▲/▼ chip in the same visual language as the Weekly Recap tab's
// changePct chip (amber = up, teal = down, neutral dash for no change) —
// reused for both the week and month diffs below so the two read the same.
function calendarDiffChip(diff, suffix){
  if(diff === 0) return `<span class="notif-chip">— no change${suffix?(' '+escapeHtml(suffix)):''}</span>`;
  const up = diff > 0;
  return `<span class="notif-chip" style="${up?'color:var(--amber);border-color:var(--amber)':'color:var(--teal);border-color:var(--teal)'}">${up?'▲':'▼'} ${Math.abs(diff)}${suffix?(' '+escapeHtml(suffix)):''}</span>`;
}
// Team/person week-over-week + month-over-month comparison block, appended
// under the Calendar month grid (added 2026-09-29 — see
// computeCalendarComparisons() for how the numbers are built). Two tabs
// (Teams / People) over the same underlying comparison object, since
// Saiteja asked for both breakdowns; People also gets a name/team filter
// since a full roster table can run long.
function renderCalendarComparisonHtml(){
  const cmp = state.calendarComparison;
  if(!cmp) return '';
  const view = state.calendarCompareView === 'people' ? 'people' : 'teams';
  const tabsHtml = `
    <div class="notif-tabs" style="margin:0 0 10px">
      <button class="notif-tab-btn ${view==='teams'?'active':''}" data-calcompare-view="teams">👥 Teams</button>
      <button class="notif-tab-btn ${view==='people'?'active':''}" data-calcompare-view="people">🙋 People</button>
    </div>`;
  const thisMonthLabel = monthKeyLabel(cmp.monthKey);
  const lastMonthLabel = monthKeyLabel(cmp.prevMonthKey);

  let rows, searchHtml = '';
  if(view === 'teams'){
    rows = cmp.teams;
  } else {
    const q = (state.calendarCompareSearch||'').trim().toLowerCase();
    rows = cmp.people.filter(p=> !q || p.name.toLowerCase().includes(q) || (p.team||'').toLowerCase().includes(q));
    searchHtml = `<input type="text" id="calendarCompareSearch" placeholder="Filter by name or team…" value="${escapeHtml(state.calendarCompareSearch||'')}" style="margin-bottom:10px;width:100%;max-width:280px">`;
  }

  const header = `<div style="font-weight:700;font-size:13px;margin-bottom:2px">📊 Week &amp; month comparison</div>
    <div class="hint" style="margin-bottom:10px">This week = week of ${escapeHtml(cmp.thisWeekKey)} onward, vs. the week before. Month comparison follows the month shown above — ${escapeHtml(thisMonthLabel)} vs ${escapeHtml(lastMonthLabel)} — so ‹ › also moves this comparison.</div>`;

  if(!rows.length){
    return `<div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
      ${header}${tabsHtml}${searchHtml}
      <div class="hint">No ${view==='teams'?'team':'individual'} call activity found${view==='people' && state.calendarCompareSearch ? ' for that search' : ' across this week/month or the one before it'}.</div>
    </div>`;
  }

  const rowsHtml = rows.map(r=>{
    const label = view==='teams' ? escapeHtml(r.team) : `${escapeHtml(r.name)}${r.team?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(r.team)}</span>`:''}`;
    return `<div class="notif-row">
      <div class="notif-name">${label}</div>
      <div class="notif-detail">
        <span class="notif-chip">${r.thisWeek} this week</span>
        <span class="notif-chip" style="color:var(--text-faint)">${r.lastWeek} last week</span>
        ${calendarDiffChip(r.weekDiff, 'vs last week')}
      </div>
      <div class="notif-detail">
        <span class="notif-chip">${r.thisMonth} in ${escapeHtml(thisMonthLabel)}</span>
        <span class="notif-chip" style="color:var(--text-faint)">${r.lastMonth} in ${escapeHtml(lastMonthLabel)}</span>
        ${calendarDiffChip(r.monthDiff, 'vs last month')}
      </div>
    </div>`;
  }).join('');

  return `<div style="margin-top:20px;padding-top:16px;border-top:1px solid var(--border)">
    ${header}${tabsHtml}${searchHtml}${rowsHtml}
  </div>`;
}

// Plain reference panel — no data fetching, just documents behavior that
// otherwise only lives in tooltips or gets learned by trial and error
// (which menu things live under, what the keyboard shortcuts do).
function renderHelpPanel(){
  return `<div class="import-panel">
    <div style="font-weight:700;font-size:14px;margin-bottom:8px">Keyboard shortcuts</div>
    <div class="hint" style="margin-bottom:16px">These work whenever you're not typing in a text field.</div>
    <table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-bottom:20px">
      <tbody>
        <tr style="border-top:1px solid var(--border-soft)"><td style="padding:7px 4px;font-family:var(--mono);color:var(--teal)">1 – 5</td><td style="padding:7px 4px">Switch between All Calls / 1st Round / 2nd Round &amp; Above / Doubts / Rescheduled tabs</td></tr>
        <tr style="border-top:1px solid var(--border-soft)"><td style="padding:7px 4px;font-family:var(--mono);color:var(--teal)">Ctrl/Cmd + S</td><td style="padding:7px 4px">Save changes (admin only)</td></tr>
        <tr style="border-top:1px solid var(--border-soft)"><td style="padding:7px 4px;font-family:var(--mono);color:var(--teal)">↑ / ↓</td><td style="padding:7px 4px">While editing a text field (Time, Candidate, Company, Round, Duration), jumps to the same field on the row above/below</td></tr>
      </tbody>
    </table>
    <div style="font-weight:700;font-size:14px;margin-bottom:8px">Where things live</div>
    <table style="width:100%;border-collapse:collapse;font-size:12.5px">
      <tbody>
        <tr style="border-top:1px solid var(--border-soft)"><td style="padding:7px 4px;font-weight:600;white-space:nowrap">📊 Reports</td><td style="padding:7px 4px">Search, Calendar, Summary, All Dates, Students Master, Team Sync, Missed Messages check, backups reminder, this Help panel</td></tr>
        <tr style="border-top:1px solid var(--border-soft)"><td style="padding:7px 4px;font-weight:600;white-space:nowrap">🔧 Admin</td><td style="padding:7px 4px">Team roster, Users, Incentives, Backups, Remove Duplicates, Clear All calls — account/data maintenance, not day-to-day lookups</td></tr>
        <tr style="border-top:1px solid var(--border-soft)"><td style="padding:7px 4px;font-weight:600;white-space:nowrap">🔔 Notifications</td><td style="padding:7px 4px">Every cross-date report lives here as a tab: absences, repeat candidates/clients, client reliability, trends, WOI aging, workload heatmap, weekly recap</td></tr>
      </tbody>
    </table>
    <div class="hint" style="margin-top:16px">Swipe a row left/right on mobile to quick-assign or delete. Long lists of tabs/menus scroll — swipe them if something looks cut off.</div>
  </div>`;
}

// Shared by the Incentives ₹ goal and the Closures count goal below — a
// plain, self-contained progress bar, capped visually at 100% even if the
// actual number has gone past target (still shown in the label, just not
// drawn past the bar's edge).
function renderGoalProgressBar(current, target, label){
  const pct = target > 0 ? Math.min(100, Math.round((current/target)*100)) : 0;
  return `<div style="margin-top:8px;max-width:360px">
    <div style="display:flex;justify-content:space-between;font-size:11.5px;color:var(--text-faint);margin-bottom:4px">
      <span>${escapeHtml(label)}</span><span>${pct}%</span>
    </div>
    <div style="background:var(--surface-2);border-radius:5px;height:8px;overflow:hidden">
      <div style="width:${pct}%;height:100%;background:${pct>=100?'var(--teal)':'var(--amber)'}"></div>
    </div>
  </div>`;
}
// The monthly ₹ target block on the Incentives panel — shows a "set a
// target" prompt the first time, then an editable target with a progress
// bar against the month currently being viewed's grandTotal. Deliberately
// a single ongoing target (not per-month) — see the note on
// loadAppSettings() above for why.
function renderIncentiveGoalHtml(grandTotal){
  const targetRaw = state.appSettings.incentive_monthly_target;
  const target = Number(targetRaw || 0);
  if(state.editingIncentiveTarget){
    return `<div style="margin-bottom:16px;padding:12px 14px;border:1px dashed var(--border);border-radius:10px">
      <div class="hint" style="margin-bottom:6px">Monthly target (₹) — applies to every month, not just this one:</div>
      ${state.incentiveTargetError ? `<div class="hint" style="color:var(--coral);margin-bottom:6px">⚠ ${escapeHtml(state.incentiveTargetError)}</div>` : ''}
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input type="number" min="0" id="incentiveTargetInput" value="${target||''}" placeholder="e.g. 50000" style="width:160px">
        <button class="btn primary" id="saveIncentiveTargetBtn">Save</button>
        <button class="btn ghost" id="cancelIncentiveTargetBtn">Cancel</button>
      </div>
    </div>`;
  }
  if(!target){
    return `<div style="margin-bottom:16px"><button class="btn ghost" id="editIncentiveTargetBtn">🎯 Set a monthly target</button></div>`;
  }
  return `<div style="margin-bottom:16px;padding:12px 14px;border:1px solid var(--border);border-radius:10px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div style="font-weight:700;font-size:13px">🎯 Monthly target: ₹${target.toLocaleString('en-IN')}</div>
      <button class="btn ghost" id="editIncentiveTargetBtn" style="font-size:11.5px;padding:4px 10px">Edit</button>
    </div>
    ${renderGoalProgressBar(grandTotal, target, `₹${grandTotal.toLocaleString('en-IN')} of ₹${target.toLocaleString('en-IN')}${grandTotal>=target?' — target reached! 🎉':''}`)}
  </div>`;
}
// Same idea, for a monthly CLOSURE COUNT target on the Closures panel —
// reuses thisMonthCount, which renderClosuresPanel already computes.
function renderClosuresGoalHtml(thisMonthCount){
  const targetRaw = state.appSettings.closures_monthly_target;
  const target = Number(targetRaw || 0);
  const canEdit = CURRENT_ROLE === 'admin'; // app_settings writes are admin-only server-side too — don't show an edit control a non-admin viewer would just get a 403 from
  if(canEdit && state.editingClosuresTarget){
    return `<div style="margin-bottom:16px;padding:12px 14px;border:1px dashed var(--border);border-radius:10px">
      <div class="hint" style="margin-bottom:6px">Monthly closures target (a count) — applies to every month:</div>
      ${state.closuresTargetError ? `<div class="hint" style="color:var(--coral);margin-bottom:6px">⚠ ${escapeHtml(state.closuresTargetError)}</div>` : ''}
      <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">
        <input type="number" min="0" id="closuresTargetInput" value="${target||''}" placeholder="e.g. 10" style="width:120px">
        <button class="btn primary" id="saveClosuresTargetBtn">Save</button>
        <button class="btn ghost" id="cancelClosuresTargetBtn">Cancel</button>
      </div>
    </div>`;
  }
  if(!target){
    return canEdit ? `<div style="margin-bottom:16px"><button class="btn ghost" id="editClosuresTargetBtn">🎯 Set a monthly closures target</button></div>` : '';
  }
  return `<div style="margin-bottom:16px;padding:12px 14px;border:1px solid var(--border);border-radius:10px">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
      <div style="font-weight:700;font-size:13px">🎯 Monthly closures target: ${target}</div>
      ${canEdit ? `<button class="btn ghost" id="editClosuresTargetBtn" style="font-size:11.5px;padding:4px 10px">Edit</button>` : ''}
    </div>
    ${renderGoalProgressBar(thisMonthCount, target, `${thisMonthCount} of ${target}${thisMonthCount>=target?' — target reached! 🎉':''}`)}
  </div>`;
}
// ---------- Incentives → per-record breakdown + push to Closures
// (2026-09-28) ---------- The Incentives panel above only ever showed
// aggregate ₹ totals per handler (Promotion/Selection/Total/Records-count)
// — enough to know a handler earned ₹4,000 in Selections, never enough to
// see WHICH candidates that came from. Saiteja's own example: Bharath's
// ₹4,000 Selection total is two ₹2,000 records, and one of them (Amulya)
// had never been entered into Coverage Desk's Closures list at all — he
// had to spot the gap by doing the math on a screenshot. This reuses the
// same per-record Interview Portal data (state.portalAssignments) the
// manual-match Portal fallback above already reads, filtered to one
// handler and the month currently being viewed, so the actual records
// behind a total are visible right there — and each one that doesn't
// already have a matching Closures entry gets a one-click "Add as
// closure" button (saveNewClosures(), the exact same save path the normal
// paste-in import and the Timeline quick-add both already use).
function closureAlreadyRecordedFor(candidate, company){
  const candKey = (candidate||'').trim().toLowerCase();
  if(!candKey) return false;
  return (state.closures||[]).some(c =>
    (c.candidate||'').trim().toLowerCase() === candKey &&
    (normalizeCompanyKey(c.company) === normalizeCompanyKey(company) || fuzzyCompanyKeyMatch(c.company, company))
  );
}
function renderIncentiveHandlerRecordsHtml(handler, monthKey){
  if(!state.portalAssignments || !state.portalAssignments.length){
    return `<div class="hint">Run 📡 Team Sync → Full Sync first to see this handler's individual Portal records here — right now only the aggregate totals above are available.</div>`;
  }
  // Person-name matching stays exact, never fuzzy — same rule as
  // everywhere else in this file (team isolation / no fuzzy person
  // matching), so this can never quietly attribute one handler's records
  // to a similarly-named other person.
  const records = state.portalAssignments
    .filter(p => namesEquivalent(p.handler||p.assignee, handler) && (!p.dateKey || p.dateKey.startsWith(monthKey)))
    .slice()
    .sort((a,b)=> (b.dateKey||'').localeCompare(a.dateKey||''));
  if(!records.length){
    return `<div class="hint">No individual Portal records found for ${escapeHtml(handler)} in ${escapeHtml(monthKeyLabel(monthKey))} — the totals above come from the Portal's own aggregate, which doesn't always line up one-to-one with its per-record assignment log.</div>`;
  }
  return records.map(r=>{
    const already = closureAlreadyRecordedFor(r.candidate, r.client);
    const key = (r.candidate||'').trim().toLowerCase() + '|' + normalizeCompanyKey(r.client);
    const adding = state.incentiveAddingClosureKey === key;
    return `<div class="notif-row">
      <div class="notif-name">${escapeHtml(r.candidate||'Candidate')}${r.client?` <span class="notif-detail" style="font-weight:400">— ${escapeHtml(r.client)}</span>`:''}</div>
      <div class="notif-detail">
        ${r.dateKey?`<span class="notif-chip">${escapeHtml(r.dateKey)}</span>`:''}
        ${r.status?`<span class="notif-chip">${escapeHtml(r.status)}</span>`:''}
        ${already
          ? `<span class="notif-chip" style="color:var(--teal);border-color:var(--teal)">✅ In Closures</span>`
          : `<button class="btn ghost" data-incentive-add-closure="${escapeHtml(r.candidate)}" data-incentive-add-company="${escapeHtml(r.client||'')}" ${adding?'disabled':''} style="font-size:10.5px;padding:3px 8px">${adding?'<span class="spinner"></span>Adding…':'🏆 Add as closure'}</button>`}
      </div>
    </div>`;
  }).join('');
}
function renderIncentivesPanel(){
  const monthKey = state.incentivesMonth || currentMonthKey();
  const d = state.incentivesData;
  // Shows the full date+time (not just a time) since this is now usually
  // the saved snapshot from last night's 10pm auto-sync, not something
  // fetched moments ago — "Last updated: 10:02 PM" alone would be
  // ambiguous about which day. "(saved)" vs "(just synced)" tells you
  // whether you're looking at the cache or a Refresh you just triggered.
  const updatedLabel = state.incentivesUpdatedAt
    ? new Date(state.incentivesUpdatedAt).toLocaleString() + (state.incentivesFromCache ? ' (saved)' : ' (just synced)')
    : '—';

  let body = '';
  if(state.incentivesError){
    body = `<div class="hint" style="color:var(--coral)">⚠ ${escapeHtml(state.incentivesError)}</div>`;
  } else if(!d){
    // "No data yet" now distinguishes "still loading the saved snapshot"
    // from "nothing has ever been synced for this month at all" (the
    // nightly cron only covers the CURRENT month, so browsing to a month
    // that's never had a manual sync run can genuinely come back empty) —
    // the latter needs a Refresh, not just patience.
    body = `<div class="hint">${state.incentivesLoading ? '<span class="spinner"></span>Loading…' : `Nothing saved for ${escapeHtml(monthKeyLabel(monthKey))} yet. Click Refresh above to pull it from the Portal (the nightly auto-sync only keeps the current month up to date).`}</div>`;
  } else {
    const byHandler = d.byHandler || [];
    const byTeam = d.byTeam || {};
    const grandTotal = Number(d.grandTotal || 0);

    const teamGroups = {};
    byHandler.forEach(row=>{
      const key = row.teamCode || row.team || 'Other';
      if(!teamGroups[key]) teamGroups[key] = { label: row.team, rows: [] };
      teamGroups[key].rows.push(row);
    });

    const teamCardsHtml = Object.keys(teamGroups).length ? Object.keys(teamGroups).map(key=>{
      const group = teamGroups[key];
      const teamTotal = byTeam[key] ? byTeam[key].total : group.rows.reduce((s,r)=>s+Number(r.total||0),0);
      const teamPromo = group.rows.reduce((s,r)=>s+Number(r.promotion||0),0);
      const teamSelection = group.rows.reduce((s,r)=>s+Number(r.selection||0),0);
      return `<div style="margin-bottom:16px;border:1px solid var(--border);border-radius:10px;overflow:hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;background:var(--surface-2)">
          <div style="font-weight:700;font-size:14px">${escapeHtml(group.label)}</div>
          <div style="text-align:right">
            <div style="font-weight:800;font-size:16px;color:var(--teal)">₹${teamTotal.toLocaleString('en-IN')}</div>
            <div style="font-size:10.5px;color:var(--text-faint)">Promo ₹${teamPromo.toLocaleString('en-IN')} · Selection ₹${teamSelection.toLocaleString('en-IN')}</div>
          </div>
        </div>
        <div style="overflow-x:auto">
        <table style="width:100%;min-width:480px;border-collapse:collapse;font-size:12.5px">
          <thead><tr style="text-align:left;background:var(--surface)"><th style="padding:6px 14px">Handler</th><th style="padding:6px 14px">Promotion</th><th style="padding:6px 14px">Selection</th><th style="padding:6px 14px">Total</th><th style="padding:6px 14px">Records</th></tr></thead>
          <tbody>
            ${group.rows.sort((a,b)=>Number(b.total||0)-Number(a.total||0)).map(r=>{
              const isExpanded = state.incentivesExpandedHandler === r.handler;
              return `<tr style="border-top:1px solid var(--border-soft)">
              <td style="padding:7px 14px;font-weight:600">${escapeHtml(r.handler)}</td>
              <td style="padding:7px 14px">₹${Number(r.promotion||0).toLocaleString('en-IN')}</td>
              <td style="padding:7px 14px">₹${Number(r.selection||0).toLocaleString('en-IN')}</td>
              <td style="padding:7px 14px;font-weight:700">₹${Number(r.total||0).toLocaleString('en-IN')}</td>
              <td style="padding:7px 14px"><button class="btn ghost" data-incentive-expand="${escapeHtml(r.handler)}" style="font-size:10.5px;padding:3px 8px;color:var(--text-faint)">${isExpanded?'▾':'▸'} ${r.records||0}</button></td>
            </tr>${isExpanded ? `<tr style="border-top:1px solid var(--border-soft)"><td colspan="5" style="padding:8px 14px;background:var(--surface)">${renderIncentiveHandlerRecordsHtml(r.handler, monthKey)}</td></tr>` : ''}`;
            }).join('')}
          </tbody>
        </table>
        </div>
      </div>`;
    }).join('') : `<div class="empty-state"><h3>No incentive records for ${escapeHtml(monthKeyLabel(monthKey))}</h3><p>Nothing has been earned or synced for this month yet.</p></div>`;

    body = `
      <div style="display:flex;gap:14px;margin-bottom:16px;flex-wrap:wrap">
        <div style="flex:1;min-width:160px;padding:14px;border:1px solid var(--border);border-radius:10px;background:var(--surface-2)">
          <div style="font-size:11px;color:var(--text-faint);text-transform:uppercase;letter-spacing:.04em">Grand total</div>
          <div style="font-size:24px;font-weight:800;color:var(--teal)">₹${grandTotal.toLocaleString('en-IN')}</div>
        </div>
        ${Object.keys(byTeam).map(code=>`<div style="flex:1;min-width:160px;padding:14px;border:1px solid var(--border);border-radius:10px">
          <div style="font-size:11px;color:var(--text-faint);text-transform:uppercase;letter-spacing:.04em">${escapeHtml(byTeam[code].label)}</div>
          <div style="font-size:20px;font-weight:800">₹${Number(byTeam[code].total||0).toLocaleString('en-IN')}</div>
          <div style="font-size:10.5px;color:var(--text-faint)">${byTeam[code].records||0} record(s)</div>
        </div>`).join('')}
      </div>
      ${renderIncentiveGoalHtml(grandTotal)}
      ${teamCardsHtml}`;
  }

  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:10px">Monthly incentive totals pulled from the Interview Portal, grouped by team and handler. Read-only — this never writes anything back to the Portal.</div>
    <div class="row" style="margin-bottom:14px;flex-wrap:wrap;gap:10px">
      <div style="display:flex;align-items:center;gap:10px">
        <button class="btn ghost" id="incentivesPrevMonth" title="Previous month">◀</button>
        <div style="font-weight:700;font-size:15px;min-width:150px;text-align:center">${escapeHtml(monthKeyLabel(monthKey))}</div>
        <button class="btn ghost" id="incentivesNextMonth" title="Next month">▶</button>
      </div>
      <div style="display:flex;gap:8px;">
        <div class="hint" style="align-self:center">Last updated: ${updatedLabel}</div>
        ${(d && (d.byHandler||[]).length) ? `<button class="btn ghost" id="exportIncentivesExcelBtn" title="Download this month's incentive totals as an Excel file">📊 Export to Excel</button>` : ''}
        <button class="btn ghost" id="closeIncentives">Close</button>
        <button class="btn primary" id="refreshIncentives" ${state.incentivesLoading?'disabled':''}>${state.incentivesLoading?'<span class="spinner"></span>Loading…':'Refresh'}</button>
      </div>
    </div>
    ${body}
  </div>`;
}

function renderBackupsPanel(){
  const reasonLabels = {
    'pre-import': '📥 Before an import',
    'pre-clear-all': '🗑️ Before Clear All',
    'pre-finalize': '✅ Before Finalize',
    'pre-dedupe': '🧹 Before removing duplicates',
    'pre-bulk-delete': '🗑 Before bulk delete'
  };
  const body = state.backupsLoading
    ? `<div class="hint"><span class="spinner"></span>Loading backups…</div>`
    : (!state.backupsList.length
      ? `<div class="empty-state"><h3>No backups yet for ${escapeHtml(state.date)}</h3><p>A backup is taken automatically right before every import, Clear All, or Finalize — nothing to restore until one of those has happened on this date.</p></div>`
      : `<div style="max-height:420px;overflow:auto;border:1px solid var(--border);border-radius:8px">
          <table style="width:100%;min-width:480px;border-collapse:collapse;font-size:12.5px">
            <thead><tr style="text-align:left;background:var(--surface-2)"><th style="padding:8px 12px">When</th><th style="padding:8px 12px">Reason</th><th style="padding:8px 12px">Calls saved</th><th style="padding:8px 12px"></th></tr></thead>
            <tbody>
              ${state.backupsList.map(b=>`<tr style="border-top:1px solid var(--border-soft)">
                <td style="padding:8px 12px">${escapeHtml(new Date(b.created_at).toLocaleString())}</td>
                <td style="padding:8px 12px">${escapeHtml(reasonLabels[b.reason] || b.reason)}</td>
                <td style="padding:8px 12px;font-weight:600">${b.row_count}</td>
                <td style="padding:8px 12px;text-align:right"><button class="btn ghost" data-restore-backup="${b.id}" style="font-size:11.5px;padding:5px 10px">Restore this</button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>`);
  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:14px">Automatic point-in-time snapshots taken right before import, Clear All, or Finalize for <b>${escapeHtml(state.date)}</b> — a real recovery point independent of the normal save path, in case anything ever goes wrong. Restoring replaces today's current calls with exactly what was saved at that moment (your current, unrestored state is itself backed up first, so restoring is never a one-way trip).</div>
    ${body}
  </div>`;
}

function renderPortalSyncPanel(){
  const d = state.portalSyncData;
  const updatedLabel = state.portalSyncUpdatedAt
    ? new Date(state.portalSyncUpdatedAt).toLocaleTimeString()
    : '—';
  let body = '';
  if(state.portalSyncError){
    // Same timeout-vs-real-error softening as the banner above renderCalls().
    const isTimeout = /took too long to respond/i.test(state.portalSyncError);
    body = `<div class="hint" style="color:${isTimeout?'var(--amber)':'var(--coral)'}">${isTimeout?'⏳':'⚠'} ${escapeHtml(state.portalSyncError)}</div>`;
  } else if(!d){
    body = `<div class="hint">${state.portalSyncLoading ? '<span class="spinner"></span>Loading…' : 'No data yet — click one of the sync buttons above.'}</div>`;
  } else {
    const todaysAssignments = (d.assignments || []).slice().sort((a,b)=>String(a.time||'').localeCompare(String(b.time||'')));
    const byHandler = (d.incentives && d.incentives.byHandler) || [];
    const byTeam = (d.incentives && d.incentives.byTeam) || {};

    // Group handlers under their team so it's clear at a glance who
    // earned what and what each team's running total is.
    const teamGroups = {};
    byHandler.forEach(row=>{
      const key = row.teamCode || row.team || 'Other';
      if(!teamGroups[key]) teamGroups[key] = { label: row.team, rows: [] };
      teamGroups[key].rows.push(row);
    });

    const incentiveHtml = Object.keys(teamGroups).length ? Object.keys(teamGroups).map(key=>{
      const group = teamGroups[key];
      const teamTotal = byTeam[key] ? byTeam[key].total : group.rows.reduce((s,r)=>s+Number(r.total||0),0);
      return `<div style="margin-bottom:14px">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 10px;background:var(--surface-2);border-radius:8px 8px 0 0;font-weight:700;font-size:13px">
          <span>${escapeHtml(group.label)}</span>
          <span style="color:var(--teal)">₹${Number(teamTotal||0).toLocaleString('en-IN')}</span>
        </div>
        <div style="overflow-x:auto;border:1px solid var(--border);border-top:none">
        <table style="width:100%;min-width:420px;border-collapse:collapse;font-size:12.5px">
          <thead><tr style="text-align:left;background:var(--surface)"><th style="padding:6px 10px">Handler</th><th style="padding:6px 10px">Promotion</th><th style="padding:6px 10px">Selection</th><th style="padding:6px 10px">Total</th></tr></thead>
          <tbody>
            ${group.rows.sort((a,b)=>Number(b.total||0)-Number(a.total||0)).map(r=>`<tr style="border-top:1px solid var(--border-soft)">
              <td style="padding:6px 10px;font-weight:600">${escapeHtml(r.handler)}</td>
              <td style="padding:6px 10px">₹${Number(r.promotion||0).toLocaleString('en-IN')}</td>
              <td style="padding:6px 10px">₹${Number(r.selection||0).toLocaleString('en-IN')}</td>
              <td style="padding:6px 10px;font-weight:600">₹${Number(r.total||0).toLocaleString('en-IN')}</td>
            </tr>`).join('')}
          </tbody>
        </table>
        </div>
      </div>`;
    }).join('') : `<div class="hint" style="margin-bottom:16px">No incentive records found.</div>`;

    // Cross-references each Portal assignment row against today's local
    // calls by candidate name, so the person syncing can see at a glance
    // who Coverage Desk has as the Driving Person for that same call —
    // this column only ever has anything to show once a sync has actually
    // been run and returned assignment rows to cross-reference against.
    function localDrivingPersonFor(candidateName){
      const key = normalizeCandidateForMatch(candidateName);
      if(!key) return '';
      const match = state.rows.find(r => normalizeCandidateForMatch(r.candidate) === key);
      return match ? (match.drivingPerson || '') : '';
    }

    body = `
      <div style="font-weight:600;margin-bottom:8px;font-size:13px">Incentives by team &amp; handler ${d.incentives && d.incentives.month && d.incentives.month!=='ALL' ? '('+escapeHtml(d.incentives.month)+')' : '(all time)'}</div>
      <div style="max-height:320px;overflow:auto;margin-bottom:16px">${incentiveHtml}</div>
      <div style="font-weight:600;margin-bottom:6px;font-size:13px">${state.portalSyncMode==='today' ? `Assignments for ${escapeHtml(state.date)}` : 'Assignments (full history)'} (${todaysAssignments.length})</div>
      <div style="max-height:280px;overflow:auto;border:1px solid var(--border);border-radius:8px">
        <table style="width:100%;min-width:680px;border-collapse:collapse;font-size:12.5px">
          <thead><tr style="text-align:left;background:var(--surface-2)"><th style="padding:6px 10px">Team</th><th style="padding:6px 10px">Time</th><th style="padding:6px 10px">Candidate</th><th style="padding:6px 10px">Client</th><th style="padding:6px 10px">Assignee</th><th style="padding:6px 10px">Driving Person</th><th style="padding:6px 10px">Status</th></tr></thead>
          <tbody>
            ${todaysAssignments.length ? todaysAssignments.map(a=>{
              const dp = localDrivingPersonFor(a.candidate);
              return `<tr style="border-top:1px solid var(--border-soft)">
              <td style="padding:6px 10px">${escapeHtml(a.team)}</td>
              <td style="padding:6px 10px">${escapeHtml(a.time)}</td>
              <td style="padding:6px 10px">${escapeHtml(a.candidate)}</td>
              <td style="padding:6px 10px">${escapeHtml(a.client)}</td>
              <td style="padding:6px 10px;font-weight:600;${a.assignee?'color:var(--teal)':''}">${escapeHtml(a.assignee||'Unassigned')}</td>
              <td style="padding:6px 10px;${dp?'color:var(--teal);font-weight:600':'color:var(--text-faint)'}">${escapeHtml(dp||'—')}</td>
              <td style="padding:6px 10px">${escapeHtml(a.status)}</td>
            </tr>`;}).join('') : `<tr><td colspan="7" style="padding:10px;color:var(--text-faint)">No assignment records found${state.portalSyncMode==='today' ? ' for this date' : ''}.</td></tr>`}
          </tbody>
        </table>
      </div>`;
  }
  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:10px">Read-only pull from the Interview Portal (Pradeep Anna Team + Hyderabad Team combined). "Sync Today" is fast and covers just this date; "Full Sync" pulls the entire call history (~20 seconds) — use it sparingly. Every successful sync is saved to Coverage Desk's database so it's still here after a refresh. This never writes anything back to the Portal.</div>
    ${state.portalDrivingPersonSaveError ? `<div class="hint" style="color:var(--coral);margin-bottom:10px">⚠ ${escapeHtml(state.portalDrivingPersonSaveError)}</div>` : (state.portalDrivingPersonFillCount ? `<div class="hint" style="color:var(--teal);margin-bottom:10px">✓ Filled and saved Driving Person for ${state.portalDrivingPersonFillCount} 1st Round call${state.portalDrivingPersonFillCount===1?'':'s'} from this sync (existing values left untouched).</div>` : '')}
    <div class="row" style="margin-bottom:12px">
      <div class="hint">${state.portalSyncFromCache && !state.portalSyncLoading ? 'Showing last saved data · ' : ''}Last updated: ${updatedLabel}</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn ghost" id="closePortalSync">Close</button>
        <button class="btn ${state.portalSyncMode==='today'?'primary':''}" id="syncPortalToday" ${state.portalSyncLoading || !isViewingToday()?'disabled':''} title="${isViewingToday()?'':'Only works while viewing today\'s date'}">${state.portalSyncLoading && state.portalSyncMode==='today' ? '<span class="spinner"></span>Syncing…' : `📅 Sync Today (${state.date})`}</button>
        <button class="btn ${state.portalSyncMode==='full'?'primary':''}" id="syncPortalFull" ${state.portalSyncLoading?'disabled':''}>${state.portalSyncLoading && state.portalSyncMode==='full' ? '<span class="spinner"></span>Syncing… (~20-40s)' : '🗂 Full Sync (all data)'}</button>
      </div>
    </div>
    ${body}
  </div>`;
}

function renderImportPanel(){
  return `<div class="import-panel" style="border:none;padding:0;margin-bottom:0;box-shadow:none">
    <div class="add-row" style="margin-top:0;margin-bottom:10px;flex-wrap:wrap;gap:10px">
      <label style="font-size:12.5px;color:var(--text-muted);white-space:nowrap">Import into date:</label>
      <input type="date" id="importDate" value="${state.date}">
      <div style="display:flex;border:1px solid var(--border);border-radius:8px;overflow:hidden;margin-left:auto">
        <button type="button" class="btn ghost" id="importRound1st" style="border:none;border-radius:0;padding:6px 12px;font-size:12px;${state.importDefaultRound!=='2nd'?'background:var(--teal-dim);color:var(--teal)':''}">1st Round</button>
        <button type="button" class="btn ghost" id="importRound2nd" style="border:none;border-radius:0;padding:6px 12px;font-size:12px;${state.importDefaultRound==='2nd'?'background:var(--teal-dim);color:var(--teal)':''}">2nd Round</button>
      </div>
    </div>
    ${state.importDefaultRound==='2nd' ? `<div class="hint" style="color:var(--teal);margin-bottom:8px">↻ Calls without an explicit round will default to <b>2nd Round</b>.</div>` : ''}
    ${pasteButtonHtml('importText')}
    <textarea id="importText" placeholder="Paste either format:&#10;1. Royal Prabhu (UK) – Interview – Lloyds Group – 1:30 PM IST – Duration: 30 Mins (1st Round)&#10;&#10;or a team-grouped list:&#10;*HYD Team*&#10;Sweta Sridhar - 2&#10;Meghana B - 3.30 (*STEPHEN*)"></textarea>
    <div class="row">
      <div class="hint">Supports team-header lists (*Team*, @Name) and numbered lists with → assignee arrows. Times without AM/PM assumed 1–11 = PM, 12 = AM — check after import.</div>
      <div style="display:flex;gap:8px;">
        <button class="btn ghost" id="cancelImport">Cancel</button>
        <button class="btn primary" id="runImport">Parse &amp; add calls</button>
      </div>
    </div>
  </div>`;
}

// Single entry point for both "new calls" and "reschedule/cancel" imports —
// one header button ("📥 Import") opens this, with a small tab switcher on
// top deciding which of the two underlying panels (showImport /
// showRescheduleImport — kept as-is so every existing success/cancel
// handler for each still works untouched) is shown below it.
function renderImportHubPanel(){
  const tab = state.showRescheduleImport ? 'reschedule' : 'new';
  return `<div class="import-panel">
    <div style="display:flex;gap:6px;margin-bottom:14px;border-bottom:1px solid var(--border);padding-bottom:12px">
      <button type="button" class="btn ${tab==='new'?'primary':'ghost'}" id="importHubTabNew" style="flex:1">＋ New Calls</button>
      <button type="button" class="btn ${tab==='reschedule'?'primary':'ghost'}" id="importHubTabReschedule" style="flex:1">↻ Reschedule / Cancel</button>
    </div>
    ${tab==='new' ? renderImportPanel() : renderRescheduleImportPanel()}
  </div>`;
}

// Expected Closures panel (added 2026-10-01) — see the state comment above
// expectClosureRowId for the full "who is in the call, we can except this
// as closures" backstory. Deliberately its own list, not folded into the
// real Closures panel above: these are "likely, not yet confirmed" — the
// whole point is a holding area so a promising call doesn't get lost
// among everything else happening that day, with a quick way to log a
// follow-up ("still pending"), promote it into a real Closure once
// confirmed, or delete it if it didn't pan out after all.
function renderExpectedClosuresPanel(){
  const list = (state.expectedClosures||[]).slice().sort((a,b)=>{
    // Oldest-flagged first, deliberately — these are exactly the ones most
    // likely to have been forgotten, so they surface at the top rather
    // than getting buried under whatever was flagged five minutes ago.
    const at = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const bt = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return at - bt;
  });
  if(!list.length){
    return `<div class="import-panel">
      <div class="hint">Nothing flagged right now. On any call, use the 🎯 button (or ⋯ More actions on mobile) to flag it as "expecting this to become a closure" based on what the handler or driving person told you — it'll show up here so you can follow up later instead of losing track of it.</div>
    </div>`;
  }
  const now = Date.now();
  const rowsHtml = list.map(c=>{
    const flaggedDaysAgo = c.createdAt ? Math.floor((now - new Date(c.createdAt).getTime()) / 86400000) : null;
    const stale = flaggedDaysAgo !== null && flaggedDaysAgo >= 7; // a week with no update is worth calling out
    const deleting = state.expectedClosureDeletingId === c.id;
    const confirming = state.expectedClosureConfirmingId === c.id;
    const loggingFollowup = state.expectedClosureFollowupId === c.id;
    return `<div class="notif-row" style="flex-direction:column;align-items:stretch${stale?';border-color:var(--amber)':''}">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
        <div class="notif-name">${escapeHtml(c.candidate)} <span class="notif-chip">${escapeHtml(c.company)}</span>${c.round?` <span class="notif-chip">${escapeHtml(c.round)}</span>`:''}${stale?` <span class="notif-warn" style="color:var(--amber)" title="Flagged ${flaggedDaysAgo} days ago with no follow-up logged since">⏱ ${flaggedDaysAgo}d</span>`:''}</div>
        <span style="display:flex;gap:6px;flex-shrink:0">
          <button class="btn ghost" data-expectclosure-followup="${c.id}" ${loggingFollowup?'disabled':''} title="Log a quick update from following up with the candidate/POC" style="font-size:11px;padding:4px 10px">${loggingFollowup?'<span class="spinner"></span>':'📝 Follow up'}</button>
          <button class="btn primary" data-expectclosure-confirm="${c.id}" ${confirming?'disabled':''} title="This came through — record it as a real closure" style="font-size:11px;padding:4px 10px">${confirming?'<span class="spinner"></span>':'✅ Confirm'}</button>
          <button class="btn ghost" data-expectclosure-delete="${c.id}" ${deleting?'disabled':''} title="Didn't pan out — remove this flag" style="font-size:11px;padding:4px 10px;color:var(--coral)">${deleting?'<span class="spinner"></span>':'🗑'}</button>
        </span>
      </div>
      <div class="hint" style="margin-top:2px">${c.note ? escapeHtml(c.note) : '<em>No note left</em>'}${c.flaggedBy?` — flagged by ${escapeHtml(c.flaggedBy)}`:''}${c.createdAt?` on ${new Date(c.createdAt).toLocaleDateString()}`:''}${c.callDate?` (call on ${escapeHtml(c.callDate)})`:''}</div>
      ${c.lastFollowupAt ? `<div class="hint" style="margin-top:2px;color:var(--teal)">Last follow-up ${new Date(c.lastFollowupAt).toLocaleDateString()}${c.lastFollowupNote?`: ${escapeHtml(c.lastFollowupNote)}`:''}</div>` : ''}
    </div>`;
  }).join('');
  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:10px">${list.length} call${list.length===1?'':'s'} flagged as likely closures, waiting on follow-up — oldest first.</div>
    ${rowsHtml}
  </div>`;
}

function teamCaption(team){
  const captions = {
    "HYD Team": "",
    "Pradeep Anna Team": "",
    "Development Team": "2nd round, technical & coding rounds",
    "Marketing Team": "1st round overflow — only when other teams are fully busy",
    "Sai Team": "2nd round & above — mostly technical calls",
    "Sandeep Anna Team": "2nd round & above — mostly technical calls",
    "Needs Team Assignment": "Auto-added from a pasted list — move into the right team below"
  };
  return captions[team] || '';
}

function renderStudentsMasterPanel(){
  if(state.studentsMasterLoading){
    return `<div class="import-panel"><div class="hint"><span class="spinner"></span> Loading Students Master…</div></div>`;
  }
  const q = (state.studentsSearch||'').trim().toLowerCase();
  let rows = state.studentsMaster || [];
  if(q){
    rows = rows.filter(s =>
      (s.name||'').toLowerCase().includes(q) ||
      (s.country||'').toLowerCase().includes(q)
    );
  }
  rows = rows.slice().sort((a,b)=>(a.name||'').localeCompare(b.name||''));
  const rowsHtml = rows.map(s=>`
    <tr data-student-id="${s.id}">
      <td style="min-width:220px"><input class="cell-input student-field" data-field="name" data-id="${s.id}" value="${escapeHtml(s.name||'')}"></td>
      <td style="min-width:160px"><input class="cell-input student-field" data-field="country" data-id="${s.id}" value="${escapeHtml(s.country||'')}" placeholder="Country"></td>
      <td style="width:36px;text-align:right"><button class="row-del student-del" data-id="${s.id}" title="Remove from Students Master">✕</button></td>
    </tr>
  `).join('');

  return `<div class="import-panel">
    <div class="hint" style="margin-bottom:10px">
      Every active student's name and country, in one place. Candidate names in the daily WhatsApp import are automatically checked against this list — a name not found here gets a small "N" badge so it's easy to spot and add.
      ${state.studentsMasterBackendMissing ? `<br><b style="color:var(--amber)">⚠ Your backend doesn't have a 'students' resource yet — edits here are saved to this browser only until that's added. Ask Claude for the api/data.js snippet and MySQL table for it.</b>` : ''}
    </div>
    <div class="row" style="margin-bottom:10px;flex-wrap:wrap;gap:8px">
      <div class="hint">${(state.studentsMaster||[]).length} students total</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <label class="btn ghost" style="cursor:pointer;margin:0">
          ⬆ Import from Excel
          <input type="file" id="studentsExcelInput" accept=".xlsx,.xls" style="display:none">
        </label>
        <button class="btn primary" id="toggleAddStudentForm">➕ Add Student</button>
      </div>
    </div>
    ${state.showAddStudentForm ? `
    <div class="add-row" style="margin-bottom:6px;flex-wrap:wrap">
      <input type="text" id="newStudentName" placeholder="Full name…" style="flex:1.4;min-width:160px">
      <input type="text" id="newStudentCountry" placeholder="Country…" style="flex:1;min-width:140px;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:8px;font-size:13px">
      <button class="btn primary" id="addStudentBtn">Add</button>
    </div>
    ${state.studentsAddError ? `<div style="color:var(--coral);font-size:12px;margin-bottom:10px">${escapeHtml(state.studentsAddError)}</div>` : ''}
    ` : ''}
    <input type="text" id="studentsSearchBox" placeholder="Search name or country…" value="${escapeHtml(state.studentsSearch||'')}" style="width:100%;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:8px 12px;border-radius:8px;font-size:13px;margin:10px 0 12px">
    <div class="table-scroll" style="max-height:480px;overflow-y:auto">
      <table style="min-width:420px">
        <thead><tr>
          <th>Name</th><th>Country</th><th></th>
        </tr></thead>
        <tbody>${rowsHtml || '<tr><td colspan="3" style="text-align:center;color:var(--text-faint);padding:20px">No matches.</td></tr>'}</tbody>
      </table>
    </div>
  </div>`;
}

function computePersonCallCounts(rows){
  const counts = {};
  rows.forEach(r=>{
    if(r.woi) return;
    const person = r.drivingPerson || r.assignee;
    if(!person) return;
    counts[person] = (counts[person]||0) + 1;
  });
  return counts;
}
function renderRosterPanel(){
  const isReadOnly = CURRENT_ROLE === 'user' || CURRENT_ROLE === 'team_lead';
  const teams = {};
  state.roster.forEach(p=>{ teams[p.team] = teams[p.team]||[]; teams[p.team].push(p); });
  const knownOrder = ["HYD Team","Pradeep Anna Team","Development Team","Marketing Team","Sai Team","Sandeep Anna Team"];
  // Always show every known team — even ones with zero members yet — plus any
  // custom team names that already exist in the roster from being typed in.
  const customTeams = Object.keys(teams).filter(t=>!knownOrder.includes(t) && t!=="Needs Team Assignment");
  const teamOrder = [...knownOrder, ...customTeams];
  const allTeamNames = [...teamOrder]; // for the datalist / move-to dropdowns
  // Today's call count per person, colored like a light heatmap — makes it
  // obvious at a glance who's carrying more than everyone else, right where
  // you'd actually go to rebalance (rather than only surfacing as a banner
  // warning after the fact).
  const personCounts = computePersonCallCounts(state.rows);
  const countValues = Object.values(personCounts);
  const avgCount = countValues.length ? countValues.reduce((s,c)=>s+c,0)/countValues.length : 0;
  function workloadBadge(name){
    const count = personCounts[name] || 0;
    if(!count) return '';
    const heat = count >= Math.max(6, avgCount*1.8) ? 'workload-high' : (count >= avgCount*1.2 ? 'workload-med' : 'workload-low');
    return `<span class="workload-badge ${heat}" title="${count} call(s) assigned today">${count}</span>`;
  }
  // Only shows once someone's actually run the Recurring Absences scan
  // (Notifications panel) — deliberately not auto-scanned on every load,
  // since it means fetching every saved date's notes.
  const todayDow = new Date(state.date + 'T00:00:00').getDay();
  function absenceHint(personId, isAbsentToday){
    if(isAbsentToday || !state.absencePatterns) return '';
    const match = state.absencePatterns.find(p => p.personId === personId && p.dow === todayDow);
    if(!match) return '';
    return `<span class="mini-badge mini-badge-resched" title="Often absent on ${escapeHtml(match.dowName)}s (${match.dates.length} time(s) previously) — worth checking before assuming they're in today.">🔁</span>`;
  }
  const groupsHtml = teamOrder.map(t=>`
    <div style="margin-top:12px">
      <div style="font-size:11px;color:var(--text-faint);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">${escapeHtml(t)}</div>
      ${teamCaption(t)?`<div style="font-size:11px;color:var(--text-faint);margin-bottom:6px">${escapeHtml(teamCaption(t))}</div>`:'<div style="margin-bottom:6px"></div>'}
      <div class="tags">
        ${(teams[t]||[]).map(p=>{
          const isAbsent = state.absentIds.includes(p.id);
          return `
        <div class="roster-tag ${isAbsent?'roster-tag-absent':''}">
            <label class="absent-toggle" title="Mark absent for ${escapeHtml(state.date)} only">
              <input type="checkbox" class="absentCheckbox" data-id="${p.id}" ${isAbsent?'checked':''} ${isReadOnly?'disabled':''}>
            </label>
            ${p.advanced?'<span style="color:var(--violet)">★</span> ':''}${escapeHtml(p.name)}${workloadBadge(p.name)}${absenceHint(p.id, isAbsent)}${isAbsent?' <span class="absent-badge">🚫 Absent</span>':''}
            ${isReadOnly?'':`<button data-id="${p.id}" class="removeRoster">×</button>`}</div>
        `;}).join('') || '<span style="color:var(--text-faint);font-size:12px">No members yet' + (isReadOnly?'.':' — add one below.') + '</span>'}
      </div>
    </div>
  `).join('');
  const needsTeamPeople = teams['Needs Team Assignment'] || [];
  const needsTeamHtml = needsTeamPeople.length ? `
    <div style="margin-top:12px">
      <div style="font-size:11px;color:var(--coral);text-transform:uppercase;letter-spacing:.05em;margin-bottom:2px">Needs Team Assignment</div>
      <div style="font-size:11px;color:var(--text-faint);margin-bottom:6px">${escapeHtml(teamCaption('Needs Team Assignment'))}</div>
      <div class="tags">
        ${needsTeamPeople.map(p=>`
          <div class="roster-tag">${p.advanced?'<span style="color:var(--violet)">★</span> ':''}${escapeHtml(p.name)}
            ${isReadOnly?'':`<select class="moveTeam" data-id="${p.id}" style="background:var(--surface-2);border:1px solid var(--border);color:var(--text);font-size:11px;border-radius:5px;padding:2px 4px">
              <option value="">Move to…</option>
              ${allTeamNames.map(tn=>`<option value="${escapeHtml(tn)}">${escapeHtml(tn)}</option>`).join('')}
            </select>
            <button data-id="${p.id}" class="removeRoster">×</button>`}</div>
        `).join('')}
      </div>
    </div>
  ` : '';
  return `<div class="roster-panel">
    <div class="strip-title" style="margin-bottom:0"><span>Coordinators</span><span>★ = handles 2nd round &amp; above</span></div>
    <div class="hint" style="margin-top:4px">Tick the box next to a name to mark them absent for ${escapeHtml(state.date)} only — resets automatically on other dates. Absent people are excluded from team capacity and auto-routing, and any call already assigned to them gets flagged.</div>
    ${groupsHtml}
    ${needsTeamHtml}
    ${isReadOnly ? '' : `
    <div class="add-row">
      <input type="text" id="newRosterName" placeholder="Name…" style="flex:1.4">
      <input type="text" id="newRosterTeam" list="teamNamesList" placeholder="Team… (pick or type a new one)" value="HYD Team" style="flex:1;background:var(--surface-2);border:1px solid var(--border);color:var(--text);padding:7px 10px;border-radius:8px;font-size:13px">
      <datalist id="teamNamesList">
        ${allTeamNames.map(tn=>`<option value="${escapeHtml(tn)}">`).join('')}
      </datalist>
      <label class="woi-toggle" style="white-space:nowrap"><input type="checkbox" id="newRosterAdvanced"><span>2nd rnd+</span></label>
      <button class="btn primary" id="addRosterBtn">Add</button>
    </div>
    <div id="rosterAddError" style="color:var(--coral);font-size:12px;margin-top:6px"></div>
    <div class="hint" style="margin-top:8px">To create a brand new team, just type its name in the Team field above instead of picking an existing one — it'll appear as its own section once you add the first person to it.</div>
    `}
    </div>
  </div>`;
}

function buildCombinedAssigneeFilterOptions(){
  // Combines Coverage Desk's own roster names with whatever names have
  // shown up via Portal sync (the 📡 Portal column) — so picking a name
  // finds a call regardless of which side actually has that person's
  // name on it right now.
  const rosterNames = state.roster.map(p=>p.name);
  const portalNames = (state.portalAssignments||[]).map(p=>p.handler).filter(Boolean);
  const combined = Array.from(new Set([...rosterNames, ...portalNames])).sort((a,b)=>a.localeCompare(b));
  return combined.map(name=>{
    const inRoster = rosterNames.includes(name);
    const inPortal = portalNames.includes(name);
    const tag = inRoster && inPortal ? '' : (inPortal ? ' (Portal only)' : '');
    return `<option value="${escapeHtml(name)}" ${state.assigneeFilter===name?'selected':''}>${escapeHtml(name)}${tag}</option>`;
  }).join('');
}

function buildRosterOptions(round, currentAssignee){
  const advancedRound = isAdvancedRound(round);
  const teams = {};
  state.roster.forEach(p=>{ teams[p.team] = teams[p.team]||[]; teams[p.team].push(p); });
  const knownOrder = ["HYD Team","Pradeep Anna Team","Development Team","Marketing Team","Sai Team","Sandeep Anna Team"];
  const teamOrder = [...knownOrder, ...Object.keys(teams).filter(t=>!knownOrder.includes(t))];
  let html = '';
  const teamsWithPeople = teamOrder.filter(t=>teams[t] && teams[t].length);
  if(teamsWithPeople.length){
    html += `<optgroup label="Assign whole team">` +
      teamsWithPeople.map(t=>`<option value="${escapeHtml(t)}" ${t===currentAssignee?'selected':''}>${escapeHtml(t)}</option>`).join('') +
      `</optgroup>`;
  }
  if(advancedRound){
    const advancedPeople = state.roster.filter(p=>p.advanced);
    if(advancedPeople.length){
      html += `<optgroup label="2nd round + above">` +
        advancedPeople.map(p=>`<option value="${escapeHtml(p.name)}" ${p.name===currentAssignee?'selected':''}>${escapeHtml(p.name)}</option>`).join('') +
        `</optgroup>`;
    }
  }
  teamOrder.filter(t=>teams[t]).forEach(t=>{
    html += `<optgroup label="${escapeHtml(t)}">` +
      teams[t].map(p=>`<option value="${escapeHtml(p.name)}" ${p.name===currentAssignee?'selected':''}>${p.advanced?'★ ':''}${escapeHtml(p.name)}</option>`).join('') +
      `</optgroup>`;
  });
  // If the current assignee isn't a known team or roster person — e.g. a
  // manually typed name for someone on Development Team who isn't in the
  // roster list — show it as its own selected option so the dropdown
  // reflects it correctly instead of silently falling back to blank.
  const knownValues = new Set([...teamsWithPeople, ...state.roster.map(p=>p.name)]);
  if(currentAssignee && !knownValues.has(currentAssignee) && currentAssignee !== CUSTOM_ASSIGNEE_SENTINEL){
    html += `<optgroup label="Custom"><option value="${escapeHtml(currentAssignee)}" selected>✏️ ${escapeHtml(currentAssignee)}</option></optgroup>`;
  }
  html += `<option value="${CUSTOM_ASSIGNEE_SENTINEL}">✏️ Type a name…</option>`;
  return html;
}
const CUSTOM_ASSIGNEE_SENTINEL = '__custom_assignee__';
// Same grouping logic as buildRosterOptions above (teams first, then an
// advanced-round group when relevant, then each team's people with ★ for
// advanced-eligible ones) — but rendered as a tappable list of buttons
// for the swipe-assign picker instead of <option> tags for a <select>.
function renderSwipeAssignGroups(round){
  const advancedRound = isAdvancedRound(round);
  const teams = {};
  state.roster.forEach(p=>{ teams[p.team] = teams[p.team]||[]; teams[p.team].push(p); });
  const knownOrder = ["HYD Team","Pradeep Anna Team","Development Team","Marketing Team","Sai Team","Sandeep Anna Team"];
  const teamOrder = [...knownOrder, ...Object.keys(teams).filter(t=>!knownOrder.includes(t))];
  const teamsWithPeople = teamOrder.filter(t=>teams[t] && teams[t].length);
  let html = '';
  if(teamsWithPeople.length){
    html += `<div class="swipe-assign-group-label">Assign whole team</div>` +
      teamsWithPeople.map(t=>`<button class="my-name-picker-item" data-name="${escapeHtml(t)}">${escapeHtml(t)}</button>`).join('');
  }
  if(advancedRound){
    const advancedPeople = state.roster.filter(p=>p.advanced);
    if(advancedPeople.length){
      html += `<div class="swipe-assign-group-label">2nd round + above</div>` +
        advancedPeople.map(p=>`<button class="my-name-picker-item" data-name="${escapeHtml(p.name)}">${escapeHtml(p.name)}<span class="my-name-picker-team">${escapeHtml(p.team)}</span></button>`).join('');
    }
  }
  teamOrder.filter(t=>teams[t]).forEach(t=>{
    html += `<div class="swipe-assign-group-label">${escapeHtml(t)}</div>` +
      teams[t].map(p=>`<button class="my-name-picker-item" data-name="${escapeHtml(p.name)}">${p.advanced?'★ ':''}${escapeHtml(p.name)}</button>`).join('');
  });
  return html;
}
// Driving Person is deliberately always an INDIVIDUAL, never a team — unlike
// the main Assigned-to field, which can be a whole team at the coarse
// routing stage. This is the finer breakdown a team lead does afterward:
// "HYD Team has this call, and specifically Karthikeya is the one running it."
function buildDrivingPersonOptions(currentValue){
  const teams = {};
  state.roster.forEach(p=>{ teams[p.team] = teams[p.team]||[]; teams[p.team].push(p); });
  const knownOrder = ["HYD Team","Pradeep Anna Team","Development Team","Marketing Team","Sai Team","Sandeep Anna Team"];
  const teamOrder = [...knownOrder, ...Object.keys(teams).filter(t=>!knownOrder.includes(t))];
  let html = '';
  teamOrder.filter(t=>teams[t] && teams[t].length).forEach(t=>{
    html += `<optgroup label="${escapeHtml(t)}">` +
      teams[t].map(p=>`<option value="${escapeHtml(p.name)}" ${p.name===currentValue?'selected':''}>${escapeHtml(p.name)}</option>`).join('') +
      `</optgroup>`;
  });
  const knownNames = new Set(state.roster.map(p=>p.name));
  if(currentValue && !knownNames.has(currentValue)){
    html += `<optgroup label="Custom"><option value="${escapeHtml(currentValue)}" selected>✏️ ${escapeHtml(currentValue)}</option></optgroup>`;
  }
  return html;
}

// Team workload counts (HYD vs Pradeep Anna) across the whole day's calls —
// shown on the dashboard so it's easy to see at a glance if one team is
// carrying more than the other, for quick manual rebalancing.
function computeTeamLoadCounts(rows){
  const teamNames = new Set(state.roster.map(p=>p.team));
  function teamOf(assignee){
    if(!assignee) return null;
    if(teamNames.has(assignee)) return assignee;
    const p = state.roster.find(p=>p.name===assignee);
    return p ? p.team : null;
  }
  const counts = {};
  rows.forEach(r=>{
    if(r.woi || !r.assignee) return;
    const t = teamOf(r.assignee);
    if(t){ counts[t] = (counts[t]||0) + 1; }
  });
  return counts;
}
// Today's available headcount for a team — same "roster minus absent"
// calculation already used for auto-routing capacity elsewhere.
function computeTeamCapacity(teamName){
  const members = state.roster.filter(p=>p.team===teamName);
  const absentCount = members.filter(p=>state.absentIds.includes(p.id)).length;
  return Math.max(members.length - absentCount, 0);
}
// Flags the busiest team relative to its own headcount, and — only when
// that load is genuinely lopsided against some other team with real spare
// capacity — names which team has the most room right now. Only HYD Team,
// Pradeep Anna Team, and Marketing Team are considered here — Development
// Team is technical/coding-round only and is never suggested as a general
// overflow destination, however much room it has. Only 1st-round calls are
// counted: advanced rounds go to specific senior members regardless of
// team load, so they aren't part of this capacity picture. Deliberately
// conservative (needs BOTH a high absolute load AND a wide gap against the
// roomiest team) so it doesn't nag over a normal, expected difference.
const OVERFLOW_ELIGIBLE_TEAMS = ['HYD Team', 'Pradeep Anna Team', 'Marketing Team'];
function suggestAlternativeTeam(firstRoundRows){
  const teamLoad = computeTeamLoadCounts(firstRoundRows);
  const stats = OVERFLOW_ELIGIBLE_TEAMS.map(name => ({
    name, count: teamLoad[name]||0, capacity: computeTeamCapacity(name)
  }));
  const withCapacity = stats.filter(t=>t.capacity>0);
  if(withCapacity.length < 2) return null;
  const ranked = withCapacity.map(t=>({...t, ratio: t.count/t.capacity})).sort((a,b)=>b.ratio-a.ratio);
  const fullest = ranked[0];
  const roomiest = ranked[ranked.length-1];
  if(!(fullest.ratio >= 3 && fullest.name !== roomiest.name && fullest.ratio > roomiest.ratio * 1.4)){
    return null;
  }
  const result = { full: fullest.name, suggest: roomiest.name };

  // Separate structural note: some of the fullest team's calls may simply
  // fall outside HYD Team's noon–midnight working window, so they were
  // never going to land on HYD regardless of headcount — that's a
  // scheduling-hours fact, not a workload-sharing gap, and it's worth
  // calling out on its own rather than folding it into the same sentence
  // as the roomiest-team suggestion.
  if(fullest.name !== 'HYD Team'){
    const teamNames = new Set(state.roster.map(p=>p.team));
    const fullestRows = firstRoundRows.filter(r=>!r.woi && r.assignee && teamOfAssignee(r.assignee, teamNames)===fullest.name);
    const outsideHydHours = fullestRows.filter(r=>!isWithinHydHours(r.time)).length;
    if(outsideHydHours > 0){
      result.outsideHydHoursCount = outsideHydHours;
      result.outsideHydHoursTotal = fullestRows.length;
    }
  }
  return result;
}

function classifyCompany(company){
  if(!company) return null;
  if(/health|hospital|medical|clinic|pharma/i.test(company)) return 'Healthcare';
  if(/university|college|\bschool\b|institute/i.test(company)) return 'Education';
  return null;
}

// Client names get typed inconsistently across different coordinators/dates
// — "Sallie Mae" one day, "Salliemae" or "Sallie-Mae" another. An exact
// trim+lowercase match misses these entirely, which silently breaks the
// PRIOR/CLIENT history badges and repeat-client detection for a client that
// really is the same company. Stripping everything but letters/numbers
// before comparing means spacing, punctuation, and casing differences no
// longer matter, while still keeping the original text for display.
function normalizeCompanyKey(company){
  return (company||'').toLowerCase().replace(/[^a-z0-9]/g,'');
}
// Manually-curated company aliases (2026-09-27) — reported real case: a
// closure recorded as "LSUHSC-Shreveport" is genuinely the same client as
// calls recorded under "LSU Health Science", but the two spellings (an
// abbreviation + campus name vs. a shortened full name) are too different
// for fuzzyCompanyKeyMatch()'s spelling-drift/prefix heuristics below to
// ever safely catch on their own — making those heuristics that
// permissive would risk matching genuinely unrelated companies elsewhere.
// This is an explicit, admin-curated list instead — "these spellings are
// known to mean the same client" — added one pair at a time as real cases
// come up (see the Closures panel's "🔗 Company aliases" section), stored
// in the generic app_settings store (same one goal targets use) as a JSON
// array of [nameA, nameB] pairs, so it's shared across the team and
// survives reloads without needing its own table/migration.
function getCompanyAliasPairs(){
  try{
    const raw = state.appSettings && state.appSettings.company_aliases;
    if(!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(p=>Array.isArray(p) && p.length>=2) : [];
  }catch(e){ return []; }
}
function companiesAreAliased(companyA, companyB){
  const a = normalizeCompanyKey(companyA), b = normalizeCompanyKey(companyB);
  if(!a || !b) return false;
  return getCompanyAliasPairs().some(([x,y])=>{
    const kx = normalizeCompanyKey(x), ky = normalizeCompanyKey(y);
    return (kx===a && ky===b) || (kx===b && ky===a);
  });
}
async function saveCompanyAliasPair(nameA, nameB){
  const pairs = getCompanyAliasPairs();
  pairs.push([nameA, nameB]);
  await saveAppSetting('company_aliases', JSON.stringify(pairs));
  // BUG FIX (2026-10-02): found while re-verifying the company-aliases
  // test after the same-day performance batch. computeClosuresPerformance()
  // now memoizes on a signature of closures/allRows/manual-matches/roster
  // — none of which change when an alias is added or removed — so a saved
  // alias used to silently keep showing the OLD (unmatched) result until
  // something else happened to bump the cache. Same fix pattern as
  // _closureManualMatchesVersion: bump a dedicated version counter so the
  // signature always changes when the matching rules themselves change.
  _companyAliasesVersion++;
}
async function removeCompanyAliasPair(index){
  const pairs = getCompanyAliasPairs();
  pairs.splice(index, 1);
  await saveAppSetting('company_aliases', JSON.stringify(pairs));
  _companyAliasesVersion++;
}
// Same idea as the "First L." abbreviation matching in
// findStudentMasterMatchWithConfidence() above, but symmetric (either name
// can be the abbreviated one) and with a small amount of typo tolerance on
// the first name specifically — "Sushmitha Polisetti" in a closure message
// vs. "Susmitha P" on the original call record needs BOTH the abbreviation
// (Polisetti -> P) AND a one-letter spelling variant (Sushmitha -> Susmitha)
// recognized together, which neither the abbreviation check nor the
// whole-name typo check above catches on its own. Only ever a single,
// narrow pathway — not the full multi-pathway cascade used for Students
// Master — because crossReferenceClosure() below additionally scopes this
// to candidates who had a call at the SAME company, which is a much
// stronger extra signal than Students Master matching has available, so a
// single well-targeted check stays safely unambiguous without needing
// several independent pathways to agree.
function firstNameLastInitialFuzzyMatch(nameA, nameB){
  function attempt(shortName, fullName){
    const shortParts = (shortName||'').trim().split(/\s+/);
    if(shortParts.length !== 2 || !/^[A-Za-z]\.?$/.test(shortParts[1])) return false;
    const fullParts = (fullName||'').trim().split(/\s+/);
    if(fullParts.length < 2) return false;
    if(fullParts[fullParts.length-1][0].toLowerCase() !== shortParts[1][0].toLowerCase()) return false;
    const shortFirstKey = normalizeNameKey(shortParts[0]);
    const fullFirstKey = normalizeNameKey(fullParts[0]);
    if(!shortFirstKey || !fullFirstKey) return false;
    if(shortFirstKey === fullFirstKey) return true;
    // Typo tolerance only on names long enough that a 1-2 letter edit is
    // clearly a spelling variant rather than a coincidental short-name
    // collision (e.g. never lets "Sam" fuzzy-match "Sid").
    return shortFirstKey.length >= 5 && fullFirstKey.length >= 5 && levenshteinDistance(shortFirstKey, fullFirstKey) <= 2;
  }
  return attempt(nameA, nameB) || attempt(nameB, nameA);
}
// Broader "is this plausibly the same real person, typed slightly
// differently" check used by the cross-reference fixes below (reschedule
// matching, duplicate detection, repeat-candidate history, client-conflict
// exclusion, repeat-client round-progression). firstNameLastInitialFuzzyMatch
// alone only covers an ABBREVIATED name ("First L.") against a full one —
// it doesn't catch two FULL names that are just spelled slightly
// differently ("Ramesh Nagulapalli" vs "Ramesh Nagulapally"), which is at
// least as common in independently-typed WhatsApp messages. Adds exactly
// the same whole-name typo-tolerance pathway Students Master already uses
// (normalizeNameKey, length >= 10, Levenshtein <= 2) — same thresholds, same
// reasoning: only applied to names long enough that a couple of edits is
// clearly a spelling variant, never a coincidental short-name collision.
function sameCandidateFuzzyMatch(nameA, nameB){
  if(firstNameLastInitialFuzzyMatch(nameA, nameB)) return true;
  const keyA = normalizeNameKey(nameA);
  const keyB = normalizeNameKey(nameB);
  if(!keyA || !keyB || keyA.length < 10 || keyB.length < 10) return false;
  if(Math.abs(keyA.length - keyB.length) > 2) return false;
  return levenshteinDistance(keyA, keyB) <= 2;
}
// Same "fuzzy is fine for company names, never for people" allowance the
// rest of the app already follows (see the team-isolation rule) — a
// closure and its original call record are independently typed, and a
// company name is exactly the kind of field that legitimately gets typed
// two different-but-equivalent ways ("Bimbo Bakeries" vs "Bimbo Bakeries
// USA"/"Bimbo Bakeries Inc", or a small spelling slip). Added 2026-09-24
// after Saiteja reported a real closure ("Himaja Adirala" / "Bimbo
// Bakeries") sitting right there in the call records but still showing as
// not matching — the root cause was that every closure-matching path
// required an EXACT normalized company key, with no tolerance at all for
// this very ordinary kind of variation.
function fuzzyCompanyKeyMatch(companyA, companyB){
  const a = normalizeCompanyKey(companyA), b = normalizeCompanyKey(companyB);
  if(!a || !b) return false;
  if(a === b) return true;
  // An explicit admin-curated alias ("LSUHSC-Shreveport" = "LSU Health
  // Science" — see getCompanyAliasPairs() above) — checked before the
  // generic spelling-drift heuristics below since it's a known, confirmed
  // match rather than a guess.
  if(companiesAreAliased(companyA, companyB)) return true;
  // One key is the other plus a suffix/prefix — "bimbobakeries" vs
  // "bimbobakeriesusa" or "bimbobakeriesinc" — a very common way the same
  // client ends up typed two different ways (a legal suffix added or
  // dropped). Only once both sides are long enough that this isn't just a
  // coincidental short-name collision.
  if(a.length >= 5 && b.length >= 5 && (a.startsWith(b) || b.startsWith(a))) return true;
  // Small spelling drift on an otherwise-long company key — same
  // Levenshtein-tolerance idea sameCandidateFuzzyMatch() uses for names,
  // just applied to companies, which is the one place this file already
  // says fuzzy matching is safe to use more freely.
  if(a.length >= 8 && b.length >= 8 && Math.abs(a.length-b.length) <= 3 && levenshteinDistance(a,b) <= 2) return true;
  return false;
}
// The one shared "does this closure's candidate+company correspond to a
// real call record" check, used by crossReferenceClosure() (the at-import
// preview), computeClosuresPerformance() (By Handler credit), and
// buildPipelineEntries() (conversion funnel / time-to-close / company
// scorecard) — previously each of these had its own slightly different
// copy of this logic, which is exactly how the company-fuzzy-matching gap
// above went unnoticed in some of them longer than others. Tries, in
// order: exact candidate + exact company; exact candidate + fuzzy
// company; then (only when there's no exact-name match anywhere) a fuzzy
// candidate name combined with an exact-or-fuzzy company, still refusing
// to guess whenever more than one distinct candidate+company on file
// could plausibly be the same person.
function findClosureMatch(candidate, company, allRows){
  const candKey = (candidate||'').trim().toLowerCase();
  if(!candKey) return null;
  const compKey = normalizeCompanyKey(company);
  const sameNameRows = allRows.filter(r => (r.candidate||'').trim().toLowerCase() === candKey);
  if(sameNameRows.length){
    const sorted = sameNameRows.slice().sort((a,b)=> (b._date||'').localeCompare(a._date||''));
    let row = sorted.find(r => normalizeCompanyKey(r.company) === compKey);
    if(row) return { row, matchType: 'exact' };
    row = sorted.find(r => fuzzyCompanyKeyMatch(r.company, company));
    if(row) return { row, matchType: 'fuzzyCompany' };
    return null; // this candidate is on file, just never at this company (even fuzzily) — a real mismatch, not a matching gap
  }
  // No exact candidate-name match anywhere. Fall back to the same
  // spelling/abbreviation-variant check the rest of the file uses for
  // "is this the same candidate", but only among rows whose company also
  // matches (exactly or fuzzily) — company match stays the strong extra
  // signal that keeps this safely unambiguous, same reasoning as before.
  const fuzzyRows = allRows.filter(r =>
    r.candidate &&
    (normalizeCompanyKey(r.company) === compKey || fuzzyCompanyKeyMatch(r.company, company)) &&
    sameCandidateFuzzyMatch(candidate, r.candidate)
  );
  const uniqueFuzzy = new Map();
  fuzzyRows.forEach(r=>{
    const key = r.candidate.trim().toLowerCase() + '|' + normalizeCompanyKey(r.company);
    if(!uniqueFuzzy.has(key)) uniqueFuzzy.set(key, r);
  });
  if(uniqueFuzzy.size === 1) return { row: Array.from(uniqueFuzzy.values())[0], matchType: 'fuzzyBoth' };
  return null;
}
// Checks a parsed closure against every call record on file (any date,
// not just today) — the whole point being that a closure message and the
// original interview record are two independently-typed pieces of data,
// so a mismatch between them (different spelling, or genuinely a
// different company) is exactly the kind of thing worth a human's eyes
// before it's trusted, not something to silently paper over or silently
// reject either.
function crossReferenceClosure(candidate, company, allRows){
  const candKey = (candidate||'').trim().toLowerCase();
  if(!candKey) return { status: 'no_match', message: 'No candidate name to check against.' };
  const found = findClosureMatch(candidate, company, allRows);
  if(found){
    const r = found.row;
    const note = found.matchType === 'exact' ? ''
      : found.matchType === 'fuzzyCompany' ? ` — entered there as "${r.company}", close enough in spelling to this closure's "${company}" that this looks like the same client, but worth a glance`
      : ` — entered there as "${r.candidate}" at "${r.company}", close enough in spelling/abbreviation that this looks like the same person and client, but worth a glance`;
    return { status: 'match', message: `Matches an existing call — ${r._date}, "${r.company}".${note}` };
  }
  const matches = allRows.filter(r => (r.candidate||'').trim().toLowerCase() === candKey);
  if(matches.length){
    const companiesOnFile = [...new Set(matches.map(r=>r.company).filter(Boolean))];
    return {
      status: 'mismatch',
      message: companiesOnFile.length
        ? `Found call(s) for this candidate, but none at "${company}" (even allowing for a spelling variant). On file: ${companiesOnFile.join(', ')}.`
        : `Found call(s) for this candidate, but none had a company on file to compare against.`,
      // Kept as structured data (not just parsed out of the message above)
      // for the "🔗 Same company?" quick-alias buttons in
      // renderUnmatchedClosuresHtml() — added 2026-09-27 so a real
      // spelling/abbreviation mismatch (e.g. "LSU Health Science" vs.
      // "LSUHSC-Shreveport") can be resolved with one click instead of
      // retyping both names into the Company Aliases form by hand. Only
      // offered here, not as a blind automatic match: the CANDIDATE match
      // is already exact (same person), so "this other company they also
      // had a call at" is a strong, human-reviewable hint, not a guess.
      companiesOnFile,
    };
  }
  return { status: 'no_match', message: 'No matching call found in the system for this candidate — check the spelling, or this may be from before your records started. You can match it to a call manually from the Closures panel.' };
}

// A 1st round call running longer than 30 minutes is unusual — worth a second
// look, and especially so if it's a Healthcare/Education client, where longer
// first-round screens are more likely to signal something needing attention.
function isLongFirstRound(row){
  if(!row || row.woi || isAdvancedRound(row.round)) return false;
  const mins = parseDurationMinutes(row.duration);
  return !!mins && mins > 30;
}
function findLongFirstRoundCalls(rows){
  const flagged = rows.filter(isLongFirstRound).map(r => ({
    row: r,
    category: classifyCompany(r.company)
  }));
  flagged.sort((a,b) => {
    const aPriority = a.category ? 0 : 1;
    const bPriority = b.category ? 0 : 1;
    return aPriority - bPriority;
  });
  return flagged;
}

function renderTable(rows, conflictIds, clientConflicts){
  clientConflicts = clientConflicts || new Map();
  // Onsite only means something for 2nd Round & Above calls in practice —
  // showing an empty checkbox on every 1st round row was just noise, so
  // the column (and its cell) only render while that tab is active.
  const showOnsiteColumn = state.view === '2nd';
  // Driving Person is for breaking a TEAM-level 1st round assignment down
  // to a specific individual afterward. On the 2nd Round & Above tab,
  // Assigned To is already a specific individual directly — the column
  // has nothing left to add there, so it's hidden on that tab specifically.
  const showDrivingPersonColumn = state.view !== '2nd';
  const colCount = 10 + (showOnsiteColumn?1:0) + (showDrivingPersonColumn?1:0);
  // Driving Person is the one field a Team Lead account CAN write, even
  // though they're otherwise read-only just like a plain 'user' account —
  // this is deliberately checked independently of the general isReadOnly
  // flag used everywhere else in the table.
  const canEditDrivingPerson = CURRENT_ROLE === 'admin' || CURRENT_ROLE === 'team_lead';
  // PERFORMANCE: buildRosterOptions/buildDrivingPersonOptions rebuild the
  // entire roster-derived <option>/<optgroup> markup from scratch on every
  // call — fine for a one-off dropdown, but this was being regenerated
  // once per ROW (each row called it with its own assignee baked in via
  // `selected`), so a busy day meant dozens of full roster rebuilds
  // redoing the exact same work. The roster doesn't change between rows
  // within a single render — only which option should start selected —
  // so the option markup is built WITHOUT any selected marking just twice
  // total here (once for a normal round, once for an advanced one), reused
  // for every row, and the select's actual value gets set afterward via
  // plain DOM assignment in attachHandlers (which already loops over every
  // row's fields regardless, to wire up their change handlers). A value
  // the roster doesn't recognize (a manually typed custom assignee) is
  // rare enough to keep using the original slower-but-always-correct
  // per-row computation rather than complicate the cache for it.
  const rosterOptionsCache = { normal: null, advanced: null };
  function cachedRosterOptions(advanced){
    const key = advanced ? 'advanced' : 'normal';
    if(rosterOptionsCache[key] === null) rosterOptionsCache[key] = buildRosterOptions(advanced ? '2nd Round' : '1st', '');
    return rosterOptionsCache[key];
  }
  let drivingPersonOptionsCache = null;
  function cachedDrivingPersonOptions(){
    if(drivingPersonOptionsCache === null) drivingPersonOptionsCache = buildDrivingPersonOptions('');
    return drivingPersonOptionsCache;
  }
  // PERFORMANCE NOTE: tried lazy-loading this cached option-list string
  // (only building the full <select> contents when a row's dropdown is
  // actually opened, via a delegated focus handler) — profiling showed a
  // real ~2.6x render-time win. Reverted anyway: running it against this
  // project's own regression-suite.js immediately caught a real breakage
  // — Playwright's selectOption (and plausibly some real assistive-tech /
  // programmatic interaction paths) can select a value without ever
  // triggering the focus event the lazy-load depended on, leaving the
  // target option missing and the selection silently failing. Assigning a
  // call is the single most important action in this app; not worth the
  // risk for a render-speed win. Left eager, as originally.
  const knownAssigneeValues = new Set([...state.roster.map(p=>p.team), ...state.roster.map(p=>p.name)]);
  const knownDrivingPersonNames = new Set(state.roster.map(p=>p.name));
  // PERFORMANCE: these three used to be rebuilt fresh INSIDE the per-row
  // map below (a `new Set(state.roster.map(...))`, a `state.roster.find()`,
  // and an `state.absentIds.includes()` scan, once for every single row) —
  // the roster and absence list don't change between rows within one
  // render, same reasoning as the option-markup caching above, so building
  // these once here and reusing them for every row removes real redundant
  // work per render. Measured impact on a busy ~90-row day was modest on
  // its own (roughly 10ms off a ~240ms render) — most of render time is
  // the per-row HTML string size itself (see buildRosterOptions/
  // buildDrivingPersonOptions caching above), not this loop's JS cost.
  const teamNames = new Set(state.roster.map(p=>p.team));
  const rosterByName = new Map(state.roster.map(p=>[p.name, p]));
  const absentIdSet = new Set(state.absentIds);
  // Same lookup pattern as teamNames/rosterByName just above — built once
  // per render, not per row. Matches by candidate+company key (not call
  // id) so the 🎯 "already flagged" state still shows up correctly even
  // across a reschedule/re-import that gives the row a new id.
  const expectedClosureKeys = new Set((state.expectedClosures||[]).map(c=>normalizeNameKey(c.candidate)+'|'+normalizeCompanyKey(c.company||'')));
  const rowsHtml = rows.map(r=>{
    const isConflict = conflictIds.has(r.id);
    const conflictReason = conflictIds.get(r.id) || '';
    const isClientConflict = clientConflicts.has(r.id);
    const clientConflictReason = clientConflicts.get(r.id) || '';
    const isUnassigned = !r.assignee && !r.woi;
    const roundClass = /final/i.test(r.round) ? 'roundfinal' : (/^1st/i.test(r.round) ? 'round1' : 'round2');
    const advancedRound = isAdvancedRound(r.round);
    const assigneeObj = rosterByName.get(r.assignee);
    const isTeamLevel = teamNames.has(r.assignee);
    const showAdvancedWarning = advancedRound && r.assignee && assigneeObj && !assigneeObj.advanced;
    const showAbsentWarning = r.assignee && assigneeObj && absentIdSet.has(assigneeObj.id);
    const category = classifyCompany(r.company);
    const hasDoubts = r.doubts && r.doubts.length>0;
    const longDuration = isLongFirstRound(r);
    // Computed once and reused at both badge sites below (candidate cell
    // and actions cell) instead of calling findPortalMatch(r) twice per
    // row — same lookup, same result, no reason to redo it.
    const portalMatch = findPortalMatch(r);
    const portalSuppressed = portalMatch ? null : portalMatchSuppressedInfo(r);
    const rowClasses = [
      isUnassigned?'row-unassigned':'',
      isConflict?'row-conflict':'',
      category==='Healthcare'?'row-healthcare':'',
      category==='Education'?'row-education':'',
      longDuration?'row-long-duration':'',
      r.onsite?'row-onsite':'',
      // Purely additive — lets the mobile card view give a rescheduled/
      // cancelled/not-responded call its own accent color at a glance
      // (see the "MOBILE CARD VIEW" status accent rules), same idea as
      // the existing Healthcare/Education side-stripes just above.
      r.status?'row-status-'+r.status:''
    ].filter(Boolean).join(' ');
    return `<tr data-id="${r.id}" data-bucket="${(()=>{ const m = timeToMinutes(r.time); return m===9999 ? '?' : Math.floor(m/30); })()}" class="${rowClasses}">
      <td class="select-cell" data-label=""><input type="checkbox" class="row-select" data-id="${r.id}" ${state.selectedIds.has(r.id)?'checked':''}></td>
      <td class="time" data-label="Time">${isConflict?`<span class="flag-icon" title="${escapeHtml(conflictReason + '\n\nFree at ' + r.time + ': ' + (findFreePeopleAtTime(r.time, advancedRound).join(', ') || 'nobody free right now'))}">⚠</span>`:''}<input class="cell-input time-input" data-field="time" value="${escapeHtml(r.time)}" placeholder="e.g. 1:30 AM" title="Edit if the source data had a typo (e.g. should be AM not PM)"></td>
      <td data-label="Candidate">
        ${(state.recentImportIds && state.recentImportIds.has(r.id))?`<span class="mini-badge mini-badge-recent-import" title="Added or updated by the most recent import">🆕</span>`:''}${r.status?`<span class="prior-badge" style="color:${statusBadgeInfo(r.status).colorVar};border-color:${statusBadgeInfo(r.status).colorVar}" title="${escapeHtml((r.statusFields||[]).map(f=>f.label+': '+f.value).join(', ')||'')}">${statusBadgeInfo(r.status).icon} ${statusBadgeInfo(r.status).shortLabel}</span><button class="clear-status-btn" data-id="${r.id}" title="This call was NOT actually ${statusBadgeInfo(r.status).label.toLowerCase()} — clear the tag but keep the call">✕</button>`:''}${hasDoubts?`<span class="flag-icon doubt-icon" title="${escapeHtml(r.doubts.join(' '))}">❔</span>`:''}${category?`<span class="cat-badge cat-${category.toLowerCase()}" title="${category}">${category==='Healthcare'?'⚕':'🎓'}</span>`:''}${r.roundType?(()=>{ const rt = roundTypeBadgeInfo(r.roundType); return rt ? `<span class="round-type-badge round-type-${r.roundType}" title="${escapeHtml(rt.label)}">${rt.shortLabel}</span>` : ''; })():''}<span class="badge-row">${(()=>{ const reschedWarn = findPriorRescheduleWarning(r); return reschedWarn ? `<span class="mini-badge mini-badge-resched" title="⚠ Same client (${escapeHtml(reschedWarn.company)}) — this candidate\u2019s call here was already ${escapeHtml(statusBadgeInfo(reschedWarn.status).label.toLowerCase())} on ${escapeHtml(reschedWarn.date)}${reschedWarn.assignee?', handled by '+escapeHtml(reschedWarn.assignee):''}. Double-check this isn\u2019t the same call resurfacing before treating it as new.">!</span>` : ''; })()}${(()=>{ const repeatFlag = findRepeatNoShowFlag(r); return repeatFlag ? `<span class="mini-badge mini-badge-noshow" title="\u26a0 This candidate has ${repeatFlag.count} prior rescheduled/cancelled/no-response outcome(s) across earlier calls (any client) \u2014 worth a quick gut-check before assuming this one goes ahead as planned.">${repeatFlag.count}\u00d7!</span>` : ''; })()}${(()=>{ const prior = findPriorOccurrence(r); return prior ? `<span class="mini-badge mini-badge-prior" title="Handled before: ${escapeHtml(prior.assignee||'unassigned')} — ${escapeHtml(prior.date)}, ${escapeHtml(prior.round||'round n/a')}${prior.company?', '+escapeHtml(prior.company):''}">P</span>` : ''; })()}${(r.candidate && expectedClosureKeys.has(normalizeNameKey(r.candidate)+'|'+normalizeCompanyKey(r.company||''))) ? `<span class="mini-badge mini-badge-expectclosure" title="Flagged as an expected closure — see 🎯 Expected for the note and to follow up">🎯</span>` : ''}${(()=>{ const sameClient = findPriorSameClientOccurrence(r); return sameClient ? `<span class="mini-badge mini-badge-round" title="Same client, prior round: ${escapeHtml(sameClient.round||'round n/a')} on ${escapeHtml(sameClient.date)}${sameClient.assignee?', handled by '+escapeHtml(sameClient.assignee):''}">↻</span>` : ''; })()}${(()=>{
  const info = studentMatchBadgeInfo(r.candidate);
  if(!info) return '';
  if(info.kind === 'confirm'){
    return `<span class="mini-badge mini-badge-confirm-student" data-candidate="${escapeHtml(r.candidate)}" data-candidate-key="${escapeHtml(normalizeNameKey(r.candidate))}" data-matched-id="${escapeHtml(info.student.id)}" data-pair-key="${escapeHtml(info.pairKey)}" title="Possibly the same as “${escapeHtml(info.student.name)}” in Students Master (${escapeHtml(info.reason)}) — not an exact match, click to confirm">?</span>`;
  }
  return `<span class="mini-badge mini-badge-newstudent quick-add-student" data-candidate="${escapeHtml(r.candidate)}" title="Not found in Students Master — click to add \u201c${escapeHtml(r.candidate)}\u201d">N</span>`;
})()}</span>${(()=>{
        const pm = portalMatch;
        if(pm) return `<span class="flag-icon" style="color:var(--teal)" title="Interview Portal shows: ${escapeHtml(pm.handler||'unassigned')} is handling this call${pm.client?' at '+escapeHtml(pm.client):''}${escapeHtml(portalSyncFreshnessLabel())}">📡</span>`;
        const suppressed = portalSuppressed;
        if(suppressed) return `<span class="flag-icon" style="color:var(--amber)" title="Interview Portal has a record for this candidate under this team, but only for ${escapeHtml(suppressed.mostRecent)} — not for today (${escapeHtml(state.date)}) — so it's not shown here to avoid a wrong match. Click Sync Today to check for a current one.">⚠</span>`;
        return '';
      })()}<input class="cell-input" data-field="candidate" value="${escapeHtml(r.candidate)}">
      </td>
      <td data-label="Country">
        <select class="cell-input" data-field="country" style="font-size:11.5px;padding:5px 4px;appearance:none;-webkit-appearance:none;background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='5'%3E%3Cpath d='M1 1l3 3 3-3' stroke='%238B93A0' stroke-width='1.3' fill='none'/%3E%3C/svg%3E&quot;);background-repeat:no-repeat;background-position:right 4px center;padding-right:16px;">
          <option value="USA" ${(r.country||'USA')==='USA'?'selected':''}>USA</option>
          <option value="UK" ${r.country==='UK'?'selected':''}>UK</option>
          <option value="Ireland" ${r.country==='Ireland'?'selected':''}>Ireland</option>
          <option value="Canada" ${r.country==='Canada'?'selected':''}>Canada</option>
          <option value="Germany" ${r.country==='Germany'?'selected':''}>Germany</option>
        </select>
      </td>
      <td data-label="Company">${isClientConflict?`<span class="flag-icon" style="color:var(--coral)" title="${escapeHtml(clientConflictReason)}">⏰</span>`:''}${(()=>{ const pc = findPriorClientOccurrence(r); return pc ? `<span class="mini-badge mini-badge-client" title="${escapeHtml(pc.company)} also had a call with ${escapeHtml(pc.candidate||'another candidate')} on ${escapeHtml(pc.date)}${pc.round?', '+escapeHtml(pc.round):''}${pc.assignee?' — handled by '+escapeHtml(pc.assignee):''}">C</span>` : ''; })()}${(()=>{ const rel = findCompanyReliabilityFlag(r.company); return rel ? `<span class="mini-badge mini-badge-reliability" title="⚠ ${escapeHtml(rel.company)}: ${Math.round(rel.rate*100)}% of ${rel.total} recorded calls ended rescheduled/cancelled/no-response — worth planning for.">${Math.round(rel.rate*100)}%</span>` : ''; })()}<input class="cell-input" data-field="company" value="${escapeHtml(r.company)}"></td>
      <td data-label="Round"><input class="cell-input round-input ${roundClass}" data-field="round" value="${escapeHtml(r.round)}"></td>
      <td data-label="Duration">${longDuration?`<span class="flag-icon" title="1st round running over 30 min${category?' — also a '+category+' client':''}. Worth a second look.">⏱</span>`:''}<input class="cell-input" data-field="duration" value="${escapeHtml(r.duration)}" style="width:100%"></td>
      <td data-label="WOI">
        <label class="woi-toggle">
          <input type="checkbox" data-field="woi" ${r.woi?'checked':''}>
          <span>WOI</span>
        </label>
      </td>
      ${showOnsiteColumn ? `<td data-label="Onsite">
        <label class="woi-toggle onsite-toggle" title="On-site / in-person interview">
          <input type="checkbox" data-field="onsite" ${r.onsite?'checked':''}>
          <span>Onsite</span>
        </label>
      </td>` : ''}
      <td data-label="Assigned to">
        ${showAbsentWarning?`<span class="flag-icon" style="color:var(--coral)" title="${escapeHtml(r.assignee)} is marked absent for ${escapeHtml(state.date)} — this call needs reassigning.">🚫</span>`:''}${showAdvancedWarning?'<span class="flag-icon" title="Not usually a 2nd round+ handler">△</span>':''}<select class="cell-input ${(!r.assignee && !r.woi)?'empty':''} ${isTeamLevel?'team-level':''}" data-field="assignee" data-assignee-value="${escapeHtml(r.assignee)}" ${r.woi?'disabled':''}>
          <option value="">${r.woi?'— WOI —':'— unassigned —'}</option>
          ${(r.assignee && !knownAssigneeValues.has(r.assignee)) ? buildRosterOptions(r.round, r.assignee) : cachedRosterOptions(advancedRound)}
        </select>
      </td>
      ${showDrivingPersonColumn ? `<td data-label="Driving Person">
        <select class="driving-person-select" data-id="${r.id}" data-driving-value="${escapeHtml(r.drivingPerson||'')}" ${(!canEditDrivingPerson || r.woi)?'disabled':''} title="Who on the team is actually running this call — separate from the team-level Assigned To">
          <option value="">— none —</option>
          ${(r.drivingPerson && !knownDrivingPersonNames.has(r.drivingPerson)) ? buildDrivingPersonOptions(r.drivingPerson) : cachedDrivingPersonOptions()}
        </select>
      </td>` : ''}
      <td data-label="Actions" class="actions-cell">${hasDoubts?`<button class="resolve-doubt" data-id="${r.id}" title="Mark doubt as resolved">✓</button>`:''}<button class="pin-toggle ${(r.interviewer||r.importance||r.technicalPOC||r.candidateFirstInterview)?'pin-toggle-filled':''}" data-id="${r.id}" title="Interviewer, Technical POC, Candidate's 1st Interview &amp; call importance">📌</button>${(()=>{
        const alreadyFlagged = r.candidate && expectedClosureKeys.has(normalizeNameKey(r.candidate)+'|'+normalizeCompanyKey(r.company||''));
        return r.candidate ? `<button class="expect-closure-btn" data-expectclosure="${r.id}" style="${alreadyFlagged?'color:var(--amber)':''}" title="${alreadyFlagged ? 'Already flagged as an expected closure — click to flag again (e.g. after a later round)' : 'Flag as an expected closure, based on what the handler/driving person told you'}">🎯</button>` : '';
      })()}${(()=>{
        const pm = portalMatch;
        if(pm){
          const differs = pm.handler && r.assignee && !namesEquivalent(pm.handler, r.assignee);
          return `<button class="portal-check-btn" data-id="${r.id}" style="color:${differs?'var(--amber)':'var(--teal)'}" title="Interview Portal shows: ${escapeHtml(pm.handler||'Unassigned')}${pm.status?' — '+escapeHtml(pm.status):''}${differs?' (differs from local assignment)':''}${escapeHtml(portalSyncFreshnessLabel())}">📡</button>`;
        }
        const suppressed = portalSuppressed;
        if(suppressed) return `<button class="portal-check-btn" data-id="${r.id}" style="color:var(--amber)" title="Interview Portal has a record for this candidate under this team, but only for ${escapeHtml(suppressed.mostRecent)} — not for today. Not shown as a match to avoid guessing wrong. Click Sync Today to check for a current record.">⚠</button>`;
        return '';
      })()}${(state.view==='1st' || (state.view==='all' && !isAdvancedRound(r.round)))?`<button class="move-2nd" data-move="${r.id}" title="Move to 2nd Round & Above">→2nd</button>`:''}${(state.view==='2nd' || (state.view==='all' && isAdvancedRound(r.round)))?`<button class="move-1st" data-move1st="${r.id}" title="Move to 1st Round — for a call that landed in 2nd Round & Above by mistake">→1st</button>`:''}<button class="row-del" data-del="${r.id}" title="Remove">✕</button><button class="row-quickaction-btn" data-quickaction="${r.id}" title="More actions">⋯</button></td>
    </tr>
    ${hasDoubts?`<tr class="doubt-note-row"><td colspan="${colCount}"><span class="doubt-note-icon">❔</span> ${escapeHtml(r.doubts.join(' '))}</td></tr>`:''}
    ${r.status?`<tr class="status-note-row status-note-${r.status}"><td colspan="${colCount}"><span class="status-note-icon">${statusBadgeInfo(r.status).icon}</span> ${escapeHtml((r.statusFields||[]).filter(f=>(f.value||'').trim()).map(f=>f.label+': '+f.value).join('  •  ') || (statusBadgeInfo(r.status).label + ' — no reason given'))}</td></tr>`:''}
    ${state.expandedDetailIds.has(r.id)?`<tr class="pin-detail-row"><td colspan="${colCount}">
      <div class="pin-detail-fields">
        <div class="pin-field">
          <label>Interviewer (client-side)</label>
          <input class="pin-interviewer" data-id="${r.id}" placeholder="e.g. Sarah from ITV" value="${escapeHtml(r.interviewer||'')}">
        </div>
        <div class="pin-field">
          <label>Technical POC (Development Team)</label>
          <input class="pin-technical-poc" data-id="${r.id}" placeholder="e.g. Gopi, Kishore, Vamsi" value="${escapeHtml(r.technicalPOC||'')}">
        </div>
        <div class="pin-field">
          <label>Importance / priority note</label>
          <input class="pin-importance" data-id="${r.id}" placeholder="e.g. VIP client, urgent, exec round" value="${escapeHtml(r.importance||'')}">
        </div>
        <div class="pin-field" style="flex:0 0 100%;min-width:0">
          <label class="woi-toggle" style="cursor:pointer">
            <input type="checkbox" class="pin-candidate-first-interview" data-id="${r.id}" ${r.candidateFirstInterview?'checked':''}>
            <span style="font-size:12px;color:var(--text-muted);text-transform:none;letter-spacing:0;font-weight:500">Candidate's 1st Interview — shown in bold when the finalized list is exported</span>
          </label>
        </div>
      </div>
    </td></tr>`:''}`;
  }).join('');

  const allSelected = rows.length>0 && rows.every(r=>state.selectedIds.has(r.id));
  return `<div class="table-scroll-top" id="tableScrollTop"><div id="tableScrollTopInner"></div></div><div class="table-scroll" id="tableScrollMain"><table>
    <thead><tr>
      <th style="width:34px"><input type="checkbox" id="selectAllRows" ${allSelected?'checked':''}></th>
      <th style="width:100px">Time</th>
      <th style="width:175px">Candidate</th>
      <th style="width:98px">Country</th>
      <th style="width:190px">Company</th>
      <th style="width:104px">Round</th>
      <th style="width:82px">Duration</th>
      <th style="width:52px">WOI</th>
      ${showOnsiteColumn ? `<th style="width:60px">Onsite</th>` : ''}
      <th style="width:140px">Assigned to</th>
      ${showDrivingPersonColumn ? `<th style="width:140px">Driving Person</th>` : ''}
      <th style="width:96px"></th>
    </tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table></div>`;
}

function renderEmpty(){
  // Visual refresh (2026-09-26): a plain two-line message read as "did
  // something break?" on a genuinely light day, especially since it's the
  // very first thing a person sees after the (now much more colorful)
  // summary/toolbar above it. An icon plus a real, working shortcut into
  // the action that actually fixes the empty state reads as "nothing here
  // yet" instead.
  if(state.view==='doubts'){
    return `<div class="empty-state">
      <div class="empty-state-icon">❔</div>
      <h3>No doubts right now</h3>
      <p>Everything imported so far had a clear time, company, and round.</p>
    </div>`;
  }
  if(state.view==='rescheduled'){
    return `<div class="empty-state">
      <div class="empty-state-icon">↻</div>
      <h3>No rescheduled, cancelled, no-response, or no-invite calls</h3>
      <p>Calls tagged ↻ Rescheduled, ✕ Cancelled, ☎ Not Responded, or 📨 Didn't Receive Invite — via "Import Reschedule/Cancel" or the auto-detected messages in a normal import — will show up here.</p>
    </div>`;
  }
  const isReadOnly = CURRENT_ROLE === 'user' || CURRENT_ROLE === 'team_lead';
  return `<div class="empty-state">
    <div class="empty-state-icon">📭</div>
    <h3>No calls here yet</h3>
    <p>Import today's WhatsApp list or add a call manually to get started.</p>
    ${isReadOnly ? '' : `<div class="empty-state-actions">
      <button class="btn primary" id="emptyStateImportBtn">📥 Import calls</button>
      <button class="btn ghost" id="emptyStateAddCallBtn">＋ Add call manually</button>
    </div>`}
  </div>`;
}

function escapeHtml(s){
  return (s||'').toString().replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ---------- handlers ----------
// Shared by the toolbar's "＋ Add call" button and the "Add a call" PWA
// home-screen shortcut (long-press the installed app icon) — same action,
// two different entry points into it.
// Small haptic pulse for a handful of confirm-style mobile actions (swipe
// actions, picking an assignee). Android Chrome/Samsung Internet support
// the Vibration API; iOS Safari doesn't expose it at all, so this quietly
// does nothing there rather than erroring — never gates any actual
// functionality on whether it worked.
function hapticTap(ms){
  try{ if(navigator.vibrate) navigator.vibrate(ms || 15); }catch(e){}
}
// Shared by the row's delete button and swipe-to-delete — same action,
// same undo toast, two different entry points into it.
const UNDO_TOAST_MS = 6000;
function deleteCallRow(id){
  const idx = state.rows.findIndex(r=>r.id===id);
  if(idx===-1) return;
  const removed = state.rows[idx];
  state.rows = state.rows.filter(r=>r.id!==id);
  // expiresAt (an absolute timestamp), not just a duration, so the visual
  // countdown bar below can always compute "how much is really left" from
  // scratch on every render — including a render triggered by something
  // totally unrelated (an edit elsewhere) that rebuilds this toast's DOM
  // from nothing. Without that, a fresh <div> would restart its CSS
  // animation from 100% on every unrelated re-render while the real
  // setTimeout dismissal below kept counting down on its own original
  // schedule — silently decoupling what the bar shows from when "Undo"
  // actually disappears.
  state.lastDeleted = { row: removed, index: idx, expiresAt: Date.now() + UNDO_TOAST_MS };
  clearTimeout(undoToastTimer);
  undoToastTimer = setTimeout(()=>{ state.lastDeleted = null; render(); }, UNDO_TOAST_MS);
  markDirty(); render();
}
function addBlankCallRow(){
  state.rows.push({id:uid(), time:'', company:'', candidate:'', round: state.view==='2nd' ? '2nd Round' : '1st', duration:'', woi:false, assignee:'', country:'USA', doubts:[], raw:'', interviewer:'', technicalPOC:'', importance:'', onsite:false, candidateFirstInterview:false, drivingPerson:''});
  markDirty(); render();
}
function attachHandlers(conflictIds){
  // Mirrors the calls table's horizontal scrollbar at the TOP as well as
  // the bottom, so dragging it back left doesn't require scrolling all the
  // way down to the table's bottom edge first. The top strip has no real
  // content — it's just a spacer sized to match the table's actual scroll
  // width, with its scroll position kept in sync with the real table below.
  const scrollTop = document.getElementById('tableScrollTop');
  const scrollTopInner = document.getElementById('tableScrollTopInner');
  const scrollMain = document.getElementById('tableScrollMain');
  if(scrollTop && scrollTopInner && scrollMain){
    const tableEl = scrollMain.querySelector('table');
    if(tableEl){
      // PERFORMANCE: reading .scrollWidth forces the browser to
      // synchronously compute full layout right here, mid-script — for an
      // 80+ row table, CPU profiling showed this single property read was
      // the overwhelming majority of this entire function's cost (not a
      // guess — confirmed via line-level profiling). Deferring it to
      // requestAnimationFrame lets the browser's normal paint cycle handle
      // the layout instead of forcing it early and synchronously; the top
      // scrollbar mirror ends up sized one frame later, which is
      // imperceptible, in exchange for taking this off render's critical
      // path entirely.
      requestAnimationFrame(()=>{
        scrollTopInner.style.width = tableEl.scrollWidth + 'px';
      });
    }
    let syncingScroll = false;
    scrollTop.addEventListener('scroll', ()=>{
      if(syncingScroll) return;
      syncingScroll = true;
      scrollMain.scrollLeft = scrollTop.scrollLeft;
      syncingScroll = false;
    });
    scrollMain.addEventListener('scroll', ()=>{
      if(syncingScroll) return;
      syncingScroll = true;
      scrollTop.scrollLeft = scrollMain.scrollLeft;
      syncingScroll = false;
    });
  }
  // Shows a fade edge on the tabs row only when it's actually scrollable —
  // otherwise it's easy to never notice Doubts exists off-screen on
  // narrow/mobile widths.
  const tabsWrap = document.getElementById('tabsWrap');
  const mainTabs = document.getElementById('mainTabs');
  if(tabsWrap && mainTabs){
    const updateOverflow = ()=>{
      if(mainTabs.scrollWidth > mainTabs.clientWidth + 2){
        tabsWrap.classList.add('is-overflowing');
      } else {
        tabsWrap.classList.remove('is-overflowing');
      }
    };
    // Deferred for the same reason as the table scrollWidth fix above —
    // reading scrollWidth/clientWidth here forces the SAME whole-document
    // layout flush, just attributed to whichever property read happens to
    // run first; fixing one without the other just moves the cost here.
    requestAnimationFrame(updateOverflow);
    mainTabs.addEventListener('scroll', ()=>{
      // hide the fade once scrolled near the end, so it doesn't look stuck
      const atEnd = mainTabs.scrollLeft + mainTabs.clientWidth >= mainTabs.scrollWidth - 2;
      tabsWrap.classList.toggle('is-overflowing', !atEnd && mainTabs.scrollWidth > mainTabs.clientWidth + 2);
    });
  }
  document.getElementById('datePicker').onchange = async (e)=>{
    if(state.dirty && !confirm('You have unsaved changes that will be lost if you switch dates without saving. Switch anyway?')){
      render(); // reset the date input back to state.date visually
      return;
    }
    state.date = e.target.value;
    state.dirty = false;
    state.lastImportedIds = null;
    state.showImport = false; state.showRoster = false;
    state.dateSwitching = true;
    render();
    await loadDay(state.date);
    state.dateSwitching = false;
    // Demo/seed data disabled — the app's been in real use for a while now,
    // and the old seeded candidate names were polluting the "handled before"
    // cross-date scan with stale test data instead of real history.
    // await maybeSeedMaster(); await maybeSeedAug11(); await maybeSeedAug12(); await maybeSeedAug13();
    render();
    scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
    scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
  };
  document.getElementById('prevDay').onclick = async ()=>{
    if(state.dirty && !confirm('You have unsaved changes that will be lost if you switch dates without saving. Switch anyway?')) return;
    const d = new Date(state.date); d.setDate(d.getDate()-1);
    state.date = d.toISOString().slice(0,10);
    state.dirty = false;
    state.lastImportedIds = null;
    state.dateSwitching = true;
    render();
    await loadDay(state.date);
    state.dateSwitching = false;
    // Demo/seed data disabled — the app's been in real use for a while now,
    // and the old seeded candidate names were polluting the "handled before"
    // cross-date scan with stale test data instead of real history.
    // await maybeSeedMaster(); await maybeSeedAug11(); await maybeSeedAug12(); await maybeSeedAug13();
    render();
    scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
    scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
  };
  document.getElementById('nextDay').onclick = async ()=>{
    if(state.dirty && !confirm('You have unsaved changes that will be lost if you switch dates without saving. Switch anyway?')) return;
    const d = new Date(state.date); d.setDate(d.getDate()+1);
    state.date = d.toISOString().slice(0,10);
    state.dirty = false;
    state.dateSwitching = true;
    render();
    await loadDay(state.date);
    state.dateSwitching = false;
    // Demo/seed data disabled — the app's been in real use for a while now,
    // and the old seeded candidate names were polluting the "handled before"
    // cross-date scan with stale test data instead of real history.
    // await maybeSeedMaster(); await maybeSeedAug11(); await maybeSeedAug12(); await maybeSeedAug13();
    render();
  };
  const searchBox = document.getElementById('searchBox');
  if(searchBox) searchBox.oninput = (e)=>{ state.search = e.target.value; render(); };
  const clearSearchBtn = document.getElementById('clearSearch');
  if(clearSearchBtn) clearSearchBtn.onclick = ()=>{ state.search = ''; render(); };

  const backToCallsBtn = document.getElementById('backToCalls');
  if(backToCallsBtn) backToCallsBtn.onclick = ()=>{ closeAllPanels(); render(); };
  const toggleImportHubBtn = document.getElementById('toggleImportHub');
  if(toggleImportHubBtn) toggleImportHubBtn.onclick = ()=>{
    state.showImportMenu = !state.showImportMenu;
    state.showMoreMenu = false;
    state.showToolsMenu = false;
    render();
  };
  const importMenuNewCallsBtn = document.getElementById('importMenuNewCalls');
  if(importMenuNewCallsBtn) importMenuNewCallsBtn.onclick = ()=>{
    state.showImportMenu = false;
    state.importDefaultRound = state.view==='2nd' ? '2nd' : '1st';
    openOnlyPanel('showImport');
    render();
  };
  const importMenuRescheduleBtn = document.getElementById('importMenuReschedule');
  if(importMenuRescheduleBtn) importMenuRescheduleBtn.onclick = ()=>{
    state.showImportMenu = false;
    openOnlyPanel('showRescheduleImport');
    render();
  };
  // The mobile bottom-nav ＋ button's own dropdown (same two choices as the
  // header's "📥 Import" menu above) — the header Import button is hidden
  // on mobile (see the max-width:700px rule for #importHubWrap) now that
  // this covers the same two actions from the bottom nav instead.
  const navAddMenuNewCallBtn = document.getElementById('navAddMenuNewCall');
  if(navAddMenuNewCallBtn) navAddMenuNewCallBtn.onclick = ()=>{
    state.showNavAddMenu = false;
    hapticTap();
    addBlankCallRow();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const navAddMenuRescheduleBtn = document.getElementById('navAddMenuReschedule');
  if(navAddMenuRescheduleBtn) navAddMenuRescheduleBtn.onclick = ()=>{
    state.showNavAddMenu = false;
    hapticTap();
    openOnlyPanel('showRescheduleImport');
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // Same action as the toolbar's "📥 Import" button, reachable straight
  // from the empty-state message on a day with no calls yet.
  const emptyStateImportBtn = document.getElementById('emptyStateImportBtn');
  if(emptyStateImportBtn) emptyStateImportBtn.onclick = ()=>{
    state.importDefaultRound = state.view==='2nd' ? '2nd' : '1st';
    openOnlyPanel('showImport');
    render();
  };
  const emptyStateAddCallBtn = document.getElementById('emptyStateAddCallBtn');
  if(emptyStateAddCallBtn) emptyStateAddCallBtn.onclick = ()=>{ addBlankCallRow(); };
  const importHubTabNewBtn = document.getElementById('importHubTabNew');
  if(importHubTabNewBtn) importHubTabNewBtn.onclick = ()=>{ state.showImport = true; state.showRescheduleImport = false; render(); };
  const importHubTabRescheduleBtn = document.getElementById('importHubTabReschedule');
  if(importHubTabRescheduleBtn) importHubTabRescheduleBtn.onclick = ()=>{ state.showImport = false; state.showRescheduleImport = true; render(); };
  const importRound1stBtn = document.getElementById('importRound1st');
  if(importRound1stBtn) importRound1stBtn.onclick = ()=>{ state.importDefaultRound = '1st'; render(); };
  const importRound2ndBtn = document.getElementById('importRound2nd');
  if(importRound2ndBtn) importRound2ndBtn.onclick = ()=>{ state.importDefaultRound = '2nd'; render(); };
  const toggleRosterBtn = document.getElementById('toggleRoster');
  if(toggleRosterBtn) toggleRosterBtn.onclick = ()=>{ openOnlyPanel('showRoster'); render(); };
  const togglePortalSyncBtn = document.getElementById('togglePortalSync');
  if(togglePortalSyncBtn) togglePortalSyncBtn.onclick = ()=>{
    openOnlyPanel('showPortalSync');
    if(state.showPortalSync) startPortalSyncPolling();
    render();
  };
  const exportExcelBtn = document.getElementById('exportExcelBtn');
  if(exportExcelBtn) exportExcelBtn.onclick = ()=>{ state.showMoreMenu = false; exportDayToExcel(); render(); };
  const closePortalSyncBtn = document.getElementById('closePortalSync');
  if(closePortalSyncBtn) closePortalSyncBtn.onclick = ()=>{ closeAllPanels(); render(); };
  const syncPortalTodayBtn = document.getElementById('syncPortalToday');
  if(syncPortalTodayBtn) syncPortalTodayBtn.onclick = ()=>{ state.portalSyncFromCache = false; fetchPortalSync('today'); };
  const syncPortalFullBtn = document.getElementById('syncPortalFull');
  if(syncPortalFullBtn) syncPortalFullBtn.onclick = ()=>{ state.portalSyncFromCache = false; fetchPortalSync('full'); };
  const toggleIncentivesBtn = document.getElementById('toggleIncentives');
  if(toggleIncentivesBtn) toggleIncentivesBtn.onclick = ()=>{
    openOnlyPanel('showIncentives');
    // Opening the panel shows whatever was last saved (instant) instead of
    // forcing a live Portal pull — see loadIncentivesCache() for why.
    if(state.showIncentives && !state.incentivesData){ loadIncentivesCache(state.incentivesMonth || currentMonthKey()); }
    render();
  };
  const closeIncentivesBtn = document.getElementById('closeIncentives');
  if(closeIncentivesBtn) closeIncentivesBtn.onclick = ()=>{ closeAllPanels(); render(); };
  const incentivesPrevBtn = document.getElementById('incentivesPrevMonth');
  if(incentivesPrevBtn) incentivesPrevBtn.onclick = ()=>{ loadIncentivesCache(shiftMonthKey(state.incentivesMonth || currentMonthKey(), -1)); };
  const incentivesNextBtn = document.getElementById('incentivesNextMonth');
  if(incentivesNextBtn) incentivesNextBtn.onclick = ()=>{ loadIncentivesCache(shiftMonthKey(state.incentivesMonth || currentMonthKey(), 1)); };
  const refreshIncentivesBtn = document.getElementById('refreshIncentives');
  if(refreshIncentivesBtn) refreshIncentivesBtn.onclick = ()=>{ fetchIncentivesMonth(state.incentivesMonth || currentMonthKey()); };
  const exportIncentivesExcelBtn = document.getElementById('exportIncentivesExcelBtn');
  if(exportIncentivesExcelBtn) exportIncentivesExcelBtn.onclick = exportIncentivesToExcel;

  // Incentives → per-record breakdown + push to Closures (2026-09-28).
  document.querySelectorAll('[data-incentive-expand]').forEach(btn=>{
    btn.onclick = ()=>{
      const handler = btn.dataset.incentiveExpand;
      state.incentivesExpandedHandler = (state.incentivesExpandedHandler === handler) ? null : handler;
      render();
    };
  });
  document.querySelectorAll('[data-incentive-add-closure]').forEach(btn=>{
    btn.onclick = async ()=>{
      const candidate = btn.dataset.incentiveAddClosure;
      const company = btn.dataset.incentiveAddCompany || '';
      const key = candidate.trim().toLowerCase() + '|' + normalizeCompanyKey(company);
      state.incentiveAddingClosureKey = key;
      render();
      try{
        await saveNewClosures([{ candidate, company, salary: '', raw: '' }]);
        // Same staleness fix as everywhere else a closure gets saved —
        // otherwise it wouldn't show up in By Handler until something else
        // happened to trigger a re-scan.
        if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(true);
      }catch(e){
        alert('Failed to save: ' + (e && e.message ? e.message : 'could not reach the server'));
      }
      state.incentiveAddingClosureKey = null;
      render();
    };
  });
  const exportClosuresExcelBtn = document.getElementById('exportClosuresExcelBtn');
  if(exportClosuresExcelBtn) exportClosuresExcelBtn.onclick = exportClosuresToExcel;

  // Company aliases (2026-09-27) — see renderCompanyAliasesHtml() above.
  const addCompanyAliasBtn = document.getElementById('addCompanyAliasBtn');
  if(addCompanyAliasBtn) addCompanyAliasBtn.onclick = async ()=>{
    const inputA = document.getElementById('companyAliasInputA');
    const inputB = document.getElementById('companyAliasInputB');
    const a = (inputA && inputA.value || '').trim();
    const b = (inputB && inputB.value || '').trim();
    if(!a || !b){ state.companyAliasError = 'Enter both company names.'; render(); return; }
    if(normalizeCompanyKey(a) === normalizeCompanyKey(b)){ state.companyAliasError = 'Those are already the same spelling.'; render(); return; }
    state.companyAliasError = null;
    try{
      await saveCompanyAliasPair(a, b);
      // Company matching just changed, so re-run the By Handler computation
      // if it's the current view, same as after a manual match is saved.
      if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(false);
    }catch(e){
      state.companyAliasError = (e && e.message) ? e.message : 'Could not save this alias — try again.';
    }
    render();
  };
  document.querySelectorAll('[data-remove-company-alias]').forEach(btn=>{
    btn.onclick = async ()=>{
      const idx = Number(btn.dataset.removeCompanyAlias);
      try{
        await removeCompanyAliasPair(idx);
        if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(false);
      }catch(e){
        state.companyAliasError = (e && e.message) ? e.message : 'Could not remove this alias — try again.';
      }
      render();
    };
  });
  // "🔗 Same company?" quick-alias buttons — see renderUnmatchedClosuresHtml()
  // above. One click saves the closure's own company text and the
  // candidate's on-file company as a confirmed alias, same effect as
  // filling in the Company Aliases form by hand.
  document.querySelectorAll('[data-quick-alias-closure]').forEach(btn=>{
    btn.onclick = async ()=>{
      const closureId = Number(btn.dataset.quickAliasClosure);
      const detail = (state.closuresPerformance && state.closuresPerformance.unmatchedDetails || []).find(d=>d.closure.id === closureId);
      if(!detail) return;
      state.companyAliasError = null;
      try{
        await saveCompanyAliasPair(detail.closure.company, btn.dataset.quickAliasCompany);
        state.closuresPerformance = await computeClosuresPerformance(false);
      }catch(e){
        state.companyAliasError = (e && e.message) ? e.message : 'Could not save this alias — try again.';
      }
      render();
    };
  });

  // Delete a closure (admin-only, requested 2026-09-28) — "add delete
  // option in closures area". A native confirm() guards it since this is a
  // rare, deliberate, hard-to-undo action (see the backend comment on
  // handleClosures for why closures are normally append-only). Removes it
  // from state locally on success rather than re-fetching the whole list,
  // and force-refreshes closuresPerformance if the By Handler view has
  // already computed it, so a deleted closure's credit disappears from
  // that view immediately instead of lingering until the next scan.
  document.querySelectorAll('[data-delete-closure]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = Number(btn.dataset.deleteClosure);
      const candidate = btn.dataset.deleteClosureCandidate || 'this closure';
      if(!confirm(`Delete the closure for "${candidate}"? This is for a mistaken entry (wrong name, duplicate paste-in) — a real placement shouldn't normally be deleted. This can't be undone.`)) return;
      state.closureDeletingId = id;
      state.closureDeleteError = null;
      render();
      try{
        await apiCall('closures', {method:'POST', body:{action:'delete', id}});
        state.closures = (state.closures||[]).filter(c=>c.id !== id);
        if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(true);
      }catch(e){
        state.closureDeleteError = (e && e.message) ? `Could not delete this closure: ${e.message}` : 'Could not delete this closure — try again.';
      }
      state.closureDeletingId = null;
      render();
    };
  });

  // Expected Closures panel actions (added 2026-10-01) — delete, log a
  // follow-up, or confirm/promote into the real Closures log. Same
  // native-confirm()/prompt() pattern as the rest of this app uses for
  // rare, deliberate actions rather than a second custom panel each.
  document.querySelectorAll('[data-expectclosure-delete]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = Number(btn.dataset.expectclosureDelete);
      if(!confirm('Remove this flag? Use this when it didn’t pan out after all — this only removes the flag, it never touches a real closure.')) return;
      state.expectedClosureDeletingId = id;
      render();
      try{
        await deleteExpectedClosure(id);
      }catch(e){
        alert('Could not remove this flag: ' + (e && e.message ? e.message : 'try again.'));
      }
      state.expectedClosureDeletingId = null;
      render();
    };
  });
  document.querySelectorAll('[data-expectclosure-followup]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = Number(btn.dataset.expectclosureFollowup);
      const note = prompt('Quick follow-up note — what did the candidate/POC say when you checked in? (Leave blank to just mark that you checked.)');
      if(note === null) return; // cancelled
      state.expectedClosureFollowupId = id;
      render();
      try{
        await logExpectedClosureFollowup(id, note);
      }catch(e){
        alert('Could not log that follow-up: ' + (e && e.message ? e.message : 'try again.'));
      }
      state.expectedClosureFollowupId = null;
      render();
    };
  });
  document.querySelectorAll('[data-expectclosure-confirm]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = Number(btn.dataset.expectclosureConfirm);
      const row = (state.expectedClosures||[]).find(c=>c.id===id);
      if(!row) return;
      if(!confirm(`Record "${row.candidate}" at ${row.company} as a real closure now? This adds it to the Closures log and removes this flag.`)) return;
      const salary = prompt('Salary / package (optional — leave blank if not known yet):', '') || '';
      state.expectedClosureConfirmingId = id;
      render();
      try{
        await confirmExpectedClosure(row, salary);
      }catch(e){
        alert('Could not record this as a closure: ' + (e && e.message ? e.message : 'try again.'));
      }
      state.expectedClosureConfirmingId = null;
      render();
    };
  });

  // "📡 Apply <name> as Driving Person" — see renderNoAssigneeClosuresHtml()
  // above for the "some calls gets after first round only" report this
  // answers. The call this closure matched is very likely on a PAST date,
  // not today's board, so this saves straight to that date rather than
  // requiring a navigate-there-first.
  //
  // IMPORTANT: the driving_person endpoint is a full-replace-for-the-date
  // write (same delete-then-insert pattern as call_status/notes/roster) —
  // it expects the COMPLETE current set of Driving Person values for that
  // date, not just the one changed row. Sending only this one row would
  // silently WIPE OUT every other Driving Person already saved for that
  // date. So this always fetches that date's full row set first (or reuses
  // state.rows when it happens to be today's own date already loaded) and
  // sends the complete payload back with just this one row's value changed.
  document.querySelectorAll('[data-apply-portal-driving]').forEach(btn=>{
    btn.onclick = async ()=>{
      const closureId = Number(btn.dataset.applyPortalDriving);
      const name = btn.dataset.applyPortalName;
      const date = btn.dataset.applyPortalDate;
      const callId = btn.dataset.applyPortalCallid;
      if(!name || !date || !callId) return;
      state.noAssigneeApplyingId = closureId;
      state.noAssigneeApplyError = null;
      render();
      try{
        let dateRows;
        if(date === state.date){
          dateRows = state.rows || [];
        } else {
          const data = await apiCall('calls', {qs:'date='+encodeURIComponent(date)});
          dateRows = data.rows || [];
        }
        const payload = dateRows.map(r=>({
          callId: r.id,
          drivingPerson: String(r.id) === String(callId) ? name : (r.drivingPerson || ''),
        }));
        await apiCall('driving_person', {method:'POST', body:{date, rows: payload}});
        if(date === state.date){
          const localRow = (state.rows||[]).find(r=>String(r.id)===String(callId));
          if(localRow) localRow.drivingPerson = name;
        }
        state.closuresPerformance = await computeClosuresPerformance(true);
      }catch(e){
        state.noAssigneeApplyError = (e && e.message) ? `Could not apply this: ${e.message}` : 'Could not apply this — try again.';
      }
      state.noAssigneeApplyingId = null;
      render();
    };
  });

  // "🔄 Backfill Driving Person" (added 2026-09-29) — see
  // computeDrivingPersonBackfillPlan() for the full reasoning. Auto-applies
  // every safe (1st Round) match immediately, in one batched save across
  // however many dates are involved, then leaves any advanced-round matches
  // as individually-confirmable suggestions rather than applying those too.
  const runDrivingPersonBackfillBtn = document.getElementById('runDrivingPersonBackfillBtn');
  if(runDrivingPersonBackfillBtn) runDrivingPersonBackfillBtn.onclick = async ()=>{
    state.drivingPersonBackfillRunning = true;
    state.drivingPersonBackfillError = null;
    state.drivingPersonBackfillResult = null;
    render();
    try{
      const plan = await computeDrivingPersonBackfillPlan(true);
      if(plan.needsSync){
        state.drivingPersonBackfillResult = { needsSync: true };
      } else {
        if(plan.autoFill.length) await saveDrivingPersonBatchAcrossDates(plan.autoFill);
        state.drivingPersonBackfillResult = { needsSync: false, appliedCount: plan.autoFill.length, needsConfirm: plan.needsConfirm };
        if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(true);
      }
    }catch(e){
      state.drivingPersonBackfillError = (e && e.message) ? `Backfill failed: ${e.message}` : 'Backfill failed — try again.';
    }
    state.drivingPersonBackfillRunning = false;
    render();
  };
  // Confirming one advanced-round suggestion from the backfill result list.
  document.querySelectorAll('[data-backfill-confirm-date]').forEach(btn=>{
    btn.onclick = async ()=>{
      const date = btn.dataset.backfillConfirmDate;
      const callId = btn.dataset.backfillConfirmCallid;
      const name = btn.dataset.backfillConfirmName;
      if(!date || !callId || !name) return;
      const key = date + '|' + callId;
      state.drivingPersonBackfillApplyingKey = key;
      render();
      try{
        await saveDrivingPersonBatchAcrossDates([{ row: { id: callId, _date: date }, handler: name }]);
        if(state.drivingPersonBackfillResult && state.drivingPersonBackfillResult.needsConfirm){
          state.drivingPersonBackfillResult.needsConfirm = state.drivingPersonBackfillResult.needsConfirm.filter(e => !(e.row._date===date && String(e.row.id)===String(callId)));
        }
        if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(true);
      }catch(e){
        state.drivingPersonBackfillError = (e && e.message) ? `Could not apply this: ${e.message}` : 'Could not apply this — try again.';
      }
      state.drivingPersonBackfillApplyingKey = null;
      render();
    };
  });

  // Monthly goal tracking (2026-09-25) — the ₹ target on Incentives and
  // the count target on Closures share the same edit/save/cancel pattern.
  const editIncentiveTargetBtn = document.getElementById('editIncentiveTargetBtn');
  if(editIncentiveTargetBtn) editIncentiveTargetBtn.onclick = ()=>{ state.editingIncentiveTarget = true; state.incentiveTargetError = null; render(); };
  const cancelIncentiveTargetBtn = document.getElementById('cancelIncentiveTargetBtn');
  if(cancelIncentiveTargetBtn) cancelIncentiveTargetBtn.onclick = ()=>{ state.editingIncentiveTarget = false; state.incentiveTargetError = null; render(); };
  const saveIncentiveTargetBtn = document.getElementById('saveIncentiveTargetBtn');
  if(saveIncentiveTargetBtn) saveIncentiveTargetBtn.onclick = async ()=>{
    const input = document.getElementById('incentiveTargetInput');
    const val = input ? Number(input.value) : NaN;
    if(!input || isNaN(val) || val < 0){ state.incentiveTargetError = 'Enter a valid non-negative number.'; render(); return; }
    try{
      await saveAppSetting('incentive_monthly_target', val);
      state.editingIncentiveTarget = false;
      state.incentiveTargetError = null;
    }catch(e){
      state.incentiveTargetError = (e && e.message) ? e.message : 'Could not save the target — try again.';
    }
    render();
  };
  const editClosuresTargetBtn = document.getElementById('editClosuresTargetBtn');
  if(editClosuresTargetBtn) editClosuresTargetBtn.onclick = ()=>{ state.editingClosuresTarget = true; state.closuresTargetError = null; render(); };
  const cancelClosuresTargetBtn = document.getElementById('cancelClosuresTargetBtn');
  if(cancelClosuresTargetBtn) cancelClosuresTargetBtn.onclick = ()=>{ state.editingClosuresTarget = false; state.closuresTargetError = null; render(); };
  const saveClosuresTargetBtn = document.getElementById('saveClosuresTargetBtn');
  if(saveClosuresTargetBtn) saveClosuresTargetBtn.onclick = async ()=>{
    const input = document.getElementById('closuresTargetInput');
    const val = input ? Number(input.value) : NaN;
    if(!input || isNaN(val) || val < 0){ state.closuresTargetError = 'Enter a valid non-negative number.'; render(); return; }
    try{
      await saveAppSetting('closures_monthly_target', val);
      state.editingClosuresTarget = false;
      state.closuresTargetError = null;
    }catch(e){
      state.closuresTargetError = (e && e.message) ? e.message : 'Could not save the target — try again.';
    }
    render();
  };
  const toggleBackupsBtn = document.getElementById('toggleBackups');
  if(toggleBackupsBtn) toggleBackupsBtn.onclick = async ()=>{
    openOnlyPanel('showBackups');
    render();
    if(state.showBackups){
      state.backupsLoading = true; render();
      state.backupsList = await loadBackupsList(state.date);
      state.backupsLoading = false; render();
    }
  };
  document.querySelectorAll('[data-restore-backup]').forEach(btn=>{
    btn.onclick = async ()=>{
      const id = btn.getAttribute('data-restore-backup');
      const backup = state.backupsList.find(b=>String(b.id)===String(id));
      const label = backup ? new Date(backup.created_at).toLocaleString() : 'this backup';
      if(!confirm(`Restore the ${state.rows.length}-call state from ${label}? Your CURRENT calls will be backed up first, so this can be undone too if needed.`)) return;
      try{
        await createBackup('pre-restore', state.date, state.rows);
        const restored = await restoreBackup(id);
        state.rows = restored.rows;
        markDirty();
        closeAllPanels();
        render();
        await saveAllChanges();
        alert(`Restored ${restored.rows.length} call(s) from the backup taken ${new Date(restored.createdAt).toLocaleString()}.`);
      }catch(e){
        alert('Restore failed: ' + e.message);
      }
    };
  });
  const addRowBtn = document.getElementById('addRow');
  if(addRowBtn) addRowBtn.onclick = ()=>{
    addBlankCallRow();
  };
  const clearAllBtn = document.getElementById('clearAll');
  if(clearAllBtn) clearAllBtn.onclick = ()=>{
    if(!state.rows.length) return;
    state.showMoreMenu = false;
    state.clearAllReview = state.rows.map(r=>({ id:r.id, candidate:r.candidate||'', company:r.company||'', time:r.time||'', round:r.round||'', assignee:r.assignee||'' }));
    render();
  };
  const cancelClearAllReview = document.getElementById('cancelClearAllReview');
  if(cancelClearAllReview) cancelClearAllReview.onclick = ()=>{ state.clearAllReview = null; render(); };
  const confirmClearAll = document.getElementById('confirmClearAll');
  if(confirmClearAll) confirmClearAll.onclick = async ()=>{
    if(!state.clearAllReview || !state.clearAllReview.length) return;
    state.clearAllRemoving = true;
    render();
    await createBackup('pre-clear-all', state.date, state.rows);
    const clearedCount = state.rows.length;
    state.rows = [];
    markDirty();
    await saveAllChanges();
    state.clearAllRemoving = false;
    if(state.saveError){
      state.clearAllReview = null;
      render();
      alert(`Cleared ${clearedCount} call(s) locally, but saving failed: ${state.saveError}. Try "Save changes" again — until then this isn't saved to the database yet.`);
    } else {
      state.clearAllReview = null;
      render();
      alert(`Cleared all ${clearedCount} call(s) for ${state.date} and saved.\nA backup was taken first — use 🕐 Backups to restore it if needed.`);
    }
  };
  const finalizeBtn = document.getElementById('finalizeBtn');
  if(finalizeBtn) finalizeBtn.onclick = async ()=>{
    await createBackup('pre-finalize', state.date, state.rows);
    markDirty();
    state.finalized = true;
    render();
  };
  const reopenBtn = document.getElementById('reopenBtn');
  if(reopenBtn) reopenBtn.onclick = ()=>{
    markDirty();
    state.finalized = false;
    render();
  };
  const downloadBtn = document.getElementById('downloadTxt');
  if(downloadBtn) downloadBtn.onclick = ()=>{
    const text = buildTeamGroupedExportText(state.rows);
    const blob = new Blob([text], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    // Mark every current row as "already exported" — the next time this
    // button is used, anything added since now counts as new. Set dirty
    // directly (not markDirty()) since that also un-finalizes the day, which
    // would hide these very buttons right after clicking them.
    state.exportedIds = state.rows.map(r=>r.id);
    state.dirty = true;
    render();
  };
  const downloadNewBtn = document.getElementById('downloadNewTxt');
  if(downloadNewBtn) downloadNewBtn.onclick = ()=>{
    const newRows = state.rows.filter(r => !state.exportedIds.includes(r.id));
    const text = buildTeamGroupedExportText(newRows);
    const blob = new Blob([text], {type:'text/plain'});
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
    state.exportedIds = state.rows.map(r=>r.id);
    state.dirty = true;
    render();
  };
  document.querySelectorAll('.filter-chip[data-f]').forEach(btn=>{
    btn.onclick = ()=>{ state.filter = btn.dataset.f; render(); };
  });
  const togglePrioritySortBtn = document.getElementById('togglePrioritySort');
  if(togglePrioritySortBtn) togglePrioritySortBtn.onclick = ()=>{ state.prioritySort = !state.prioritySort; render(); };
  // The stat cards above (.summary .cell[data-f]) now do the same thing as
  // the filter-chip buttons — deliberately the SAME handler shape, not a
  // second copy of the filtering logic, so tapping either one behaves
  // identically.
  document.querySelectorAll('.summary .cell[data-f]').forEach(cell=>{
    cell.onclick = ()=>{ state.filter = cell.dataset.f; hapticTap(12); render(); };
  });
  document.querySelectorAll('.team-load-cell').forEach(cell=>{
    cell.onclick = ()=>{
      const team = cell.dataset.team;
      state.teamFilter = (state.teamFilter === team) ? null : team; // click again to clear
      render();
    };
  });
  const clearTeamFilterBtn = document.getElementById('clearTeamFilterBtn');
  if(clearTeamFilterBtn) clearTeamFilterBtn.onclick = (e)=>{ e.stopPropagation(); state.teamFilter = null; render(); };
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.onclick = ()=>{ state.view = btn.dataset.view; state.filter = 'all'; state.selectedIds.clear(); render(); };
  });

  const toggleNotif = document.getElementById('toggleNotifications');
  if(toggleNotif) toggleNotif.onclick = ()=>{ openOnlyPanel('showNotifications'); render(); };
  // FIX (2026-09-29, part 3): "more smoothness issues" sweep — these six
  // Notifications scan buttons changed their own label to "Scanning…" while
  // their fetch was in flight, but never actually disabled themselves, so a
  // fast double-click (or an impatient second click after nothing visibly
  // happened for a moment) fired the same scan twice concurrently. Not a
  // correctness bug (both calls resolve to the same result and the second
  // render just overwrites the first), but a real wasted round-trip and a
  // pattern the app already gets right elsewhere (see `state.closureApplying`
  // driving `disabled` on the Closures confirm button) — just not applied
  // here. `btn.disabled = true` on the live DOM node is enough: the next
  // render() rebuilds this button fresh (without `disabled`) once the scan
  // resolves, so nothing needs to reset it back.
  const runScanBtn = document.getElementById('runNotifScan');
  if(runScanBtn) runScanBtn.onclick = async ()=>{
    if(runScanBtn.disabled) return;
    runScanBtn.disabled = true;
    runScanBtn.textContent = 'Scanning…';
    state.notifications = await scanForRepeatCandidates(true);
    state.hideAllNotifCandidates = false;
    render();
  };
  const runScanClientsBtn = document.getElementById('runNotifScanClients');
  if(runScanClientsBtn) runScanClientsBtn.onclick = async ()=>{
    if(runScanClientsBtn.disabled) return;
    runScanClientsBtn.disabled = true;
    runScanClientsBtn.textContent = 'Scanning…';
    state.repeatClientsAdvanced = await scanRepeatClientsAdvancedRounds(true);
    state.hideAllNotifClients = false;
    render();
  };
  const hideAllCandidatesBtn = document.getElementById('hideAllCandidates');
  if(hideAllCandidatesBtn) hideAllCandidatesBtn.onclick = ()=>{ state.hideAllNotifCandidates = true; render(); };
  const unhideAllCandidatesBtn = document.getElementById('unhideAllCandidates');
  if(unhideAllCandidatesBtn) unhideAllCandidatesBtn.onclick = ()=>{ state.hideAllNotifCandidates = false; render(); };
  const hideAllClientsBtn = document.getElementById('hideAllClients');
  if(hideAllClientsBtn) hideAllClientsBtn.onclick = ()=>{ state.hideAllNotifClients = true; render(); };
  const unhideAllClientsBtn = document.getElementById('unhideAllClients');
  if(unhideAllClientsBtn) unhideAllClientsBtn.onclick = ()=>{ state.hideAllNotifClients = false; render(); };
  const notifSearchCandidatesInput = document.getElementById('notifSearchCandidates');
  if(notifSearchCandidatesInput) notifSearchCandidatesInput.addEventListener('input', ()=>{
    state.notifSearchCandidates = notifSearchCandidatesInput.value;
    render();
  });
  const notifSearchClientsInput = document.getElementById('notifSearchClients');
  if(notifSearchClientsInput) notifSearchClientsInput.addEventListener('input', ()=>{
    state.notifSearchClients = notifSearchClientsInput.value;
    render();
  });
  const runAllReschedBtn = document.getElementById('runAllReschedScan');
  if(runAllReschedBtn) runAllReschedBtn.onclick = async ()=>{
    if(runAllReschedBtn.disabled) return;
    runAllReschedBtn.disabled = true;
    runAllReschedBtn.textContent = 'Scanning…';
    state.allReschedulesData = await scanAllReschedules(true);
    state.hideAllNotifAllResched = false;
    render();
  };
  const runAbsencePatternBtn = document.getElementById('runAbsencePatternScan');
  if(runAbsencePatternBtn) runAbsencePatternBtn.onclick = async ()=>{
    if(runAbsencePatternBtn.disabled) return;
    runAbsencePatternBtn.disabled = true;
    runAbsencePatternBtn.textContent = 'Scanning…';
    state.absencePatterns = await scanAbsencePatterns();
    render();
  };
  const runReliabilityBtn = document.getElementById('runReliabilityScan');
  if(runReliabilityBtn) runReliabilityBtn.onclick = async ()=>{
    if(runReliabilityBtn.disabled) return;
    runReliabilityBtn.disabled = true;
    runReliabilityBtn.textContent = 'Scanning…';
    state.clientReliabilityData = await scanClientReliability(true);
    state.hideAllNotifReliability = false;
    render();
  };
  const hideAllReliabilityBtn = document.getElementById('hideAllReliability');
  if(hideAllReliabilityBtn) hideAllReliabilityBtn.onclick = ()=>{ state.hideAllNotifReliability = true; render(); };
  const unhideAllReliabilityBtn = document.getElementById('unhideAllReliability');
  if(unhideAllReliabilityBtn) unhideAllReliabilityBtn.onclick = ()=>{ state.hideAllNotifReliability = false; render(); };
  const notifSearchReliabilityInput = document.getElementById('notifSearchReliability');
  if(notifSearchReliabilityInput) notifSearchReliabilityInput.addEventListener('input', ()=>{
    state.notifSearchReliability = notifSearchReliabilityInput.value;
    render();
  });
  const runTrendsBtn = document.getElementById('runTrendsScan');
  if(runTrendsBtn) runTrendsBtn.onclick = async ()=>{
    if(runTrendsBtn.disabled) return;
    runTrendsBtn.disabled = true;
    runTrendsBtn.textContent = 'Scanning…';
    state.trendsData = await scanCallTrends(true);
    state.predictiveCapacityWarnings = computePredictiveCapacityWarnings(state.trendsData);
    render();
  };
  const hideAllReschedBtn = document.getElementById('hideAllResched');
  if(hideAllReschedBtn) hideAllReschedBtn.onclick = ()=>{ state.hideAllNotifAllResched = true; render(); };
  const unhideAllReschedBtn = document.getElementById('unhideAllResched');
  if(unhideAllReschedBtn) unhideAllReschedBtn.onclick = ()=>{ state.hideAllNotifAllResched = false; render(); };
  const notifSearchAllReschedInput = document.getElementById('notifSearchAllResched');
  if(notifSearchAllReschedInput) notifSearchAllReschedInput.addEventListener('input', ()=>{
    state.notifSearchAllResched = notifSearchAllReschedInput.value;
    render();
  });
  document.querySelectorAll('.notif-tab-btn').forEach(btn=>{
    btn.onclick = async ()=>{
      if(btn.dataset.notiftab){
        state.notifTab = btn.dataset.notiftab;
        render();
        return;
      }
      if(btn.dataset.closuresview){
        state.closuresView = btn.dataset.closuresview;
        // Summary (added 2026-09-29) is built entirely from the same
        // by-handler cross-reference data as the By Handler tab — no
        // separate scan needed, just a different grouping of the same
        // result — so it triggers the identical on-demand load.
        if((btn.dataset.closuresview === 'byHandler' || btn.dataset.closuresview === 'summary') && !state.closuresPerformance){
          state.closuresPerformance = { loading: true, rows: [] };
          render();
          try{
            state.closuresPerformance = await computeClosuresPerformance(false);
          }catch(e){
            state.closuresPerformance = { loading: false, rows: [], error: e && e.message ? e.message : 'Could not compute.' };
          }
        }
        render();
      }
    };
  });
  document.querySelectorAll('[data-closuressummaryperiod]').forEach(btn=>{
    btn.onclick = ()=>{
      state.closuresSummaryPeriod = btn.dataset.closuressummaryperiod;
      render();
    };
  });
  // Closures → All Closures list, month-at-a-time nav (2026-10-01): defaults
  // to the current month instead of stacking every month on one page.
  const closuresListPrevBtn = document.getElementById('closuresListPrevMonth');
  if(closuresListPrevBtn) closuresListPrevBtn.onclick = ()=>{ state.closuresListMonth = shiftMonthKey(state.closuresListMonth || currentMonthKey(), -1); render(); };
  const closuresListNextBtn = document.getElementById('closuresListNextMonth');
  if(closuresListNextBtn) closuresListNextBtn.onclick = ()=>{ state.closuresListMonth = shiftMonthKey(state.closuresListMonth || currentMonthKey(), 1); render(); };
  const closuresListToggleAllBtn = document.getElementById('closuresListToggleAll');
  if(closuresListToggleAllBtn) closuresListToggleAllBtn.onclick = ()=>{ state.closuresListShowAll = !state.closuresListShowAll; render(); };
  // Candidate Activity month nav (2026-10-02) — same prev/next/toggle-all
  // pattern as the Closures List tab above. Narrowing to one month also
  // turns off "show all" automatically (mirrors clicking ◀/▶ meaning "I
  // want to look at a specific month now").
  const candidateActivityPrevBtn = document.getElementById('candidateActivityPrevMonth');
  if(candidateActivityPrevBtn) candidateActivityPrevBtn.onclick = ()=>{ state.candidateActivityMonth = shiftMonthKey(state.candidateActivityMonth || currentMonthKey(), -1); state.candidateActivityShowAll = false; render(); };
  const candidateActivityNextBtn = document.getElementById('candidateActivityNextMonth');
  if(candidateActivityNextBtn) candidateActivityNextBtn.onclick = ()=>{ state.candidateActivityMonth = shiftMonthKey(state.candidateActivityMonth || currentMonthKey(), 1); state.candidateActivityShowAll = false; render(); };
  const candidateActivityToggleAllBtn = document.getElementById('candidateActivityToggleAll');
  if(candidateActivityToggleAllBtn) candidateActivityToggleAllBtn.onclick = ()=>{ state.candidateActivityShowAll = !state.candidateActivityShowAll; render(); };
  const candidateActivityStaleOnlyBtn = document.getElementById('candidateActivityStaleOnlyToggle');
  if(candidateActivityStaleOnlyBtn) candidateActivityStaleOnlyBtn.onclick = ()=>{ state.candidateActivityStaleOnly = !state.candidateActivityStaleOnly; render(); };

  // Manual closure↔call matching (the "🔗 Match manually" picker on
  // unmatched closures in the By Handler view — see
  // renderUnmatchedClosuresHtml()/findClosureMatchSuggestions()).
  document.querySelectorAll('[data-open-closure-match]').forEach(btn=>{
    btn.onclick = async ()=>{
      state.closureManualMatchPickerId = Number(btn.dataset.openClosureMatch);
      state.closureMatchError = null;
      state.closureMatchSearch = '';
      // FIX (2026-09-28): "closure matching manually that particular name
      // and record is not coming" / "...still it is not loading" — real
      // root cause found: state.closuresPerformance (which the search box
      // reads via allRowsSnapshot, and which unmatchedDetails itself comes
      // from) is computed once per session — on first opening the By
      // Handler tab, or a Data Health scan — and NOTHING refreshes it
      // automatically after that. A call imported to today's board, an
      // assignee filled in, or a new closure pasted in later the same
      // session all left it silently stale — the exact "record I can
      // clearly see on the board isn't showing up in the picker" shape
      // being reported. Opening a "Match manually" picker is precisely the
      // moment freshness matters most, so it now force-refreshes the whole
      // thing right here (fresh cross-date fetch, not the cached one)
      // before the person even starts typing.
      state.closureMatchRefreshing = true;
      render();
      try{
        state.closuresPerformance = await computeClosuresPerformance(true);
      }catch(e){ /* keep whatever was already there — search still works, just as fresh as the last successful scan */ }
      state.closureMatchRefreshing = false;
      render();
    };
  });
  document.querySelectorAll('[data-cancel-closure-match]').forEach(btn=>{
    btn.onclick = ()=>{ state.closureManualMatchPickerId = null; state.closureMatchError = null; state.closureMatchSearch = ''; render(); };
  });
  // Search box inside the open picker — filters across every call record
  // on file (getClosureMatchCandidateList()), not just the pre-computed
  // shortlist. A full render() on every keystroke is the same pattern used
  // elsewhere in this file for live-filtering inputs (e.g. notifSearchAllResched).
  document.querySelectorAll('[data-closure-match-search]').forEach(input=>{
    input.oninput = ()=>{ state.closureMatchSearch = input.value; render(); };
  });
  document.querySelectorAll('[data-confirm-closure-match]').forEach(btn=>{
    btn.onclick = async ()=>{
      const closureId = Number(btn.dataset.confirmClosureMatch);
      const select = document.getElementById(`closureMatchSelect-${closureId}`);
      const { list } = getClosureMatchCandidateList(closureId);
      if(!select || !list.length) return;
      const chosen = list[Number(select.value)];
      if(!chosen) return;
      state.closureManualMatchSaving = true;
      render();
      try{
        await saveClosureManualMatch(closureId, chosen.candidate, chosen.company);
        state.closureManualMatchPickerId = null;
        state.closureMatchSearch = '';
        // Re-run the By Handler computation so this closure now counts.
        state.closuresPerformance = await computeClosuresPerformance(false);
      }catch(e){
        state.closureMatchError = (e && e.message) ? e.message : 'Could not save this match — try again.';
      }
      state.closureManualMatchSaving = false;
      render();
    };
  });

  const assigneeFilterSelect = document.getElementById('assigneeFilterSelect');
  if(assigneeFilterSelect) assigneeFilterSelect.onchange = ()=>{
    state.assigneeFilter = assigneeFilterSelect.value;
    render();
  };
  const clientFilterSelect = document.getElementById('clientFilterSelect');
  if(clientFilterSelect) clientFilterSelect.onchange = ()=>{
    state.clientFilter = clientFilterSelect.value;
    render();
  };
  const groupByCompanyBtn = document.getElementById('groupByCompanyBtn');
  if(groupByCompanyBtn) groupByCompanyBtn.onclick = ()=>{
    state.groupByCompany = !state.groupByCompany;
    render();
  };
  const myCallsBtn = document.getElementById('myCallsBtn');
  if(myCallsBtn) myCallsBtn.onclick = ()=>{
    let myName = getMyAssigneeName();
    if(!myName){
      const picked = prompt('Which name on the roster is you? Type it exactly as it appears (e.g. "Karthikeya").');
      if(!picked) return;
      myName = picked.trim();
      if(!myName) return;
      setMyAssigneeName(myName);
    }
    // Toggle: clicking again while already filtered to yourself clears it,
    // same as clicking an active filter-chip elsewhere in the app.
    if(namesEquivalent(state.assigneeFilter, myName)){
      state.assigneeFilter = '';
    } else {
      state.assigneeFilter = myName;
    }
    render();
  };
  const myCallsChangeBtn = document.getElementById('myCallsChangeBtn');
  if(myCallsChangeBtn) myCallsChangeBtn.onclick = (e)=>{
    e.stopPropagation();
    const current = getMyAssigneeName();
    const picked = prompt('Which name on the roster is you? Type it exactly as it appears.', current);
    if(picked === null) return; // cancelled
    const trimmed = picked.trim();
    setMyAssigneeName(trimmed);
    if(trimmed && namesEquivalent(state.assigneeFilter, current)){
      state.assigneeFilter = trimmed; // keep the filter pointed at the (possibly corrected) name
    }
    render();
  };
  const shiftNoteInput = document.getElementById('shiftNoteInput');
  if(shiftNoteInput) shiftNoteInput.addEventListener('input', ()=>{
    state.shiftNote = shiftNoteInput.value;
    markDirty();
    // Update just the Save button in place (no full render) so typing here
    // doesn't lose focus, but the "unsaved changes" indicator still updates live.
    const saveBtn = document.getElementById('saveAllBtn');
    if(saveBtn && !saveBtn.classList.contains('save-pending')){
      saveBtn.classList.add('save-pending');
      saveBtn.textContent = '💾 Save changes';
    }
  });
  const toggleMobileNoteBtn = document.getElementById('toggleMobileNote');
  if(toggleMobileNoteBtn) toggleMobileNoteBtn.onclick = (e)=>{
    e.preventDefault();
    state.mobileNoteExpanded = !state.mobileNoteExpanded;
    render();
  };
  const toggleMobileStripBtn = document.getElementById('toggleMobileStrip');
  if(toggleMobileStripBtn) toggleMobileStripBtn.onclick = (e)=>{
    e.preventDefault();
    state.mobileStripExpanded = !state.mobileStripExpanded;
    render();
  };
  const undoDeleteBtn = document.getElementById('undoDeleteBtn');
  if(undoDeleteBtn) undoDeleteBtn.onclick = ()=>{
    if(!state.lastDeleted) return;
    const { row, index } = state.lastDeleted;
    const insertAt = Math.min(index, state.rows.length);
    state.rows.splice(insertAt, 0, row);
    state.lastDeleted = null;
    clearTimeout(undoToastTimer);
    markDirty(); render();
  };
  const toggleMoreMenuBtn = document.getElementById('toggleMoreMenu');
  if(toggleMoreMenuBtn) toggleMoreMenuBtn.onclick = ()=>{
    state.showMoreMenu = !state.showMoreMenu;
    state.showToolsMenu = false;
    state.showImportMenu = false;
    render();
  };
  const toggleToolsMenuBtn = document.getElementById('toggleToolsMenu');
  if(toggleToolsMenuBtn) toggleToolsMenuBtn.onclick = ()=>{
    state.showToolsMenu = !state.showToolsMenu;
    state.showMoreMenu = false;
    state.showImportMenu = false;
    render();
  };
  // Closes whichever dropdown is open whenever an item inside it is
  // clicked — uses addEventListener (not .onclick) specifically so it
  // stacks alongside each item's own existing handler instead of
  // overwriting it. Tools and More share the same item class/styling, so
  // one handler closing both flags is simplest — only one is ever open
  // at a time anyway.
  document.querySelectorAll('.more-menu-item').forEach(item=>{
    item.addEventListener('click', ()=>{ state.showMoreMenu = false; state.showToolsMenu = false; });
  });
  // Backdrop behind the mobile bottom-sheet version of these same menus —
  // tapping the dimmed area outside the sheet closes it, same as tapping
  // outside a native app's action sheet would.
  document.querySelectorAll('.more-menu-backdrop').forEach(el=>{
    el.addEventListener('click', ()=>{
      const flag = el.dataset.closeMenu;
      if(flag) state[flag] = false;
      render();
    });
  });
  const retryLoadBtn = document.getElementById('retryLoadBtn');
  if(retryLoadBtn) retryLoadBtn.onclick = async ()=>{
    retryLoadBtn.disabled = true;
    retryLoadBtn.textContent = 'Retrying…';
    try{
      await loadRoster();
      await loadDay(state.date);
      await refreshRole();
      state.loadError = null;
    }catch(e){
      state.loadError = e && e.message ? e.message : 'Still unable to load — please refresh the page.';
    }
    render();
  };
  const portalSyncErrorRetryBtn = document.getElementById('portalSyncErrorRetryBtn');
  if(portalSyncErrorRetryBtn) portalSyncErrorRetryBtn.onclick = ()=>{
    fetchPortalSync(state.portalSyncMode || 'today');
  };
  const retryOfflineQueueBtn = document.getElementById('retryOfflineQueueBtn');
  if(retryOfflineQueueBtn) retryOfflineQueueBtn.onclick = ()=>{ retryOfflineQueue(); };
  const dismissPortalCacheWarningBtn = document.getElementById('dismissPortalCacheWarningBtn');
  if(dismissPortalCacheWarningBtn) dismissPortalCacheWarningBtn.onclick = ()=>{
    state.portalSyncCacheWarning = '';
    render();
  };
  const toggleThemeBtn = document.getElementById('toggleThemeBtn');
  if(toggleThemeBtn) toggleThemeBtn.onclick = ()=>{
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
    render();
  };
  const goHomeBtn = document.getElementById('goHomeBtn');
  if(goHomeBtn) goHomeBtn.onclick = async ()=>{
    if(state.dirty && CURRENT_ROLE==='admin'){
      await saveAllChanges();
    }
    state.showSummary = false;
    state.showDbSettings = false;
    state.showUsers = false;
    state.showImport = false;
    state.showRoster = false;
    state.showNotifications = false;
    state.filter = 'all';
    state.search = '';
    state.view = '1st';
    state.selectedIds.clear();
    render();
  };
  const toggleDbBtn = document.getElementById('toggleDbSettings');
  if(toggleDbBtn) toggleDbBtn.onclick = ()=>{ openOnlyPanel('showDbSettings'); render(); };
  const toggleSummaryBtn = document.getElementById('toggleSummary');
  if(toggleSummaryBtn) toggleSummaryBtn.onclick = ()=>{ openOnlyPanel('showSummary'); render(); };
  const copyDailySummaryBtn = document.getElementById('copyDailySummaryBtn');
  if(copyDailySummaryBtn) copyDailySummaryBtn.onclick = async ()=>{
    const text = buildDailySummaryText(state.date, state.rows);
    const toast = document.getElementById('summaryCopyToast');
    try{
      await navigator.clipboard.writeText(text);
      if(toast){ toast.textContent = 'Copied to clipboard.'; toast.style.display = 'block'; }
    }catch(e){
      if(toast){ toast.textContent = "Couldn't copy automatically — here it is to copy manually:\n\n" + text; toast.style.display = 'block'; toast.style.whiteSpace = 'pre-wrap'; }
    }
  };
  const copyWeeklySummaryBtn = document.getElementById('copyWeeklySummaryBtn');
  if(copyWeeklySummaryBtn) copyWeeklySummaryBtn.onclick = async ()=>{
    const toast = document.getElementById('summaryCopyToast');
    if(toast){ toast.textContent = 'Building weekly summary…'; toast.style.display = 'block'; }
    const text = await buildWeeklySummaryText(state.date);
    try{
      await navigator.clipboard.writeText(text);
      if(toast){ toast.textContent = 'Copied to clipboard.'; toast.style.display = 'block'; }
    }catch(e){
      if(toast){ toast.textContent = "Couldn't copy automatically — here it is to copy manually:\n\n" + text; toast.style.display = 'block'; toast.style.whiteSpace = 'pre-wrap'; }
    }
  };
  // WhatsApp's own official web/app share link (wa.me) — opens WhatsApp
  // with the message pre-filled in the compose box, exactly like tapping
  // "Share" from any other app. No account connection, no automation, no
  // ban risk — the person still picks the chat and taps Send themselves.
  const shareWhatsAppBtn = document.getElementById('shareWhatsAppBtn');
  if(shareWhatsAppBtn) shareWhatsAppBtn.onclick = ()=>{
    const text = buildDailySummaryText(state.date, state.rows);
    window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
  };
  const toggleAllDatesBtn = document.getElementById('toggleAllDates');
  if(toggleAllDatesBtn) toggleAllDatesBtn.onclick = ()=>{
    openOnlyPanel('showAllDates');
    render();
  };
  const loadAllDatesBtn = document.getElementById('loadAllDatesBtn');
  if(loadAllDatesBtn) loadAllDatesBtn.onclick = async ()=>{
    state.allDatesLoading = true;
    render();
    state.allDatesData = await loadAllDatesFlat();
    state.allDatesLoading = false;
    render();
  };
  const toggleStudentsMasterBtn = document.getElementById('toggleStudentsMaster');
  if(toggleStudentsMasterBtn) toggleStudentsMasterBtn.onclick = async ()=>{
    openOnlyPanel('showStudentsMaster');
    if(state.showStudentsMaster && !state.studentsMasterLoaded){
      state.studentsMasterLoading = true;
      render();
      await loadStudentsMaster();
      state.studentsMasterLoading = false;
    }
    render();
  };
  const toggleUniversalSearchBtn = document.getElementById('toggleUniversalSearch');
  if(toggleUniversalSearchBtn) toggleUniversalSearchBtn.onclick = ()=>{ openOnlyPanel('showUniversalSearch'); render(); };
  const openQuickJumpFromMenuBtn = document.getElementById('openQuickJumpFromMenu');
  if(openQuickJumpFromMenuBtn) openQuickJumpFromMenuBtn.onclick = ()=>{
    closeAllPanels();
    state.showQuickJump = true;
    render();
    const el = document.getElementById('quickJumpInput');
    if(el) el.focus();
  };
  const runUniversalSearchBtn = document.getElementById('runUniversalSearchBtn');
  if(runUniversalSearchBtn) runUniversalSearchBtn.onclick = async ()=>{
    const input = document.getElementById('universalSearchInput');
    await executeUniversalSearch(input ? input.value : '');
  };
  const universalSearchCompanyOnlyToggle = document.getElementById('universalSearchCompanyOnlyToggle');
  if(universalSearchCompanyOnlyToggle) universalSearchCompanyOnlyToggle.onchange = (e)=>{
    state.universalSearchCompanyOnly = e.target.checked;
    if(runUniversalSearchBtn && state.universalSearchQuery) runUniversalSearchBtn.click();
    else render();
  };
  const universalSearchInput = document.getElementById('universalSearchInput');
  if(universalSearchInput) universalSearchInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){ e.preventDefault(); document.getElementById('runUniversalSearchBtn').click(); }
  });
  document.querySelectorAll('[data-view-timeline]').forEach(btn=>{
    btn.onclick = ()=>{ openCandidateProfile(btn.dataset.viewTimeline); };
  });
  // "🏆 Closure" shortcuts on a search result row — jumps straight to that
  // candidate's Timeline with the quick-add closure form already open,
  // instead of opening the Timeline first and then hunting for the button.
  // Also closes the independent Quick Search overlay first, same reasoning
  // as [data-quicksearch-view-timeline] below — opening the Timeline panel
  // underneath doesn't automatically close that separate overlay.
  document.querySelectorAll('[data-view-timeline-closure]').forEach(btn=>{
    btn.onclick = ()=>{
      state.showQuickSearchModal = false;
      openCandidateProfile(btn.dataset.viewTimelineClosure, { openClosureForm: true, company: btn.dataset.company||'' });
    };
  });
  // ---------- Closure quick-add from Timeline (2026-09-28) ----------
  const closureQuickAddOpenBtn = document.getElementById('closureQuickAddOpen');
  if(closureQuickAddOpenBtn) closureQuickAddOpenBtn.onclick = ()=>{
    const data = state.candidateProfileData;
    const lastCall = (data && data.calls.length) ? data.calls[data.calls.length-1] : null;
    state.candidateProfileClosureForm = { company: (lastCall && lastCall.company) || '', salary: '' };
    render();
    const input = document.getElementById('closureQuickAddCompany');
    if(input) input.focus();
  };
  const closureQuickAddCancelBtn = document.getElementById('closureQuickAddCancel');
  if(closureQuickAddCancelBtn) closureQuickAddCancelBtn.onclick = ()=>{
    state.candidateProfileClosureForm = null;
    render();
  };
  const closureQuickAddCompanyInput = document.getElementById('closureQuickAddCompany');
  if(closureQuickAddCompanyInput) closureQuickAddCompanyInput.oninput = ()=>{
    if(state.candidateProfileClosureForm) state.candidateProfileClosureForm.company = closureQuickAddCompanyInput.value;
  };
  const closureQuickAddSalaryInput = document.getElementById('closureQuickAddSalary');
  if(closureQuickAddSalaryInput) closureQuickAddSalaryInput.oninput = ()=>{
    if(state.candidateProfileClosureForm) state.candidateProfileClosureForm.salary = closureQuickAddSalaryInput.value;
  };
  const closureQuickAddSaveBtn = document.getElementById('closureQuickAddSave');
  if(closureQuickAddSaveBtn) closureQuickAddSaveBtn.onclick = async ()=>{
    const form = state.candidateProfileClosureForm;
    if(!form) return;
    const company = (form.company||'').trim();
    if(!company){
      alert('A company is needed to record the closure.');
      return;
    }
    state.candidateProfileClosureSaving = true;
    render();
    try{
      await saveNewClosures([{ candidate: state.candidateProfileName, company, salary: form.salary||'', raw: '' }]);
      // Re-pull the timeline so the newly saved closure shows up in the
      // merged event list immediately, same as any other cross-date refresh.
      state.candidateProfileData = await computeCandidateProfile(state.candidateProfileName, true);
      // Same staleness fix as the paste-in import and the manual-match
      // picker (2026-09-28) — otherwise a closure saved from here would be
      // invisible in the Closures panel's By Handler view until something
      // else happened to trigger a re-scan.
      if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(true);
      state.candidateProfileClosureForm = null;
      state.candidateProfileClosureSaving = false;
      render();
    }catch(e){
      state.candidateProfileClosureSaving = false;
      render();
      alert('Failed to save: ' + (e && e.message ? e.message : 'could not reach the server'));
    }
  };
  const toggleCompanyScorecardBtn = document.getElementById('toggleCompanyScorecard');
  if(toggleCompanyScorecardBtn) toggleCompanyScorecardBtn.onclick = ()=>{ openOnlyPanel('showCompanyScorecard'); render(); };
  const runCompanyScorecardBtn = document.getElementById('runCompanyScorecardBtn');
  if(runCompanyScorecardBtn) runCompanyScorecardBtn.onclick = ()=>{
    const input = document.getElementById('companyScorecardInput');
    openCompanyScorecard(input ? input.value : state.companyScorecardQuery);
  };
  const companyScorecardInput = document.getElementById('companyScorecardInput');
  if(companyScorecardInput) companyScorecardInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){ e.preventDefault(); document.getElementById('runCompanyScorecardBtn').click(); }
  });
  const toggleHelpBtn = document.getElementById('toggleHelp');
  if(toggleHelpBtn) toggleHelpBtn.onclick = ()=>{ openOnlyPanel('showHelp'); render(); };
  const toggleCalendarViewBtn = document.getElementById('toggleCalendarView');
  if(toggleCalendarViewBtn) toggleCalendarViewBtn.onclick = ()=>{
    const wasOpen = state.showCalendarView;
    openOnlyPanel('showCalendarView');
    render();
    if(!wasOpen) fetchCalendarMonth(state.calendarMonth || currentMonthKey());
  };
  const calendarPrevMonthBtn = document.getElementById('calendarPrevMonth');
  if(calendarPrevMonthBtn) calendarPrevMonthBtn.onclick = ()=>{ fetchCalendarMonth(shiftMonthKey(state.calendarMonth || currentMonthKey(), -1)); };
  const calendarNextMonthBtn = document.getElementById('calendarNextMonth');
  if(calendarNextMonthBtn) calendarNextMonthBtn.onclick = ()=>{ fetchCalendarMonth(shiftMonthKey(state.calendarMonth || currentMonthKey(), 1)); };
  document.querySelectorAll('[data-cal-date]').forEach(cell=>{
    cell.onclick = async ()=>{
      const dateStr = cell.getAttribute('data-cal-date');
      if(state.dirty && !confirm('You have unsaved changes that will be lost if you switch dates without saving. Switch anyway?')) return;
      closeAllPanels();
      state.date = dateStr;
      state.dirty = false;
      state.lastImportedIds = null;
      state.dateSwitching = true;
      render();
      await loadDay(state.date);
      state.dateSwitching = false;
      render();
      scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
      scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
    };
  });
  document.querySelectorAll('[data-calcompare-view]').forEach(btn=>{
    btn.onclick = ()=>{ state.calendarCompareView = btn.getAttribute('data-calcompare-view'); render(); };
  });
  const calendarCompareSearchInput = document.getElementById('calendarCompareSearch');
  if(calendarCompareSearchInput) calendarCompareSearchInput.oninput = ()=>{
    state.calendarCompareSearch = calendarCompareSearchInput.value;
    render();
  };
  const toggleMissedCheckBtn = document.getElementById('toggleMissedCheck');
  if(toggleMissedCheckBtn) toggleMissedCheckBtn.onclick = ()=>{ openOnlyPanel('showMissedCheck'); render(); };
  const runWoiAgingBtn = document.getElementById('runWoiAgingScan');
  if(runWoiAgingBtn) runWoiAgingBtn.onclick = async ()=>{
    state.woiAgingLoading = true;
    render();
    state.woiAgingData = await scanWoiAging(true);
    state.woiAgingLoading = false;
    render();
  };
  const runWeeklyRecapBtn = document.getElementById('runWeeklyRecapScan');
  if(runWeeklyRecapBtn) runWeeklyRecapBtn.onclick = async ()=>{
    state.weeklyRecapLoading = true;
    render();
    state.weeklyRecapData = await scanWeeklyRecap(true);
    state.weeklyRecapLoading = false;
    render();
  };
  const runConversionFunnelBtn = document.getElementById('runConversionFunnelScan');
  if(runConversionFunnelBtn) runConversionFunnelBtn.onclick = async ()=>{
    state.conversionFunnelLoading = true;
    render();
    state.conversionFunnelData = await computeConversionFunnel(true);
    state.conversionFunnelLoading = false;
    render();
  };
  const runStuckPipelineBtn = document.getElementById('runStuckPipelineScan');
  if(runStuckPipelineBtn) runStuckPipelineBtn.onclick = async ()=>{
    state.stuckPipelineLoading = true;
    render();
    state.stuckPipelineData = await computeStuckPipeline(true);
    state.stuckPipelineLoading = false;
    render();
  };
  const runFinalRoundNudgeBtn = document.getElementById('runFinalRoundNudgeScan');
  if(runFinalRoundNudgeBtn) runFinalRoundNudgeBtn.onclick = async ()=>{
    state.finalRoundNudgeLoading = true;
    render();
    state.finalRoundNudgeData = await computeFinalRoundNudges(true);
    state.finalRoundNudgeLoading = false;
    render();
  };
  const runTimeToCloseBtn = document.getElementById('runTimeToCloseScan');
  if(runTimeToCloseBtn) runTimeToCloseBtn.onclick = async ()=>{
    state.timeToCloseLoading = true;
    render();
    state.timeToCloseData = await computeTimeToClose(true);
    state.timeToCloseLoading = false;
    render();
  };
  const runCandidateLastStatusBtn = document.getElementById('runCandidateLastStatusScan');
  if(runCandidateLastStatusBtn) runCandidateLastStatusBtn.onclick = async ()=>{
    state.candidateLastStatusLoading = true;
    render();
    state.candidateLastStatusData = await computeCandidateActivity(true);
    state.candidateLastStatusLoading = false;
    render();
  };
  const notifSearchLastStatusInput = document.getElementById('notifSearchLastStatus');
  if(notifSearchLastStatusInput) notifSearchLastStatusInput.addEventListener('input', ()=>{
    state.notifSearchLastStatus = notifSearchLastStatusInput.value;
    render();
  });
  const missedCheckFileInput = document.getElementById('missedCheckFileInput');
  if(missedCheckFileInput) missedCheckFileInput.addEventListener('change', async (e)=>{
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    try{
      const text = await file.text();
      state.missedCheckText = text;
      render();
      const runBtn = document.getElementById('runMissedCheckBtn');
      if(runBtn) runBtn.click();
    }catch(err){
      state.missedCheckError = 'Could not read that file: ' + (err && err.message ? err.message : err);
      render();
    }
    missedCheckFileInput.value = '';
  });
  const runMissedCheckBtn = document.getElementById('runMissedCheckBtn');
  if(runMissedCheckBtn) runMissedCheckBtn.onclick = async ()=>{
    const textEl = document.getElementById('missedCheckText');
    const text = textEl ? textEl.value : state.missedCheckText;
    state.missedCheckText = text;
    if(!text || !text.trim()){
      state.missedCheckError = 'Paste some text or upload a .txt file first.';
      state.missedCheckResults = null;
      render();
      return;
    }
    state.missedCheckError = null;
    state.missedCheckLoading = true;
    render();
    try{
      state.missedCheckResults = computeMissedMessages(text, state.rows);
      markMissedCheckRun(); // a real check actually ran — clears today's nudge banner
    }catch(err){
      state.missedCheckError = 'Something went wrong checking that text: ' + (err && err.message ? err.message : err);
      state.missedCheckResults = null;
    }
    state.missedCheckLoading = false;
    render();
    const textElAfter = document.getElementById('missedCheckText');
    if(textElAfter) textElAfter.value = state.missedCheckText;
  };
  document.querySelectorAll('.missed-copy-btn').forEach(btn=>{
    btn.onclick = async ()=>{
      const idx = Number(btn.dataset.idx);
      const flagged = state.missedCheckResults && state.missedCheckResults.flagged;
      const item = flagged && flagged[idx];
      if(!item) return;
      try{
        await navigator.clipboard.writeText(item.raw);
        btn.textContent = '✓ Copied';
        setTimeout(()=>{ btn.textContent = '📋 Copy text'; }, 1500);
      }catch(err){
        alert('Could not copy — select and copy the text manually instead.');
      }
    };
  });
  const reviewMissedBtn = document.getElementById('reviewMissedBtn');
  if(reviewMissedBtn) reviewMissedBtn.onclick = async ()=>{
    const flagged = (state.missedCheckResults && state.missedCheckResults.flagged) || [];
    // Preview the same auto-routing the confirm step would apply, on cloned
    // rows only — nothing here touches state.rows — so the review screen
    // can show a real suggested team/assignee instead of deciding it
    // silently at confirm time.
    const previewRows = flagged.map(f=>{
      const base = f.row ? Object.assign({}, f.row) : {};
      return Object.assign({}, base, {
        candidate: f.candidate,
        company: f.company || '',
        time: f.time || '',
        round: base.round || '1st',
        assignee: base.assignee || '',
      });
    });
    await autoRouteRows(previewRows, state.rows.slice());
    state.missedCheckReviewItems = flagged.map((f,i)=>({
      include: true,
      candidate: f.candidate,
      company: f.company || '',
      time: f.time || '',
      round: (f.row && f.row.round) || '1st',
      assignee: previewRows[i].assignee || '',
      raw: f.raw,
      _row: f.row,
    }));
    render();
  };
  document.querySelectorAll('.missed-review-field').forEach(input=>{
    const onEdit = ()=>{
      const idx = Number(input.dataset.idx);
      const field = input.dataset.field;
      if(!state.missedCheckReviewItems || !state.missedCheckReviewItems[idx]) return;
      if(field==='assignee' && input.value===CUSTOM_ASSIGNEE_SENTINEL){
        const item = state.missedCheckReviewItems[idx];
        const typed = prompt('Type the person\'s name (for someone not in the roster, e.g. a Development Team member added manually):', item.assignee && item.assignee !== CUSTOM_ASSIGNEE_SENTINEL ? item.assignee : '');
        item.assignee = (typed && typed.trim()) ? typed.trim() : (item.assignee || '');
        render();
        return;
      }
      state.missedCheckReviewItems[idx][field] = input.value;
    };
    // Select fires both 'input' and 'change' on a pick in modern browsers —
    // bind only 'change' for it (matches the rest of the app's assignee
    // dropdowns) so the custom-name prompt above doesn't fire twice.
    if(input.tagName==='SELECT'){ input.onchange = onEdit; }
    else { input.oninput = onEdit; input.onchange = onEdit; }
  });
  document.querySelectorAll('.missed-review-include').forEach(chk=>{
    chk.onchange = ()=>{
      const idx = Number(chk.dataset.idx);
      if(state.missedCheckReviewItems && state.missedCheckReviewItems[idx]){
        state.missedCheckReviewItems[idx].include = chk.checked;
        render();
      }
    };
  });
  const cancelMissedCheckReview = document.getElementById('cancelMissedCheckReview');
  if(cancelMissedCheckReview) cancelMissedCheckReview.onclick = ()=>{ state.missedCheckReviewItems = null; render(); };
  const confirmMissedCheckApply = document.getElementById('confirmMissedCheckApply');
  if(confirmMissedCheckApply) confirmMissedCheckApply.onclick = async ()=>{
    const items = (state.missedCheckReviewItems || []).filter(it=>it.include);
    if(!items.length) return;
    state.missedCheckApplying = true;
    render();
    // Same pre-add safety net the normal "📥 Import" button uses — an
    // undoable backup taken before anything is added.
    await createBackup('pre-import', state.date, state.rows);
    // Turn each reviewed item into a real call row. Starts from the full
    // parsed row this item came from (round/duration/assignee/country/
    // doubts already worked out by the parser) so nothing found during the
    // original check gets thrown away, then layers the person's own edits
    // (candidate/company/time/round, editable above) on top.
    // Assignee comes straight from the review screen above — reviewed and
    // possibly edited by hand — not recomputed here, so nothing about who
    // gets the call is decided invisibly at confirm time.
    const newRows = items.map(it=>{
      const base = it._row || {};
      return Object.assign({}, base, {
        id: uid(),
        candidate: it.candidate,
        company: it.company,
        time: it.time,
        round: it.round || base.round || '1st',
        assignee: it.assignee || '',
      });
    });
    state.rows = [...state.rows, ...newRows];
    state.lastImportedIds = newRows.map(r=>r.id);
    state.lastImportedCount = newRows.length;
    state.lastImportMergedCount = 0;
    state.recentImportIds = new Set(newRows.map(r=>r.id));
    markDirty();
    state.missedCheckApplying = false;
    state.missedCheckReviewItems = null;
    state.showMissedCheck = false;
    render();
    let saveErr = '';
    try{ await saveAllChanges(); }
    catch(e){ saveErr = e && e.message ? e.message : 'could not reach the server'; }
    if(saveErr){
      alert(`Added ${newRows.length} call(s) locally, but saving failed: ${saveErr}. Try "Save changes" again.`);
    } else {
      alert(`Added ${newRows.length} call(s) to ${state.date} and saved.\nIf this added anything unwanted, use the ↩ Undo import banner at the top to remove just these new call(s) in one click.`);
    }
    scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
    scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
  };
  // These small badges (P, ↻, C, !, ⚕/🎓 category, 📡 portal match, ⏰
  // conflict, the status pill) put their real information in a hover
  // tooltip — completely inaccessible on a touchscreen, which has no
  // hover state at all. A tap now shows the same text directly. The N
  // (unmatched student) badge already has its own tap action (opens the
  // add-student form), so it's deliberately excluded here.
  document.querySelectorAll('.mini-badge:not(.quick-add-student):not(.mini-badge-confirm-student), .flag-icon, .cat-badge, .prior-badge').forEach(badge=>{
    const info = badge.getAttribute('title');
    if(!info) return;
    badge.style.cursor = 'pointer';
    badge.addEventListener('click', (e)=>{
      e.stopPropagation();
      alert(info);
    });
  });
  document.querySelectorAll('.mini-badge-confirm-student').forEach(badge=>{
    badge.addEventListener('click', async (e)=>{
      e.stopPropagation();
      const candidateName = badge.dataset.candidate;
      const candidateKey = badge.dataset.candidateKey;
      const matchedId = badge.dataset.matchedId;
      const pairKey = badge.dataset.pairKey;
      const student = (state.studentsMaster||[]).find(s=>s.id===matchedId);
      const matchedName = student ? student.name : '(unknown)';
      const same = confirm(`Coverage Desk isn't fully sure about this one.\n\nIs "${candidateName}" the same person as "${matchedName}" in Students Master?\n\nClick OK if they're the same person, Cancel if they're different.`);
      const decision = same ? 'confirmed' : 'rejected';
      if(same){
        state.confirmedStudentMatches.add(pairKey);
      } else {
        state.rejectedStudentMatches.add(pairKey);
      }
      render();
      // Persisted in the background — the badge already reflects the
      // decision locally either way, so this failing silently just means
      // it'll ask again next reload rather than sticking permanently.
      if(API_BASE_URL){
        try{
          await apiCall('student_match_decisions', {
            method: 'POST',
            body: { candidateKey, candidateName, studentId: matchedId, decision }
          });
        }catch(e){}
      }
    });
  });
  document.querySelectorAll('.quick-add-student').forEach(badge=>{
    badge.onclick = async ()=>{
      const candidateName = badge.dataset.candidate;
      closeAllPanels();
      state.showStudentsMaster = true;
      state.showAddStudentForm = true;
      state.studentsAddError = '';
      if(!state.studentsMasterLoaded){
        state.studentsMasterLoading = true;
        render();
        await loadStudentsMaster();
        state.studentsMasterLoading = false;
      }
      render();
      const nameInput = document.getElementById('newStudentName');
      if(nameInput){ nameInput.value = candidateName; nameInput.focus(); }
    };
  });
  const toggleAddStudentFormBtn = document.getElementById('toggleAddStudentForm');
  if(toggleAddStudentFormBtn) toggleAddStudentFormBtn.onclick = ()=>{
    state.showAddStudentForm = !state.showAddStudentForm;
    state.studentsAddError = '';
    render();
  };
  const addStudentBtn = document.getElementById('addStudentBtn');
  if(addStudentBtn) addStudentBtn.onclick = async ()=>{
    const nameInput = document.getElementById('newStudentName');
    const countryInput = document.getElementById('newStudentCountry');
    const name = nameInput ? nameInput.value.trim() : '';
    if(!name){ state.studentsAddError = 'Type a name first.'; render(); return; }
    if(findStudentMasterMatch(name)){
      state.studentsAddError = `"${name}" already exists in Students Master — no duplicate added.`;
      render();
      return;
    }
    // Reassigns (rather than .push()) specifically so the Students Master
    // match-result cache — keyed on the array's reference — correctly
    // notices the roster changed. An in-place push() left the reference
    // identical, so a name looked up before this addition could keep
    // returning its old (possibly now-ambiguous) cached answer even after
    // the very student that made it ambiguous had just been added.
    state.studentsMaster = [...state.studentsMaster, {
      id: uid(), name,
      country: countryInput ? countryInput.value.trim() : ''
    }];
    invalidateStudentMatchCache();
    state.studentsAddError = '';
    state.showAddStudentForm = false;
    render();
    await saveStudentsMaster();
  };
  const studentsSearchBox = document.getElementById('studentsSearchBox');
  if(studentsSearchBox){
    let studentsSearchTimer = null;
    studentsSearchBox.addEventListener('input', ()=>{
      state.studentsSearch = studentsSearchBox.value;
      clearTimeout(studentsSearchTimer);
      // Debounced — re-rendering a 500+ row table on every keystroke is
      // noticeably slower than waiting for a short pause in typing.
      studentsSearchTimer = setTimeout(render, 200);
    });
  }
  document.querySelectorAll('.student-field').forEach(input=>{
    let studentFieldSaveTimer = null;
    input.addEventListener('input', ()=>{
      const student = state.studentsMaster.find(s=>s.id===input.dataset.id);
      if(!student) return;
      student[input.dataset.field] = input.value;
      clearTimeout(studentFieldSaveTimer);
      studentFieldSaveTimer = setTimeout(saveStudentsMaster, 600);
    });
  });
  document.querySelectorAll('.student-del').forEach(btn=>{
    btn.onclick = async ()=>{
      const student = state.studentsMaster.find(s=>s.id===btn.dataset.id);
      if(!student) return;
      if(!confirm(`Remove "${student.name}" from Students Master? This can't be undone from here.`)) return;
      state.studentsMaster = state.studentsMaster.filter(s=>s.id!==btn.dataset.id);
      invalidateStudentMatchCache();
      render();
      await saveStudentsMaster();
    };
  });
  const studentsExcelInput = document.getElementById('studentsExcelInput');
  if(studentsExcelInput) studentsExcelInput.addEventListener('change', async (e)=>{
    const file = e.target.files && e.target.files[0];
    if(!file) return;
    try{
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, {type:'array'});
      const sheetName = wb.SheetNames[0];
      const json = XLSX.utils.sheet_to_json(wb.Sheets[sheetName], {defval:''});
      let added = 0, updated = 0, skipped = 0;
      const newEntries = [];
      json.forEach(row=>{
        const name = (row['Candidate Name'] || row['Name'] || '').toString().trim();
        if(!name){ skipped++; return; }
        const country = (row['Location'] || row['Country'] || '').toString().trim();
        const existing = findStudentMasterMatch(name);
        if(existing){ existing.name = name; existing.country = country; updated++; invalidateStudentMatchCache(); }
        else { newEntries.push({ id: uid(), name, country }); added++; }
      });
      // Reassigned once here (not pushed per-row above) so the Students
      // Master match-result cache — keyed on the array's reference —
      // correctly invalidates for every lookup after this import, the
      // same reasoning as the quick-add-student fix above.
      if(newEntries.length) state.studentsMaster = [...state.studentsMaster, ...newEntries];
      invalidateStudentMatchCache();
      render();
      await saveStudentsMaster();
      alert(`Students Master updated from "${file.name}": ${added} new, ${updated} updated${skipped?`, ${skipped} row(s) skipped (no name)`:''}.`);
    }catch(err){
      alert('Could not read that Excel file: ' + (err && err.message ? err.message : err));
    }
    studentsExcelInput.value = '';
  });
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  if(exportCsvBtn) exportCsvBtn.onclick = ()=>{
    if(!state.allDatesData) return;
    const csv = buildCsvExport(state.allDatesData);
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `coverage-desk-export-${state.date}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(()=>URL.revokeObjectURL(url), 1000);
  };
  const reloadAllDatesBtn = document.getElementById('reloadAllDatesBtn');
  if(reloadAllDatesBtn) reloadAllDatesBtn.onclick = async ()=>{
    state.allDatesLoading = true;
    render();
    state.allDatesData = await loadAllDatesFlat();
    state.allDatesLoading = false;
    render();
  };
  const allDatesSearchInput = document.getElementById('allDatesSearch');
  if(allDatesSearchInput){
    let allDatesSearchTimer = null;
    allDatesSearchInput.addEventListener('input', ()=>{
      state.allDatesSearch = allDatesSearchInput.value;
      clearTimeout(allDatesSearchTimer);
      // Debounced — full-page re-render costs ~80ms+ on a large combined list,
      // so waiting for a pause in typing avoids that cost on every keystroke.
      allDatesSearchTimer = setTimeout(render, 200);
    });
  }
  const toggleUsersBtn = document.getElementById('toggleUsers');
  if(toggleUsersBtn) toggleUsersBtn.onclick = ()=>{ openOnlyPanel('showUsers'); render(); };
  const toggleCreateUserBtn = document.getElementById('toggleCreateUserBtn');
  if(toggleCreateUserBtn) toggleCreateUserBtn.onclick = ()=>{ state.showCreateUserForm = !state.showCreateUserForm; render(); };
  const loadUsersBtn = document.getElementById('loadUsersBtn');
  if(loadUsersBtn) loadUsersBtn.onclick = async ()=>{
    try{
      const data = await apiCall('users', {});
      state.usersList = data.rows || [];
      state.usersError = '';
    }catch(e){ state.usersError = e.message; }
    render();
  };
  const addUserBtn = document.getElementById('addUserBtn');
  if(addUserBtn) addUserBtn.onclick = async ()=>{
    const username = document.getElementById('newUserName').value.trim();
    const password = document.getElementById('newUserPw').value;
    const role = document.getElementById('newUserRole').value;
    if(!username || !password) return;
    try{
      await apiCall('users', {method:'POST', body:{action:'create', username, password, role}});
      state.usersError = '';
      state.showCreateUserForm = false;
      // If the users list is already loaded (being viewed), refresh it too so the
      // new account shows up immediately without a separate manual reload.
      if(state.usersList !== null){
        const data = await apiCall('users', {});
        state.usersList = data.rows || [];
      }
    }catch(e){ state.usersError = e.message; }
    render();
  };
  document.querySelectorAll('.user-role-select').forEach(sel=>{
    sel.onchange = async ()=>{
      try{
        await apiCall('users', {method:'POST', body:{action:'setRole', id: sel.dataset.id, role: sel.value}});
        state.usersError = '';
      }catch(e){ state.usersError = e.message; render(); }
    };
  });
  document.querySelectorAll('.user-reset-btn').forEach(btn=>{
    btn.onclick = async ()=>{
      const newPw = prompt(`New password for ${btn.dataset.username}:`);
      if(!newPw) return;
      try{
        await apiCall('users', {method:'POST', body:{action:'resetPassword', id: btn.dataset.id, password: newPw}});
        state.usersError = '';
        alert('Password updated.');
      }catch(e){ state.usersError = e.message; render(); }
    };
  });
  document.querySelectorAll('.user-delete-btn').forEach(btn=>{
    btn.onclick = async ()=>{
      if(!confirm('Remove this account? They will no longer be able to sign in.')) return;
      try{
        await apiCall('users', {method:'POST', body:{action:'delete', id: btn.dataset.id}});
        const data = await apiCall('users', {});
        state.usersList = data.rows || [];
        state.usersError = '';
      }catch(e){ state.usersError = e.message; }
      render();
    };
  });
  const saveAllBtn = document.getElementById('saveAllBtn');
  if(saveAllBtn) saveAllBtn.onclick = ()=>{ if(state.dirty && !state.saving) saveAllChanges(); };
  const saveApiUrlBtn = document.getElementById('saveApiUrl');
  if(saveApiUrlBtn) saveApiUrlBtn.onclick = async ()=>{
    const val = document.getElementById('apiUrlInput').value.trim().replace(/\/$/,'');
    API_BASE_URL = val;
    try{ localStorage.setItem('coverage-desk-api-url', val); }catch(e){}
    const resultEl = document.getElementById('apiTestResult');
    if(resultEl) resultEl.textContent = val ? 'Saved. Reloading this day from the database…' : 'Disconnected — back to local storage.';
    await loadRoster();
    await loadDay(state.date);
    render();
  };
  const testApiUrlBtn = document.getElementById('testApiUrl');
  if(testApiUrlBtn) testApiUrlBtn.onclick = async ()=>{
    const val = document.getElementById('apiUrlInput').value.trim().replace(/\/$/,'');
    const resultEl = document.getElementById('apiTestResult');
    resultEl.textContent = 'Testing…';
    const prevUrl = API_BASE_URL;
    API_BASE_URL = val;
    const result = await testApiConnection();
    API_BASE_URL = prevUrl;
    resultEl.innerHTML = result.ok
      ? '<span style="color:var(--teal)">✓ Connected successfully.</span>'
      : `<span style="color:var(--coral)">✗ Couldn't connect: ${escapeHtml(result.error)}</span>`;
  };
  function doLogout(){
    ADMIN_PASSWORD = '';
    CURRENT_USERNAME = '';
    try{
      localStorage.removeItem('coverage-desk-admin-pw');
      localStorage.removeItem('coverage-desk-username');
      localStorage.removeItem('coverage-desk-client-auth');
      localStorage.removeItem('coverage-desk-client-role');
    }catch(e){}
    location.reload();
  }
  const logoutBtn = document.getElementById('logoutBtn');
  if(logoutBtn) logoutBtn.onclick = doLogout;
  const headerLogoutBtn = document.getElementById('headerLogoutBtn');
  if(headerLogoutBtn) headerLogoutBtn.onclick = doLogout;
  const topLogoutBtn = document.getElementById('topLogoutBtn');
  if(topLogoutBtn) topLogoutBtn.onclick = doLogout;
  const backupAllBtn = document.getElementById('backupAllBtn');
  if(backupAllBtn) backupAllBtn.onclick = downloadFullBackup;
  const quickBackupBtn = document.getElementById('quickBackupBtn');
  if(quickBackupBtn) quickBackupBtn.onclick = ()=>{ state.showMoreMenu = false; downloadFullBackup(); };
  const toggleConflictsBtn = document.getElementById('toggleConflicts');
  if(toggleConflictsBtn) toggleConflictsBtn.onclick = ()=>{ openOnlyPanel('showConflicts'); render(); };
  document.querySelectorAll('.conflict-reassign').forEach(sel=>{
    sel.onchange = ()=>{
      if(!sel.value) return;
      const row = state.rows.find(r=>r.id===sel.dataset.rowId);
      if(!row) return;
      row.assignee = sel.value;
      markDirty();
      render();
    };
  });
  // Opens the review screen (renderDuplicatesReviewPanel) instead of
  // removing anything directly — see that function's comment for why: a
  // bare confirm()-dialog with just a count never showed WHICH rows were
  // about to disappear, which is exactly the "review-before-commit" gap
  // this app's own conventions call out for any bulk/automated change.
  const removeDuplicatesBtn = document.getElementById('removeDuplicatesBtn');
  if(removeDuplicatesBtn) removeDuplicatesBtn.onclick = ()=>{
    const groups = findDuplicateCallGroups(state.rows);
    if(!groups.length){ alert('No duplicate calls found for ' + state.date + ' — same candidate, time, and round all appear only once.'); return; }
    const duplicatesReview = groups.map(g=>{
      const sorted = g.slice().sort((a,b)=>callCompletenessScore(b)-callCompletenessScore(a));
      return {
        candidate: g[0].candidate,
        time: g[0].time || '',
        round: g[0].round || '',
        rows: g.map(r=>({ id:r.id, company:r.company||'', interviewer:r.interviewer||'', role:r.role||'', assignee:r.assignee||'', duration:r.duration||'' })),
        keepId: sorted[0].id,
      };
    });
    closeAllPanels();
    state.duplicatesReview = duplicatesReview;
    render();
  };
  const cancelDuplicatesReview = document.getElementById('cancelDuplicatesReview');
  if(cancelDuplicatesReview) cancelDuplicatesReview.onclick = ()=>{ state.duplicatesReview = null; render(); };
  document.querySelectorAll('.dup-keep-radio').forEach(radio=>{
    radio.onchange = ()=>{
      const gi = Number(radio.dataset.group);
      const group = state.duplicatesReview && state.duplicatesReview[gi];
      if(!group) return;
      group.keepId = radio.value;
      render();
    };
  });
  const confirmRemoveDuplicates = document.getElementById('confirmRemoveDuplicates');
  if(confirmRemoveDuplicates) confirmRemoveDuplicates.onclick = async ()=>{
    const groups = state.duplicatesReview || [];
    if(!groups.length) return;
    state.duplicatesRemoving = true;
    render();
    await createBackup('pre-dedupe', state.date, state.rows);
    const idsToRemove = new Set();
    const removedInfo = [];
    groups.forEach(g=>{
      g.rows.forEach(r=>{
        if(r.id !== g.keepId){
          idsToRemove.add(r.id);
          removedInfo.push({ candidate: r.candidate||'(no name)', company: r.company||'', time: r.time||'' });
        }
      });
    });
    state.rows = state.rows.filter(r=>!idsToRemove.has(r.id));
    markDirty();
    // saveAllChanges() catches its own errors internally (it sets
    // state.saveError rather than throwing) — check that field afterward,
    // same as reading its actual outcome anywhere else in the app, so a
    // real save failure here is never reported as a success.
    await saveAllChanges();
    state.duplicatesRemoving = false;
    state.duplicatesReview = null;
    if(state.saveError){
      render();
      alert(`Removed ${idsToRemove.size} duplicate call(s) locally, but saving failed: ${state.saveError}. Try "Save changes" again — until then this isn't saved to the database yet.`);
    } else {
      // Persistent banner instead of a transient alert() — same reasoning
      // as the reschedule-confirm fix above: naming exactly which rows were
      // removed, not just a count, and a backup-restore reminder that stays
      // visible instead of disappearing the moment the popup is dismissed.
      state.lastDedupeInfo = { removed: removedInfo };
      autoDismissBanner('lastDedupeInfo', 20000);
      render();
    }
  };

  const undoLastImportBtn = document.getElementById('undoLastImportBtn');
  if(undoLastImportBtn) undoLastImportBtn.onclick = async ()=>{
    if(!state.lastImportedIds || !state.lastImportedIds.length) return;
    const count = state.lastImportedIds.length;
    if(!confirm(`Remove the ${count} call(s) added by the last import? Calls that were merged into existing rows (role/interviewer/round info added, not duplicated) will keep that info — only the newly-created rows are removed.`)) return;
    const idsToRemove = new Set(state.lastImportedIds);
    state.rows = state.rows.filter(r=>!idsToRemove.has(r.id));
    state.lastImportedIds = null;
    state.lastImportedCount = 0;
    state.lastImportMergedCount = 0;
    markDirty();
    render();
    await saveAllChanges();
  };
  const dismissLastImportBtn = document.getElementById('dismissLastImportBtn');
  if(dismissLastImportBtn) dismissLastImportBtn.onclick = ()=>{ state.lastImportedIds = null; render(); };

  const dismissLastReschedBtn = document.getElementById('dismissLastReschedBtn');
  if(dismissLastReschedBtn) dismissLastReschedBtn.onclick = ()=>{ state.lastReschedItems = null; render(); };

  const dismissLastDedupeBtn = document.getElementById('dismissLastDedupeBtn');
  if(dismissLastDedupeBtn) dismissLastDedupeBtn.onclick = ()=>{ state.lastDedupeInfo = null; render(); };
  const cancelImport = document.getElementById('cancelImport');
  if(cancelImport) cancelImport.onclick = ()=>{ closeAllPanels(); render(); };
  const runImport = document.getElementById('runImport');
  if(runImport) runImport.onclick = async ()=>{
    const text = document.getElementById('importText').value;
    const dateInput = document.getElementById('importDate');
    const targetDate = dateInput ? dateInput.value : state.date;
    if(targetDate && targetDate !== state.date){
      if(state.dirty && !confirm('You have unsaved changes on the current date that will be lost switching to import into a different date. Continue?')){
        return;
      }
      state.date = targetDate;
      state.dirty = false;
      await loadDay(state.date);
    }
    const beforeBatchRows = state.rows.slice(); // snapshot BEFORE this import adds anything
    await createBackup('pre-import', state.date, beforeBatchRows);
    const beforeCount = state.roster.length;

    // A single paste can contain section headers like "Call's for tomorrow
    // (2nd Sep)" splitting one list across several different dates —
    // split those out now, before routing/assigning, so each date's calls
    // only ever compete for capacity against that SAME date's own existing
    // rows, not today's.
    const parsedAll = parseImportText(text, state.date, state.importDefaultRound);
    const totalDataLines = parsedAll._dataLineCount != null ? parsedAll._dataLineCount : parsedAll.length;
    const currentDateRaw = parsedAll.filter(r => !r._targetDate || r._targetDate === state.date);
    const otherDateRowsByDate = {};
    parsedAll.filter(r => r._targetDate && r._targetDate !== state.date).forEach(r=>{
      (otherDateRowsByDate[r._targetDate] = otherDateRowsByDate[r._targetDate] || []).push(r);
    });
    const parsed = await autoRouteRows(currentDateRaw, state.rows);

    // Detects reschedule/cancel messages mixed into the SAME pasted text.
    // If one genuinely matches a call that already existed BEFORE this
    // paste, apply the status update there and remove the duplicate row
    // that normal parsing above also produced for that same line (it's
    // the same call being described twice, not two calls). If it doesn't
    // match anything already on the books, leave the row normal parsing
    // already produced — it's very often actually a brand-new call whose
    // description just happens to mention a past reschedule — and flag
    // it so it's easy to double check either way.
    const rescheduleMsgs = parseRescheduleText(text);
    let appliedCount = 0, unmatchedCount = 0;
    rescheduleMsgs.forEach(msg=>{
      const existingRow = matchRescheduleToRow(msg, beforeBatchRows);
      if(existingRow){
        const fields = [];
        if(msg.side) fields.push({label:'Side', value: msg.side});
        if(msg.reason) fields.push({label:'Reason', value: msg.reason});
        existingRow.status = msg.status;
        existingRow.statusFields = fields.length ? fields : (msg.status === 'rescheduled' ? [{label:'New Date', value:''}, {label:'New Time', value:''}] : [{label:'Reason', value:''}]);
        appliedCount++;
        const dupIdx = parsed.findIndex(r =>
          (r.candidate||'').trim().toLowerCase() === msg.candidate.trim().toLowerCase() &&
          (r.time||'').replace(/\s+/g,' ').toUpperCase() === msg.time.toUpperCase()
        );
        if(dupIdx !== -1) parsed.splice(dupIdx,1);
      } else {
        unmatchedCount++;
        const newRow = parsed.find(r =>
          (r.candidate||'').trim().toLowerCase() === msg.candidate.trim().toLowerCase() &&
          (r.time||'').replace(/\s+/g,' ').toUpperCase() === msg.time.toUpperCase()
        );
        if(newRow){
          newRow.doubts = newRow.doubts || [];
          newRow.doubts.push('This mentions "reschedule/cancel" but didn\u2019t match any call already on the list \u2014 double-check whether it\u2019s really a new call or should have updated an existing one.');
        }
      }
    });

    // Merge into an already-existing call instead of adding a duplicate —
    // this is exactly the "2nd Round Import" use case: the calls were
    // already added earlier via a plain daily import, and this paste is
    // just supplying details (role, interviewer, the real round) that
    // weren't in the original message. Only genuinely new candidates/times
    // become new rows; everything else enriches the existing row in place.
    let mergedCount = 0;
    const mergedIds = [];
    const trulyNewRows = [];
    parsed.forEach(p=>{
      const existing = findExistingCallMatch(p, beforeBatchRows);
      if(existing){
        if(p.role && !existing.role) existing.role = p.role;
        if(p.interviewer && !existing.interviewer) existing.interviewer = p.interviewer;
        if(p.company && !existing.company) existing.company = p.company;
        if(p.duration && !existing.duration) existing.duration = p.duration;
        if(p.assignee && !existing.assignee) existing.assignee = p.assignee;
        if(p.technicalPOC && !existing.technicalPOC) existing.technicalPOC = p.technicalPOC;
        if(p.onsite && !existing.onsite) existing.onsite = true;
        if(p.candidateFirstInterview && !existing.candidateFirstInterview) existing.candidateFirstInterview = true;
        // A WOI call has no time yet by definition — once the invite
        // comes through and this same candidate is pasted again with an
        // actual time, that's exactly the update this call was waiting
        // for: fill in the real time and clear WOI. Otherwise, only fill
        // in a time that was genuinely missing before — never overwrite
        // a time that was already stated.
        if(existing.woi && !p.woi && p.time){
          existing.time = p.time;
          existing.woi = false;
        } else if(p.time && !existing.time){
          existing.time = p.time;
        }
        // Only upgrade the round if THIS paste actually stated it explicitly
        // (not a default) — otherwise a vaguer later paste could downgrade
        // an already-correct 2nd Round back to a defaulted 1st.
        const roundWasExplicit = !(p.doubts||[]).some(d=>/Round wasn.t stated/.test(d));
        if(p.round && roundWasExplicit && p.round !== existing.round) existing.round = p.round;
        mergedCount++;
        mergedIds.push(existing.id);
      } else {
        trulyNewRows.push(p);
      }
    });

    state.rows = state.rows.concat(trulyNewRows);
    state.lastImportedIds = trulyNewRows.map(r=>r.id);
    state.lastImportedCount = trulyNewRows.length;
    state.lastImportMergedCount = mergedCount;
    // Separate from lastImportedIds above (which only covers brand-new
    // rows and gets cleared as soon as that transient banner is dismissed
    // or undone) — this persists so the newly-added-or-updated calls stay
    // findable for the rest of the session on this date, not just for the
    // few seconds the banner is up. A fresh import replaces this with its
    // own batch rather than accumulating forever.
    state.recentImportIds = new Set([...trulyNewRows.map(r=>r.id), ...mergedIds]);

    // Save each other date's calls directly — they never touch state.rows
    // (which only ever holds the currently open date), so this happens as
    // its own direct save rather than through the usual "Save changes"
    // flow for today.
    const otherDateSummaries = [];
    for(const [dateKey, rows] of Object.entries(otherDateRowsByDate)){
      try{
        const total = await saveRowsToOtherDate(dateKey, rows);
        otherDateSummaries.push(`${rows.length} call(s) saved to ${dateKey} (${total} total there now)`);
      }catch(e){
        otherDateSummaries.push(`⚠ Failed to save ${rows.length} call(s) meant for ${dateKey}: ${e.message}`);
      }
    }

    state.showImport = false;
    if(state.roster.length !== beforeCount) await saveRoster();
    markDirty(); render();

    // Mathematical proof nothing was dropped: every data line either (a)
    // became a new call today, (b) became a new call on another date, (c)
    // got merged into an existing call as a status update, or (d) got
    // merged into an existing call as a duplicate-avoidance enrichment —
    // those four should always add up to the total data lines found. If
    // they don't, that's the signal something slipped past every safety
    // net above, and it's surfaced loudly rather than silently trusted.
    const otherDateTotal = Object.values(otherDateRowsByDate).reduce((s,rows)=>s+rows.length,0);
    const accountedFor = trulyNewRows.length + mergedCount + otherDateTotal + appliedCount;
    const reconciliationLines = [
      `Pasted text: ${totalDataLines} record line(s) found.`,
      `→ ${trulyNewRows.length} new call(s) added to ${state.date}.`,
      mergedCount ? `→ ${mergedCount} already existed in the list \u2014 merged in (role/interviewer/round), no duplicate created.` : null,
      otherDateTotal ? `→ ${otherDateTotal} new call(s) added to other dates.` : null,
      appliedCount ? `→ ${appliedCount} merged into existing call(s) as a reschedule/cancel update.` : null,
      accountedFor === totalDataLines
        ? `✓ All ${totalDataLines} accounted for.`
        : `⚠ MISMATCH: ${accountedFor} accounted for, but ${totalDataLines} were found in the paste. Something may be missing — please review carefully.`,
      trulyNewRows.length ? `\nIf this added anything unwanted, use the ↩ Undo import banner at the top to remove just the ${trulyNewRows.length} new call(s) in one click.` : null
    ].filter(Boolean);
    alert(reconciliationLines.join('\n'));

    if(otherDateSummaries.length){
      alert('Some calls in this paste were for other dates:\n' + otherDateSummaries.join('\n'));
    }
    if(rescheduleMsgs.length){
      // Persist the reschedule/cancel tags to their own dedicated table
      // right away, rather than waiting for the person to hit the general
      // Save button — the whole point of the separate table is that tagging
      // a call doesn't depend on a full calls save happening correctly.
      try{ await saveCallStatuses(); }
      catch(e){ alert('Calls were tagged locally but saving the reschedule/cancel status failed: ' + e.message); }
      const parts = [];
      if(appliedCount) parts.push(`${appliedCount} call(s) marked rescheduled/cancelled`);
      if(unmatchedCount) parts.push(`${unmatchedCount} reschedule/cancel message(s) found no matching call — check spelling/time`);
      alert(parts.join('. '));
    }
    // Re-scan for repeat candidates now that new calls just came in — this is
    // exactly the moment the "handled before" hint matters most.
    scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
    scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
  };

  // ---------- dedicated Reschedule/Cancel import (existing calls only) ----------
  const cancelRescheduleImport = document.getElementById('cancelRescheduleImport');
  if(cancelRescheduleImport) cancelRescheduleImport.onclick = ()=>{ closeAllPanels(); render(); };

  const parseRescheduleBtn = document.getElementById('parseRescheduleBtn');
  if(parseRescheduleBtn) parseRescheduleBtn.onclick = ()=>{
    const textEl = document.getElementById('rescheduleImportText');
    const text = textEl ? textEl.value : '';
    const parsed = parseRescheduleText(text);
    if(!parsed.length){
      alert('No reschedule/cancel/no-response messages were recognized in that text. Each message needs a name, a time like 2:30 PM (or a bare "7:00"), and the word "reschedule", "cancel", or "not responding"/"no response".');
      return;
    }
    // Build a review list: auto-match each parsed message against the calls
    // already saved for this day, but never apply anything yet — the person
    // confirms (or manually picks the right call) on the next screen before
    // anything is saved to the database.
    state.rescheduleReview = parsed.map(msg=>{
      const matchedRow = matchRescheduleToRow(msg, state.rows);
      return {
        raw: msg.raw,
        candidate: msg.candidate,
        time: msg.time,
        company: msg.company,
        status: msg.status,
        side: msg.side,
        reason: msg.reason,
        selectedRowId: matchedRow ? matchedRow.id : '',
        autoMatched: !!matchedRow,
        skip: false,
      };
    });
    state.showRescheduleImport = false;
    render();
  };

  const addManualReschedBtn = document.getElementById('addManualReschedBtn');
  if(addManualReschedBtn) addManualReschedBtn.onclick = ()=>{
    const callSel = document.getElementById('manualReschedCall');
    const statusSel = document.getElementById('manualReschedStatus');
    const reasonEl = document.getElementById('manualReschedReason');
    const callId = callSel ? callSel.value : '';
    if(!callId){
      alert('Pick which call this reschedule/cancel is for.');
      return;
    }
    const row = state.rows.find(r=>r.id===callId);
    if(!row){ alert('That call could not be found — try again.'); return; }
    const status = statusSel ? statusSel.value : 'rescheduled';
    const reason = reasonEl ? reasonEl.value.trim() : '';
    // Same review-then-confirm flow as parsed messages — nothing is saved
    // until Confirm & save is clicked on the next screen.
    state.rescheduleReview = [{
      raw: `Manually added: ${row.candidate||'(no name)'} — ${row.time||''}${row.company?' — '+row.company:''}`,
      candidate: row.candidate || '',
      time: row.time || '',
      company: row.company || '',
      status: status,
      side: '',
      reason: reason,
      selectedRowId: row.id,
      autoMatched: false,
      skip: false,
    }];
    state.showRescheduleImport = false;
    render();
  };

  const cancelRescheduleConfirm = document.getElementById('cancelRescheduleConfirm');
  if(cancelRescheduleConfirm) cancelRescheduleConfirm.onclick = ()=>{ state.rescheduleReview = null; render(); };

  document.querySelectorAll('.resched-target-select').forEach(sel=>{
    sel.onchange = ()=>{
      const idx = Number(sel.dataset.idx);
      if(state.rescheduleReview && state.rescheduleReview[idx]){
        state.rescheduleReview[idx].selectedRowId = sel.value;
        // A manual pick from the dropdown counts as confirmed, not an
        // auto-match, so the badge reflects what actually happened.
        state.rescheduleReview[idx].autoMatched = false;
        render();
      }
    };
  });
  document.querySelectorAll('.resched-skip').forEach(cb=>{
    cb.onchange = ()=>{
      const idx = Number(cb.dataset.idx);
      if(state.rescheduleReview && state.rescheduleReview[idx]){
        state.rescheduleReview[idx].skip = cb.checked;
        render();
      }
    };
  });

  const confirmRescheduleApply = document.getElementById('confirmRescheduleApply');
  if(confirmRescheduleApply) confirmRescheduleApply.onclick = async ()=>{
    const items = state.rescheduleReview || [];
    let appliedCount = 0, skippedCount = 0;
    // Kept alongside appliedCount/skippedCount so the confirmation the
    // person sees afterward can actually name which calls changed, not
    // just report a number — see the lastReschedItems banner below.
    const appliedItems = [];
    items.forEach(it=>{
      if(it.skip || !it.selectedRowId){ skippedCount++; return; }
      const row = state.rows.find(r=>r.id === it.selectedRowId);
      if(!row){ skippedCount++; return; }
      const fields = [];
      if(it.side) fields.push({label:'Side', value: it.side});
      if(it.reason) fields.push({label:'Reason', value: it.reason});
      row.status = it.status;
      row.statusFields = fields.length ? fields : (it.status === 'rescheduled' ? [{label:'New Date', value:''}, {label:'New Time', value:''}] : [{label:'Reason', value:''}]);
      appliedCount++;
      appliedItems.push({ id: row.id, candidate: row.candidate || '(no name)', time: row.time || '', company: row.company || '', status: it.status });
    });
    if(!appliedCount){
      alert('Nothing to save — every message was skipped or has no call selected.');
      return;
    }
    // Deliberately NOT markDirty() here — saveCallStatuses() below is a
    // complete, independent save through its own dedicated endpoint,
    // exactly like the Driving Person field. Marking the page dirty here
    // set state.dirty=true with nothing that ever cleared it back to
    // false afterward, so the top "Save changes" button kept showing
    // "unsaved" even though the reschedule tags were already correctly
    // saved — making it look like nothing actually saved until that
    // button got clicked too, when in fact it already had.
    state.rescheduleApplying = true;
    render();
    // Save directly to the dedicated call_status table rather than the
    // general saveAllChanges() flow — this is the fix for the "saves in the
    // session but gone after refresh" bug: it no longer depends on the
    // `calls` table having a status column, and can't be overwritten by an
    // unrelated call edit racing to save at the same time.
    let saveErr = '';
    try{
      await saveCallStatuses();
    }catch(e){
      saveErr = e && e.message ? e.message : 'could not reach the server';
    }
    state.rescheduleApplying = false;
    state.rescheduleReview = null;
    if(saveErr){
      alert('Some calls were tagged but the save failed: ' + saveErr);
    } else {
      // Replaces a plain alert() as the confirmation — that popup was easy
      // to dismiss without registering exactly which records it meant, and
      // gave no lasting trace once closed. This is the same pattern already
      // used for "↩ Undo import": a banner on the home screen naming what
      // just happened, plus a filter chip to pull up just those rows.
      state.lastReschedItems = { items: appliedItems, skippedCount };
      state.recentReschedIds = new Set(appliedItems.map(it=>it.id));
      autoDismissBanner('lastReschedItems', 20000);
    }
    render();
    scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
    scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
  };

  // ---------- Closure / Job Offer import (now embedded directly inside
  // the combined Closures panel, rather than a separate panel of its
  // own — one button, one place, import at the top and the recorded
  // list grouped by month underneath) ----------
  const parseClosureBtn = document.getElementById('parseClosureBtn');
  if(parseClosureBtn) parseClosureBtn.onclick = async ()=>{
    const textEl = document.getElementById('closureImportText');
    const text = textEl ? textEl.value : '';
    const parsed = parseClosureText(text);
    if(!parsed.length){
      alert('No closure/job-offer messages were recognized in that text. Each message needs a candidate name and a phrase like "got offer letter from", "received offer from", "selected by", or "closed with", followed by a company name.');
      return;
    }
    state.closureReview = parsed.map(p=>Object.assign({crossRef: {status:'checking', message:'Checking existing records…'}}, p));
    render();
    // Cross-checked against every call on file (any date), not just
    // today's — one shared fetch for the whole batch rather than one
    // per row, then each row's result fills in independently so the
    // screen doesn't sit blank while this resolves.
    try{
      const allRows = await fetchAllRowsAcrossDates();
      if(!state.closureReview) return; // panel was cancelled while this was in flight
      state.closureReviewAllRows = allRows; // reused by the inline "🔗 Pick the right call" picker — see getReviewMatchCandidateList()
      state.closureReview.forEach(item=>{
        item.crossRef = crossReferenceClosure(item.candidate, item.company, allRows);
      });
      render();
    }catch(e){
      if(!state.closureReview) return;
      state.closureReview.forEach(item=>{ item.crossRef = { status: 'error', message: 'Could not check existing records.' }; });
      render();
    }
  };

  const cancelClosureConfirm = document.getElementById('cancelClosureConfirm');
  if(cancelClosureConfirm) cancelClosureConfirm.onclick = ()=>{
    state.closureReview = null;
    state.closureReviewMatchIdx = null;
    state.closureReviewMatchSearch = '';
    render();
  };

  document.querySelectorAll('.closure-review-field').forEach(input=>{
    input.oninput = ()=>{
      const idx = Number(input.dataset.idx);
      const field = input.dataset.field;
      if(state.closureReview && state.closureReview[idx]) state.closureReview[idx][field] = input.value;
    };
  });
  document.querySelectorAll('.closure-review-remove').forEach(btn=>{
    btn.onclick = ()=>{
      const idx = Number(btn.dataset.idx);
      if(state.closureReview){
        state.closureReview.splice(idx, 1);
        render();
      }
    };
  });

  // Pre-save "🔗 Pick the right call" picker on the closure review screen —
  // see getReviewMatchCandidateList() / reviewMatchPickerHtml() above.
  document.querySelectorAll('[data-open-review-match]').forEach(btn=>{
    btn.onclick = async ()=>{
      state.closureReviewMatchIdx = Number(btn.dataset.openReviewMatch);
      state.closureReviewMatchSearch = '';
      // FIX (2026-10-02): force a fresh cross-date fetch on open instead of
      // trusting the snapshot parseClosureBtn grabbed at parse time (which
      // can be stale/empty if the shared fetchAllRowsAcrossDates() cache was
      // already warmed earlier in the session) — see reviewMatchPickerHtml().
      state.closureReviewMatchRefreshing = true;
      render();
      try{
        state.closureReviewAllRows = await fetchAllRowsAcrossDates(true);
      }catch(e){ /* keep whatever snapshot we already had — search still works, just possibly stale */ }
      state.closureReviewMatchRefreshing = false;
      render();
    };
  });
  document.querySelectorAll('[data-cancel-review-match]').forEach(btn=>{
    btn.onclick = ()=>{
      state.closureReviewMatchIdx = null;
      state.closureReviewMatchSearch = '';
      render();
    };
  });
  document.querySelectorAll('[data-review-match-search]').forEach(input=>{
    input.oninput = (e)=>{ state.closureReviewMatchSearch = e.target.value; render(); };
  });
  document.querySelectorAll('[data-confirm-review-match]').forEach(btn=>{
    btn.onclick = ()=>{
      const idx = Number(btn.dataset.confirmReviewMatch);
      const item = state.closureReview && state.closureReview[idx];
      const select = document.getElementById('reviewMatchSelect-'+idx);
      if(!item || !select) return;
      const { list } = getReviewMatchCandidateList(idx);
      const chosen = list[Number(select.value)];
      if(!chosen) return;
      // Sets the review item's candidate/company to EXACTLY match the
      // chosen call record, then re-runs the same cross-reference check
      // used at parse time — once the text matches a real record exactly,
      // the normal save-time matching logic finds it on its own, so no
      // separate manual-match override is needed for this path.
      item.candidate = chosen.candidate;
      item.company = chosen.company;
      item.crossRef = crossReferenceClosure(item.candidate, item.company, state.closureReviewAllRows || []);
      state.closureReviewMatchIdx = null;
      state.closureReviewMatchSearch = '';
      render();
    };
  });

  const confirmClosureApply = document.getElementById('confirmClosureApply');
  if(confirmClosureApply) confirmClosureApply.onclick = async ()=>{
    const items = (state.closureReview || []).filter(it=>it.candidate && it.candidate.trim() && it.company && it.company.trim());
    if(!items.length){
      alert('Nothing to save — every row needs at least a candidate and a company.');
      return;
    }
    state.closureApplying = true;
    render();
    try{
      await saveNewClosures(items);
      // FIX (2026-09-28): a newly-pasted closure used to be invisible in
      // the By Handler view (matched or unmatched) until the person
      // happened to trigger a re-scan some other way — see the
      // [data-open-closure-match] fix above for the full root-cause
      // writeup. Refreshing here too means the closure just saved shows up
      // right away, whether it auto-matches or needs a manual match.
      if(state.closuresPerformance) state.closuresPerformance = await computeClosuresPerformance(true);
      state.closureApplying = false;
      state.closureReview = null;
      state.closureReviewMatchIdx = null;
      state.closureReviewMatchSearch = '';
      render();
      alert(`${items.length} closure${items.length===1?'':'s'} saved.`);
    }catch(e){
      state.closureApplying = false;
      render();
      alert('Failed to save: ' + (e && e.message ? e.message : 'could not reach the server'));
    }
  };

  const toggleClosuresBtn = document.getElementById('toggleClosures');
  if(toggleClosuresBtn) toggleClosuresBtn.onclick = ()=>{
    openOnlyPanel('showClosures');
    render();
    if(!state.closuresLoaded) loadClosures();
    // Warms the cross-date call cache in the background so each closure's
    // round-by-round timeline tooltip (buildClosureRoundTimeline(), added
    // 2026-09-27) has real data to show as soon as it's hovered, instead of
    // "no round history on file yet" until By Handler happens to be opened
    // first (which was the only other place this cache used to get filled).
    if(!_allRowsAcrossDatesCache) fetchAllRowsAcrossDates(false).then(()=>render());
  };

  const toggleExpectedClosuresBtn = document.getElementById('toggleExpectedClosures');
  if(toggleExpectedClosuresBtn) toggleExpectedClosuresBtn.onclick = ()=>{
    openOnlyPanel('showExpectedClosures');
    render();
    if(!state.expectedClosuresLoaded) loadExpectedClosures();
  };

  const toggleDataHealthBtn = document.getElementById('toggleDataHealth');
  if(toggleDataHealthBtn) toggleDataHealthBtn.onclick = ()=>{
    const wasOpen = state.showDataHealth;
    openOnlyPanel('showDataHealth');
    render();
    if(!wasOpen && (state.closuresPerformance===null || state.woiAgingData===null || state.stuckPipelineData===null || state.finalRoundNudgeData===null)){
      runDataHealthScan();
    }
  };
  const toggleDailyDigestBtn = document.getElementById('toggleDailyDigest');
  if(toggleDailyDigestBtn) toggleDailyDigestBtn.onclick = ()=>{
    const wasOpen = state.showDailyDigest;
    openOnlyPanel('showDailyDigest');
    render();
    if(!wasOpen && (state.closuresPerformance===null || state.woiAgingData===null || state.stuckPipelineData===null || state.finalRoundNudgeData===null)){
      runDataHealthScan();
    }
  };
  const toggleEodWrapupBtn = document.getElementById('toggleEodWrapup');
  if(toggleEodWrapupBtn) toggleEodWrapupBtn.onclick = ()=>{
    openOnlyPanel('showEodWrapup');
    render();
    if(!state.tomorrowPreview && !state.tomorrowPreviewLoading) loadTomorrowPreview();
  };
  const toggleTimeSensitiveAlertsBtn = document.getElementById('toggleTimeSensitiveAlerts');
  if(toggleTimeSensitiveAlertsBtn) toggleTimeSensitiveAlertsBtn.onclick = ()=>{ toggleTimeSensitiveAlerts(); };
  const openDailyDigestBannerBtn = document.getElementById('openDailyDigestBannerBtn');
  if(openDailyDigestBannerBtn) openDailyDigestBannerBtn.onclick = ()=>{
    state.showDailyDigestBanner = false;
    openOnlyPanel('showDailyDigest');
    render();
    if(state.closuresPerformance===null || state.woiAgingData===null || state.stuckPipelineData===null || state.finalRoundNudgeData===null){
      runDataHealthScan();
    }
  };
  const dismissDailyDigestBannerBtn = document.getElementById('dismissDailyDigestBannerBtn');
  if(dismissDailyDigestBannerBtn) dismissDailyDigestBannerBtn.onclick = ()=>{
    state.showDailyDigestBanner = false;
    render();
  };
  const runDataHealthScanBtn = document.getElementById('runDataHealthScan');
  if(runDataHealthScanBtn) runDataHealthScanBtn.onclick = runDataHealthScan;
  document.querySelectorAll('[data-datahealth-open]').forEach(btn=>{
    btn.onclick = ()=>{
      const action = btn.dataset.datahealthOpen;
      if(action === 'closures'){
        openOnlyPanel('showClosures');
        state.closuresView = 'byHandler';
      } else if(action.indexOf('notif:') === 0){
        openOnlyPanel('showNotifications');
        state.notifTab = action.slice('notif:'.length);
      } else if(action === 'conflicts'){
        openOnlyPanel('showConflicts');
      }
      render();
    };
  });

  // ---------- 🔍 Quick Search modal (2026-09-28) ----------
  // Deliberately does NOT go through openOnlyPanel()/closeAllPanels() —
  // it's a floating overlay independent of the panel system on purpose, so
  // opening or closing it never disturbs whatever panel or board state was
  // already on screen. See renderQuickSearchModal() for the full reasoning.
  const toggleQuickSearchBtn = document.getElementById('toggleQuickSearch');
  if(toggleQuickSearchBtn) toggleQuickSearchBtn.onclick = ()=>{
    state.showQuickSearchModal = true;
    render();
    const input = document.getElementById('quickSearchInput');
    if(input) input.focus();
  };
  const closeQuickSearchBtn = document.getElementById('closeQuickSearchBtn');
  if(closeQuickSearchBtn) closeQuickSearchBtn.onclick = ()=>{
    state.showQuickSearchModal = false;
    render();
  };
  const quickSearchOverlay = document.getElementById('quickSearchOverlay');
  if(quickSearchOverlay) quickSearchOverlay.onclick = (e)=>{
    // Same "clicking the backdrop itself (not the card) closes it" pattern
    // the swipe-assign picker overlay already uses.
    if(e.target.id === 'quickSearchOverlay'){
      state.showQuickSearchModal = false;
      render();
    }
  };
  const runQuickSearchBtn = document.getElementById('runQuickSearchBtn');
  if(runQuickSearchBtn) runQuickSearchBtn.onclick = async ()=>{
    const input = document.getElementById('quickSearchInput');
    await executeUniversalSearch(input ? input.value : '');
    const inputAgain = document.getElementById('quickSearchInput');
    if(inputAgain) inputAgain.focus();
  };
  const quickSearchInput = document.getElementById('quickSearchInput');
  if(quickSearchInput) quickSearchInput.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){ e.preventDefault(); document.getElementById('runQuickSearchBtn').click(); }
  });
  document.querySelectorAll('[data-jump-to-quick-search-date]').forEach(btn=>{
    btn.onclick = ()=>{ jumpToDateFromQuickSearch(btn.dataset.jumpToQuickSearchDate); };
  });
  // A distinct attribute from the full panel's own [data-view-timeline] —
  // opening the Candidate Profile panel underneath doesn't automatically
  // close this independent overlay, so this closes it first.
  document.querySelectorAll('[data-quicksearch-view-timeline]').forEach(btn=>{
    btn.onclick = ()=>{
      state.showQuickSearchModal = false;
      openCandidateProfile(btn.dataset.quicksearchViewTimeline);
    };
  });

  const addRosterBtn = document.getElementById('addRosterBtn');
  const teamSelect = document.getElementById('newRosterTeam');
  if(teamSelect) teamSelect.onchange = ()=>{
    const advInput = document.getElementById('newRosterAdvanced');
    if(!advInput) return;
    advInput.checked = teamSelect.value === 'Development Team';
  };
  if(addRosterBtn) addRosterBtn.onclick = ()=>{
    const nameInput = document.getElementById('newRosterName');
    const teamInput = document.getElementById('newRosterTeam');
    const advInput = document.getElementById('newRosterAdvanced');
    const errEl = document.getElementById('rosterAddError');
    const name = nameInput.value.trim();
    const team = teamInput.value.trim();
    if(!name){
      if(errEl) errEl.textContent = 'Type a name first.';
      return;
    }
    if(!team){
      if(errEl) errEl.textContent = 'Type or pick a team first.';
      return;
    }
    if(state.roster.some(p=>p.name.toLowerCase()===name.toLowerCase())){
      if(errEl) errEl.textContent = `"${name}" is already in the team list — no duplicate added.`;
      return;
    }
    state.roster.push({id:uid(), name, team, advanced:advInput.checked});
    markDirty();
    render();
  };
  document.querySelectorAll('.absentCheckbox').forEach(cb=>{
    cb.onchange = ()=>{
      const id = cb.dataset.id;
      if(cb.checked){
        if(!state.absentIds.includes(id)) state.absentIds.push(id);
      } else {
        state.absentIds = state.absentIds.filter(x=>x!==id);
      }
      markDirty();
      render();
    };
  });
  document.querySelectorAll('.removeRoster').forEach(btn=>{
    btn.onclick = ()=>{
      state.roster = state.roster.filter(p=>p.id!==btn.dataset.id);
      markDirty();
      render();
    };
  });
  document.querySelectorAll('.moveTeam').forEach(sel=>{
    sel.onchange = ()=>{
      if(!sel.value) return;
      const p = state.roster.find(p=>p.id===sel.dataset.id);
      if(p){ p.team = sel.value; markDirty(); render(); }
    };
  });

  document.querySelectorAll('.row-select').forEach(cb=>{
    cb.onchange = ()=>{
      if(cb.checked) state.selectedIds.add(cb.dataset.id);
      else state.selectedIds.delete(cb.dataset.id);
      render();
    };
  });
  const selectAllRows = document.getElementById('selectAllRows');
  if(selectAllRows) selectAllRows.onchange = ()=>{
    document.querySelectorAll('.row-select').forEach(cb=>{
      if(selectAllRows.checked) state.selectedIds.add(cb.dataset.id);
      else state.selectedIds.delete(cb.dataset.id);
    });
    render();
  };
  const bulkApplyBtn = document.getElementById('bulkApplyBtn');
  if(bulkApplyBtn) bulkApplyBtn.onclick = ()=>{
    const val = document.getElementById('bulkAssignSelect').value;
    if(!val) return;
    state.rows.forEach(r=>{ if(state.selectedIds.has(r.id)) r.assignee = val; });
    state.selectedIds.clear();
    markDirty();
    render();
  };
  const distributeApplyBtn = document.getElementById('distributeApplyBtn');
  if(distributeApplyBtn) distributeApplyBtn.onclick = ()=>{
    const team = document.getElementById('distributeTeamSelect').value;
    if(!team) return;
    const members = state.roster.filter(p => p.team === team && !state.absentIds.includes(p.id));
    if(!members.length){ alert('No available (non-absent) members in that team right now.'); return; }
    const selectedRows = state.rows.filter(r => state.selectedIds.has(r.id));
    selectedRows.forEach((r, idx) => {
      r.assignee = members[idx % members.length].name;
    });
    state.selectedIds.clear();
    markDirty();
    render();
  };
  const bulkMarkOnsiteBtn = document.getElementById('bulkMarkOnsiteBtn');
  if(bulkMarkOnsiteBtn) bulkMarkOnsiteBtn.onclick = ()=>{
    state.rows.forEach(r=>{ if(state.selectedIds.has(r.id)) r.onsite = true; });
    state.selectedIds.clear();
    markDirty();
    render();
  };
  const bulkMarkWoiBtn = document.getElementById('bulkMarkWoiBtn');
  if(bulkMarkWoiBtn) bulkMarkWoiBtn.onclick = ()=>{
    state.rows.forEach(r=>{
      if(!state.selectedIds.has(r.id)) return;
      r.woi = true;
      r.assignee = ''; // same rule as the per-row WOI toggle — WOI calls have no assignee
    });
    state.selectedIds.clear();
    markDirty();
    render();
  };
  const bulkDeleteBtn = document.getElementById('bulkDeleteBtn');
  if(bulkDeleteBtn) bulkDeleteBtn.onclick = async ()=>{
    const count = state.selectedIds.size;
    if(!count) return;
    if(!confirm(`Delete ${count} selected call(s)? A backup is saved first, so this can be undone from 🕐 Backups if needed.`)) return;
    await createBackup('pre-bulk-delete', state.date, state.rows);
    state.rows = state.rows.filter(r => !state.selectedIds.has(r.id));
    state.selectedIds.clear();
    markDirty();
    render();
    await saveAllChanges();
  };
  // Coverage graph bars are clickable — jump straight to the matching
  // calls in the table below instead of manually scrolling up to check
  // the graph, then back down to actually assign something.
  document.querySelectorAll('.hour[data-bucket]').forEach(bar=>{
    bar.onclick = ()=>{
      // Touch devices have no hover at all, so the rich tooltip (team
      // booking numbers, the exact times within this slot, 2nd round
      // names) would otherwise be completely inaccessible there — show
      // it first, then still jump to the matching calls below.
      const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
      if(isTouch){
        const info = bar.getAttribute('title');
        if(info) alert(info);
      }
      const bucket = bar.getAttribute('data-bucket');
      const targetRow = document.querySelector(`tr[data-bucket="${CSS.escape(bucket)}"]`);
      if(!targetRow){
        // The calls in that slot might be in a different tab (e.g. 2nd
        // Round while viewing 1st Round) — switch to All Calls so
        // there's always somewhere for them to actually be found.
        if(state.view !== 'all'){ state.view = 'all'; render(); }
        setTimeout(()=>{
          const retry = document.querySelector(`tr[data-bucket="${CSS.escape(bucket)}"]`);
          if(retry){ retry.scrollIntoView({behavior:'instant', block:'center'}); retry.classList.add('row-jump-highlight'); setTimeout(()=>retry.classList.remove('row-jump-highlight'), 3000); }
        }, 50);
        return;
      }
      targetRow.scrollIntoView({behavior:'instant', block:'center'});
      targetRow.classList.add('row-jump-highlight');
      setTimeout(()=>targetRow.classList.remove('row-jump-highlight'), 3000);
    };
  });
  const bulkClearBtn = document.getElementById('bulkClearBtn');
  if(bulkClearBtn) bulkClearBtn.onclick = ()=>{ state.selectedIds.clear(); render(); };
  const moveToDateBtn = document.getElementById('moveToDateBtn');
  if(moveToDateBtn) moveToDateBtn.onclick = async ()=>{
    const input = document.getElementById('moveToDateInput');
    const targetDate = input ? input.value : '';
    if(!targetDate){ alert('Pick a date to move these calls to.'); return; }
    if(targetDate === state.date){ alert('That\u2019s the same date these calls are already on.'); return; }
    if(!confirm(`Move ${state.selectedIds.size} selected call(s) from ${state.date} to ${targetDate}? Both dates are backed up automatically first, so this can be undone from \ud83d\udd50 Backups if needed.`)) return;
    try{
      const result = await moveSelectedRowsToDate(targetDate);
      alert(`Moved ${result.movedCount} call(s) to ${targetDate} (${result.targetTotal} total there now).`);
    }catch(e){
      alert('Move failed: ' + e.message);
    }
  };

  document.querySelectorAll('.pin-toggle').forEach(btn=>{
    btn.onclick = ()=>{
      const id = btn.dataset.id;
      if(state.expandedDetailIds.has(id)) state.expandedDetailIds.delete(id);
      else state.expandedDetailIds.add(id);
      render();
    };
  });
  document.querySelectorAll('.expect-closure-btn').forEach(btn=>{
    btn.onclick = ()=>{
      state.expectClosureRowId = btn.dataset.expectclosure;
      state.expectClosureError = null;
      render();
    };
  });
  const expectClosureOverlay = document.getElementById('expectClosureSheetOverlay');
  if(expectClosureOverlay){
    expectClosureOverlay.onclick = (e)=>{
      if(e.target === expectClosureOverlay){ state.expectClosureRowId = null; render(); }
    };
    const expectClosureCancelBtn = document.getElementById('expectClosureCancelBtn');
    if(expectClosureCancelBtn) expectClosureCancelBtn.onclick = ()=>{ state.expectClosureRowId = null; state.expectClosureError = null; render(); };
    const expectClosureSaveBtn = document.getElementById('expectClosureSaveBtn');
    if(expectClosureSaveBtn) expectClosureSaveBtn.onclick = async ()=>{
      const row = state.rows.find(r=>r.id===state.expectClosureRowId);
      if(!row) return;
      const noteInput = document.getElementById('expectClosureNoteInput');
      const note = noteInput ? noteInput.value.trim() : '';
      state.expectClosureSaving = true;
      state.expectClosureError = null;
      render();
      try{
        await saveExpectedClosure({ id: row.id, candidate: row.candidate, company: row.company, round: row.round, note });
        state.expectClosureSaving = false;
        state.expectClosureRowId = null;
        render();
      }catch(e){
        state.expectClosureSaving = false;
        state.expectClosureError = (e && e.message) ? e.message : 'Could not save this flag — try again.';
        render();
      }
    };
  }
  document.querySelectorAll('.pin-interviewer').forEach(input=>{
    input.addEventListener('input', ()=>{
      const row = state.rows.find(r=>r.id===input.dataset.id);
      if(!row) return;
      row.interviewer = input.value;
      markDirty();
    });
  });
  document.querySelectorAll('.pin-technical-poc').forEach(input=>{
    input.addEventListener('input', ()=>{
      const row = state.rows.find(r=>r.id===input.dataset.id);
      if(!row) return;
      row.technicalPOC = input.value;
      markDirty();
    });
  });
  document.querySelectorAll('.pin-importance').forEach(input=>{
    input.addEventListener('input', ()=>{
      const row = state.rows.find(r=>r.id===input.dataset.id);
      if(!row) return;
      row.importance = input.value;
      markDirty();
    });
  });
  document.querySelectorAll('.pin-candidate-first-interview').forEach(cb=>{
    cb.onchange = ()=>{
      const row = state.rows.find(r=>r.id===cb.dataset.id);
      if(!row) return;
      row.candidateFirstInterview = cb.checked;
      markDirty();
    };
  });
  document.querySelectorAll('.driving-person-select').forEach(sel=>{
    // The cached (common-case) option markup this select was built from
    // has no 'selected' baked in — apply the real value here instead.
    sel.value = sel.dataset.drivingValue || '';
    sel.onchange = async ()=>{
      const row = state.rows.find(r=>r.id===sel.dataset.id);
      if(!row) return;
      row.drivingPerson = sel.value;
      // Deliberately NOT markDirty(), and deliberately NOT calling render()
      // here. This field saves itself immediately via its own dedicated
      // endpoint (saveDrivingPersons), completely separate from the batched
      // "Save changes" flow — tying it to the general dirty flag would
      // leave that flag stuck on forever for a Team Lead account, since
      // their Save button is hidden entirely, and the browser's "unsaved
      // changes" warning would fire on every page leave even though
      // nothing was actually unsaved. Skipping render() means the select
      // element itself survives long enough to show the brief "saved"
      // confirmation below — a full re-render would destroy and recreate
      // it before that timeout ever fires.
      sel.classList.remove('driving-person-saved', 'driving-person-save-error');
      sel.classList.add('driving-person-saving');
      try{
        await saveDrivingPersons();
        sel.classList.remove('driving-person-saving');
        sel.classList.add('driving-person-saved');
        setTimeout(()=>sel.classList.remove('driving-person-saved'), 1200);
      }catch(e){
        sel.classList.remove('driving-person-saving');
        sel.classList.add('driving-person-save-error');
        alert('Driving Person was updated locally, but saving to the server failed: ' + (e && e.message ? e.message : e));
      }
    };
  });

  // PERFORMANCE: this used to be document.querySelectorAll('tbody tr')
  // .forEach(...) with its own nested per-field loop — on a busy day (80+
  // rows × up to 8 fields each, plus 5 more per-row button lookups) that
  // was 700+ individual addEventListener calls happening on EVERY single
  // render, each creating a fresh closure. Delegation fixes this at the
  // root: one listener per event type, attached to #app ONCE ever (guarded
  // by tableDelegationSetup below), not once per render — it keeps working
  // after every future re-render because #app itself is never replaced,
  // only its innerHTML contents are; the listener just keeps bubbling
  // events up from whatever is in there now. Row/field identity is read
  // fresh from the DOM (closest tr[data-id], dataset.field) at the moment
  // each event fires, so it's never stale even though the DOM nodes
  // underneath get rebuilt on every render.
  if(!window.__tableDelegationSetup){
    window.__tableDelegationSetup = true;
    const appEl = document.getElementById('app');

    function handleFieldEvent(e){
      const input = e.target;
      if(!input.matches('[data-field]')) return;
      const field = input.dataset.field;
      // Exactly replicates the original per-element event-type choice
      // (SELECT/checkbox/time -> change, everything else -> input) so a
      // plain text field's blur-triggered 'change' (which also bubbles)
      // doesn't re-run this a second time right after its own 'input'.
      const expectedEvt = (input.tagName==='SELECT' || input.type==='checkbox' || field==='time') ? 'change' : 'input';
      if(e.type !== expectedEvt) return;
      // Also matches `[data-quicksearch-id]` (2026-09-28) — the 🔍 Quick
      // Search modal's inline "Assigned to" dropdown is wrapped in a plain
      // `<div data-quicksearch-id="...">` (not a `<tr>` — a bare `<tr>`
      // outside a `<table>` gets silently dropped by the HTML parser), so it
      // can reuse this exact same save path instead of a copy of the
      // assignee-saving logic. Deliberately a NEW, distinct attribute rather
      // than widening this to a bare `[data-id]` — some unrelated inputs
      // elsewhere (e.g. Students Master's own fields) carry a `data-id` of
      // their own for a completely different purpose, and would have
      // wrongly started matching here too.
      const tr = input.closest('tr[data-id]') || input.closest('[data-quicksearch-id]');
      if(!tr) return;
      const id = tr.dataset.id || tr.dataset.quicksearchId;
      const row = state.rows.find(r=>r.id===id);
      if(!row) return;
      if(field==='woi'){
        row.woi = input.checked;
        if(row.woi) row.assignee='';
      } else if(field==='onsite'){
        row.onsite = input.checked;
      } else if(field==='assignee'){
        if(input.value === CUSTOM_ASSIGNEE_SENTINEL){
          const typed = prompt('Type the person\'s name (for someone not in the roster, e.g. a Development Team member added manually):', row.assignee && row.assignee !== CUSTOM_ASSIGNEE_SENTINEL ? row.assignee : '');
          if(typed && typed.trim()){ row.assignee = typed.trim(); hapticTap(); }
          // Cancelled or blank — leave the previous assignee untouched.
        } else {
          row.assignee = input.value;
          if(input.value) hapticTap();
        }
      } else {
        row[field] = input.value;
      }
      markDirty();
      if(field==='woi' || field==='assignee' || field==='time' || field==='onsite'){
        render();
        // Fast sequential assigning: after picking someone, jump straight to
        // the next still-unassigned row's dropdown instead of requiring a
        // manual click each time. Skipped for the 🔍 Quick Search modal's
        // own dropdown (input.closest('tr') is null there, since it's a
        // plain div, not a table row) — auto-focusing some other, hidden
        // row underneath the still-open modal would just be confusing.
        if(field==='assignee' && input.value && input.closest('tr')){
          const selects = Array.from(document.querySelectorAll('select[data-field="assignee"]'));
          const currentIdx = selects.findIndex(s => s.closest('tr') && s.closest('tr').dataset.id === id);
          for(let i = currentIdx+1; i < selects.length; i++){
            if(selects[i].classList.contains('empty')){ selects[i].focus(); break; }
          }
        }
      }
    }
    appEl.addEventListener('input', handleFieldEvent);
    appEl.addEventListener('change', handleFieldEvent);

    appEl.addEventListener('click', async (e)=>{
      const tr = e.target.closest('tr[data-id]');
      if(!tr) return;
      const id = tr.dataset.id;

      const delBtn = e.target.closest('[data-del]');
      if(delBtn){
        deleteCallRow(id);
        return;
      }
      const quickActionBtn = e.target.closest('[data-quickaction]');
      if(quickActionBtn){
        state.quickActionRowId = id;
        render();
        return;
      }
      const resolveBtn = e.target.closest('.resolve-doubt');
      if(resolveBtn){
        const row = state.rows.find(r=>r.id===id);
        if(row){ row.doubts = []; markDirty(); render(); }
        return;
      }
      const clearStatusBtn = e.target.closest('.clear-status-btn');
      if(clearStatusBtn){
        const row = state.rows.find(r=>r.id===id);
        if(!row || !row.status) return;
        const label = statusBadgeInfo(row.status).label.toLowerCase();
        if(!confirm(`Clear the "${label}" tag from "${row.candidate||'this call'}"? The call itself stays exactly where it is (including in the 2nd Round tab) — only the ${label} status is removed.`)) return;
        row.status = '';
        row.statusFields = [];
        render();
        try{ await saveCallStatuses(); }
        catch(e){ alert('Cleared locally, but saving to the server failed: ' + (e && e.message ? e.message : e)); }
        return;
      }
      const moveBtn = e.target.closest('.move-2nd');
      if(moveBtn){
        const row = state.rows.find(r=>r.id===id);
        if(row){
          const teamNames = new Set(state.roster.map(p=>p.team));
          row.round = '2nd Round';
          // Only clear a TEAM-level assignment (e.g. "HYD Team") — that
          // default doesn't carry over to 2nd round & above, which needs a
          // named person. But if an individual was already assigned, keep
          // them — clearing it unconditionally was flipping the row to
          // red/"unassigned" even when someone was already correctly on it.
          if(teamNames.has(row.assignee)) row.assignee = '';
          markDirty(); render();
        }
        return;
      }
      const moveBtn1st = e.target.closest('.move-1st');
      if(moveBtn1st){
        const row = state.rows.find(r=>r.id===id);
        if(row){
          // Unlike the reverse (→2nd), a 1st round call can be handled by
          // either a team or an individual just fine — no need to clear the
          // assignee here, whoever's already on it stays on it.
          row.round = '1st';
          markDirty(); render();
        }
        return;
      }
    });
  }
  // The Assigned To select's cached (common-case) option markup has no
  // 'selected' baked in — apply the real value on every render (this part
  // genuinely does need to run every render, unlike the listeners above,
  // since it's populating freshly-inserted DOM with the right value).
  document.querySelectorAll('select[data-field="assignee"]').forEach(sel=>{
    sel.value = sel.dataset.assigneeValue || '';
  });
  // FIX (2026-09-29): "smooth UI" report — open the 📊 Reports (or 🔧
  // Admin) dropdown, then scroll, and the whole page scrolls out from
  // under the (absolutely-positioned, not viewport-anchored) dropdown
  // instead of the dropdown itself, which reads as broken/disconnected.
  // Two real, related gaps caused this: clicking anywhere outside either
  // dropdown never closed it on desktop (only clicking an item inside it
  // did — the `.more-menu-backdrop` element exists in the markup but is
  // `display:none` outside the mobile media query, so it was already
  // dead on desktop), and nothing ever stopped the page underneath from
  // scrolling while any of these floating surfaces was open. Set up once
  // (guarded, same pattern as the row-field delegation above) rather than
  // re-attached every render, since #app is never replaced wholesale.
  if(!window.__outsideMenuCloseSetup){
    window.__outsideMenuCloseSetup = true;
    document.addEventListener('click', (e)=>{
      if(!state.showMoreMenu && !state.showToolsMenu && !state.showImportMenu && !state.showNavAddMenu) return;
      if(e.target.closest('.more-menu-wrap')) return; // click was on the toggle button or inside the dropdown itself
      if(e.target.closest('#navAdd')) return; // click was on the bottom-nav ＋ toggle button itself
      state.showMoreMenu = false;
      state.showToolsMenu = false;
      state.showImportMenu = false;
      state.showNavAddMenu = false;
      render();
    }, true); // capture phase: fires before the item's own click handler closes it, so this never double-closes-then-reopens
  }
}
// See the FIX note above attachHandlers()'s outside-click listener — same
// underlying "nothing stops the page scrolling underneath a floating
// surface" gap. Locks html/body scroll whenever the Reports/Admin
// dropdown, the Quick Search modal, or the swipe-assign picker overlay is
// open, so scrolling (wheel, trackpad, touch) while one of these is open
// moves that surface's own content if it has any to scroll, never the
// page underneath. Called at the end of every render() — cheap (one
// classList check) and idempotent, so it's safe to call unconditionally
// rather than tracking a separate "did this change" flag.
function updateBodyScrollLock(){
  // FIX (2026-09-29, part 2): showClipboardPicker uses the exact same
  // fixed-fullscreen ".my-name-picker-overlay" pattern as the swipe-assign
  // picker and Quick Search (same backdrop-click-to-close behavior already
  // wired for it too — see the clipboardPickerOverlay handler), but was
  // missed from this list when it was first written, so opening it left the
  // page scrollable underneath it same as the original reported bug.
  const shouldLock = !!(state.showMoreMenu || state.showToolsMenu || state.showImportMenu || state.showNavAddMenu || state.showQuickSearchModal || state.showSwipeAssignPicker || state.showClipboardPicker || state.quickActionRowId || state.showQuickJump || state.expectClosureRowId);
  document.documentElement.classList.toggle('scroll-locked', shouldLock);
}

// ---------- seed today's real data (one-time convenience) ----------
const SEED_DATE = '2026-08-10';

const IMPORTANT_SEED_TEXT = `Thrayamba Keswar(Uk) - On site - Interview - Crowd House Energy Ltd - 2.30pm IST(1hr)(2nd round)(elaborated)

1. Vamsi Rokkam (UK)(Systems Analyst) – Interview – Aptia Group – 2:30 PM IST – Duration: 30 Mins (4th Round – Discussion Round) (Rescheduled from 7th Aug) -> pavan
2. Meghana B (UK)(Senior Credit & Commercial Strategy Analyst) – Interview – Liberis – 3:30 PM IST – Duration: 45 Mins (2nd Round) -> dilip, Manager
3. Reshma rajesh Meedemula (UK)(Business Analyst (Finance)) – Interview – Mydentist – 4:00 PM IST – Duration: 1 Hr (2nd Round) -> karthik
4. Reshma Shaik (UK)(Senior Data Analyst ) – Interview – M and M Direct – 4:00 PM IST – Duration: 45 Mins (1st Round) -> karthik
5. Naga Bhargav Kumar (UK)(Market Pricing Analyst) – Interview – AXA – 4:30 PM IST – Duration: 60 Mins (2nd Round) -> dilip, pricing managers
6. Zeeshan(INFORMATION SECURITY ANALYST) – Interview – State of Florida – 6:30 PM IST – Duration: 45 Mins (2nd Round) -> Kumar -> Technical round
7. Gnana Prakash Bandi(Sales Strategy Analyst) – Interview – Tata Consumer Products – 7:00 PM IST – Duration: 60 Mins (2nd Round) -> pavan- manager round 
8. Benhur Ruchitha Mamidi(Patient Services Data Analyst) – Interview – BayCare – 7:30 PM IST – Duration: 30 Mins (2nd Round) -> gopi
9. Devi Annamreddy(Senior Consultant, Full Stack Engineer (Node.js/Re act/Typescript/AWS)) – Interview – Infinitive – 7:30 PM IST – Duration: 45 Mins (2nd Round) ->pavan- technical  -Mohamed Elgazar (Senior Consultant)
10. Lohith Kukkdapu(Product Analyst) – Interview – SAMBA – 8:00 PM IST – Duration: 30 Mins (3rd Round) -> dilip, director, 
11. Lohith Cheedalla(Business Solutions Analyst) – Interview – Edens – 8:30 PM IST – Duration: 45 Mins (2nd Round) (Need Developer) -> dilip, system analyst and business analyst

12. Varsha Reddy Veerati(MEL Associate, Program Analytics and Learning Unit (PALU)) – Interview – MCD Global Health – 8:30 PM IST – Duration: 1 Hr (2nd Round) -> gopi-David Galick, Duncan McFarland Digital Health Tools and Information Systems  & Jordan SmithMonitoring, Evaluation and Learning Advisor 
13. Achyuth Gowtham Kari(Workforce Analysis HR Tech Analyst II) – Interview – Children's Hospital of Philadelphia – 9:30 PM IST – Duration: 45 Mins (3rd Round) (Need Developer) -> gopi
14. Karri Tejaswini(Data & Analytics Engineer) – Interview – Trueclassic – 9:30 PM IST – Duration: 60 Mins (1st Round) -> 
15. Bhanu Prakash Sunke – Technical Interview – Chime – 10:15 PM IST – Duration: 45 Mins (3rd Round) -> Kumar -> 
16. Rahul Mithinti – Interview – Columbia Bank – 10:30 PM IST – Duration: 45 Mins (2nd Round)
17. Vasavi Ramya Gajula(SHEQ Software Developer) – Interview – Linde – 10:30 PM IST – Duration: 1 Hr (1st Round) (Technical Interview) -> pavan
18. Shivendra Gupta – Interview – Infinite Computer Solutions – 10:30 PM IST – Duration: 60 Mins (1st Round) → Karthik → Pandi Murugesan (Senior Test Lead)
19. Sai Preetham D – Interview – Visa Technology and Operations LLC – 11:00 PM IST – Duration: 60 Mins (3rd/Final Round) (Need Developer) (System Design Round) -> Kumar
20. Kiran Biradar (UK) Enterprise Solutions Engineer – Interview – Dash0 – 12:00 AM IST – Duration: 60 Mins (2nd Round) -> Kumar -> Technical Interview
21. Akshay Kumar Jangala(Workforce Analysis HR Tech Analyst II) – Interview – Children's Hospital of Philadelphia – 1:30 AM IST – Duration: 45 Mins (3rd Round) -> gopi
22. Naga Ragu Jetti(full stack ) – Interview – Workday – 2:30 AM IST – Duration: 90 Mins (2nd Round – Coding/Loop Round) -> Pavan
23. Akshitha Goud – Interview – GreenPath Financial Wellness – 11.10 PM IST (2nd round, 30 mins, elaborated)`;

const MASTER_SEED_TEXT = `1.	Sweta Sridhar (UK) – Phone Call – Mundi Pharma – 2:00 PM IST – Duration: 15 Mins (1st Round) (Candidate 1st Interview)
2.	Vamsi Rokkam (UK) – Interview – Aptia Group – 2:30 PM IST – Duration: 30 Mins (4th Round – Discussion Round) (Rescheduled from 7th Aug)
3.	Surya Teja Gowd Ayinavilli (Ireland) – Interview – PwC – 3:00 PM IST – Duration: 30 Mins (1st Round)
4.	Meghana B (UK) – Interview – Liberis – 3:30 PM IST – Duration: 45 Mins (2nd Round)
5.	Reshma Meedemula (UK) – Interview – Mydentist – 4:00 PM IST – Duration: 1 Hr (2nd Round)
6.	Reshma Shaik (UK) – Interview – M and M Direct – 4:00 PM IST – Duration: 45 Mins (1st Round)
7.	Steffy Metilda Jerom Mohan (Ireland) – Phone Interview – LotusWorks – 4:00 PM IST – Duration: 20 Mins (1st Round)
8.	Naga Bhargav Kumar (UK) – Interview – AXA – 4:30 PM IST – Duration: 60 Mins (2nd Round)
9.	Vasavi Ramya Gajula – Interview – Deltek – 4:30 PM IST – Duration: 30 Mins (1st Round)
10.	Sunil Kumar Pasupuleti (Canada) – Phone Interview – Clio – 6:00 PM IST – Duration: 30 Mins (1st Round)
11.	Lavanya Akiri – Interview – Unit8 SA – 6:15 PM IST – Duration: 30 Mins (1st Round)
12.	Rohit Gunnam – Interview – Beacon Specialized Living – 6:30 PM IST – Duration: 30 Mins (1st Round)
13.	Zeeshan – Interview – State of Florida – 6:30 PM IST – Duration: 45 Mins (2nd Round)
14.	Praneetha Sate – Interview – Duke University Health System – 6:30 PM IST – Duration: 30 Mins (1st Round)
15.	Bhuvanesh Marneni – Interview – IT Tech Recruitment – 6:30 PM IST – Duration: 30 Mins (1st Round)
16.	Sri Mayur Dasari – Interview – EXL – 6:30 PM IST – Duration: 30 Mins (1st Round)
17.	Gnana Prakash Bandi – Interview – Tata Consumer Products – 7:00 PM IST – Duration: 60 Mins (2nd Round)
18.	Varsha Reddy Veerati – Interview – BayCare Health System – 7:00 PM IST – Duration: 30 Mins (1st Round)
19.	Jyothi Lohith Kumar Mamidi – Interview – Scotts – 7:20 PM IST – Duration: 30 Mins (1st Round)
20.	Venkata Sai Shashi Kumar Yella – Interview – Olympia – 7:30 PM IST – Duration: 30 Mins (1st Round)
21.	Sai Sampath N – Interview – American Express – 7:30 PM IST – Duration: 15 Mins (1st Round)
22.	Havila Penumaka – Interview – Anchorage Digital – 7:30 PM IST – Duration: 30 Mins (1st Round)
23.	Benhur Ruchitha Mamidi – Interview – BayCare – 7:30 PM IST – Duration: 30 Mins (2nd Round)
24.	Varun Venaganti – Interview – University of Texas – 7:30 PM IST – Duration: 30 Mins (1st Round)
25.	Devi Annamreddy – Interview – Infinitive – 7:30 PM IST – Duration: 45 Mins (2nd Round)
26.	Karri Tejaswini – Phone Interview – Stevemadden – 7:30 PM IST – Duration: 15 Mins (1st Round) (Candidate 1st Interview)
27.	Lohith Kukkdapu – Interview – SAMBA – 8:00 PM IST – Duration: 30 Mins (3rd Round)
28.	Prema Kumar Ravipalli – Interview – Martin Marietta – 8:00 PM IST – Duration: 30 Mins (1st Round)
29.	Lohith Cheedalla – Interview – Edens – 8:30 PM IST – Duration: 45 Mins (2nd Round) (Need Developer)
30.	Venkata Koushik Reddy Varikoti – Interview – HD Supply – 8:30 PM IST – Duration: 30 Mins (1st Round)
31.	Varsha Reddy Veerati – Interview – MCD Global Health – 8:30 PM IST – Duration: 1 Hr (2nd Round)
32.	Lokesh Pathipati – Interview – Salt River Pima-Maricopa Indian Community – 8:30 PM IST – Duration: 1 Hr (1st Round)
33.	Nikhil Darisa – Interview – American Express – 8:30 PM IST – Duration: 15 Mins (1st Round)
34.	Sailaja M – Interview – Everforth Apex – 8:30 PM IST – Duration: 30 Mins (1st Round)
35.	Nikhil Kumar Chandra – Interview – FedEx – 8:50 PM IST – Duration: 15 Mins (1st Round)
36.	Navya Sri Mulukuntla – Interview – Whirlpool – 9:00 PM IST – Duration: 30 Mins (1st Round) (Candidate 1st Interview)
37.	Robin Jangam – Interview – Humana – 9:00 PM IST – Duration: 30 Mins (1st Round)
38.	Deva Kalyan A – Interview – PPG – 9:00 PM IST – Duration: 30 Mins (1st Round)
39.	Jayanth Kethineni – Interview – Better Impact – 9:05 PM IST – Duration: 30 Mins (1st Round)
40.	Nikhil Darisa – Interview – Health Colorado – 9:15 PM IST – Duration: 30 Mins (1st Round)
41.	Achyuth Gowtham Kari – Interview – Children's Hospital of Philadelphia – 9:30 PM IST – Duration: 45 Mins (3rd Round) (Need Developer)
42.	Mahnoor Hasan – Interview – PG&E – 9:30 PM IST – Duration: 30 Mins (1st Round)
43.	Pravallika Obulapuram – Interview – PGT Solutions – 9:30 PM IST – Duration: 30 Mins (1st Round)
44.	Ajay Lakkuntla – Interview – Capital One – 9:30 PM IST – Duration: 30 Mins (1st Round)
45.	Kiran Teja Devineni – Interview – American Express – 9:30 PM IST – Duration: 30 Mins (1st Round)
46.	Vybhavi Acharya – Interview – Diamond Wipes International – 9:30 PM IST – Duration: 30 Mins (1st Round)
47.	Deepthi Vadlapati – Phone Call – University of Texas at Tyler – 9:30 PM IST – Duration: 30 Mins (1st Round)
48.	Karri Tejaswini – Interview – Trueclassic – 9:30 PM IST – Duration: 60 Mins (1st Round)
49.	Ashwan Teja (Ireland) – Phone Call – Sensiba – 9:40 PM IST – Duration: 30 Mins (1st Round)
50.	Lakshmi Prasanna Potla – Interview – Bayer – 10:00 PM IST – Duration: 30 Mins (1st Round) (Rescheduled from July 29)
51.	Soujanya Degavath – Interview – Capital One – 10:00 PM IST – Duration: 30 Mins (1st Round)
52.	Bhuvanesh Marneni – Interview – Quizlet – 10:00 PM IST – Duration: 30 Mins (1st Round)
53.	Krishna Korada – Interview – CrowdStrike – 10:00 PM IST – Duration: 30 Mins (1st Round) (Rescheduled from August 7)
54.	Bhanu Prakash Sunke – Technical Interview – Chime – 10:15 PM IST – Duration: 45 Mins (3rd Round)
55.	Sai Sushrith Yadav (Canada) – Phone Interview – OSCO Construction Group – 10:30 PM IST – Duration: 30 Mins (1st Round)
56.	Vasavi Ramya Gajula – Interview – Linde – 10:30 PM IST – Duration: 1 Hr (1st Round) (Technical Interview)
57.	Rahul Mithinti – Interview – Columbia Bank – 10:30 PM IST – Duration: 45 Mins (2nd Round)
58.	Shivendra Gupta – Interview – Infinite Computer Solutions – 10:30 PM IST – Duration: 60 Mins (1st Round)
59.	Swecha Sekhar Siddamshetty – Interview – American Express – 10:30 PM IST – Duration: 30 Mins (1st Round)
60.	Sushma Sri Kondamareddy – Interview – Physicsx – 10:30 PM IST – Duration: 30 Mins (1st Round)
61.	Navya Desham – Interview – LPL Financial – 10:30 PM IST – Duration: 30 Mins (1st Round)
62.	Sushmitha Reddy – Interview – American Airlines – 10:30 PM IST – Duration: 30 Mins
63.	Priyanka Nelluri – Interview – Extend – 10:30 PM IST – Duration: 30 Mins (1st Round)
64.	Prema Kumari Ravipalli – Interview – Vertical Relevance – 11:00 PM IST – Duration: 30 Mins (1st Round) (Rescheduled from July 7th)
65.	Sai Preetham D – Interview – Visa Technology and Operations LLC – 11:00 PM IST – Duration: 60 Mins (3rd/Final Round) (Need Developer) (System Design Round)
66.	Nag Sai Kumar Potti – Phone Interview – Charles Schwab – 11:15 PM IST – Duration: 30 Mins (1st Round)
67.	Varshini Reddy Borra – Interview – Emory University – 11:30 PM IST – Duration: 30 Mins (1st Round)
68.	Vamshi Burugupalli – Interview – LPL Financial – 11:30 PM IST – Duration: 30 Mins (1st Round) (Rescheduled from Aug 5)
69.	Mahnoor Hasan – Phone Interview – Houston Methodist – 11:30 PM IST – Duration: 30 Mins (1st Round)
70.	Devi Annamreddy – Interview – WeaveGrid – 11:30 PM IST – Duration: 30 Mins (1st Round)
71.	Chakravarthi Sangoju – Interview – Chester County Intermediate Unit – 11:30 PM IST – Duration: 30 Mins (1st Round)
72.	Vamsikrishna Parvathaneni – Interview – Skyryse – 11:30 PM IST – Duration: 30 Mins (1st Round)
73.	Akhil Bodla – Phone Interview – MSC – 11:30 PM IST – Duration: 30 Mins (1st Round)
74.	Jahnavi Battu – Interview – Health Affairs – 11:30 PM IST – Duration: 30 Mins (1st Round)
75.	Jagadish Godati – Interview – JPMorganChase – 11:45 PM IST – Duration: 30 Mins (1st Round)
76.	Ajay Babu M – Phone Call – MRO – 11:45 PM IST – Duration: 15 Mins (1st Round)
77.	Kiran Biradar (UK) – Interview – Dash0 – 12:00 AM IST – Duration: 60 Mins (2nd Round)
78.	Hanmanth Reddy Aleti – Phone Interview – FedEx – 12:00 AM IST – Duration: 30 Mins (1st Round)
79.	Rajesh Pagadala – Phone Interview – Genworth Financial – 12:00 AM IST – Duration: 15 Mins (1st Round)
80.	Satya Pavan Vignesh Veera – Phone Interview – American Association for Cancer Research – 12:00 AM IST – Duration: 30 Mins (1st Round)
81.	Jyothipriya Ramavath – Interview – Hewlett Packard Enterprise – 12:00 AM IST – Duration: 30 Mins (1st Round)
82.	Aravind Jambuka – Interview – Rainbow Energy Center – 12:00 AM IST – Duration: 60 Mins (1st Round)
83.	Ruchika Godugu – Interview – Liberty Mutual – 12:15 AM IST – Duration: 30 Mins (1st Round)
84.	Durga Lakshmi Bala Subash Sriram – Phone Interview – FedEx Supply Chain – 12:30 AM IST – Duration: 30 Mins (1st Round) (Candidate First Interview)
85.	Balan Pillai – Interview – Vanguard – 12:45 AM IST – Duration: 30 Mins (1st Round)
86.	Vineeth Sai Movva – Interview – LSPedia Inc – 1:00 AM IST – Duration: 30 Mins (1st Round)
87.	Sai Sampath N – Interview – Stanford – 1:00 AM IST – Duration: 30 Mins (1st Round)
88.	Vamshi Arutala – Interview – Toyota Tsusho Systems – 1:00 AM IST – Duration: 30 Mins (1st Round)
89.	Akshay Kumar Jangala – Interview – Children's Hospital of Philadelphia – 1:30 AM IST – Duration: 45 Mins (3rd Round)
90.	Lahari Beerla – Interview – UTM – 2:00 AM IST – Duration: 30 Mins (1st Round)
91.	Naga Ragu Jetti – Interview – Workday – 2:30 AM IST – Duration: 90 Mins (2nd Round – Coding/Loop Round)
92.	Steffy Metilda Jerom Mohan (Ireland) – Phone Interview – Sensiba LLP – 2:45 AM IST – Duration: 30 Mins (1st Round)
93.	Satya Pavan Vignesh Veera – Interview – Deloitte – Waiting for Invite
94.	Lavan Kumar (Canada) – Interview – Multimatic – Waiting for Invite
95.	Pravallika Obulapuram – Interview – JSSA – Waiting for Invite (1st Round)
96.	Arunprasad Maruthachalamurthy – Phone Call – Western Governors University – Waiting for Invite (1st Round)
97.	Kushal Sai Venigalla – Interview – Bdiplus – Waiting for Invite (1st Round)`;

const MARKETING_SEED_TEXT = `*Marketing Team*
Ganesh Saini - 11.30`;

function buildAssignmentMap(text){
  const rows = parseImportText(text);
  const map = {};
  rows.forEach(r=>{
    if(!r.assignee) return;
    const key = (r.company||'').toLowerCase().trim()+'|'+(r.time||'').toLowerCase().trim();
    map[key] = r.assignee;
  });
  return map;
}

async function maybeSeedMaster(){
  if(state.date !== SEED_DATE) return;
  const flagKey = 'seeded-master-v8-'+SEED_DATE;
  try{
    const flag = await storageAdapter.get(flagKey, false);
    if(flag) return;
  }catch(e){}
  const beforeCount = state.roster.length;
  const assignMap = buildAssignmentMap(IMPORTANT_SEED_TEXT);
  const rows = parseImportText(MASTER_SEED_TEXT);
  rows.forEach(r=>{
    if(!r.assignee){
      const key = (r.company||'').toLowerCase().trim()+'|'+(r.time||'').toLowerCase().trim();
      if(assignMap[key]) r.assignee = assignMap[key];
    }
  });
  await autoRouteRows(rows, []);
  const extraRows = parseImportText(MARKETING_SEED_TEXT);
  state.rows = rows.concat(extraRows);
  if(state.roster.length !== beforeCount) await saveRoster();
  await saveDayNow();
  try{ await storageAdapter.set(flagKey, '1', false); }catch(e){}
}

// ---------- Aug 11, 2026 seed (from HYD_Team_calls.txt) ----------
const SEED_DATE_2 = '2026-08-11';
const AUG11_SEED_TEXT = `*HYD Team*
Sunnyhitha Dubbaka (UK) - 11 AM
Kiran Biradar (UK) - 1.30 (*Karthikeya*)
Praveena Vallipalli (UK) - 2.15 (*Stephen*)
Srirama Dasu (UK) - 2.30
Chaithra Talagavara Sundaresha (UK) - 2.30
Asmita Tirkey (Ireland) - 2.30
Venkata Saketh Reddy (UK) - 2.30
Reshma Shaik (UK) - 3
Chaithra Talagavara Sundaresha (UK) - 3.30
Rajesh Meedemula (UK) - 4
Anuhya Gullapudi (Ireland) - 4.30
Maneesha Gayathri S - 5.35
Rehana Palem - 6 (*Karthikeya*)
Prasath Natarajan (UK) - 6.30
Nimisha Kumar (UK) - 6.30
Chatura Vallabhaneni - 7 (*Stephen*)
Vyshnavi Reddy Poreddy (UK) - 7.30
Mydhili Palagani (UK) - 7.30
Adiraju Anusha (UK) - 7.30
Nikitha Gopu - 7.30 (*Karthikeya*)
Steffy Metilda Jerom Mohan (Ireland) - 7.30 (*Stephen*)
Kiran Biradar (UK) - 8
Ramakrishna Yarajarla - 8.30
Benhur Ruchitha Mamidi - 8.30
Gayathri Kancheti - 9
Sushma Sri Kondamareddy - 9
Swathi Konakanchi - 9.30
Sai Vardhan Jella - 10.30
Varun Venaganti - 10.30
Sumasree Bodela - 10.30
Ajay Babu Mandha - 10.30
Jeshwanth Reddy Yannam - 11.30
Shashank Reddy Pisati - 11.30
Karthikeya Tirupathi - 11.30 (*Stephen*)
Pranay Mohan Kanakabandi - 12.30 AM

@Pradeep Anna
Sai Ramya Kankampati - 6
Bhavan Teja Ammisetty - 7.30
Sinduja Bhoopathi - 7.30
Akshara Movva - 7.30
Varsha Reddy Veerati (UK) - 7.30 (*Avinash*)
Sai Chandana Panthulu - 7.30
Harith Nallam - 7.30
Rajesh Meedemula (UK) - 7.30 (*Dhruva*)
Prashanth Reddy Voladri (Ireland) - 7.30 (*Pradeep Anna*)
Pavan Kumar T - 8 (*Naresh*)
Sheba Diana Modam Reddy - 8 (*Bharath*)
Pavan Kumar T - 8.30 (*Naresh*)
Gnana Prakash Bandi - 8.30
Janani Priya K - 8.30 (*Avinash*)
Shilpitha Reddy P - 8.30
Sailaja M - 8.30
Varun Chowdary Atluri - 9
Ajay Lakkuntla - 9
Sree Nikitha Reddy - 9
Sailaja M - 9
Navya Sree Rama - 9.15
Yaseswini Pamulapati - 9.30
Srinivasa Rao Ambati - 9.30
Rajesh Yadav Golla - 9.30
Tanvi Anantula - 9.30
Narsimha Rao Vengisetti - 10
Lohith Cheedalla - 10.30
Cherishma Samala - 10.30 (*Avinash*)
Ashrith Bhooka Ravinandhan - 10.30
Ajay Kumar Pollam - 10.30
Mahnoor Hasan - 10.30
Murali Krishna Mallipudi - 10.30 (*Naresh*)
Chakravarthi Sangoju - 10.30 (*Dhruva*)
Lavan Kumar (Canada) - 11
Muhammed Shibil - 11
Swecha Sekhar Siddamshetty - 11 (*Bharath*)
Navya Desham - 11.30
Pranay Thanneru - 11.30
Tejaswaroop Renukuntla - 11.30
Vamshi Arutala - 11.30
Khadar Basha Shaik - 11.30
Tejasri Guttikonda - 11.30 (*Avinash*)
Bhanu Prakash Sunke - 11.30 (*Bharath*)
Gnana Prakash Bandi - 12 (*Pradeep Anna*)
Raghu Vamshi Goud - 12.15 AM
Srimani Kumar Gamidi - 12.30 AM
Nihal Inapanuri - 12.30 AM (*Pradeep Anna*)
Ajay Babu M - 12.30 AM (*Dhruva*)
Ganesh Sainni - 1 AM
Ruthik Reddy Damerla - 1 AM
Sushmitha Kamani - 1 AM
Sai Prasanna P - 1 AM
Prasanna Kumar N - 1.30 AM
Venkata Koushik Reddy Varikoti - 1.45 AM (*Bharath*)
Vamshi Arutala - 2 AM
Balan Pillai - 2 AM
Janani Priya K - 2.30 AM (*Pradeep Anna*)

@Sai
Shajiya Begum (UK) - 5.30
Naga Ragu Jetti -Interview - 7.30
Sujith Koneru - 9.30
Aruna Nagabhiru - 11.30

*Development Team*
Rehana Palem - 8
Vamsikrishna Parvathaneni - 9
Ashrith Bhooka Ravinandhan - 12 AM
Mahnoor Hasan - 1.15 AM
Devika Gunda - 2 AM`;

async function maybeSeedAug11(){
  if(state.date !== SEED_DATE_2) return;
  const flagKey = 'seeded-aug11-v1-'+SEED_DATE_2;
  try{
    const flag = await storageAdapter.get(flagKey, false);
    if(flag) return;
  }catch(e){}
  const beforeCount = state.roster.length;
  const rows = parseImportText(AUG11_SEED_TEXT);
  state.rows = rows;
  if(state.roster.length !== beforeCount) await saveRoster();
  await saveDayNow();
  try{ await storageAdapter.set(flagKey, '1', false); }catch(e){}
}

// ---------- Aug 12, 2026 seed (from 12th_Aug_Assignments.txt) ----------
const SEED_DATE_3 = '2026-08-12';
const AUG12_SEED_TEXT = `HYD Team
Prashanth Reddy Voladri (Ireland) - 1:30
Akhila marka (UK) - 2:00
Prem Sai Jagadish (UK) - 2:30
Shiva Shankar Orsu (Ireland) - 2:30
Meghana B (UK) - 3:00
Kiran Biradar (UK) - 3:00
Steffy Metilda Jerom Mohan (Ireland) - 3:00
Kiran Biradar (UK) - 4:00
Chivatam Eswar (UK) - 4:30
Rajesh meedemula (UK) - 4:30 (*Karthikeya*)
Asmita Tirkey (Ireland) - 5:00
Sananazneen Shaik - 5:30
Anil kumar Nagam (Ireland) - 5:30
Janani Priya k - 5:30
Akhila marka (UK) - 6:30
Sri Charan S (Ireland) - 6:30
Srirama Dasu (UK) - 6:30 (*Stephen*)
Chandan shekar Hemmanahalli (UK) - 7:00
Atharva Nirdesh Varshney (UK) - 7:15
Yashaswi Kashozhala (UK) - 7:30
Mathew kodavalli (UK) - 7:30
Sai kiran Galla (Ireland) - 7:30
Naveen Kumar Ramishetty (UK) - 8:00
Adiraju Anusha (UK) - 8:00 (*Karthikeya*)
Navya baddam - 8:00 (*Stephen*)
Naveen Kumar Ramishetty (UK) - 8:30
Kiran Biradar (UK) - 8:30
Yaseswini pamulapati - 9:30
Jyothipriya Ramavath - 10:00 (*Stephen*)
Mahesh tirumalasetti - 10:00 (*Karthikeya*)
Sailaja M - 10:00
SUNNYHITHA DUBBAKA (UK) - 10:15
Vamshi Arutala - 10:30
Sailaja M - 10:40
Ravi Teja Algubelli - 11:30 (*Stephen*)
Lavan Kumar (Canada) - 12:00

Pradeep Anna Team
Meghana B (UK) - 6:00 (*Naresh*)
Raghu vamshi goud - 6:30
Chaitanya vemula - 6:30
Arunprasad Maruthachalamurthy - 7:00
Kautik Saridey - 7:00 (*Pradeep Anna*)
Vamshi Arutala - 7:00
Jagadish gaddati - 7:00
Likitha reddy gudibandi - 7:30
Kiran teja devineni - 7:30
Sinduja bhoopathi - 7:30
Dhanush amileneni - 7:30 (*Dhruva*)
Durga Lakshmi Bala Subash Sriram - 7:30
Cherishma Samala - 7:30 (*Venkatesh*)
sai vardhan jella - 7:30
Adithya ranga sai - 7:50
Janani Priya k - 8:00 (*Avinash*)
Vamshi merugu - 8:00
Lahari beerla - 8:00
Krishna vamshi reddy ananth - 8:30
Venkata Avinash Matcha - 8:30
Madhuri veeramalla - 9:00
Mani teja Akinapalli - 9:00
Tanvi anantula - 9:20
Amulya Bellam Chowdary - 9:30
Sravan Kumar Sunketa - 9:30 (*Dhruva*)
Janani Priya k - 9:30 (*Pradeep Anna*)
Gnana prakash bandi - 9:30
Himaja Rao Adirala - 9:30
Saisnehanjali Sanike - 9:30 (*Avinash*)
Naga tarun kumar K - 9:30
Prema kumari Ravipalli - 9:45
Dasari Tejaswi - 10:00
Vamsikrishna Parvathaneni - 10:00
Mahnoor Hasan - 10:00
Ashwan teja (Ireland) - 10:30 (*Dhruva*)
sai vardhan jella - 10:30
Sinduja bhoopathi - 11:00
Ajay Babu m - 11:00 (*Pradeep Anna*)
Varsha Reddy Veerati - 11:00 (*Naresh*)
sai vardhan jella - 11:30 (*Bharath*)
Saisnehanjali Sanike - 11:30
Vamshi Krishna Reddy Attla - 11:30
chakravarthi Sangoju - 11:35
Roopal mishra - 11:45 (*Naresh*)
Ashrith Bhooka Ravinandhan - 11:50
Shaik Ikramulla Shareef - 12:00 (*Pradeep Anna*)
Sathvika ontela - 12:00
Srimani kumar gamidi - 12:30 (*Avinash*)
Rahul Mithinti - 12:30 (*Dhruva*)
Srestha Somala - 12:30 (*Venkatesh*)
Rajesh Yadav Golla - 12:30
Praneetha sate - 1:00
Ruthik reddy damerla - 1:00 (*Pradeep Anna*)
Vineeth sai movva - 1:00
Nikhil darisa - 1:00
Krishna kumar korada - 1:00
Vamsikrishna Parvathaneni - 1:15
Swathi Batta - 1:30
Vamshi Arutala - 1:30
Sailaja M - 1:30 (*Avinash*)
Sekhar Reddy Kandula - 2:00 (*Avinash*)
Keerthana satesh kumar - 2:00
Paranjay Basa - 10:00

Development Team
Sujith koneru - 9:30
Sumasree Bodela - 10:00
Srimani kumar gamidi - 10:30
Akshara movva - 12:00
Kiran Biradar (UK) - 1:00
Bhanu prakash sunke - 2:00

Sai
Naga Bhargav kumar (UK) - 3:30
Shajiya begum (UK) - 6:45
Akshay kumar jangala - 8:30
Aruna nagabhiru - 9:30
Sujith koneru - 1:30`;

async function maybeSeedAug12(){
  if(state.date !== SEED_DATE_3) return;
  const flagKey = 'seeded-aug12-v1-'+SEED_DATE_3;
  try{
    const flag = await storageAdapter.get(flagKey, false);
    if(flag) return;
  }catch(e){}
  const beforeCount = state.roster.length;
  const rows = parseImportText(AUG12_SEED_TEXT);
  state.rows = rows;
  if(state.roster.length !== beforeCount) await saveRoster();
  await saveDayNow();
  try{ await storageAdapter.set(flagKey, '1', false); }catch(e){}
}

// ---------- Aug 13, 2026 seed (from the HYD/Pradeep Anna/Development/Sai list) ----------
const SEED_DATE_4 = '2026-08-13';
const AUG13_SEED_TEXT = `*HYD Team*
Deepanshu R (Ireland) - 11:30 AM
Sai kiran Galla (Ireland) - 2:00
Keerthtana Sripathmarasa - 2:30 (*Karthikeya*)
Bharath Reddy (Ireland) - 2:30
Prem Sai Jagadish (UK) - 3:15
Steffy Metilda Jerom Mohan (Ireland) - 3:30
hekar Hemmanahalli (UK) - 3:30
Manikanta Puttoj (Ireland) - 4:00
Mathew kodavalli (UK) - 4:30
praveena vallipalli (UK) - 4:30
Naveen Kumar Ramishetty (UK) - 5:15
Yashaswi Kashozhala (UK) - 5:30
Kiran Biradar (UK) - 5:30
Prashanth Reddy Voladri (Ireland) - 5:30
Mathew kodavalli (UK) - 6:30
Prathap K (Ireland) - 7:10
Nagaraju Kante (Ireland) - 7:30
Prema kumari Ravipalli - 7:30 (*Stephen*)
Gnana prakash - 9:00
Sai Shwatha K - 9:00
Sunaina Ali Basha - 9:00
Navya sree rama - 9:30
Sravan Kumar Dama - 9:30
Prem Kumar Golla - 10:15
Saisnehanjali Sanike - 10:30
Teja Ravipati - 10:30
Sushma Reddy V - 10:30 (*Karthikeya*)
Mahesh tirumalasetti - 10:30

*Pradeep Anna Team*
Keerthana satesh kumar - 10:00
Gayathri kancheti - 6:00
Bhavani gali - 6:30 (*Dhruva*)
Varsha Reddy Veerati - 6:45 (*Avinash*)
Mahnoor Hasan - 7:30 (*Bharath*)
Mallikarjun Reddy Vuradi - 7:30
Sri Mayur Dasari - 7:30
Sai kumar battu - 8:00 (*Karthik*)
Nihal inapanuri - 8:00 (*Pradeep Anna*)
Rithika nagpal - 8:15
Jyothpriya ramavath - 8:30
Haritha nallam - 8:30 (*Avinash*)
NAVYA SRI MULUKUNTLA - 8:30 (*Naresh*)
Balan pillai - 9:00
Praneetha sate - 9:00 (*Naresh*)
Hari venkata ravi teja anumakonda - 9:10
Kiran teja devineni - 9:30
Satya Pavan vignesh veera - 9:30
Ajay Kumar Pollam - 9:30 (*Avinash*)
Prathyusha A - 9:30
Shanmukha Muppala - 10:00
Pradeep kommalapati - 10:00
Muhammed Shibil - 10:00 (*Avinash*)
Chatura vallabhaneni - 10:30
Ashrith Bhooka Ravinandhan - 10:30 (*Avinash*)
Nidumukkala Venkatesh - 10:30 (*Bharath*)
Naga ragu jetti - 10:45 (*Pradeep Anna*)
Amulya Bellam Chowdary - 11:00 (*Avinash*)
Ajay Kumar Pollam - 11:30
Bhavan teja Ammisetty - 11:30
Chatura vallabhaneni - 11:30 (*Pradeep Anna*)
Sumayya Fathima Shaik - 11:30
Varsha Reddy Veerati - 12:00 (*Avinash*)
Sai Sushrith Yadav (Canada) - 12:00 (*Bharath*)
Sai nikhil velagapudi - 12:40
Sumasree Bodela - 1:00 AM
lavanya akiri - 1:30 AM (*Pradeep Anna*)
Vasavi Ramya Gajula - 1:45 AM
Ajay lakkuntla - 2:00 AM

*Development Team*
Srikar (UK) - 8:00 (*KArthik*)
Divakar Babu KASI - 9:30
chakravarthi Sangoju - 11:30

*Sai*
Reshma Shaik (UK) - 2:30
Prathap K (Ireland) - 3:30
Naveen Kumar Ramishetty (UK) - 6:00
Reshma shaik (UK) - 7:00
Haneesh Reddy - 9:00`;

async function maybeSeedAug13(){
  if(state.date !== SEED_DATE_4) return;
  const flagKey = 'seeded-aug13-v1-'+SEED_DATE_4;
  try{
    const flag = await storageAdapter.get(flagKey, false);
    if(flag) return;
  }catch(e){}
  const beforeCount = state.roster.length;
  const rows = parseImportText(AUG13_SEED_TEXT);
  state.rows = rows;
  if(state.roster.length !== beforeCount) await saveRoster();
  await saveDayNow();
  try{ await storageAdapter.set(flagKey, '1', false); }catch(e){}
}

// ---------- offline app-shell caching (PWA) ----------
// Best-effort: works once this file is hosted at a real URL (GitHub Pages, Netlify, etc).
// Silently no-ops inside sandboxed preview contexts that block service workers.
function registerServiceWorker(){
  if(!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.register('./sw.js').catch(()=>{
    // Fails harmlessly if sw.js isn't deployed yet, or in a sandboxed
    // preview context that blocks service workers entirely — the app
    // works completely fine without it, this only adds offline support
    // and faster repeat loads once it's live.
  });
}

// ---------- simple client-side login, two roles (no backend involved at all) ----------
// Change these to whatever passwords you want. Both checks run entirely in the
// browser — neither calls the database or Vercel, so backend/deployment issues
// can't affect whether login works. Whoever enters ADMIN_SITE_PASSWORD gets full
// access; whoever enters USER_SITE_PASSWORD gets read-only (reuses the exact
// same read-only UI gating already built for the backend system — Save button
// hidden, table fields disabled, etc. — just driven by this instead).
let CLIENT_AUTHED = false;
try{
  CLIENT_AUTHED = localStorage.getItem('coverage-desk-client-auth') === 'yes';
  const savedRole = localStorage.getItem('coverage-desk-client-role');
  if(savedRole) CURRENT_ROLE = savedRole;
}catch(e){}

// Login is verified against a completely separate file, api/auth.js — kept
// isolated from api/data.js on purpose, so nothing that happens to data.js's
// deployment can affect whether login works. Uses the same DB_* and
// ADMIN_PASSWORD env vars, just in its own file with its own deploy history.
async function verifyLogin(username, password){
  const url = `${API_BASE_URL.replace(/\/$/,'')}/api/auth?action=whoami`;
  const headers = { 'x-admin-password': password, 'x-password': password };
  if(username) headers['x-username'] = username;
  const res = await fetch(url, { headers });
  if(!res.ok) return { ok:false };
  const data = await res.json();
  return { ok:true, role: data.role || 'admin' };
}

function renderClientLoginScreen(){
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-wrap">
      <div class="login-card">
        <h1 style="font-family:var(--display);font-size:22px;margin-bottom:4px">Coverage Desk</h1>
        <div style="color:var(--text-muted);font-size:13px;margin-bottom:20px">Sign in to continue. If you're the admin, leave Username blank and just enter the shared password.</div>
        <input type="text" id="clientLoginUser" placeholder="Username (leave blank for the master password)" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);padding:10px 12px;border-radius:8px;width:100%;font-size:14px;margin-bottom:10px">
        <input type="password" id="clientLoginPw" placeholder="Password" class="cell-input" style="background:var(--surface-2);border:1px solid var(--border);padding:10px 12px;border-radius:8px;width:100%;font-size:14px;margin-bottom:10px">
        <div id="clientLoginError" style="color:var(--coral);font-size:12.5px;margin-bottom:10px"></div>
        <button class="btn primary" id="clientLoginSubmit" style="width:100%;justify-content:center">Log in</button>
      </div>
    </div>
  `;
  const userInput = document.getElementById('clientLoginUser');
  const pwInput = document.getElementById('clientLoginPw');
  const errEl = document.getElementById('clientLoginError');
  const submitBtn = document.getElementById('clientLoginSubmit');
  pwInput.focus();
  const tryLogin = async ()=>{
    submitBtn.textContent = 'Checking…';
    submitBtn.disabled = true;
    const username = userInput.value.trim();
    const password = pwInput.value;
    const result = await verifyLogin(username, password);
    if(result.ok){
      CLIENT_AUTHED = true;
      CURRENT_ROLE = result.role;
      ADMIN_PASSWORD = password;
      CURRENT_USERNAME = username;
      try{
        localStorage.setItem('coverage-desk-client-auth', 'yes');
        localStorage.setItem('coverage-desk-client-role', result.role);
        localStorage.setItem('coverage-desk-admin-pw', password);
        localStorage.setItem('coverage-desk-username', username);
      }catch(e){}
      startApp();
    } else {
      errEl.textContent = 'Incorrect username or password — try again.';
      submitBtn.textContent = 'Log in';
      submitBtn.disabled = false;
      pwInput.value = '';
      pwInput.focus();
    }
  };
  submitBtn.onclick = tryLogin;
  userInput.onkeydown = (e)=>{ if(e.key==='Enter') pwInput.focus(); };
  pwInput.onkeydown = (e)=>{ if(e.key==='Enter') tryLogin(); };
}

async function startApp(){
  registerServiceWorker();
  setupOfflineQueue();
  setupTimeSensitiveAlerts();
  // Wrapped so that ANY unexpected failure in this chain — not just a
  // timed-out fetch, but literally anything — still reaches render() at
  // the end rather than leaving the static "Loading Coverage Desk…"
  // placeholder on screen forever. A partially-loaded app (falling back to
  // local/default data where needed) is always better than an app that
  // never renders at all.
  try{
    await loadRoster();
    await loadDay(state.date);
    // Fetches the ACTUAL role for whatever credentials are stored (admin
    // master password, or a specific username/password) before the first
    // render — without this, CURRENT_ROLE never reflected reality and every
    // account effectively had full admin access no matter what role they
    // were actually assigned in Manage Users.
    await refreshRole();
  }catch(e){
    state.loadError = e && e.message ? e.message : 'Something went wrong while loading — please refresh the page.';
  }
  // Demo/seed data disabled — see note at the other call sites.
  // await maybeSeedMaster(); await maybeSeedAug11(); await maybeSeedAug12(); await maybeSeedAug13();
  render();
  // Surfaces a "Today's Briefing is ready" banner once per day, the first
  // time the app is loaded that day — added 2026-09-28. Deliberately a
  // BANNER, not auto-opening the panel itself: an earlier version of this
  // auto-opened 📋 Today's Briefing directly on load, which replaced the
  // home screen's row list — breaking the immediate "swipe to assign" /
  // "add a call" flows the home screen exists for (caught by the mobile
  // regression suite crashing on a swipe gesture with no row on screen to
  // swipe). A banner is informative without being in the way, matching the
  // existing lastImportedIds/lastReschedItems banner pattern elsewhere.
  // Deliberately does NOT eagerly run the cross-date Data Health scan here
  // either — an earlier version did, and that raced with whatever the
  // Closures/Notifications panels compute on their own (both write into the
  // same state.closuresPerformance/woiAgingData/stuckPipelineData slots),
  // so whichever finished last silently won. The scan only ever runs when
  // something on screen actually asks for it (Data Health, the digest
  // panel, or the individual tabs), same as before this feature existed.
  // Tracked in localStorage (single-user app, so a per-device flag is
  // enough — no shared/backend flag every coordinator would collide on).
  try{
    const seenKey = 'cd_daily_briefing_shown_date';
    if(localStorage.getItem(seenKey) !== state.date){
      state.showDailyDigestBanner = true;
      localStorage.setItem(seenKey, state.date);
      render();
    }
  }catch(e){ /* localStorage unavailable (private mode, etc.) — just skip the banner */ }
  // PWA home-screen shortcuts (long-press the installed app icon) land
  // here with an ?action= param — handled once, right after the first
  // real render so there's actual data/state to act on, then the URL is
  // cleaned up immediately so refreshing the page doesn't redo the action.
  const shortcutAction = new URLSearchParams(location.search).get('action');
  if(shortcutAction === 'addcall'){
    addBlankCallRow();
  } else if(shortcutAction === 'unassigned'){
    state.filter = 'unassigned';
    render();
  }
  if(shortcutAction){
    history.replaceState(null, '', location.pathname);
  }
  // Fire-and-forget: scans every date for repeat candidates so the "handled
  // this candidate before" hint can show right on the row automatically,
  // without a manual scan click. Runs after the first render so it never
  // delays the initial page load.
  scanForRepeatCandidates().then(results=>{
    state.notifications = results;
    render();
  }).catch(()=>{});
  scanClientHistoryAllRounds().then(results=>{
    state.clientHistory = results;
    render();
  }).catch(()=>{});
  // Same fire-and-forget idea, for the on-row reliability badge (company
  // cell) — without this, that badge would stay invisible until someone
  // happened to open the separate Client Reliability tab first.
  scanClientReliability().then(results=>{
    state.clientReliabilityData = results;
    render();
  }).catch(()=>{});
  loadStudentsMaster().then(()=>{ render(); }).catch(()=>{});
  loadClosures().catch(()=>{});
  loadExpectedClosures().catch(()=>{});
  loadAppSettings().catch(()=>{});
}
// The repeat-candidate scan (scanForRepeatCandidates) groups occurrences by
// an exact lowercase candidate-name key, so a candidate typed slightly
// differently on a later date (e.g. from a different coordinator) silently
// never finds their own prior history — the "handled before"/"already
// rescheduled once" badges below just never fire, with no visible sign
// anything was missed. Same gap crossReferenceClosure() had for closures.
// Falls back to the narrow sameCandidateFuzzyMatch check, refusing
// to guess (returning null, same as an exact miss) if more than one entry
// in the whole history looks like a fuzzy match.
function findNotificationEntryForCandidate(candidateName){
  if(!candidateName || !state.notifications) return null;
  const key = candidateName.trim().toLowerCase();
  const entry = state.notifications.find(n => n.candidate.trim().toLowerCase() === key);
  if(entry) return entry;
  const fuzzyMatches = state.notifications.filter(n => sameCandidateFuzzyMatch(candidateName, n.candidate));
  return fuzzyMatches.length === 1 ? fuzzyMatches[0] : null;
}
// Looks up the most recent PRIOR occurrence of this candidate (any date/round
// other than this exact row) from the repeat-candidate scan results, for the
// automatic "handled before" hint on each row.
function findPriorOccurrence(row){
  if(!row.candidate || !state.notifications) return null;
  const entry = findNotificationEntryForCandidate(row.candidate);
  if(!entry) return null;
  const prior = entry.occurrences.filter(o =>
    !(o.date === state.date && o.time === row.time && o.round === row.round)
  );
  if(!prior.length) return null;
  // Real bug, found and fixed 2026-09-28 while building carry-forward
  // assignee on import (which depends on this returning the truly most
  // recent prior touchpoint): entry.occurrences is sorted most-recent-first
  // (see scanForRepeatCandidates()'s own sort), so the last element after
  // filtering is the OLDEST remaining occurrence, not the most recent —
  // this had been silently returning the oldest one, contradicting its own
  // "most recent prior occurrence" comment (and the "Handled before" P
  // badge's own tooltip wording) ever since it was written. Was low-stakes
  // as a hint on a badge; it's load-bearing now that autoRouteRows() also
  // uses it to decide who to actually assign a call to.
  return prior[0];
}

// Specifically flags when this SAME candidate had a call marked
// rescheduled/cancelled/not-responded on a DIFFERENT date — this is the
// scenario where a call quietly reappears later (today, tomorrow, whenever
// it actually got rebooked) and whoever picks it up has no idea it was
// already rescheduled or cancelled once already. entry.occurrences is
// already sorted most-recent-first, so the first status match found here
// is the most recent one — that's the one worth surfacing.
function findPriorRescheduleWarning(row){
  if(!row.candidate || !state.notifications) return null;
  const rowCompanyKey = normalizeCompanyKey(row.company);
  if(!rowCompanyKey) return null; // no client on this row — can't confirm it's the same client, so don't guess
  const entry = findNotificationEntryForCandidate(row.candidate);
  if(!entry) return null;
  return entry.occurrences.find(o =>
    o.status && ['rescheduled','cancelled','not_responded'].includes(o.status) &&
    !(o.date === state.date && o.time === row.time && o.round === row.round) &&
    normalizeCompanyKey(o.company) === rowCompanyKey
  ) || null;
}

// Specifically flags "this same candidate has a prior round with this exact
// client" — a case neither existing badge actually shows: PRIOR fires for
// ANY past occurrence of this candidate regardless of client, so it doesn't
// tell you it's the SAME client; CLIENT deliberately only fires for a
// DIFFERENT candidate at this client, since same-candidate/same-client was
// treated as "just normal round progression, not worth a separate flag."
// In practice that round-progression info (2nd Round last week, now back
// for 3rd Round with the same client) is exactly what's useful to see at a
// glance — this badge is that missing signal.
function findPriorSameClientOccurrence(row){
  if(!row.candidate || !row.company || !state.notifications) return null;
  const rowCompanyKey = normalizeCompanyKey(row.company);
  if(!rowCompanyKey) return null;
  const entry = findNotificationEntryForCandidate(row.candidate);
  if(!entry) return null;
  const matches = entry.occurrences.filter(o =>
    !(o.date === state.date && o.time === row.time && o.round === row.round) &&
    normalizeCompanyKey(o.company) === rowCompanyKey
  );
  // entry.occurrences is already sorted most-recent-first, and filter()
  // preserves that order, so the first match here is the most recent one.
  return matches.length ? matches[0] : null;
}

// Candidate-level (not client-scoped) history check — deliberately broader
// than findPriorRescheduleWarning() above, which only fires for a repeat at
// the SAME company. This looks across every company the candidate has ever
// been logged at and flags a genuine pattern: 2 or more prior
// rescheduled/cancelled/not-responded outcomes, anywhere. One reschedule is
// normal business; a candidate with a track record of it is worth knowing
// about before committing a coordinator's time again, regardless of which
// client this particular call is for.
const REPEAT_NO_SHOW_MIN_COUNT = 2;
function findRepeatNoShowFlag(row){
  if(!row.candidate || !state.notifications) return null;
  const entry = findNotificationEntryForCandidate(row.candidate);
  if(!entry) return null;
  const priorBad = entry.occurrences.filter(o =>
    o.status && RESCHED_STATUSES.includes(o.status) &&
    !(o.date === state.date && o.time === row.time && o.round === row.round)
  );
  if(priorBad.length < REPEAT_NO_SHOW_MIN_COUNT) return null;
  return { count: priorBad.length, occurrences: priorBad };
}

// Same idea as the candidate history above, but grouped by CLIENT/COMPANY
// instead of candidate, and covering EVERY round (not just 2nd round+) —
// e.g. Manoj B's call today with Texas A&M shows this automatically because
// Sai Kumar Batu had a call with the same company yesterday, even though
// they're different candidates. Runs automatically alongside the candidate
// scan, not tucked behind a manual "scan" click.
async function scanClientHistoryAllRounds(forceRefresh){
  const allRows = await fetchAllRowsAcrossDates(forceRefresh);
  const byCompany = {};
  allRows.forEach(row=>{
    if(!row.company) return;
    const key = normalizeCompanyKey(row.company);
    byCompany[key] = byCompany[key] || [];
    byCompany[key].push({date: row._date, round: row.round, time: row.time, candidate: row.candidate, assignee: row.assignee, company: row.company});
  });
  const results = [];
  Object.values(byCompany).forEach(occ=>{
    // Only counts as a "same client, different candidates" match if it's
    // genuinely more than one candidate — a single candidate progressing
    // through their own 2nd round, then 3rd round, at the same company is
    // normal round progression (already covered by the Repeat Candidates
    // tab), not a case where knowing "someone else went through this
    // client before" would actually help.
    const uniqueCandidates = new Set(occ.map(o=>(o.candidate||'').trim().toLowerCase()));
    if(occ.length > 1 && uniqueCandidates.size > 1){
      occ.sort((a,b)=> b.date.localeCompare(a.date) || b.time.localeCompare(a.time));
      results.push({ company: occ[0].company, occurrences: occ });
    }
  });
  results.sort((a,b)=> b.occurrences[0].date.localeCompare(a.occurrences[0].date));
  return results;
}
function findPriorClientOccurrence(row){
  if(!row.company || !state.clientHistory) return null;
  const key = normalizeCompanyKey(row.company);
  const entry = state.clientHistory.find(n => normalizeCompanyKey(n.company) === key);
  if(!entry) return null;
  const rowCandidate = (row.candidate||'').trim().toLowerCase();
  // Always points to a genuinely DIFFERENT candidate — otherwise, if this
  // company also happens to have a different repeat candidate mixed in, the
  // badge could accidentally cite this same person's own earlier round
  // instead of the other candidate, which defeats the point of the check.
  const prior = entry.occurrences.filter(o => (o.candidate||'').trim().toLowerCase() !== rowCandidate);
  if(!prior.length) return null;
  return prior[0]; // most recent prior occurrence (already sorted newest-first)
}

// ---------- Interview Portal sync (who's actually handling each call) ----------
// Pulled from a NEW, separate, read-only endpoint on the Interview Portal
// Control side (PortalCoverageDeskExport.gs) — Coverage Desk can only ever
// read this, never assign/reassign/approve anything through it. Manually
// triggered (not automatic) since it's an external call to another system.
// Reads back whatever was last saved to the database for this date's
// Portal assignments — no live Apps Script call, so it's fast and safe
// to run automatically on every page load / date switch. A real sync
// (fetchPortalSync via the 📡 Team Sync panel) still overwrites this with fresh data
// and re-saves it, same as before.
async function loadCachedPortalAssignmentsForDate(dateStr){
  if(!API_BASE_URL) return;
  try{
    let result = await apiCall('portal_sync', {qs:'type=assignments&cached=1&date=' + encodeURIComponent(dateStr)});
    // FIX (2026-09-24): same bug as loadPortalSyncCache() had — this only
    // ever checked the date-scoped cache key ("assignments:<dateStr>"),
    // which is what "Sync Today" writes. A "Full Sync" writes under the
    // date-less "assignments:ALL" key instead. So switching to (or landing
    // on) a past date whose only real sync was ever a Full Sync found
    // nothing here and the Portal data looked wiped out on every date
    // switch, even though it really was sitting in the database under the
    // other key. Fall back to the ALL-scoped cache before giving up.
    if(!result.data || !result.data.length){
      try{
        const fullResult = await apiCall('portal_sync', {qs:'type=assignments&cached=1'});
        if(fullResult.data && fullResult.data.length) result = fullResult;
      }catch(e){ /* fallback is best-effort too */ }
    }
    if(result.data && result.data.length){
      const rows = result.data;
      state.portalAssignments = rows.map(r => ({ ...r, handler: r.handler || r.assignee || '' }));
      state.portalSyncedAt = result.generatedAt ? new Date(result.generatedAt).toLocaleString() : state.portalSyncedAt;
      // Also restore state.portalSyncData so the 📡 Team Sync panel's own
      // table isn't left blank after a date switch — previously only the
      // per-row badges (portalAssignments) got repopulated here, not the
      // panel itself, even when this same cached data was available.
      state.portalSyncData = {
        assignments: rows,
        incentives: (state.portalSyncData && state.portalSyncData.incentives) || null
      };
      state.portalSyncUpdatedAt = result.generatedAt ? new Date(result.generatedAt).getTime() : state.portalSyncUpdatedAt;
      state.portalSyncFromCache = true;
      render();
    }
  }catch(e){ /* best-effort — a manual sync still works even if this fails */ }
}
// Matches a Coverage Desk row to a Portal record by candidate name (and
// time, when available, to disambiguate same-name candidates). The exact
// match fields may need adjusting once the real Portal data shape is
// confirmed — this assumes candidate/time/handler fields.
// EXACT match only, deliberately. An earlier version of this function
// treated one name as equivalent to another if it was a short prefix of
// it (e.g. "Bharat"/"Bharath") — that was reverted after it turned out
// "Karthik" (Pradeep Anna Team) and "Karthikeya" (HYD Team) are two
// completely different real people, not a spelling variant of the same
// person. Given this app already had a real incident with cross-team
// name mixups, a minor cosmetic "differs from local" false-positive for
// genuine spelling variants is a far smaller problem than silently
// treating two different people as the same one.
function namesEquivalent(a, b){
  const x = (a||'').trim().toLowerCase();
  const y = (b||'').trim().toLowerCase();
  return !!x && !!y && x === y;
}
// Maps a local "Assigned to" value to the Portal's team code (PRADEEP/HYD/DEV),
// either directly (team-level assignment) or by looking up which team a
// named individual belongs to in the roster. Returns null when the team
// can't be determined, in which case matching stays unrestricted.
function assigneeToPortalTeamCode(assignee){
  if(!assignee) return null;
  const label = assignee.trim().toLowerCase();
  if(label === 'hyd team') return 'HYD';
  if(label === 'pradeep anna team') return 'PRADEEP';
  if(label.startsWith('development')) return 'DEV';
  const person = state.roster.find(p => namesEquivalent(p.name, assignee));
  if(person && person.team) return assigneeToPortalTeamCode(person.team);
  // Not in the roster — e.g. typed manually via "Type a name…" for
  // someone like Karthik who isn't normally on this team's roster. Fall
  // back to the Portal's own synced data: if every record with this
  // EXACT handler name belongs to the same team, it's safe to use that
  // team. If the same name shows up under more than one team, stay
  // uncertain rather than guess which one is meant.
  if(state.portalAssignments && state.portalAssignments.length){
    const handlerMatches = state.portalAssignments.filter(p => namesEquivalent(p.handler, assignee));
    const teamCodes = Array.from(new Set(handlerMatches.map(p => p.teamCode).filter(Boolean)));
    if(teamCodes.length === 1) return teamCodes[0];
  }
  return null;
}
// Strips a trailing country tag like "(UK)", "(Ireland)", "(Germany)" and
// collapses whitespace, so "Mathew kodavalli" and "Mathew kodavalli (UK)"
// are recognized as the same person — the Portal's raw candidate text
// often keeps that tag inline, while Coverage Desk stores country
// separately and keeps the name plain. Without this, an exact-text
// comparison silently fails for every candidate with a country tag.
function normalizeCandidateForMatch(name){
  return (name||'')
    .replace(/\s*\([^)]*\)\s*$/,'')
    .replace(/\s+/g,' ')
    .trim()
    .toLowerCase();
}
function portalSyncFreshnessLabel(){
  // Human-readable "as of" text for the last Portal sync, used in the
  // 📡 badge tooltips so staleness is visible right on the call row
  // instead of only in the separate sync-panel hint line.
  if(!state.portalSyncUpdatedAt) return '';
  const ageMs = Date.now() - state.portalSyncUpdatedAt;
  const ageMin = Math.round(ageMs / 60000);
  let ageText;
  if(ageMin < 1) ageText = 'just now';
  else if(ageMin < 60) ageText = ageMin + ' min ago';
  else if(ageMin < 1440) ageText = Math.round(ageMin/60) + ' hr ago';
  else ageText = Math.round(ageMin/1440) + ' days ago';
  const stamp = new Date(state.portalSyncUpdatedAt).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
  return ` (as of last sync, ${stamp} — ${ageText})`;
}
// Internal: candidate+team matches only, before any date narrowing. Shared
// by findPortalMatch() (the real match, date-aware) and
// portalMatchSuppressedInfo() (explains a null result), so the two never
// drift out of sync on what counts as "the same candidate".
function findPortalCandidatesRaw_(row){
  if(!row.candidate || !state.portalAssignments || !state.portalAssignments.length) return null;
  // Only HYD, Pradeep Anna, and Dev are tracked in the Portal at all —
  // Marketing Team, Sai Team, Sandeep Anna Team, etc. have no corresponding
  // data there. Rather than guess across teams when we can't confirm a
  // match belongs to a Portal-tracked team, show nothing.
  const expectedTeamCode = assigneeToPortalTeamCode(row.assignee);
  if(!expectedTeamCode) return null;
  const key = normalizeCandidateForMatch(row.candidate);
  const matches = state.portalAssignments.filter(p => normalizeCandidateForMatch(p.candidate) === key && p.teamCode === expectedTeamCode);
  return matches.length ? matches : null;
}
function findPortalMatch(row){
  let matches = findPortalCandidatesRaw_(row);
  if(!matches) return null;
  // A Full Sync pulls the entire call history with no date filter, so
  // state.portalAssignments can hold rows for many different dates at
  // once. Without this, a same-named candidate at a recurring time slot
  // (e.g. "1:30") on a DIFFERENT day can match here and show a handler
  // that was never confirmed for today's call — the exact kind of wrong
  // match this function's own name/time/company tie-breaking was meant
  // to prevent, just across dates instead of across teams. Prefer
  // same-date rows whenever the Portal data actually carries a dateKey.
  const dateMatches = matches.filter(p => p.dateKey && p.dateKey === state.date);
  if(dateMatches.length) matches = dateMatches;
  else matches = matches.filter(p => !p.dateKey); // drop confirmed-wrong-date rows; keep only undated (legacy) ones as a fallback
  if(!matches.length) return null;
  if(matches.length === 1) return matches[0];
  // Multiple same-name matches — this is the exact scenario that caused a
  // wrong cross-team match (e.g. a Pradeep Anna candidate wrongly shown for
  // an HYD Team call, just because they shared a name and time slot).
  // Narrow down by time first...
  const timeMatches = matches.filter(p => p.time === row.time);
  if(timeMatches.length) matches = timeMatches;
  if(matches.length > 1){
    // ...then by client/company, since that's what actually distinguishes
    // two same-named, same-time candidates across different teams.
    const companyKey = normalizeCompanyKey(row.company);
    const companyMatches = matches.filter(p => normalizeCompanyKey(p.client) === companyKey);
    if(companyMatches.length) matches = companyMatches;
  }
  return matches[0];
}
// Same tie-breaking as findPortalMatch() above, but usable on a row from
// ANY date, not just whatever's currently open on the board — for the
// cross-date Driving Person backfill (added 2026-09-29). findPortalMatch()
// itself hardcodes state.date for its same-date preference, which is
// exactly right for the per-row 📡 badge (always about the row you're
// looking at right now) but wrong here, where `row._date` (set by
// fetchAllRowsAcrossDates) is what actually identifies which date this
// row's own call happened on.
function findPortalMatchForRow(row, rowDate){
  let matches = findPortalCandidatesRaw_(row);
  if(!matches) return null;
  const d = rowDate || row._date || state.date;
  const dateMatches = matches.filter(p => p.dateKey && p.dateKey === d);
  if(dateMatches.length) matches = dateMatches;
  else matches = matches.filter(p => !p.dateKey);
  if(!matches.length) return null;
  if(matches.length === 1) return matches[0];
  const timeMatches = matches.filter(p => p.time === row.time);
  if(timeMatches.length) matches = timeMatches;
  if(matches.length > 1){
    const companyKey = normalizeCompanyKey(row.company);
    const companyMatches = matches.filter(p => normalizeCompanyKey(p.client) === companyKey);
    if(companyMatches.length) matches = companyMatches;
  }
  return matches[0];
}
// Only meaningful when findPortalMatch(row) returned null — distinguishes
// "no Portal data exists for this candidate at all" (nothing to show,
// nothing suppressed) from "Portal has a record for this candidate under
// this team, but only for a different date, so we're deliberately not
// showing it" (a real fact worth surfacing, not silent nothing). Returns
// null when there's nothing suppressed to report.
function portalMatchSuppressedInfo(row){
  const matches = findPortalCandidatesRaw_(row);
  if(!matches) return null;
  const dateMatches = matches.filter(p => p.dateKey && p.dateKey === state.date);
  if(dateMatches.length) return null; // a real match exists — not suppressed
  const undated = matches.filter(p => !p.dateKey);
  if(undated.length) return null; // legacy fallback still available — not suppressed
  const distinctDates = Array.from(new Set(matches.map(p=>p.dateKey).filter(Boolean))).sort();
  return { count: matches.length, dates: distinctDates, mostRecent: distinctDates[distinctDates.length-1] };
}

// One-tap "paste from clipboard" for every import textarea (calls,
// reschedule/cancel, closures) — delegated on #app so it survives every
// re-render without needing to be rebound in attachHandlers(). Requires
// a secure context (https, which the real deployment is) and clipboard
// permission; on failure this just tells the person to paste manually
// rather than leaving the tap looking like it did nothing.
(function setupPasteFromClipboard(){
  const appEl = document.getElementById('app');
  if(!appEl) return;
  appEl.addEventListener('click', async (e)=>{
    const btn = e.target.closest('.paste-clipboard-btn');
    if(!btn) return;
    const targetId = btn.dataset.target;
    const el = targetId ? document.getElementById(targetId) : null;
    if(!el) return;
    if(!navigator.clipboard || !navigator.clipboard.readText){
      alert('Clipboard access isn\'t available here — paste manually (long-press → Paste) instead.');
      return;
    }
    try{
      const text = await navigator.clipboard.readText();
      if(!text || !text.trim()){
        alert('Clipboard is empty — copy the WhatsApp message first, then tap this again.');
        return;
      }
      const messages = splitClipboardIntoMessages(text);
      if(messages.length <= 1){
        el.value = el.value.trim() ? (el.value.replace(/\s+$/,'') + '\n\n' + text.trim()) : text.trim();
        el.focus();
        hapticTap();
        return;
      }
      // Clipboard holds several WhatsApp messages (export-prefix boundaries
      // detected) — show a small picker instead of dumping everything in,
      // so the person can choose which message(s) they actually want.
      // render() below fully rebuilds the DOM and this textarea isn't
      // value-bound to state, so whatever the person already typed has to
      // be captured now and restored after render(), or it's silently lost.
      state.clipboardPickerMessages = messages;
      state.clipboardPickerSelected = new Set(messages.map((_,i)=>i));
      state.clipboardPickerTargetId = targetId;
      state.clipboardPickerExistingValue = el.value || '';
      state.showClipboardPicker = true;
      render();
      const elAfterOpen = document.getElementById(targetId);
      if(elAfterOpen) elAfterOpen.value = state.clipboardPickerExistingValue;
      hapticTap();
    }catch(err){
      alert('Couldn\'t read the clipboard (your browser may need permission) — paste manually (long-press → Paste) instead.');
    }
  });

  // The multi-message picker this can open — a separate delegated click
  // listener on the same #app element for its checkboxes / cancel / insert.
  appEl.addEventListener('click', (e)=>{
    if(e.target.id === 'clipboardPickerCancel' || e.target.id === 'clipboardPickerOverlay'){
      const targetId = state.clipboardPickerTargetId;
      const existingValue = state.clipboardPickerExistingValue || '';
      state.showClipboardPicker = false;
      state.clipboardPickerMessages = [];
      state.clipboardPickerSelected = null;
      state.clipboardPickerTargetId = null;
      state.clipboardPickerExistingValue = '';
      // Same DOM-rebuild issue as opening the picker — restore whatever was
      // there before, since render() below wipes the un-bound textarea.
      render();
      if(targetId){
        const elAfter = document.getElementById(targetId);
        if(elAfter) elAfter.value = existingValue;
      }
      return;
    }
    if(e.target.id === 'clipboardPickerInsert'){
      const targetId = state.clipboardPickerTargetId;
      const existingValue = state.clipboardPickerExistingValue || '';
      const msgs = state.clipboardPickerMessages || [];
      const sel = state.clipboardPickerSelected || new Set();
      const chosen = msgs.filter((_,i)=>sel.has(i));
      state.showClipboardPicker = false;
      state.clipboardPickerMessages = [];
      state.clipboardPickerSelected = null;
      state.clipboardPickerTargetId = null;
      state.clipboardPickerExistingValue = '';
      // render() fully rebuilds the DOM, and these plain <textarea> import
      // boxes aren't value-bound to state — so the insert has to happen on
      // the freshly rebuilt element AFTER render(), same as why the direct
      // single-message path above never calls render() at all.
      render();
      if(targetId && chosen.length){
        const elAfter = document.getElementById(targetId);
        if(elAfter){
          const joined = chosen.join('\n\n');
          elAfter.value = existingValue.trim() ? (existingValue.replace(/\s+$/,'') + '\n\n' + joined) : joined;
          elAfter.focus();
        }
      } else if(targetId){
        const elAfter = document.getElementById(targetId);
        if(elAfter) elAfter.value = existingValue;
      }
      hapticTap();
      return;
    }
  });
  appEl.addEventListener('change', (e)=>{
    const chk = e.target.closest('.clipboard-picker-check');
    if(!chk) return;
    const idx = Number(chk.dataset.idx);
    if(!state.clipboardPickerSelected) state.clipboardPickerSelected = new Set();
    if(chk.checked) state.clipboardPickerSelected.add(idx);
    else state.clipboardPickerSelected.delete(idx);
    render();
  });
})();
// Hands-free capture for any import textarea, using the browser's built-in
// Web Speech API — nothing server-side, nothing sent anywhere outside the
// browser itself. One active recognition session at a time (starting a new
// one stops whatever was running). Not every browser supports this (mainly
// Chrome-family), so unsupported browsers get a plain explanation on tap
// rather than a silently broken button.
(function setupMicCapture(){
  const appEl = document.getElementById('app');
  if(!appEl) return;
  const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  function stopListening(){
    if(recognition){ try{ recognition.stop(); }catch(e){} }
    recognition = null;
    if(state.micListening){ state.micListening = false; state.micTargetId = null; render(); }
  }
  appEl.addEventListener('click', (e)=>{
    const btn = e.target.closest('.mic-capture-btn');
    if(!btn) return;
    const targetId = btn.dataset.target;
    if(!targetId) return;
    if(state.micListening && state.micTargetId === targetId){
      stopListening();
      return;
    }
    if(!SpeechRecognitionCtor){
      alert('Speech-to-text isn\'t supported in this browser — try Chrome, or type/paste instead.');
      return;
    }
    if(recognition){ try{ recognition.stop(); }catch(e){} recognition = null; }
    const el = document.getElementById(targetId);
    const existingValue = el ? el.value : '';
    recognition = new SpeechRecognitionCtor();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.continuous = true;
    recognition.onresult = (ev)=>{
      let finalText = '';
      for(let i = ev.resultIndex; i < ev.results.length; i++){
        if(ev.results[i].isFinal) finalText += ev.results[i][0].transcript;
      }
      if(!finalText.trim()) return;
      const target = document.getElementById(targetId);
      if(!target) return;
      target.value = target.value.trim() ? (target.value.replace(/\s+$/,'') + ' ' + finalText.trim()) : finalText.trim();
    };
    recognition.onerror = ()=>{
      stopListening();
    };
    recognition.onend = ()=>{
      // Browser stopped it on its own (silence timeout, etc.) — reflect
      // that in the UI rather than leaving the button stuck on "Listening…".
      if(state.micListening) stopListening();
    };
    try{
      recognition.start();
      state.micListening = true;
      state.micTargetId = targetId;
      render();
      const elAfter = document.getElementById(targetId);
      if(elAfter) elAfter.value = existingValue;
      hapticTap();
    }catch(err){
      alert('Couldn\'t start speech-to-text — your browser may need microphone permission.');
    }
  });
})();

// ---------- init ----------
// Swipe-right-to-assign / swipe-left-to-delete for mobile call cards.
// Swiping right opens a quick picker (teams + everyone on the roster) to
// assign that call to whoever it should go to — not a fixed "me" person,
// since a coordinator is usually routing calls to the right team member,
// not just claiming them for themselves. Touch-only (checked via
// 'ontouchstart' in window — desktop mice never fire touch events at all,
// so this is naturally a no-op there). Wired up exactly once, delegated
// on #app (which persists across every re-render, unlike its contents),
// rather than per-row inside attachHandlers() — the same reasoning as
// every other delegated handler in this file.
//
// The swipe-hint label is a separate floating element positioned over the
// card during the gesture, deliberately NOT inserted into the table's own
// markup — a <tr> can only validly contain <td>/<th> children, so
// layering a reveal-behind-the-content hint the usual way would mean an
// invalid child and inconsistent rendering across browsers.
(function setupSwipeGestures(){
  if(!('ontouchstart' in window)) return;
  const appEl = document.getElementById('app');
  if(!appEl) return;

  let swipe = null; // { tr, startX, startY, dx, dragging }
  let hintEl = null;
  const THRESHOLD = 90;
  const MAX_DRAG = 140;

  // Long-press (opens the same "..." quick-action sheet as the ⋯ button —
  // a faster path once it's muscle memory, without replacing the button
  // itself, which stays the discoverable way to find these actions the
  // first time) and double-tap (a fast "select this call" shortcut into
  // the existing bulk-select/bulk-action system, same spirit as
  // Instagram's double-tap-to-like: always ADDS to the selection, never
  // removes — the visible checkbox is still how you deselect). Both share
  // this one gesture tracker rather than adding second/third touch
  // listeners, so there's only ever one place deciding what a touch on a
  // card means.
  let longPressTimer = null;
  let longPressFired = false;
  const LONG_PRESS_MS = 480;
  let lastTapInfo = null; // { id, time } — for double-tap detection

  function clearLongPressTimer(){
    if(longPressTimer){ clearTimeout(longPressTimer); longPressTimer = null; }
  }

  function showDoubleTapBurst(tr, added){
    // A quick, non-blocking visual confirmation over the card — same
    // "burst and fade" idea as Instagram's double-tap heart. Appended to
    // <body> (not the row itself) since the row's own content is about to
    // re-render out from under it via the render() call right after.
    const rect = tr.getBoundingClientRect();
    const el = document.createElement('div');
    el.className = 'dtap-burst';
    el.textContent = added ? '✓' : '';
    el.style.left = (rect.left + rect.width/2) + 'px';
    el.style.top = (rect.top + rect.height/2) + 'px';
    document.body.appendChild(el);
    setTimeout(()=>{ el.remove(); }, 550);
  }

  function handlePlainTap(tr){
    const id = tr.dataset.id;
    const now = Date.now();
    if(lastTapInfo && lastTapInfo.id === id && (now - lastTapInfo.time) < 320){
      lastTapInfo = null;
      const wasSelected = state.selectedIds.has(id);
      state.selectedIds.add(id); // double-tap only ever selects, never toggles off
      if(!wasSelected){ hapticTap(18); }
      showDoubleTapBurst(tr, true);
      render();
    } else {
      lastTapInfo = { id, time: now };
    }
  }

  function ensureHint(){
    if(!hintEl){
      hintEl = document.createElement('div');
      hintEl.className = 'swipe-hint';
      document.body.appendChild(hintEl);
    }
    return hintEl;
  }
  function removeHint(){
    if(hintEl){ hintEl.remove(); hintEl = null; }
  }

  appEl.addEventListener('touchstart', (e)=>{
    const tr = e.target.closest('tbody tr[data-id]');
    // Single-cell note/detail rows (doubt, status, pin-detail) have
    // nothing to swipe — a whole call row is the unit being acted on.
    if(!tr || tr.classList.contains('doubt-note-row') || tr.classList.contains('status-note-row') || tr.classList.contains('pin-detail-row')) return;
    // A row packs its own left-right controls — the Time/Round/Duration
    // fields, the driving-person picker, and the action-button row
    // (✓ 📌 📡 →2nd ✕) all sit side by side and need normal taps, drags
    // inside a <select>, and text-cursor placement to keep working.
    // Starting the swipe tracker on top of one of those meant a user
    // trying to use THOSE controls could have their touch hijacked into
    // an assign/delete swipe instead — reported as "records has also
    // left right options" fighting with left-right scrolling/swiping.
    // Ignoring touches that start on an interactive control leaves this
    // gesture to the open card surface only, where it belongs.
    if(e.target.closest('button, select, input, textarea, a, .cell-input, .driving-person-select')) return;
    const t = e.touches[0];
    swipe = { tr, startX: t.clientX, startY: t.clientY, dx: 0, dragging: false };
    longPressFired = false;
    clearLongPressTimer();
    longPressTimer = setTimeout(()=>{
      // Only fires if the touch is still down, hasn't moved (touchmove
      // clears this timer on any movement at all — see below), and never
      // turned into a real swipe drag.
      longPressTimer = null;
      longPressFired = true;
      hapticTap(25);
      state.quickActionRowId = tr.dataset.id;
      render();
    }, LONG_PRESS_MS);
  }, { passive: true });

  appEl.addEventListener('touchmove', (e)=>{
    clearLongPressTimer(); // any movement at all cancels a pending long-press
    if(!swipe) return;
    const t = e.touches[0];
    const dx = t.clientX - swipe.startX;
    const dy = t.clientY - swipe.startY;
    if(!swipe.dragging){
      // Deadzone — only commit to "this is a swipe" once horizontal
      // movement is clearly dominant, so ordinary vertical scrolling
      // (and tapping/typing on the card's own fields) is never disrupted.
      // Widened from 12px/1.3x to 16px/1.8x — the tighter version was
      // still catching touches that were really an attempt to scroll,
      // just with a bit of natural side-to-side wobble in the gesture.
      if(Math.abs(dx) < 16) return;
      if(Math.abs(dx) < Math.abs(dy) * 1.8){ swipe = null; return; }
      swipe.dragging = true;
    }
    e.preventDefault();
    swipe.dx = dx;
    const clamped = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, dx));
    swipe.tr.style.transition = 'none';
    swipe.tr.style.transform = `translateX(${clamped}px)`;

    const hint = ensureHint();
    const rect = swipe.tr.getBoundingClientRect();
    hint.style.top = rect.top + 'px';
    hint.style.height = rect.height + 'px';
    hint.style.opacity = Math.min(Math.abs(clamped) / THRESHOLD, 1).toFixed(2);
    if(clamped > 0){
      hint.className = 'swipe-hint right';
      hint.textContent = '→ Assign to…';
      hint.style.left = rect.left + 'px';
      hint.style.width = Math.max(clamped, 40) + 'px';
    } else if(clamped < 0){
      hint.className = 'swipe-hint left';
      hint.textContent = '🗑 Delete';
      hint.style.left = (rect.right + clamped) + 'px';
      hint.style.width = Math.max(-clamped, 40) + 'px';
    }
  }, { passive: false });

  function endSwipe(){
    clearLongPressTimer();
    if(longPressFired){
      // The long press already opened the quick-action sheet — this
      // touchend is just that same finger lifting off, not a separate tap.
      longPressFired = false;
      swipe = null; removeHint(); return;
    }
    if(!swipe){ removeHint(); return; }
    if(!swipe.dragging){
      // A genuine plain tap on the open card surface (never reaches here
      // for a tap on a button/input/select — touchstart never created
      // `swipe` for those in the first place) — check it against the
      // double-tap window.
      handlePlainTap(swipe.tr);
      swipe = null; removeHint(); return;
    }
    const tr = swipe.tr, dx = swipe.dx, id = tr.dataset.id;
    removeHint();
    if(dx > THRESHOLD){
      tr.style.transition = 'transform .18s ease';
      tr.style.transform = `translateX(${MAX_DRAG}px)`;
      hapticTap(20);
      setTimeout(()=>{ swipeShowAssignPicker(id); }, 120);
    } else if(dx < -THRESHOLD){
      tr.style.transition = 'transform .18s ease';
      tr.style.transform = `translateX(-${MAX_DRAG}px)`;
      hapticTap(20);
      setTimeout(()=>{ deleteCallRow(id); }, 120);
    } else {
      // Below the commit threshold — this card is springing back to rest,
      // not moving toward an action, so it gets a slight overshoot-and-
      // settle instead of the plain ease used above. Small, but this is
      // the single most common outcome of touching a card (most swipes
      // that start don't cross the threshold), so it's the one place a
      // "native app" feel actually shows up the most.
      tr.style.transition = 'transform .28s cubic-bezier(.34,1.4,.64,1)';
      tr.style.transform = 'translateX(0)';
    }
    swipe = null;
  }
  appEl.addEventListener('touchend', endSwipe);
  appEl.addEventListener('touchcancel', ()=>{
    clearLongPressTimer();
    longPressFired = false;
    if(swipe && swipe.tr){
      swipe.tr.style.transition = 'transform .18s ease';
      swipe.tr.style.transform = 'translateX(0)';
    }
    removeHint();
    swipe = null;
  });

  // The assign-to picker this triggers — a separate, independent
  // delegated click listener on the same #app element (fine to have more
  // than one listener for the same event type on one node).
  appEl.addEventListener('click', (e)=>{
    if(e.target.id === 'myNamePickerCancel' || e.target.id === 'myNamePickerOverlay'){
      state.showSwipeAssignPicker = false;
      state.pendingSwipeAssignRowId = null;
      render();
      return;
    }
    const item = e.target.closest('.my-name-picker-item');
    if(item){
      const name = item.dataset.name;
      const rowId = state.pendingSwipeAssignRowId;
      state.showSwipeAssignPicker = false;
      state.pendingSwipeAssignRowId = null;
      if(rowId) applySwipeAssignment(rowId, name);
      else render();
    }
  });
})();
// "..." quick-action sheet — its own independent delegated click listener
// on #app (same reasoning as the swipe-assign picker's listener just
// above: fine to have more than one listener for the same event type on
// one node). Not touch-gated like the swipe/pull-to-refresh setups above —
// this sheet is opened by a real, visible button (not a gesture), so it
// should work identically on a mouse too, not just touch.
(function setupQuickActionSheet(){
  const appEl = document.getElementById('app');
  if(!appEl) return;
  appEl.addEventListener('click', (e)=>{
    if(!state.quickActionRowId) return;
    if(e.target.id === 'quickActionSheetOverlay' || e.target.closest('[data-qa="cancel"]')){
      state.quickActionRowId = null;
      render();
      return;
    }
    const btn = e.target.closest('[data-qa]');
    if(!btn) return;
    const action = btn.dataset.qa;
    const rowId = state.quickActionRowId;
    const row = state.rows.find(r=>r.id===rowId);
    if(!row) return; // row vanished from under the sheet — nothing safe to act on

    if(action === 'assign'){
      hapticTap(10);
      state.quickActionRowId = null;
      swipeShowAssignPicker(rowId);
      return;
    }
    if(action === 'timeline'){
      hapticTap(12);
      state.quickActionRowId = null;
      render();
      openCandidateProfile(row.candidate);
      return;
    }
    if(action === 'expectclosure'){
      hapticTap(12);
      state.quickActionRowId = null;
      state.expectClosureRowId = rowId;
      state.expectClosureError = null;
      render();
      return;
    }
    if(action === 'delete'){
      hapticTap(20);
      state.quickActionRowId = null;
      deleteCallRow(rowId);
      return;
    }
    if(action === 'clearstatus'){
      const label = statusBadgeInfo(row.status).label.toLowerCase();
      if(!confirm(`Clear the "${label}" tag from "${row.candidate||'this call'}"? The call itself stays exactly where it is — only the ${label} status is removed.`)){
        return;
      }
      hapticTap(15);
      row.status = '';
      row.statusFields = [];
      state.quickActionRowId = null;
      render();
      return;
    }
    if(action === 'status'){
      const status = btn.dataset.status;
      // Same review-before-commit screen every other status change already
      // goes through (paste-box parse, or the manual "Can't find the
      // message" fallback in the Reschedule/Cancel import) — this is just
      // a faster way to REACH that screen for a call already right in
      // front of you, with the row pre-selected instead of needing to
      // find it again in a dropdown of every call on the day.
      hapticTap(15);
      state.quickActionRowId = null;
      state.rescheduleReview = [{
        raw: `Marked from the call card: ${row.candidate||'(no name)'} — ${row.time||''}${row.company?' — '+row.company:''}`,
        candidate: row.candidate || '',
        time: row.time || '',
        company: row.company || '',
        status: status,
        side: '',
        reason: '',
        selectedRowId: row.id,
        autoMatched: false,
        skip: false,
      }];
      render();
      return;
    }
  });
})();
// Quick-jump command bar (added 2026-09-30) — see renderQuickJumpOverlay()
// above for how the list is built. Delegated on #app, same pattern as
// every other floating overlay in this file, plus a plain `input` listener
// for the live search-as-you-type box (input events don't bubble through
// the same click-delegation path, so this needs its own listener).
(function setupQuickJump(){
  const appEl = document.getElementById('app');
  if(!appEl) return;
  function closeQuickJump(){
    state.showQuickJump = false;
    state.quickJumpQuery = '';
    state.quickJumpResults = null;
    render();
  }
  appEl.addEventListener('click', (e)=>{
    if(!state.showQuickJump) return;
    if(e.target.id === 'quickJumpOverlay' || e.target.closest('#quickJumpCancel')){
      closeQuickJump();
      return;
    }
    const dateBtn = e.target.closest('[data-qj-date]');
    if(dateBtn){
      // FIX (2026-09-30, found on review): every OTHER way of switching
      // dates in this app (the date picker, ‹/› buttons) guards against
      // discarding unsaved work first — this one didn't, so jumping to a
      // date via Quick Jump while state.dirty was true would silently
      // throw away whatever hadn't been saved yet. Matches the exact same
      // guard/reset/dateSwitching-skeleton/re-scan sequence those other
      // three already use, rather than a shortcut that skips it.
      if(state.dirty && !confirm('You have unsaved changes that will be lost if you switch dates without saving. Switch anyway?')){
        return;
      }
      const d = dateBtn.dataset.qjDate;
      closeQuickJump();
      state.date = d;
      state.dirty = false;
      state.lastImportedIds = null;
      state.showImport = false; state.showRoster = false;
      state.dateSwitching = true;
      render();
      loadDay(d).then(()=>{
        state.dateSwitching = false;
        render();
        scanForRepeatCandidates().then(results=>{ state.notifications = results; render(); }).catch(()=>{});
        scanClientHistoryAllRounds().then(results=>{ state.clientHistory = results; render(); }).catch(()=>{});
      });
      return;
    }
    const cmdBtn = e.target.closest('[data-qj-cmd]');
    if(cmdBtn){
      const cmd = QUICK_JUMP_COMMANDS.find(c=>c.label === cmdBtn.dataset.qjCmd);
      closeQuickJump();
      if(cmd) cmd.action();
      render();
      return;
    }
    const candidateBtn = e.target.closest('[data-qj-candidate]');
    if(candidateBtn){
      const name = candidateBtn.dataset.qjCandidate;
      closeQuickJump();
      openCandidateProfile(name);
      return;
    }
  });
  appEl.addEventListener('input', (e)=>{
    if(e.target.id !== 'quickJumpInput') return;
    state.quickJumpQuery = e.target.value;
    // Don't re-render on every keystroke here (that would rebuild the
    // input and could disturb cursor position/focus) — just kick off the
    // debounced search; render() is only called once the search itself
    // actually has something new to show.
    runQuickJumpSearch(e.target.value);
  });
})();
// Pull-to-refresh (mobile home screen only) — dragging down from the very
// top of the page re-pulls today's saved data from the backend, the same
// gesture Instagram/Facebook use for "check for anything new" instead of
// hunting for a refresh button. Touch-only (same 'ontouchstart' guard as
// setupSwipeGestures above), wired once at load, listening on `document`
// rather than #app since the thing being measured — how far the whole
// PAGE has been dragged down from scrollTop 0 — isn't specific to any one
// row or panel the way the swipe gestures are.
//
// Deliberately narrow about when it's allowed to trigger, to avoid ever
// fighting the gestures that already exist:
//   - only while the home screen itself is showing (no panel/modal open) —
//     reusing getActivePanelName(), the same check every panel already
//     goes through, so this never activates over Closures/Notifications/
//     the Quick Search modal/etc., where a downward drag inside a
//     scrollable list means something else entirely.
//   - only starts tracking when the page is already scrolled to the very
//     top (scrollY === 0) — the standard rule for this gesture everywhere
//     it exists, so an ordinary scroll never gets hijacked partway down.
//   - ignores a drag that starts on a row/card at all (closest('tr[data-id]')
//     is null-checked) so it can never compete with the swipe-assign/
//     swipe-delete gesture on an individual call card — only a drag
//     starting on genuinely empty space (the stat cards, the toolbar, the
//     gap above the list) can pull-to-refresh.
(function setupPullToRefresh(){
  if(!('ontouchstart' in window)) return;
  const indicator = document.getElementById('pullRefreshIndicator');
  const icon = document.getElementById('pullRefreshIcon');
  if(!indicator || !icon) return;

  const THRESHOLD = 64; // px of actual (resisted) travel before a release triggers a refresh
  const MAX_PULL = 90;
  let startY = null;
  let pulling = false;
  let refreshing = false;

  function setIndicatorY(px){
    indicator.style.transform = `translate(-50%, ${px}px)`;
  }

  document.addEventListener('touchstart', (e)=>{
    if(refreshing) return;
    if(getActivePanelName()) return; // only the home screen
    if(state.quickActionRowId || state.showSwipeAssignPicker || state.expectClosureRowId) return; // a floating sheet/picker is open
    if((window.scrollY || document.documentElement.scrollTop || 0) > 0) return;
    if(e.target.closest('tr[data-id]')) return; // leave call-card swipes alone
    startY = e.touches[0].clientY;
    pulling = false;
  }, {passive:true});

  document.addEventListener('touchmove', (e)=>{
    if(startY === null || refreshing) return;
    const dy = e.touches[0].clientY - startY;
    if(dy <= 0){ return; } // only care about pulling DOWN
    if((window.scrollY || document.documentElement.scrollTop || 0) > 0){ startY = null; return; } // scrolled away mid-gesture
    pulling = true;
    // Resistance curve so it doesn't feel like a 1:1 drag forever — same
    // "gets harder the further you pull" feel as the native app version.
    const pull = Math.min(MAX_PULL, dy * 0.45);
    indicator.classList.remove('settling');
    indicator.classList.add('visible');
    indicator.style.opacity = String(Math.min(1, pull / (THRESHOLD*0.7)));
    setIndicatorY(10 + pull);
    icon.style.transform = pull >= THRESHOLD ? 'rotate(180deg)' : 'rotate(0deg)';
    icon.style.transition = 'transform .15s ease';
  }, {passive:true});

  document.addEventListener('touchend', async ()=>{
    if(startY === null) return;
    const wasPulling = pulling;
    startY = null; pulling = false;
    if(!wasPulling) return;
    const pulledFar = indicator.style.opacity === '1' && icon.style.transform === 'rotate(180deg)';
    if(!pulledFar){
      indicator.classList.add('settling');
      indicator.style.opacity = '0';
      setIndicatorY(-60);
      return;
    }
    // Triggered — hold the indicator in place with a spinner while the
    // real refresh (the same loadDay() every date-switch/date-nav button
    // already uses) runs, exactly like the app's other loading states.
    refreshing = true;
    hapticTap(15);
    indicator.classList.add('settling');
    setIndicatorY(46);
    icon.outerHTML = '<span class="spinner spinner-lg" id="pullRefreshIcon" style="margin:0"></span>';
    try{
      await loadDay(state.date);
    }catch(e){ /* loadDay already handles its own error states (AUTH_FAILED etc.) */ }
    render();
    indicator.classList.add('settling');
    indicator.style.opacity = '0';
    setIndicatorY(-60);
    setTimeout(()=>{
      // Restore the plain arrow for the next pull, now that the spin is done.
      const spinnerEl = document.getElementById('pullRefreshIcon');
      if(spinnerEl) spinnerEl.outerHTML = '<span class="pull-refresh-icon" id="pullRefreshIcon">↓</span>';
      refreshing = false;
    }, 280);
  }, {passive:true});
})();
function swipeShowAssignPicker(rowId){
  state.pendingSwipeAssignRowId = rowId;
  state.showSwipeAssignPicker = true;
  render();
}
function applySwipeAssignment(rowId, name){
  const row = state.rows.find(r=>r.id===rowId);
  if(!row) return;
  row.assignee = name;
  markDirty();
  hapticTap();
  render();
}

// Bottom nav — lives OUTSIDE #app (see the static HTML), so it survives
// every re-render untouched; wired up exactly once here rather than
// inside attachHandlers(). Reuses the same global helpers the header
// buttons already call (openOnlyPanel, addBlankCallRow, closeAllPanels)
// instead of duplicating their logic, so there's only ever one "go home"
// or "add a call" behavior to keep correct, not two copies that could
// drift apart.
(function setupBottomNav(){
  const nav = document.getElementById('bottomNav');
  if(!nav) return;

  function setActive(name){
    nav.querySelectorAll('.bottom-nav-item').forEach(el=>{
      el.classList.toggle('active', el.dataset.nav === name);
    });
  }
  // Reflects which destination is "current" based on actual state, not
  // just which button was last tapped — so it's still correct if a panel
  // was opened some other way (e.g. the header's own Notifications button).
  function syncActiveState(){
    if(state.showNotifications) setActive('alerts');
    else if(state.showToolsMenu) setActive('tools');
    else if(state.showMoreMenu || getActivePanelName()) setActive('more');
    else setActive('home');
  }
  const origRender = window.render;
  window.render = function(...args){
    const result = origRender.apply(this, args);
    syncActiveState();
    const dot = document.getElementById('navAlertsDot');
    if(dot) dot.style.display = ((state.notifications && state.notifications.length) || state.absentIds.length) ? 'block' : 'none';
    return result;
  };

  document.getElementById('navHome').onclick = async ()=>{
    if(state.dirty && CURRENT_ROLE==='admin') await saveAllChanges();
    closeAllPanels();
    state.filter = 'all';
    state.search = '';
    state.view = '1st';
    state.selectedIds.clear();
    hapticTap();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  document.getElementById('navAlerts').onclick = ()=>{
    openOnlyPanel('showNotifications');
    hapticTap();
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  // FIX (2026-10-03): was a direct "add a blank call" shortcut. Now opens
  // the same two-choice menu the header's "📥 Import" dropdown offers (Add
  // call / Reschedule), since that header button is hidden on mobile —
  // this is the only way to reach "Reschedule / Cancel" on a phone now.
  document.getElementById('navAdd').onclick = ()=>{
    const opening = !state.showNavAddMenu;
    closeAllPanels();
    state.showNavAddMenu = opening;
    hapticTap();
    render();
  };
  // Tools/More now render as a fixed bottom sheet on mobile (see the
  // .more-menu-dropdown mobile CSS), so they're always fully on-screen
  // no matter where the toggle button or the page's scroll position is —
  // no need to scroll anything into view first, unlike the old anchored
  // dropdown this used to compensate for.
  document.getElementById('navTools').onclick = ()=>{
    state.showMoreMenu = false;
    state.showToolsMenu = true;
    hapticTap();
    render();
  };
  document.getElementById('navMore').onclick = ()=>{
    state.showToolsMenu = false;
    state.showMoreMenu = true;
    hapticTap();
    render();
  };
})();

// Scroll-to-top button — lives OUTSIDE #app (see the static HTML), so it
// survives every re-render untouched; wired up exactly once here rather
// than inside attachHandlers(), which would otherwise stack a fresh
// duplicate listener on the same element every single render.
(function setupScrollToTop(){
  const btn = document.getElementById('scrollToTopBtn');
  if(!btn) return;
  window.addEventListener('scroll', ()=>{
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', ()=>{
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
// Install-to-home-screen prompt. Two very different platforms to handle:
// - Android/Chrome/Edge/Samsung Internet fire a real 'beforeinstallprompt'
//   event we can capture and trigger later with one tap.
// - iOS Safari has no such API at all — the only way to install is the
//   person manually doing Share -> Add to Home Screen, so the banner just
//   explains that instead of pretending there's a button that would work.
// Skipped entirely once already running installed (standalone/fullscreen),
// and remembers a dismissal so it doesn't nag every single visit.
(function setupInstallBanner(){
  const banner = document.getElementById('installBanner');
  const textEl = document.getElementById('installBannerText');
  const actionBtn = document.getElementById('installBannerActionBtn');
  const dismissBtn = document.getElementById('installBannerDismissBtn');
  if(!banner || !textEl || !actionBtn || !dismissBtn) return;

  const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if(isStandalone) return; // already installed — nothing to prompt

  let dismissed = false;
  try{ dismissed = localStorage.getItem('coverage-desk-install-dismissed') === '1'; }catch(e){}
  if(dismissed) return;

  function show(){
    banner.style.display = 'flex';
    document.body.classList.add('has-install-banner');
  }
  function hide(){
    banner.style.display = 'none';
    document.body.classList.remove('has-install-banner');
  }
  dismissBtn.onclick = ()=>{
    hide();
    try{ localStorage.setItem('coverage-desk-install-dismissed', '1'); }catch(e){}
  };

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1); // iPadOS reports as Mac
  const isSafari = /^((?!chrome|android|crios|fxios).)*safari/i.test(navigator.userAgent);

  let deferredPrompt = null;
  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault();
    deferredPrompt = e;
    textEl.textContent = 'Install Coverage Desk for quick access, like a real app.';
    actionBtn.style.display = '';
    show();
  });
  actionBtn.onclick = async ()=>{
    if(!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice.catch(()=>{});
    deferredPrompt = null;
    hide();
    try{ localStorage.setItem('coverage-desk-install-dismissed', '1'); }catch(e){}
  };

  if(isIOS && isSafari){
    textEl.textContent = 'Install this app: tap the Share icon, then "Add to Home Screen".';
    actionBtn.style.display = 'none';
    show();
  }
})();
window.addEventListener('beforeunload', (e)=>{
  if(state.dirty){
    e.preventDefault();
    e.returnValue = '';
  }
});
// Auto-save — checks every 5 minutes and only actually saves if there are
// real unsaved changes (state.dirty), and only for roles that can save at
// all. This is a safety net for anyone who forgets to click Save manually
// for a long stretch, not a replacement for the explicit Save button.
setInterval(()=>{
  if(state.dirty && !state.saving && CURRENT_ROLE==='admin'){
    saveAllChanges();
  }
}, 5*60*1000);
// Keyboard shortcuts — only fire when NOT typing in an input/textarea/select,
// so normal typing (candidate names, notes, etc.) never gets hijacked.
window.addEventListener('keydown', (e)=>{
  const tag = (document.activeElement && document.activeElement.tagName) || '';
  const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  const ctrlOrCmd = e.ctrlKey || e.metaKey;

  if(ctrlOrCmd && e.key.toLowerCase()==='s'){
    e.preventDefault();
    if(state.dirty && !state.saving && CURRENT_ROLE==='admin') saveAllChanges();
    return;
  }
  // Quick-jump command bar (added 2026-09-30) — Ctrl/Cmd+K, same shortcut
  // convention as most command palettes elsewhere. Deliberately NOT gated
  // by isTyping, same reasoning as Ctrl/Cmd+S above: this is a modifier
  // shortcut, not a character that could land in whatever's focused.
  if(ctrlOrCmd && e.key.toLowerCase()==='k'){
    e.preventDefault();
    state.showQuickJump = !state.showQuickJump;
    if(!state.showQuickJump){ state.quickJumpQuery = ''; state.quickJumpResults = null; }
    render();
    if(state.showQuickJump){
      const el = document.getElementById('quickJumpInput');
      if(el) el.focus();
    }
    return;
  }
  // Tab focus trap (added 2026-10-02) — none of the floating pickers/
  // dropdowns used to trap Tab, so keyboard-only navigation could tab
  // straight past the open surface and land on something hidden behind
  // the dim backdrop underneath, with no visual sign focus had left the
  // thing actually on screen. Every surface this applies to is exactly
  // the set `updateBodyScrollLock()` already locks background scroll
  // for, so reusing that same `scroll-locked` class (set at the end of
  // every render()) means this never needs its own separate list to keep
  // in sync. Deliberately not gated by isTyping, same reasoning as
  // Escape below — Tab has to keep working while focus is inside a real
  // input in one of these surfaces.
  if(e.key === 'Tab' && document.documentElement.classList.contains('scroll-locked')){
    // Prefer an open overlay's card (swipe-assign picker, Quick Search,
    // Quick Jump, the quick-action sheet, the clipboard/expect-closure
    // pickers — all share `.my-name-picker-overlay` > `.my-name-picker-
    // card`); fall back to the Reports/Admin/Import dropdown, since only
    // one of these surfaces is ever open at a time in practice.
    const overlayCard = document.querySelector('.my-name-picker-overlay .my-name-picker-card');
    const container = overlayCard || document.querySelector('.more-menu-dropdown');
    if(container){
      const focusables = Array.from(container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )).filter(el => el.offsetParent !== null);
      if(focusables.length){
        const first = focusables[0], last = focusables[focusables.length - 1];
        const current = document.activeElement;
        if(!container.contains(current)){
          e.preventDefault();
          first.focus();
        } else if(e.shiftKey && current === first){
          e.preventDefault();
          last.focus();
        } else if(!e.shiftKey && current === last){
          e.preventDefault();
          first.focus();
        }
      }
    }
  }
  // (2026-09-30) showQuickJump added to the Escape close list
  // FIX (2026-09-29): "smooth UI" report — Escape closes whichever
  // floating surface is open (Reports/Admin dropdown, Quick Search modal,
  // swipe-assign picker), same as it would in any well-behaved menu/modal.
  // Deliberately NOT gated by isTyping — Escape never inserts a character,
  // so it should work even with focus inside, say, the Quick Search box.
  if(e.key === 'Escape'){
    // (2026-09-29, part 2) showClipboardPicker added here too — same
    // fixed-overlay pattern as the others, just missed on the first pass.
    if(state.showMoreMenu || state.showToolsMenu || state.showImportMenu || state.showNavAddMenu || state.showQuickSearchModal || state.showSwipeAssignPicker || state.showClipboardPicker || state.quickActionRowId || state.showQuickJump || state.expectClosureRowId){
      state.showMoreMenu = false;
      state.showToolsMenu = false;
      state.showImportMenu = false;
      state.showNavAddMenu = false;
      state.showQuickSearchModal = false;
      state.showSwipeAssignPicker = false;
      state.pendingSwipeAssignRowId = null;
      state.showClipboardPicker = false;
      state.quickActionRowId = null;
      state.expectClosureRowId = null;
      state.expectClosureError = null;
      state.showQuickJump = false;
      state.quickJumpQuery = '';
      state.quickJumpResults = null;
      render();
      return;
    }
  }
  // Spreadsheet-style row navigation: ArrowUp/ArrowDown while focused in a
  // plain text cell (Time/Candidate/Company/Round/Duration) jumps to the
  // same field on the row above/below, instead of doing nothing (a
  // single-line input has no vertical text to move a cursor through
  // anyway). Deliberately NOT applied to <select> or checkbox fields —
  // arrow keys already have real, expected meaning there (cycling the
  // dropdown's own options), and hijacking that would be a regression,
  // not an improvement.
  if((e.key === 'ArrowDown' || e.key === 'ArrowUp') && tag === 'INPUT'){
    const el = document.activeElement;
    if(el.classList.contains('cell-input') && el.type !== 'checkbox'){
      const tr = el.closest('tr[data-id]');
      const field = el.dataset.field;
      if(tr && field){
        const allRows = Array.from(document.querySelectorAll('tbody tr[data-id]'));
        const idx = allRows.indexOf(tr);
        const targetIdx = e.key === 'ArrowDown' ? idx + 1 : idx - 1;
        if(idx !== -1 && targetIdx >= 0 && targetIdx < allRows.length){
          const targetInput = allRows[targetIdx].querySelector(`[data-field="${field}"]`);
          if(targetInput){
            e.preventDefault();
            targetInput.focus();
            if(targetInput.select) targetInput.select();
          }
        }
      }
    }
    return;
  }
  if(isTyping) return;
  const tabMap = { '1':'all', '2':'1st', '3':'2nd', '4':'doubts', '5':'rescheduled' };
  if(tabMap[e.key]){
    state.view = tabMap[e.key];
    state.filter = 'all';
    state.selectedIds.clear();
    render();
  }
});
// ===========================================================================
// LIVE FEED (2026-10-05) — Facebook-style smart alerts. Completely separate
// from the existing 🔔 Notifications panel / ⏰ Alerts (nothing there is
// touched). Lives OUTSIDE #app (like the bottom nav) so render() never wipes
// it. Two rules, both evaluated from the app's own call history:
//   A) "Back after a long gap" — a candidate whose previous call was 14+ days
//      ago gets a call today.
//   B) "Company handled by one person" — a company whose recent calls were
//      all handled by the same person gets a new call today that is
//      unassigned or goes to someone else.
// Delivery: slide-in toast top-right (auto-hides) + 🛎️ bell with unread
// badge + a feed list that keeps the history.
// ===========================================================================
const LIVEFEED_LONG_GAP_DAYS = 14;      // Rule A threshold
const LIVEFEED_COMPANY_LOOKBACK_DAYS = 7; // Rule B window
const LIVEFEED_REPEAT_NOSHOW_MIN = 2;     // Rule C: earlier rescheduled/cancelled/no-response outcomes
const LIVEFEED_COMPANY_MIN_CALLS = 2;     // Rule B: min earlier assigned calls
const LIVEFEED_STORE_KEY = 'coveragedesk_livefeed_v1';
const LIVEFEED_MAX_ITEMS = 60;
const LIVEFEED_MAX_TOASTS = 3;
const LIVEFEED_TOAST_MS = 10000;

function livefeedDayDiff(a, b){ // b - a, in whole days, both 'YYYY-MM-DD'
  const pa = String(a).split('-').map(Number), pb = String(b).split('-').map(Number);
  if(pa.length<3 || pb.length<3 || pa.some(isNaN) || pb.some(isNaN)) return NaN;
  return Math.round((Date.UTC(pb[0],pb[1]-1,pb[2]) - Date.UTC(pa[0],pa[1]-1,pa[2])) / 86400000);
}

// Pure rule engine — no DOM, no state; takes every call across dates (rows
// carry `_date`) and today's date string, returns the alerts that apply.

// ---- Tolerant name matching for LOOKUPS and informational alerts (2026-10-05) ----
// Names arrive typed many ways ("Sai Prassana" / "Sai Prasana", "Singh Abhishek",
// "Sushmitha B"). Exact keys miss those. "Tight" = very probably the same person
// (same words in any order, tiny spelling slips on long words, or the existing
// First-L./typo rules). "Loose" = the query is just part of the name — only ever
// used to LIST candidates for a human to choose from. Nothing here auto-assigns,
// auto-merges or auto-adds anything.
function deskNameTokens(n){ return String(n || '').toLowerCase().replace(/[^a-z\s]/g, ' ').split(/\s+/).filter(Boolean); }
function deskTokenNear(a, b){
  if(a === b) return true;
  if(Math.min(a.length, b.length) < 5) return false;
  const lim = Math.max(a.length, b.length) >= 9 ? 2 : 1;
  return Math.abs(a.length - b.length) <= lim && levenshteinDistance(a, b) <= lim;
}
function deskTightSameName(a, b){
  const ta = deskNameTokens(a), tb = deskNameTokens(b);
  if(!ta.length || !tb.length) return false;
  if(ta.join('') === tb.join('') || ta.slice().sort().join(' ') === tb.slice().sort().join(' ')) return true;
  if(firstNameLastInitialFuzzyMatch(a, b)) return true; // 'Sushmitha B' vs 'Sushmitha Basavaraju'
  // (deliberately NOT the whole-name edit-distance-2 rule: 'Prasanna' vs 'Prasanth' are different people)
  if(ta.length < 2 || ta.length !== tb.length) return false;
  const used = new Set();
  return ta.every(x => { const j = tb.findIndex((y, i) => !used.has(i) && deskTokenNear(x, y)); if(j < 0) return false; used.add(j); return true; });
}
function deskLooseNameMatch(query, name){
  const q = deskNameTokens(query), n = deskNameTokens(name);
  if(!q.length || !n.length) return false;
  if(normalizeNameKey(name).includes(normalizeNameKey(query))) return true;
  return q.every(x => n.some(y => y === x || (x.length >= 3 && y.startsWith(x)) || (x.length === 1 && y[0] === x) || deskTokenNear(x, y)));
}
// Groups every distinct typed name into "probably the same person" clusters.
function deskBuildPersonResolver(rows){
  const count = new Map(), last = new Map();
  (rows || []).forEach(r => { const nm = String(r.candidate || '').replace(/\s+/g, ' ').trim(); if(!nm) return; count.set(nm, (count.get(nm) || 0) + 1); if((r._date || '') > (last.get(nm) || '')) last.set(nm, r._date || ''); });
  const names = Array.from(count.keys());
  const parent = names.map((_, i) => i);
  const find = i => { while(parent[i] !== i){ parent[i] = parent[parent[i]]; i = parent[i]; } return i; };
  const blocks = new Map();
  names.forEach((nm, i) => { const t = deskNameTokens(nm); const b = t.map(x => x[0]).sort().join('') + t.length; const b2 = t.map(x => x[0]).sort().join('') + 'x'; [b, b2].forEach(k => { if(!blocks.has(k)) blocks.set(k, []); blocks.get(k).push(i); }); });
  blocks.forEach(list => { for(let i = 0; i < list.length; i++) for(let j = i + 1; j < list.length; j++){ const a = list[i], b = list[j]; if(find(a) !== find(b) && deskTightSameName(names[a], names[b])) parent[find(a)] = find(b); } });
  const groups = new Map();
  names.forEach((nm, i) => { const r = find(i); if(!groups.has(r)) groups.set(r, []); groups.get(r).push(nm); });
  const keyByName = new Map(), clusters = new Map();
  groups.forEach(list => {
    list.sort((a, b) => count.get(b) - count.get(a) || b.length - a.length);
    const key = normalizeNameKey(list[0]) || list[0];
    const c = { key, name: list[0], variants: list.slice(), n: 0, last: '' };
    list.forEach(nm => { keyByName.set(nm, key); c.n += count.get(nm); if(last.get(nm) > c.last) c.last = last.get(nm); });
    clusters.set(key, c);
  });
  return { keyOf: nm => keyByName.get(String(nm || '').replace(/\s+/g, ' ').trim()) || normalizeNameKey(nm), clusters };
}

function computeSmartAlerts(allRows, today, opts){
  const teamNames = (opts && opts.teamNames) || new Set();
  const pkey = (opts && opts.personKey) || normalizeNameKey; // candidate identity (tolerant when the caller passes a resolver)
  // a team name (e.g. 'HYD Team') is NOT a person — treat it as 'not assigned to anyone yet'
  const akey = a => (a && !teamNames.has(String(a))) ? normalizeNameKey(a) : '';
  const pn = a => akey(a) ? a : '';
  const alerts = [];
  const rows = (allRows || []).filter(r => r && r._date && r.candidate && String(r.candidate).trim());
  const todayRows = rows.filter(r => r._date === today);
  const priorRows = rows.filter(r => r._date < today);
  if(!todayRows.length) return alerts;

  // ---- Rule A: candidate returns after a long gap ----
  const lastPriorByCand = new Map(); // key -> {date,row}
  priorRows.forEach(r => {
    const k = pkey(r.candidate); if(!k) return;
    const cur = lastPriorByCand.get(k);
    if(!cur || r._date > cur.date) lastPriorByCand.set(k, { date: r._date, row: r });
  });
  const seenA = new Set();
  todayRows.forEach(r => {
    const k = pkey(r.candidate);
    if(!k || seenA.has(k)) return;
    const prev = lastPriorByCand.get(k); if(!prev) return;
    const gap = livefeedDayDiff(prev.date, today);
    if(!(gap >= LIVEFEED_LONG_GAP_DAYS)) return;
    seenA.add(k);
    alerts.push({
      id: 'A|' + today + '|' + k, type: 'long-gap', date: today,
      candidate: r.candidate, company: r.company || '', rowId: r.id,
      gapDays: gap, lastDate: prev.date, lastCompany: prev.row.company || '', lastAssignee: prev.row.assignee || '',
      title: '⏳ ' + r.candidate + ' is back after ' + gap + ' days',
      body: 'Last call was ' + prev.date + (prev.row.company ? ' (' + prev.row.company + ')' : '') +
            (pn(prev.row.assignee) ? ', handled by ' + prev.row.assignee : '') +
            '. Today: ' + (r.company || 'a new call') + (pn(r.assignee) ? ' → ' + r.assignee : ' (unassigned)') + '.'
    });
  });

  // ---- Rule B: company's recent calls all handled by one person ----
  const cutoff = (function(){ const p = today.split('-').map(Number); const d = new Date(Date.UTC(p[0],p[1]-1,p[2]-LIVEFEED_COMPANY_LOOKBACK_DAYS)); return d.toISOString().slice(0,10); })();
  const histByCompany = new Map();
  priorRows.forEach(r => {
    if(r._date < cutoff) return;
    const ck = normalizeCompanyKey(r.company); const ak = akey(r.assignee);
    if(!ck || !ak) return;
    if(!histByCompany.has(ck)) histByCompany.set(ck, []);
    histByCompany.get(ck).push(r);
  });
  const todayByCompany = new Map();
  todayRows.forEach(r => {
    const ck = normalizeCompanyKey(r.company); if(!ck) return;
    if(!todayByCompany.has(ck)) todayByCompany.set(ck, []);
    todayByCompany.get(ck).push(r);
  });
  todayByCompany.forEach((tRows, ck) => {
    const hist = histByCompany.get(ck);
    if(!hist || hist.length < LIVEFEED_COMPANY_MIN_CALLS) return;
    const handlers = new Set(hist.map(r => akey(r.assignee)));
    if(handlers.size !== 1) return;
    const handlerKey = Array.from(handlers)[0];
    const handlerName = hist[0].assignee;
    const needing = tRows.filter(r => akey(r.assignee) !== handlerKey);
    if(!needing.length) return; // today's calls already with the usual person — nothing to flag
    const unassigned = needing.filter(r => !akey(r.assignee));
    const others = needing.filter(r => akey(r.assignee));
    const days = new Set(hist.map(r => r._date)).size;
    const company = tRows[0].company;
    const parts = [];
    if(unassigned.length) parts.push(unassigned.length + ' unassigned');
    if(others.length) parts.push(others.length + ' with ' + Array.from(new Set(others.map(r => r.assignee))).join(', '));
    alerts.push({
      id: 'B|' + today + '|' + ck, type: 'company-handler', date: today,
      company, handler: handlerName, rowId: (unassigned[0] || needing[0]).id,
      priorCalls: hist.length, priorDays: days,
      title: '🏢 ' + company + ' — previously handled by ' + handlerName,
      body: hist.length + ' earlier call' + (hist.length>1?'s':'') + ' over the last ' + days + ' day' + (days>1?'s':'') +
            ' all went to ' + handlerName + '. Today ' + needing.length + ' new call' + (needing.length>1?'s are':' is') + ' not with them (' + parts.join(', ') + ').'
    });
  });

  // ---- Rule C: repeat no-show / reschedule history ----
  const LF_BAD = ['rescheduled','cancelled','not_responded','no_invite'];
  const badByCand = new Map();
  priorRows.forEach(r => {
    if(!LF_BAD.includes(r.status)) return;
    const k = pkey(r.candidate); if(!k) return;
    badByCand.set(k, (badByCand.get(k) || 0) + 1);
  });
  const seenC = new Set();
  todayRows.forEach(r => {
    const k = pkey(r.candidate);
    if(!k || seenC.has(k) || LF_BAD.includes(r.status)) return;
    const n = badByCand.get(k) || 0;
    if(n < LIVEFEED_REPEAT_NOSHOW_MIN) return;
    seenC.add(k);
    alerts.push({
      id: 'C|' + today + '|' + k, type: 'repeat-noshow', date: today,
      candidate: r.candidate, company: r.company || '', rowId: r.id,
      title: '⚠️ ' + r.candidate + ' — ' + n + ' earlier rescheduled/cancelled/no-response calls',
      body: 'Has a call today' + (r.company ? ' with ' + r.company : '') + ' at ' + (r.time || 'time n/a') + '. Worth a quick confirmation before assuming it goes ahead.'
    });
  });

  // ---- Rule D: later round — earlier round at the same company was handled by someone ----
  const prevByCandCo = new Map(); // cand|company -> latest earlier row that had an assignee
  priorRows.forEach(r => {
    const ck = normalizeCompanyKey(r.company), k = pkey(r.candidate), ak = akey(r.assignee);
    if(!ck || !k || !ak || LF_BAD.includes(r.status)) return;
    const key = k + '|' + ck; const cur = prevByCandCo.get(key);
    if(!cur || r._date > cur._date) prevByCandCo.set(key, r);
  });
  const seenD = new Set();
  todayRows.forEach(r => {
    if(!isAdvancedRound(r.round) || r.woi) return;
    const k = pkey(r.candidate), ck = normalizeCompanyKey(r.company);
    if(!k || !ck) return;
    const key = k + '|' + ck; if(seenD.has(key)) return;
    const prev = prevByCandCo.get(key); if(!prev) return;
    if(akey(r.assignee) === akey(prev.assignee)) return; // already with the same person
    seenD.add(key);
    alerts.push({
      id: 'D|' + today + '|' + key, type: 'round-continuity', date: today,
      candidate: r.candidate, company: r.company, handler: prev.assignee, rowId: r.id,
      title: '🔁 ' + r.candidate + ' — earlier round was with ' + prev.assignee,
      body: (prev.round || 'Earlier round') + ' at ' + r.company + ' on ' + prev._date + ' was handled by ' + prev.assignee +
            '. Today\'s ' + (r.round || 'next round') + ' is ' + (pn(r.assignee) ? 'with ' + r.assignee : 'unassigned') + '.'
    });
  });
  return alerts;
}

(function setupLiveFeed(){
  const lf = { items: [], seen: {}, muted: false, open: false, lastError: null, lastCheckedAt: 0, lastSig: '', timer: null, running: false };
  window._liveFeed = lf;

  function load(){
    try{
      const raw = localStorage.getItem(LIVEFEED_STORE_KEY);
      if(raw){ const o = JSON.parse(raw); lf.items = Array.isArray(o.items) ? o.items : []; lf.muted = !!o.muted; lf.seen = (o.seen && typeof o.seen === 'object') ? o.seen : {}; }
    }catch(e){}
  }
  function save(){
    try{ localStorage.setItem(LIVEFEED_STORE_KEY, JSON.stringify({ items: lf.items.slice(0, LIVEFEED_MAX_ITEMS), seen: lf.seen, muted: lf.muted })); }catch(e){}
  }
  load();

  // ----- DOM (outside #app) -----
  const toastBox = document.createElement('div');
  toastBox.id = 'liveFeedToasts'; toastBox.className = 'lf-toasts'; toastBox.setAttribute('aria-live','polite');
  const bell = document.createElement('button');
  bell.id = 'liveFeedBell'; bell.className = 'lf-bell'; bell.type = 'button';
  bell.title = 'Live Feed — smart alerts about returning candidates and company handlers'; bell.setAttribute('aria-label','Live Feed');
  const panel = document.createElement('div');
  panel.id = 'liveFeedPanel'; panel.className = 'lf-panel'; panel.style.display = 'none';
  document.body.appendChild(toastBox); document.body.appendChild(bell); document.body.appendChild(panel);

  function unread(){ return lf.items.filter(i => !i.read).length; }
  function paintBell(){
    const n = unread();
    bell.innerHTML = (lf.muted ? '🔕' : '🛎️') + (n ? '<span class="lf-badge">' + (n > 9 ? '9+' : n) + '</span>' : '');
    bell.classList.toggle('has-unread', n > 0);
  }

  function ago(ts){
    const m = Math.round((Date.now() - ts) / 60000);
    if(m < 1) return 'just now'; if(m < 60) return m + 'm ago';
    const h = Math.round(m / 60); if(h < 24) return h + 'h ago';
    return Math.round(h / 24) + 'd ago';
  }
  function lfNeedsPerson(row){ const a = String(row.assignee || '').trim(); return !a || (state.roster || []).some(p => p.team === a); }
  function liveRow(item){
    if(item.date !== state.date) return null;
    return (state.rows || []).find(r => r.id === item.rowId) || null;
  }
  function actionsHtml(item){
    const out = [];
    const row = liveRow(item);
    if((item.type === 'company-handler' || item.type === 'round-continuity') && CURRENT_ROLE === 'admin' && row && lfNeedsPerson(row) && item.handler){
      out.push('<button class="lf-act primary" data-lf-assign="' + escapeHtml(item.id) + '">Assign to ' + escapeHtml(item.handler) + '</button>');
    }
    if(item.date === state.date) out.push('<button class="lf-act" data-lf-show="' + escapeHtml(item.id) + '">Show ' + (item.type==='company-handler' ? 'calls' : 'call') + '</button>');
    return out.join('');
  }
  function itemHtml(item, inToast){
    return '<div class="lf-item ' + (item.read ? '' : 'unread') + '" data-lf-id="' + escapeHtml(item.id) + '">' +
      '<div class="lf-item-main"><div class="lf-title">' + escapeHtml(item.title) + '</div>' +
      '<div class="lf-body">' + escapeHtml(item.body) + '</div>' +
      '<div class="lf-meta">' + escapeHtml(ago(item.ts)) + '</div>' +
      '<div class="lf-actions">' + actionsHtml(item) + '</div></div>' +
      (inToast ? '<button class="lf-x" data-lf-dismiss="' + escapeHtml(item.id) + '" aria-label="Dismiss">✕</button>' : '') + '</div>';
  }
  function paintPanel(){
    if(!lf.open){ panel.style.display = 'none'; return; }
    panel.style.display = 'flex';
    panel.innerHTML =
      '<div class="lf-panel-head"><strong>🛎️ Live Feed</strong><span class="lf-head-btns">' +
      '<button class="lf-link" id="lfMute">' + (lf.muted ? '🔕 Pop-ups off' : '🔔 Pop-ups on') + '</button>' +
      '<button class="lf-link" id="lfReadAll">Mark read</button>' +
      '<button class="lf-link" id="lfClear">Clear</button>' +
      '<button class="lf-x" id="lfClose" aria-label="Close">✕</button></span></div>' +
      '<div class="lf-list">' + (lf.items.length ? lf.items.map(i => itemHtml(i, false)).join('') :
        '<div class="lf-empty">Nothing yet. You\'ll be alerted when a candidate comes back after ' + LIVEFEED_LONG_GAP_DAYS + '+ days, or when a company whose recent calls all went to one person gets a new call.</div>') + '</div>' +
      '<div class="lf-foot">' + (lf.lastError ? '⚠️ Last check failed: ' + escapeHtml(lf.lastError) + ' — will retry. ' : (lf.lastCheckedAt ? 'Checked ' + ago(lf.lastCheckedAt) + '. ' : '')) +
      '<button class="lf-link" id="lfRecheck">Check now</button></div>';
  }
  function setOpen(v){
    lf.open = v;
    if(v){ lf.items.forEach(i => { i._seenOpen = true; }); }
    paintPanel();
    if(!v){ lf.items.forEach(i => { if(i._seenOpen){ i.read = true; delete i._seenOpen; } }); save(); paintBell(); }
  }

  // ----- toasts -----
  function removeToast(el){ if(el && el.parentNode) el.parentNode.removeChild(el); }
  function showToast(item){
    if(lf.muted) return;
    while(toastBox.children.length >= LIVEFEED_MAX_TOASTS) removeToast(toastBox.firstChild);
    const el = document.createElement('div');
    el.className = 'lf-toast'; el.setAttribute('role','status'); el.dataset.lfToastId = item.id;
    el.innerHTML = itemHtml(item, true);
    toastBox.appendChild(el);
    let t = setTimeout(() => removeToast(el), LIVEFEED_TOAST_MS);
    el.addEventListener('mouseenter', () => clearTimeout(t));
    el.addEventListener('mouseleave', () => { t = setTimeout(() => removeToast(el), 4000); });
  }

  // ----- evaluation -----
  async function evaluate(force){
    if(lf.running) return;
    const today = todayDateString();
    if(state.needsLogin || state.date !== today || !(state.rows||[]).length) return;
    lf.running = true;
    try{
      const all = await fetchAllRowsAcrossDates(!!force);
      const resolver = deskBuildPersonResolver(all);
      const alerts = computeSmartAlerts(all, today, { teamNames: new Set((state.roster || []).map(p => p.team)), personKey: resolver.keyOf });
      try{ if(window.deskOnAllRows) window.deskOnAllRows(all, today); }catch(e){}
      // `seen` remembers every alert ever raised — Clear / mark-read / expiry never make it fire again
      lf.items.forEach(i => { if(!lf.seen[i.id]) lf.seen[i.id] = i.ts || Date.now(); });
      const known = new Set(Object.keys(lf.seen));
      const fresh = alerts.filter(a => !known.has(a.id));
      fresh.forEach(a => { lf.seen[a.id] = Date.now(); lf.items.unshift(Object.assign({ ts: Date.now(), read: false }, a)); });
      // refresh the text of existing items for today (counts can change as calls are assigned)
      alerts.forEach(a => { const ex = lf.items.find(i => i.id === a.id); if(ex){ ex.body = a.body; ex.title = a.title; ex.rowId = a.rowId; ex.handler = a.handler; } });
      const cutoffTs = Date.now() - 14*86400000;
      lf.items = lf.items.filter(i => i.ts >= cutoffTs).slice(0, LIVEFEED_MAX_ITEMS);
      Object.keys(lf.seen).forEach(k => { if(lf.seen[k] < Date.now() - 45*86400000) delete lf.seen[k]; });
      lf.lastError = null; lf.lastCheckedAt = Date.now();
      save(); paintBell(); if(lf.open) paintPanel();
      const shown = fresh.slice(0, LIVEFEED_MAX_TOASTS);
      shown.forEach(showToast);
      if(fresh.length > shown.length && !lf.muted) showToast({ id:'more', type:'more', date:'', rowId:'', ts:Date.now(), read:false, title:'+' + (fresh.length - shown.length) + ' more alerts', body:'Open the 🛎️ Live Feed to see them all.' });
    }catch(e){
      lf.lastError = String(e && e.message || e); console.warn('[LiveFeed] check failed', e);
      if(lf.open) paintPanel();
    }finally{ lf.running = false; }
  }
  function scheduleCheck(){
    if(lf.timer) clearTimeout(lf.timer);
    lf.timer = setTimeout(() => { lf.timer = null; evaluate(false); }, 2000);
  }
  function signature(){
    return state.date + '#' + (state.rows||[]).map(r => (r.id||'') + '|' + (r.candidate||'') + '|' + (r.company||'') + '|' + (r.assignee||'')).join(';');
  }
  window.livefeedEvaluateNow = evaluate;

  // re-check only when today's rows actually changed (cheap signature compare)
  const prevRender = window.render;
  window.render = function(...args){
    const result = prevRender.apply(this, args);
    try{
      if(state.date === todayDateString() && !state.needsLogin && (state.rows||[]).length){
        const sig = signature();
        if(sig !== lf.lastSig){ lf.lastSig = sig; scheduleCheck(); }
      }
    }catch(e){}
    return result;
  };

  // ----- interactions (event delegation; survives everything) -----
  function findItem(id){ return lf.items.find(i => i.id === id); }
  function doShow(item){
    if(!item) return;
    closeAllPanels();
    state.filter = 'all'; state.view = 'all';
    if(item.type === 'company-handler'){ state.search = ''; state.clientFilter = item.company; }
    else { state.clientFilter = ''; state.search = item.candidate; }
    render(); window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function doAssign(item){
    if(CURRENT_ROLE !== 'admin') return;
    const row = item && liveRow(item); if(!row || !lfNeedsPerson(row)) return;
    row.assignee = item.handler; markDirty(); render();
    const t = toastBox.querySelector('[data-lf-toast-id="' + CSS.escape(item.id) + '"]'); removeToast(t);
    evaluate(false);
  }
  document.addEventListener('click', function(e){
    const t = e.target;
    if(t.closest('#liveFeedBell')){ setOpen(!lf.open); return; }
    const as = t.closest('[data-lf-assign]'); if(as){ doAssign(findItem(as.getAttribute('data-lf-assign'))); if(lf.open) paintPanel(); return; }
    const sh = t.closest('[data-lf-show]'); if(sh){ doShow(findItem(sh.getAttribute('data-lf-show'))); const tt = sh.closest('.lf-toast'); removeToast(tt); if(lf.open) setOpen(false); return; }
    const dm = t.closest('[data-lf-dismiss]'); if(dm){ removeToast(dm.closest('.lf-toast')); return; }
    if(t.closest('#lfClose')){ setOpen(false); return; }
    if(t.closest('#lfMute')){ lf.muted = !lf.muted; save(); paintBell(); paintPanel(); if(lf.muted) toastBox.innerHTML=''; return; }
    if(t.closest('#lfReadAll')){ lf.items.forEach(i => i.read = true); save(); paintBell(); paintPanel(); return; }
    if(t.closest('#lfClear')){ lf.items = []; save(); paintBell(); paintPanel(); return; }
    if(t.closest('#lfRecheck')){ evaluate(true); return; }
    if(lf.open && !t.closest('#liveFeedPanel')) setOpen(false);
  });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && lf.open) setOpen(false); });
  paintBell();
})();

// ===========================================================================
// STUDENTS MASTER AUTO-ADD (2026-10-05) — after a successful Save, any
// candidate on that date who is clearly NOT in Students Master is added
// automatically. Anything doubtful (a fuzzy "maybe the same person" match,
// an odd-looking name, a call carrying doubts) is NOT added — it goes to a
// small review window for the admin to decide. People are never fuzzy-
// matched silently: the existing exact/confirmed logic decides "known".
// Students Master is saved as a full replace server-side, so every write
// re-reads the live list first and merges, and verifies afterwards.
// ===========================================================================
const STUDENT_AUTOADD_SKIP_KEY = 'cd_student_autoadd_skipped_v1';
function studentCountryForMaster(c){
  const t = String(c || '').trim();
  if(!t) return '';
  if(/^(usa|us|u\.s\.a?\.?)$/i.test(t)) return 'United States';
  if(/^(uk|u\.k\.)$/i.test(t)) return 'United Kingdom';
  return t;
}
// Pure classifier. `lookup(name)` returns {kind:'known'} | {kind:'new'} | {kind:'maybe', student}.
function classifyNewStudentCandidates(rows, lookup){
  const out = { autoAdd: [], review: [] };
  const seen = new Set();
  (rows || []).forEach(r => {
    const name = String(r && r.candidate || '').replace(/\s+/g, ' ').trim();
    const key = normalizeNameKey(name);
    if(!name || !key || seen.has(key)) return;
    seen.add(key);
    if(/^(tbd|tba|unknown|n\/?a|none|test|dummy)$/i.test(name)) return;
    const hit = lookup(name);
    if(!hit || hit.kind === 'known') return;
    const country = studentCountryForMaster(r.country);
    if(hit.kind === 'maybe'){
      out.review.push({ kind: 'maybe', name, key, country, student: hit.student, pairKey: hit.pairKey || '' });
      return;
    }
    // kind === 'new' — decide whether the name itself is clean enough to add unattended
    const tokens = name.split(' ');
    let doubt = '';
    if(!/^[A-Za-zÀ-ÿ][A-Za-zÀ-ÿ.'’\- ]*$/.test(name)) doubt = 'The name has unusual characters, digits or separators.';
    else if(tokens.length < 2) doubt = 'Only one word — could be a partial name.';
    else if(tokens.some(t => t.replace(/[.'’\-]/g, '').length < 2)) doubt = 'Contains a single-letter part — could be an abbreviation of someone already listed.';
    else if(Array.isArray(r.doubts) && r.doubts.length) doubt = 'This call was flagged with a doubt when it was imported.';
    if(doubt) out.review.push({ kind: 'doubt', name, key, country, reason: doubt });
    else out.autoAdd.push({ name, key, country });
  });
  return out;
}

(function setupStudentAutoAdd(){
  const sa = { running: false, pendingReview: [], undo: null };
  window._studentAutoAdd = sa;
  const lookupFromBadge = name => {
    const b = studentMatchBadgeInfo(name);
    if(!b) return { kind: 'known' };
    if(b.kind === 'confirm') return { kind: 'maybe', student: b.student, pairKey: b.pairKey };
    return { kind: 'new' };
  };
  function skipped(){ try{ return JSON.parse(localStorage.getItem(STUDENT_AUTOADD_SKIP_KEY) || '{}'); }catch(e){ return {}; } }
  function markSkipped(key){ try{ const s = skipped(); s[key] = Date.now(); localStorage.setItem(STUDENT_AUTOADD_SKIP_KEY, JSON.stringify(s)); }catch(e){} }

  // Re-read the live list, merge, write, verify. Throws on any problem and leaves state as it was.
  async function persistNewStudents(list){
    const before = state.studentsMaster || [];
    let base = before;
    if(API_BASE_URL){
      const fresh = await apiCall('students', {});
      base = Array.isArray(fresh.rows) ? fresh.rows : [];
      if(!base.length && before.length) throw new Error('Students Master came back empty from the server — not saving, to avoid wiping the list.');
    }
    const have = new Set(base.map(s => normalizeNameKey(s.name)));
    const toAdd = [];
    list.forEach(n => { const k = normalizeNameKey(n.name); if(k && !have.has(k)){ have.add(k); toAdd.push({ id: uid(), name: n.name, country: n.country || '' }); } });
    if(!toAdd.length){ state.studentsMaster = base; invalidateStudentMatchCache(); return []; }
    const next = [...base, ...toAdd];
    try{
      if(API_BASE_URL){
        await apiCall('students', { method: 'POST', body: { rows: next } });
        const check = await apiCall('students', {});
        if(!Array.isArray(check.rows) || check.rows.length < next.length) throw new Error('Verification failed: server shows ' + (check.rows ? check.rows.length : '?') + ' students, expected ' + next.length + '.');
      } else {
        await storageAdapter.set('students-master', JSON.stringify(next), false);
      }
    }catch(e){
      state.studentsMaster = before; invalidateStudentMatchCache();
      throw e;
    }
    state.studentsMaster = next; invalidateStudentMatchCache();
    return toAdd;
  }
  async function removeStudentIds(ids){
    const idset = new Set(ids);
    let base = state.studentsMaster || [];
    if(API_BASE_URL){ const fresh = await apiCall('students', {}); base = fresh.rows || []; if(!base.length) throw new Error('Students Master came back empty — not changing it.'); }
    const next = base.filter(s => !idset.has(s.id));
    if(API_BASE_URL) await apiCall('students', { method: 'POST', body: { rows: next } });
    else await storageAdapter.set('students-master', JSON.stringify(next), false);
    state.studentsMaster = next; invalidateStudentMatchCache();
  }

  // ----- UI: toast (re-uses Live Feed's toast stack) + review window -----
  function toast(html, ms){
    const box = document.getElementById('liveFeedToasts'); if(!box) return null;
    const el = document.createElement('div'); el.className = 'lf-toast'; el.setAttribute('role', 'status');
    el.innerHTML = '<div class="lf-item"><div class="lf-item-main">' + html + '</div><button class="lf-x" data-sa-close aria-label="Dismiss">✕</button></div>';
    box.appendChild(el);
    if(ms) setTimeout(() => { if(el.parentNode) el.parentNode.removeChild(el); }, ms);
    return el;
  }
  function closeReview(){ const o = document.getElementById('studentReviewOverlay'); if(o) o.remove(); }
  function openReview(){
    closeReview();
    const items = sa.pendingReview;
    if(!items.length) return;
    const o = document.createElement('div'); o.id = 'studentReviewOverlay'; o.className = 'my-name-picker-overlay'; o.style.zIndex = '330';
    o.innerHTML = '<div class="my-name-picker-card" style="max-width:520px;width:94vw;max-height:80vh;overflow-y:auto">' +
      '<div class="my-name-picker-title">🎓 ' + items.length + ' candidate' + (items.length > 1 ? 's' : '') + ' need your decision</div>' +
      '<div class="my-name-picker-sub">Not added automatically — Coverage Desk wasn\'t sure.</div>' +
      items.map((it, i) => '<div class="sa-card" data-sa-i="' + i + '">' +
        '<div class="sa-name">' + escapeHtml(it.name) + '</div>' +
        (it.kind === 'maybe'
          ? '<div class="sa-why">Looks similar to <b>' + escapeHtml(it.student.name) + '</b> already in Students Master.</div>' +
            '<div class="lf-actions"><button class="lf-act primary" data-sa-act="same">Same person</button><button class="lf-act" data-sa-act="different">Different — add as new</button><button class="lf-act" data-sa-act="skip">Skip</button></div>'
          : '<div class="sa-why">' + escapeHtml(it.reason) + '</div>' +
            '<div class="sa-edit"><input class="sa-in" data-sa-name value="' + escapeHtml(it.name) + '" aria-label="Full name"><input class="sa-in" data-sa-country value="' + escapeHtml(it.country) + '" placeholder="Country" aria-label="Country"></div>' +
            '<div class="lf-actions"><button class="lf-act primary" data-sa-act="add">Add to Students Master</button><button class="lf-act" data-sa-act="skip">Skip</button></div>') +
        '<div class="sa-msg" data-sa-msg></div></div>').join('') +
      '<button class="btn ghost" id="saReviewClose" style="width:100%;margin-top:10px">Close</button></div>';
    document.body.appendChild(o);
  }
  async function handleReviewAction(card, act){
    const it = sa.pendingReview[Number(card.getAttribute('data-sa-i'))]; if(!it) return;
    const msg = card.querySelector('[data-sa-msg]');
    const done = text => { card.innerHTML = '<div class="sa-name">' + escapeHtml(it.name) + '</div><div class="sa-why">' + text + '</div>'; it._done = true; };
    try{
      if(act === 'skip'){ markSkipped(it.key); done('Skipped — it won\'t be asked again. You can still add it from Students Master.'); return; }
      if(act === 'same'){
        const pair = it.pairKey || (it.key + '|' + it.student.id);
        state.confirmedStudentMatches.add(pair); invalidateStudentMatchCache();
        if(API_BASE_URL) await apiCall('student_match_decisions', { method: 'POST', body: { candidateKey: it.key, candidateName: it.name, studentId: it.student.id, decision: 'confirmed' } });
        done('✓ Marked as the same person as ' + escapeHtml(it.student.name) + '.'); render(); return;
      }
      let name = it.name, country = it.country;
      if(act === 'add'){ name = card.querySelector('[data-sa-name]').value.trim(); country = card.querySelector('[data-sa-country]').value.trim(); if(!name){ msg.textContent = 'Type a name first.'; return; } }
      if(act === 'different'){
        const pair = it.pairKey || (it.key + '|' + it.student.id);
        state.rejectedStudentMatches.add(pair);
        if(API_BASE_URL){ try{ await apiCall('student_match_decisions', { method: 'POST', body: { candidateKey: it.key, candidateName: it.name, studentId: it.student.id, decision: 'rejected' } }); }catch(e){} }
      }
      const added = await persistNewStudents([{ name, country }]);
      done(added.length ? '✓ Added to Students Master.' : 'Already in Students Master — nothing to add.'); render();
    }catch(e){ if(msg) msg.textContent = '⚠ Failed: ' + (e && e.message || e) + ' — nothing was changed.'; }
  }
  document.addEventListener('click', function(e){
    const t = e.target;
    const cl = t.closest('[data-sa-close]'); if(cl){ const tt = cl.closest('.lf-toast'); if(tt) tt.remove(); return; }
    if(t.closest('[data-sa-review]')){ openReview(); return; }
    if(t.closest('[data-sa-undo]') && sa.undo){
      const u = sa.undo; sa.undo = null; const tt = t.closest('.lf-toast');
      removeStudentIds(u.ids).then(() => { if(tt) tt.innerHTML = '<div class="lf-item"><div class="lf-item-main"><div class="lf-body">Undone — removed ' + u.ids.length + ' student' + (u.ids.length > 1 ? 's' : '') + ' again.</div></div></div>'; render(); })
        .catch(err => { toast('<div class="lf-title">⚠ Undo failed</div><div class="lf-body">' + escapeHtml(err.message || String(err)) + '</div>', 12000); });
      return;
    }
    if(t.id === 'saReviewClose' || (t.id === 'studentReviewOverlay')){ closeReview(); return; }
    const b = t.closest('[data-sa-act]'); if(b){ const card = b.closest('.sa-card'); if(card) handleReviewAction(card, b.getAttribute('data-sa-act')); }
  });

  // ----- entry point, called after a successful Save -----
  async function run(rows){
    if(sa.running || CURRENT_ROLE !== 'admin') return;
    sa.running = true;
    try{
      if(!state.studentsMasterLoaded) await loadStudentsMaster();
      if(!state.studentsMasterLoaded || (API_BASE_URL && state.studentsMasterBackendMissing)){
        toast('<div class="lf-title">🎓 New students not checked</div><div class="lf-body">Couldn\'t reach Students Master just now — your calls are saved. It will check again on the next save.</div>', 12000);
        return;
      }
      const sk = skipped();
      const result = classifyNewStudentCandidates(rows, lookupFromBadge);
      const review = result.review.filter(it => !sk[it.key]);
      let added = [];
      if(result.autoAdd.length) added = await persistNewStudents(result.autoAdd);
      if(added.length){
        sa.undo = { ids: added.map(s => s.id) };
        const names = added.slice(0, 6).map(s => escapeHtml(s.name)).join(', ') + (added.length > 6 ? ' +' + (added.length - 6) + ' more' : '');
        toast('<div class="lf-title">🎓 ' + added.length + ' new student' + (added.length > 1 ? 's' : '') + ' added to Students Master</div><div class="lf-body">' + names + '</div><div class="lf-actions"><button class="lf-act" data-sa-undo>Undo</button></div>', 20000);
        render();
      }
      sa.pendingReview = review;
      if(review.length) openReview();
    }catch(e){
      console.warn('[StudentAutoAdd] failed', e);
      toast('<div class="lf-title">⚠ Couldn\'t add new students</div><div class="lf-body">' + escapeHtml(e && e.message || String(e)) + ' Your calls were saved; Students Master was not changed.</div>', 15000);
    }finally{ sa.running = false; }
  }
  window.studentAutoAddAfterSave = run;
})();

// ===========================================================================
// DESK TOOLS (2026-10-05) — one window (Reports ▸ 🧰 Desk Tools) with seven
// helpers: Suggest assignees, Checks (workload / duplicates / overlaps),
// Loose ends, Reschedules, Candidate timeline, Weekly report, EOD message.
// Everything below the pure functions is read-only except the explicit
// "Accept" buttons in Suggest (which set an assignee like the dropdown does
// and mark the day dirty — you still press Save). Team isolation is kept:
// first-round calls are only ever suggested to the call's own team,
// advanced rounds only to ★ advanced people. People are matched by exact
// name key only (never fuzzy); only company names get the fuzzy key.
// ===========================================================================
const DESK_LOOSE_END_LOOKBACK_DAYS = 7;
const DESK_RESCHEDULE_LOOKBACK_DAYS = 45;
const DESK_IMBALANCE_SPREAD = 4;          // max-min calls within one team to warn
const DESK_BAD_STATUSES = ['rescheduled','cancelled','not_responded','no_invite'];

function deskIsTeamName(a, teamNames){ return !!(a && teamNames && teamNames.has(String(a))); }
function deskNeedsPerson(row, teamNames){ const a = String(row.assignee || '').trim(); return !a || deskIsTeamName(a, teamNames); }
function deskDateAdd(dateStr, n){ const p = dateStr.split('-').map(Number); return new Date(Date.UTC(p[0], p[1]-1, p[2]+n)).toISOString().slice(0,10); }
function deskMonday(dateStr){ const p = dateStr.split('-').map(Number); const d = new Date(Date.UTC(p[0], p[1]-1, p[2])); const dow = (d.getUTCDay() + 6) % 7; return deskDateAdd(dateStr, -dow); }

// ---- 1. Suggest assignees -------------------------------------------------
function deskSuggestAssignees(todayRows, allRows, roster, absentIds, today, teamNames, pkey){
  pkey = pkey || normalizeNameKey;
  const out = [];
  const prior = (allRows || []).filter(r => r._date && r._date < today);
  const loadOf = {}; const busy = {}; // name -> [{s,e}]
  const interval = r => { const s = timeToMinutes(r.time); const d = parseDurationMinutes(r.duration) || 60; return { s, e: s + d }; };
  (todayRows || []).forEach(r => { if(r.woi || deskNeedsPerson(r, teamNames)) return; loadOf[r.assignee] = (loadOf[r.assignee] || 0) + 1; (busy[r.assignee] = busy[r.assignee] || []).push(interval(r)); });
  const needing = (todayRows || []).filter(r => !r.woi && r.candidate && deskNeedsPerson(r, teamNames))
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));
  needing.forEach(r => {
    const adv = isAdvancedRound(r.round);
    let team = '';
    let pool;
    if(adv){ pool = roster.filter(p => p.advanced && !absentIds.includes(p.id)); team = 'advanced (★) people'; }
    else {
      team = deskIsTeamName(r.assignee, teamNames) ? r.assignee : (isHydCountry(r.country) ? 'HYD Team' : 'Pradeep Anna Team');
      pool = roster.filter(p => p.team === team && !absentIds.includes(p.id));
    }
    if(!pool.length){ out.push({ rowId: r.id, name: '', reason: 'No available people in ' + team + ' today.' }); return; }
    const ck = normalizeCompanyKey(r.company), nk = pkey(r.candidate);
    const iv = interval(r);
    const cutoff14 = deskDateAdd(today, -14);
    const compHist = prior.filter(x => normalizeCompanyKey(x.company) === ck && ck && x._date >= cutoff14 && x.assignee && !deskIsTeamName(x.assignee, teamNames));
    const sameCandCo = prior.filter(x => pkey(x.candidate) === nk && normalizeCompanyKey(x.company) === ck && ck && x.assignee && !deskIsTeamName(x.assignee, teamNames) && !DESK_BAD_STATUSES.includes(x.status))
      .sort((a, b) => b._date.localeCompare(a._date));
    const sameCand = prior.filter(x => pkey(x.candidate) === nk && x.assignee && !deskIsTeamName(x.assignee, teamNames) && !DESK_BAD_STATUSES.includes(x.status))
      .sort((a, b) => b._date.localeCompare(a._date));
    let best = null;
    pool.forEach((p, idx) => {
      const clash = (busy[p.name] || []).some(b => iv.s < b.e && b.s < iv.e);
      if(clash) return;
      let score = 0, why = '';
      if(sameCandCo[0] && normalizeNameKey(sameCandCo[0].assignee) === normalizeNameKey(p.name)){ score += 60; why = 'handled ' + r.candidate + '\'s earlier round at ' + r.company + ' (' + sameCandCo[0]._date + ')'; }
      if(compHist.length >= 2){
        const mine = compHist.filter(x => normalizeNameKey(x.assignee) === normalizeNameKey(p.name)).length;
        const share = mine / compHist.length;
        if(share >= 0.6){ score += 40 * share; if(!why) why = 'handled ' + mine + ' of ' + compHist.length + ' recent ' + r.company + ' calls'; }
      }
      if(sameCand[0] && normalizeNameKey(sameCand[0].assignee) === normalizeNameKey(p.name)){ score += 25; if(!why) why = 'handled ' + r.candidate + ' before (' + sameCand[0]._date + ')'; }
      score -= 4 * (loadOf[p.name] || 0);
      score -= idx * 0.01; // stable tie-break by roster order
      if(!best || score > best.score) best = { p, score, why };
    });
    if(!best){ out.push({ rowId: r.id, name: '', reason: 'Everyone available in ' + team + ' is already booked at ' + (r.time || 'that time') + '.' }); return; }
    const load = loadOf[best.p.name] || 0;
    const reason = best.why ? (best.p.name + ' ' + best.why + '. Load today: ' + load + '.') : ('Lightest load in ' + team + ' (' + load + ' call' + (load === 1 ? '' : 's') + ' today), free at ' + (r.time || 'that time') + '.');
    out.push({ rowId: r.id, name: best.p.name, reason, strong: !!best.why });
    loadOf[best.p.name] = load + 1; (busy[best.p.name] = busy[best.p.name] || []).push(iv);
  });
  return out;
}

// ---- 2. Checks: workload / duplicates / overlaps ---------------------------
function deskChecks(rows, roster, absentIds, teamNames){
  const issues = []; const perPerson = [];
  const count = {};
  (rows || []).forEach(r => { if(r.woi || deskNeedsPerson(r, teamNames)) return; count[r.assignee] = (count[r.assignee] || 0) + 1; });
  const teams = {};
  roster.forEach(p => { (teams[p.team] = teams[p.team] || []).push(p); });
  Object.keys(teams).forEach(t => {
    const avail = teams[t].filter(p => !absentIds.includes(p.id));
    const totals = avail.map(p => ({ name: p.name, n: count[p.name] || 0 }));
    teams[t].forEach(p => perPerson.push({ name: p.name, team: t, n: count[p.name] || 0, absent: absentIds.includes(p.id) }));
    const teamTotal = teams[t].reduce((s, p) => s + (count[p.name] || 0), 0);
    if(avail.length >= 2 && teamTotal >= DESK_IMBALANCE_SPREAD){
      const mx = totals.reduce((a, b) => b.n > a.n ? b : a), mn = totals.reduce((a, b) => b.n < a.n ? b : a);
      if(mx.n - mn.n >= DESK_IMBALANCE_SPREAD) issues.push({ type: 'imbalance', text: t + ': ' + mx.name + ' has ' + mx.n + ' calls, ' + mn.name + ' has ' + mn.n + '.' });
    }
  });
  const absentNames = new Set(roster.filter(p => absentIds.includes(p.id)).map(p => p.name));
  Object.keys(count).forEach(n => { if(absentNames.has(n)) issues.push({ type: 'absent', text: n + ' is marked absent but holds ' + count[n] + ' call' + (count[n] > 1 ? 's' : '') + '.' }); });
  const conflicts = computeConflicts(rows || []);
  if(conflicts.size) issues.push({ type: 'overlap', text: conflicts.size + ' call' + (conflicts.size > 1 ? 's' : '') + ' overlap with the same person\'s other call (see the red ⚠ rows).' });
  const needPerson = (rows || []).filter(r => !r.woi && r.candidate && deskNeedsPerson(r, teamNames)).length;
  if(needPerson) issues.push({ type: 'unassigned', text: needPerson + ' call' + (needPerson > 1 ? 's' : '') + ' still need a named person (open Suggest).' });
  // duplicates: same time+round (existing detector) and same candidate+company at different times
  const dupes = [];
  findDuplicateCallGroups(rows || []).forEach(g => dupes.push(g[0].candidate + ' — listed ' + g.length + '× at ' + (g[0].time || '?') + ' (' + (g[0].round || 'round n/a') + ')'));
  const byCC = {};
  (rows || []).forEach(r => { const k = normalizeNameKey(r.candidate) + '|' + normalizeCompanyKey(r.company); if(!normalizeNameKey(r.candidate) || !normalizeCompanyKey(r.company)) return; (byCC[k] = byCC[k] || []).push(r); });
  Object.values(byCC).forEach(g => {
    if(g.length < 2) return;
    const times = new Set(g.map(r => (r.time || '').replace(/\s+/g, '').toUpperCase()));
    const rounds = new Set(g.map(r => (r.round || '').trim().toLowerCase()));
    if(times.size > 1 && rounds.size === 1) dupes.push(g[0].candidate + ' — ' + g.length + ' calls with ' + g[0].company + ' today in the same round at different times (' + g.map(r => r.time).join(', ') + ')');
  });
  dupes.forEach(d => issues.push({ type: 'duplicate', text: 'Possible duplicate: ' + d }));
  return { issues, perPerson };
}

// ---- 3. Loose ends --------------------------------------------------------
function deskLooseEnds(allRows, today, teamNames){
  const from = deskDateAdd(today, -DESK_LOOSE_END_LOOKBACK_DAYS);
  return (allRows || []).filter(r => r._date && r._date < today && r._date >= from && !r.woi && r.candidate && !r.status && deskNeedsPerson(r, teamNames))
    .map(r => ({ date: r._date, time: r.time || '', candidate: r.candidate, company: r.company || '', round: r.round || '', kind: String(r.assignee || '').trim() ? 'team-only' : 'unassigned', team: String(r.assignee || '').trim() }))
    .sort((a, b) => b.date.localeCompare(a.date) || timeToMinutes(a.time) - timeToMinutes(b.time));
}

// ---- 4. Reschedules -------------------------------------------------------
const DESK_MONTHS = { jan:1,feb:2,mar:3,apr:4,may:5,jun:6,jul:7,aug:8,sep:9,sept:9,oct:10,nov:11,dec:12 };
function deskMonthNum(s){ const l = String(s).toLowerCase(); const keys = Object.keys(DESK_MONTHS).sort((a, b) => b.length - a.length); const k = keys.find(k => l.startsWith(k)); return k ? DESK_MONTHS[k] : 0; }
function deskParseLooseDate(value, refDate){
  const v = String(value || '').trim(); if(!v) return '';
  const refY = Number((refDate || todayDateString()).slice(0, 4));
  let y, m, d, mm;
  if((mm = /^(\d{4})-(\d{1,2})-(\d{1,2})/.exec(v))){ y = +mm[1]; m = +mm[2]; d = +mm[3]; }
  else if((mm = /^(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?/.exec(v))){ m = +mm[1]; d = +mm[2]; y = mm[3] ? (+mm[3] < 100 ? 2000 + +mm[3] : +mm[3]) : refY; if(m > 12 && d <= 12){ const t = m; m = d; d = t; } }
  else if((mm = /^([A-Za-z]{3,9})\.?\s+(\d{1,2})(?:st|nd|rd|th)?(?:,?\s+(\d{4}))?/.exec(v)) && deskMonthNum(mm[1])){ m = deskMonthNum(mm[1]); d = +mm[2]; y = mm[3] ? +mm[3] : refY; }
  else if((mm = /^(\d{1,2})(?:st|nd|rd|th)?\s+([A-Za-z]{3,9})\.?(?:,?\s+(\d{4}))?/.exec(v)) && deskMonthNum(mm[2])){ d = +mm[1]; m = deskMonthNum(mm[2]); y = mm[3] ? +mm[3] : refY; }
  else return '';
  if(!(m >= 1 && m <= 12 && d >= 1 && d <= 31)) return '';
  return y + '-' + String(m).padStart(2, '0') + '-' + String(d).padStart(2, '0');
}
function deskReschedules(allRows, today, pkey){
  pkey = pkey || normalizeNameKey;
  const from = deskDateAdd(today, -DESK_RESCHEDULE_LOOKBACK_DAYS);
  const rows = allRows || [];
  const out = [];
  rows.filter(r => r._date && r._date >= from && r.status === 'rescheduled' && r.candidate).forEach(r => {
    const f = (r.statusFields || []).find(x => /new\s*date/i.test(x.label || ''));
    const t = (r.statusFields || []).find(x => /new\s*time/i.test(x.label || ''));
    let nd = f ? deskParseLooseDate(f.value, r._date) : '';
    if(nd && nd < deskDateAdd(r._date, -1)) { const y = Number(nd.slice(0, 4)); nd = (y + 1) + nd.slice(4); } // "Jan 3" typed in December
    const nk = pkey(r.candidate), ck = normalizeCompanyKey(r.company);
    const later = rows.some(x => x !== r && x._date && pkey(x.candidate) === nk && normalizeCompanyKey(x.company) === ck && !DESK_BAD_STATUSES.includes(x.status) && (nd ? x._date >= nd : x._date > r._date));
    let state = later ? 'done' : (!nd ? 'nodate' : (nd < today ? 'overdue' : (nd === today ? 'today' : 'upcoming')));
    out.push({ candidate: r.candidate, company: r.company || '', originalDate: r._date, newDate: nd, newTime: t ? t.value : '', rawNewDate: f ? f.value : '', assignee: r.assignee || '', state });
  });
  const order = { overdue: 0, today: 1, nodate: 2, upcoming: 3, done: 4 };
  return out.sort((a, b) => order[a.state] - order[b.state] || (a.newDate || '').localeCompare(b.newDate || ''));
}

// ---- 5. Candidate timeline ------------------------------------------------
function deskCandidateSearch(allRows, query, resolver){
  resolver = resolver || deskBuildPersonResolver(allRows);
  if(deskNameTokens(query).join('').length < 2) return [];
  const q = normalizeNameKey(query);
  const out = [];
  resolver.clusters.forEach(c => { if(c.variants.some(v => deskLooseNameMatch(query, v))) out.push(c); });
  const rank = c => (c.variants.some(v => normalizeNameKey(v) === q) ? 0 : (c.variants.some(v => normalizeNameKey(v).startsWith(q)) ? 1 : 2));
  return out.sort((a, b) => rank(a) - rank(b) || b.last.localeCompare(a.last)).slice(0, 12);
}
// Other clusters that merely CONTAIN this person's name (e.g. "Abhishek Singh" vs "Abhishek Singh Hazari") — offered as optional extras, never merged automatically.
function deskRelatedClusters(resolver, key){
  const base = resolver.clusters.get(key); if(!base) return [];
  const out = [];
  resolver.clusters.forEach(c => { if(c.key !== key && (c.variants.some(v => base.variants.some(bv => deskLooseNameMatch(bv, v) || deskLooseNameMatch(v, bv))))) out.push(c); });
  return out.sort((a, b) => b.n - a.n).slice(0, 8);
}
function deskCandidateTimeline(allRows, keys, resolver){
  resolver = resolver || deskBuildPersonResolver(allRows);
  const set = new Set([].concat(keys));
  return (allRows || []).filter(r => r.candidate && set.has(resolver.keyOf(r.candidate)))
    .map(r => ({ date: r._date, time: r.time || '', company: r.company || '', round: r.round || '', assignee: r.assignee || '', status: r.status || '', woi: !!r.woi, typedAs: r.candidate, clusterKey: resolver.keyOf(r.candidate), reason: (r.statusFields || []).map(f => f.label + ': ' + f.value).filter(x => !/: $/.test(x)).join(', ') }))
    .sort((a, b) => b.date.localeCompare(a.date) || timeToMinutes(b.time) - timeToMinutes(a.time));
}

// ---- 6. Weekly report -----------------------------------------------------
function deskWeeklyReport(allRows, weekStart, teamNames){
  const end = deskDateAdd(weekStart, 6);
  const per = {}; let woi = 0;
  const bucket = n => per[n] || (per[n] = { name: n, total: 0, first: 0, adv: 0, resched: 0, cancelled: 0, noresp: 0 });
  (allRows || []).filter(r => r._date && r._date >= weekStart && r._date <= end && r.candidate).forEach(r => {
    if(r.woi){ woi++; return; }
    const who = deskNeedsPerson(r, teamNames) ? (String(r.assignee || '').trim() ? 'Team-level: ' + r.assignee : 'Unassigned') : r.assignee;
    const b = bucket(who); b.total++;
    if(isAdvancedRound(r.round)) b.adv++; else b.first++;
    if(r.status === 'rescheduled') b.resched++; else if(r.status === 'cancelled') b.cancelled++; else if(r.status === 'not_responded' || r.status === 'no_invite') b.noresp++;
  });
  const rows = Object.values(per).sort((a, b) => b.total - a.total || a.name.localeCompare(b.name));
  const tot = rows.reduce((t, r) => { Object.keys(r).forEach(k => { if(k !== 'name') t[k] = (t[k] || 0) + r[k]; }); return t; }, {});
  return { start: weekStart, end, rows, totals: tot, woi };
}
function deskWeeklyText(rep){
  const l = ['Coverage Desk — week ' + rep.start + ' to ' + rep.end, 'Calls: ' + (rep.totals.total || 0) + ' | WOI: ' + rep.woi, ''];
  rep.rows.forEach(r => l.push(r.name + ': ' + r.total + ' calls (' + r.first + ' 1st, ' + r.adv + ' advanced)' + (r.resched || r.cancelled || r.noresp ? ' — ' + [r.resched ? r.resched + ' resched' : '', r.cancelled ? r.cancelled + ' cancelled' : '', r.noresp ? r.noresp + ' no response' : ''].filter(Boolean).join(', ') : '')));
  return l.join('\n');
}
function deskWeeklyCsv(rep){
  const q = s => '"' + String(s).replace(/"/g, '""') + '"';
  return ['Person,Total,1st round,Advanced,Rescheduled,Cancelled,No response'].concat(rep.rows.map(r => [q(r.name), r.total, r.first, r.adv, r.resched, r.cancelled, r.noresp].join(','))).join('\n');
}

// ---- 7. End-of-day message --------------------------------------------------
function deskEodText(date, rows, teamNames, extra){
  extra = extra || {};
  const live = (rows || []).filter(r => !r.woi && r.candidate);
  const woi = (rows || []).filter(r => r.woi).length;
  const handled = live.filter(r => !deskNeedsPerson(r, teamNames) || r.status).length;
  const slipped = live.filter(r => deskNeedsPerson(r, teamNames) && !r.status);
  const cnt = s => live.filter(r => r.status === s).length;
  const per = {};
  live.forEach(r => { if(!deskNeedsPerson(r, teamNames)) per[r.assignee] = (per[r.assignee] || 0) + 1; });
  const lines = ['📋 Coverage Desk — ' + date, 'Calls: ' + live.length + ' | Handled: ' + handled + ' | Still open: ' + slipped.length + (woi ? ' | WOI: ' + woi : '')];
  const oc = [cnt('rescheduled') ? cnt('rescheduled') + ' rescheduled' : '', cnt('cancelled') ? cnt('cancelled') + ' cancelled' : '', (cnt('not_responded') + cnt('no_invite')) ? (cnt('not_responded') + cnt('no_invite')) + ' no response' : ''].filter(Boolean);
  if(oc.length) lines.push('Outcomes: ' + oc.join(', '));
  if(typeof extra.closures === 'number') lines.push('🏆 Closures today: ' + extra.closures);
  const names = Object.keys(per).sort((a, b) => per[b] - per[a]);
  if(names.length){ lines.push('', 'By person:'); names.forEach(n => lines.push('• ' + n + ' — ' + per[n])); }
  if(slipped.length){ lines.push('', '⚠ Still open (' + slipped.length + '):'); slipped.slice(0, 10).forEach(r => lines.push('• ' + (r.time || '') + ' ' + r.candidate + (r.company ? ' (' + r.company + ')' : ''))); if(slipped.length > 10) lines.push('…and ' + (slipped.length - 10) + ' more'); }
  if(extra.tomorrow) lines.push('', '📅 Tomorrow: ' + extra.tomorrow.total + ' scheduled' + (extra.tomorrow.woi ? ', ' + extra.tomorrow.woi + ' WOI' : ''));
  return lines.join('\n');
}

(function setupDeskTools(){
  const dt = { tab: 'suggest', all: null, loading: false, error: '', query: '', selKey: '', extra: new Set(), weekStart: '', showDone: false, lastWarnSig: '', _res: null, _resFor: null };
  window._deskTools = dt;
  const teamNames = () => new Set(state.roster.map(p => p.team));
  const esc = escapeHtml;
  const TABS = [['suggest', '🎯 Suggest'], ['checks', '⚖️ Checks'], ['loose', '🧹 Loose ends'], ['resched', '↻ Reschedules'], ['cand', '👤 Candidate'], ['weekly', '📈 Weekly'], ['eod', '🌙 EOD message']];

  function toast(html, ms){
    const box = document.getElementById('liveFeedToasts'); if(!box) return;
    const el = document.createElement('div'); el.className = 'lf-toast';
    el.innerHTML = '<div class="lf-item"><div class="lf-item-main">' + html + '</div><button class="lf-x" data-sa-close aria-label="Dismiss">✕</button></div>';
    box.appendChild(el); if(ms) setTimeout(() => { if(el.parentNode) el.parentNode.removeChild(el); }, ms);
  }

  async function ensureData(force){
    dt.loading = !dt.all; dt.error = ''; paint();
    try{ dt.all = await fetchAllRowsAcrossDates(!!force); }
    catch(e){ dt.error = String(e && e.message || e); }
    dt.loading = false; paint();
  }
  const resolver = () => { const rows = allRows(); if(dt._resFor !== rows || !dt._res){ dt._res = deskBuildPersonResolver(rows); dt._resFor = rows; } return dt._res; };
  const allRows = () => dt.all || (state.rows || []).map(r => Object.assign({}, r, { _date: state.date }));

  function chip(t, c){ return '<span class="dt-chip ' + (c || '') + '">' + esc(t) + '</span>'; }
  function body(){
    const today = todayDateString(); const tn = teamNames();
    if(dt.loading) return '<div class="lf-empty"><span class="spinner"></span> Loading call history…</div>';
    if(dt.error) return '<div class="lf-empty">⚠ Couldn\'t load call history: ' + esc(dt.error) + ' <button class="lf-link" data-dt-reload>Retry</button></div>';
    const hist = allRows();
    if(dt.tab === 'suggest'){
      if(state.date !== today) return '<div class="lf-empty">Suggestions are for today\'s board. Switch to today\'s date first.</div>';
      const sug = deskSuggestAssignees(state.rows, hist, state.roster, state.absentIds, today, tn, resolver().keyOf);
      if(!sug.length) return '<div class="lf-empty">✅ Every call today already has a named person.</div>';
      const byId = Object.fromEntries(state.rows.map(r => [r.id, r]));
      const can = CURRENT_ROLE === 'admin';
      return '<div class="dt-note">' + sug.length + ' call' + (sug.length > 1 ? 's' : '') + ' need a person. Suggestions use: who handled this candidate/company before, who is free at that time, and today\'s load — within the call\'s own team only.</div>' +
        (can && sug.some(s => s.name) ? '<button class="lf-act primary" data-dt-acceptall style="margin-bottom:8px">Accept all suggestions</button>' : '') +
        sug.map(s => { const r = byId[s.rowId]; if(!r) return ''; return '<div class="dt-row"><div class="dt-main"><b>' + esc(r.time || '') + '</b> ' + esc(r.candidate) + (r.company ? ' — ' + esc(r.company) : '') + ' ' + chip(r.round || '1st') + '<div class="dt-sub">' + (s.name ? '→ <b>' + esc(s.name) + '</b> · ' : '') + esc(s.reason) + '</div></div>' + (can && s.name ? '<button class="lf-act primary" data-dt-accept="' + esc(s.rowId) + '" data-name="' + esc(s.name) + '">Accept</button>' : '') + '</div>'; }).join('') +
        (can ? '' : '<div class="dt-note">Read-only role — suggestions are for reference.</div>');
    }
    if(dt.tab === 'checks'){
      const c = deskChecks(state.rows, state.roster, state.absentIds, tn);
      const maxN = Math.max(1, ...c.perPerson.map(p => p.n));
      return (c.issues.length ? c.issues.map(i => '<div class="dt-issue">⚠ ' + esc(i.text) + '</div>').join('') : '<div class="dt-ok">✅ No workload, overlap or duplicate problems on ' + esc(state.date) + '.</div>') +
        '<div class="dt-note" style="margin-top:10px">Calls per person (' + esc(state.date) + ')</div>' +
        c.perPerson.filter(p => p.n || !p.absent).sort((a, b) => b.n - a.n).map(p => '<div class="dt-bar"><span class="dt-bar-name">' + esc(p.name) + '</span><span class="dt-bar-track"><span class="dt-bar-fill" style="width:' + Math.round(p.n / maxN * 100) + '%"></span></span><span class="dt-bar-n">' + p.n + '</span></div>').join('');
    }
    if(dt.tab === 'loose'){
      const items = deskLooseEnds(hist, today, tn);
      if(!items.length) return '<div class="dt-ok">✅ No loose ends in the last ' + DESK_LOOSE_END_LOOKBACK_DAYS + ' days.</div>';
      return '<div class="dt-note">Past calls (last ' + DESK_LOOSE_END_LOOKBACK_DAYS + ' days) with no named person and no outcome tag — these may never have been handled or recorded.</div>' +
        items.map(i => '<div class="dt-row"><div class="dt-main"><b>' + esc(i.date) + '</b> ' + esc(i.time) + ' ' + esc(i.candidate) + (i.company ? ' — ' + esc(i.company) : '') + '<div class="dt-sub">' + (i.kind === 'team-only' ? 'Only assigned to ' + esc(i.team) + ' (no person)' : 'Unassigned') + '</div></div><button class="lf-act" data-dt-gotodate="' + esc(i.date) + '">Open day</button></div>').join('');
    }
    if(dt.tab === 'resched'){
      const items = deskReschedules(hist, today, resolver().keyOf);
      const shown = items.filter(i => dt.showDone || i.state !== 'done');
      const label = { overdue: ['Overdue', 'bad'], today: ['Due today', 'warn'], nodate: ['No new date', 'warn'], upcoming: ['Upcoming', ''], done: ['Happened ✓', 'ok'] };
      return '<div class="dt-note">Rescheduled calls from the last ' + DESK_RESCHEDULE_LOOKBACK_DAYS + ' days. "Happened" means the same candidate has a later call at that company. <label style="margin-left:8px"><input type="checkbox" data-dt-showdone ' + (dt.showDone ? 'checked' : '') + '> show happened</label></div>' +
        (shown.length ? shown.map(i => '<div class="dt-row"><div class="dt-main"><b>' + esc(i.candidate) + '</b>' + (i.company ? ' — ' + esc(i.company) : '') + ' ' + chip(label[i.state][0], label[i.state][1]) + '<div class="dt-sub">Was ' + esc(i.originalDate) + ' → ' + (i.newDate ? esc(i.newDate) + (i.newTime ? ' ' + esc(i.newTime) : '') : 'new date not recorded' + (i.rawNewDate ? ' ("' + esc(i.rawNewDate) + '")' : '')) + (i.assignee ? ' · ' + esc(i.assignee) : '') + '</div></div>' + (i.newDate ? '<button class="lf-act" data-dt-gotodate="' + esc(i.newDate) + '">Open ' + esc(i.newDate.slice(5)) + '</button>' : '') + '</div>').join('') : '<div class="dt-ok">✅ Nothing waiting on a reschedule.</div>');
    }
    if(dt.tab === 'cand'){
      const R = resolver();
      let html = '<input class="sa-in" id="dtCandQuery" placeholder="Type any part of a name — spelling and word order don\'t have to match" value="' + esc(dt.query) + '" style="width:100%;margin-bottom:8px">';
      const res = deskCandidateSearch(hist, dt.query, R);
      if(dt.query && !res.length) html += '<div class="dt-note">No candidate found for "' + esc(dt.query) + '".</div>';
      html += res.map(r => '<button class="lf-act' + (r.key === dt.selKey ? ' primary' : '') + '" data-dt-pick="' + esc(r.key) + '" style="margin:0 6px 6px 0" title="' + esc(r.variants.join(' / ')) + '">' + esc(r.name) + ' · ' + r.n + (r.variants.length > 1 ? ' · ' + r.variants.length + ' spellings' : '') + '</button>').join('');
      if(dt.selKey && R.clusters.get(dt.selKey)){
        const base = R.clusters.get(dt.selKey);
        const keys = [dt.selKey].concat(Array.from(dt.extra).filter(k => R.clusters.has(k)));
        const tl = deskCandidateTimeline(hist, keys, R);
        const cos = new Set(tl.map(t => normalizeCompanyKey(t.company)).filter(Boolean));
        const names = new Set(); keys.forEach(k => R.clusters.get(k).variants.forEach(v => names.add(v)));
        const closed = (state.closures || []).filter(c => names.has(String(c.candidate || '').replace(/\s+/g, ' ').trim()) || keys.includes(R.keyOf(c.candidate)));
        const rel = deskRelatedClusters(R, dt.selKey);
        html += '<div class="dt-note" style="margin-top:8px"><b>' + tl.length + ' call' + (tl.length > 1 ? 's' : '') + '</b> across <b>' + cos.size + '</b> compan' + (cos.size === 1 ? 'y' : 'ies') + (closed.length ? ' · 🏆 ' + closed.length + ' closure' + (closed.length > 1 ? 's' : '') + ' (' + closed.map(c => esc(c.company)).join(', ') + ')' : '') +
          (names.size > 1 ? '<br>Includes these spellings: ' + Array.from(names).map(n => esc(n)).join(' · ') : '') + '</div>' +
          (rel.length ? '<div class="dt-note">Could also be the same person? Tap to include / exclude: ' + rel.map(c => '<button class="lf-act' + (dt.extra.has(c.key) ? ' primary' : '') + '" data-dt-extra="' + esc(c.key) + '" style="margin:2px 4px 2px 0">' + esc(c.name) + ' · ' + c.n + '</button>').join('') + '</div>' : '') +
          tl.map(t => '<div class="dt-row"><div class="dt-main"><b>' + esc(t.date) + '</b> ' + esc(t.time) + ' — ' + esc(t.company || 'no company') + ' ' + chip(t.round || '1st') + (t.status ? chip(t.status.replace('_', ' '), 'warn') : '') + (t.woi ? chip('WOI') : '') + '<div class="dt-sub">' + (t.assignee ? 'Handled by ' + esc(t.assignee) : 'No assignee') + (t.reason ? ' · ' + esc(t.reason) : '') + (t.typedAs !== base.name ? ' · typed as "' + esc(t.typedAs) + '"' : '') + '</div></div><button class="lf-act" data-dt-gotodate="' + esc(t.date) + '">Open day</button></div>').join('');
      }
      return html;
    }
    if(dt.tab === 'weekly'){
      if(!dt.weekStart) dt.weekStart = deskMonday(today);
      const rep = deskWeeklyReport(hist, dt.weekStart, tn);
      return '<div class="dt-weeknav"><button class="lf-act" data-dt-week="-1">‹ Prev</button><b>' + esc(rep.start) + ' → ' + esc(rep.end) + '</b><button class="lf-act" data-dt-week="1">Next ›</button></div>' +
        (rep.rows.length ? '<div class="table-scroll"><table class="dt-table"><thead><tr><th>Person</th><th>Calls</th><th>1st</th><th>Adv</th><th>Resch</th><th>Canc</th><th>No resp</th></tr></thead><tbody>' +
          rep.rows.map(r => '<tr><td>' + esc(r.name) + '</td><td><b>' + r.total + '</b></td><td>' + r.first + '</td><td>' + r.adv + '</td><td>' + r.resched + '</td><td>' + r.cancelled + '</td><td>' + r.noresp + '</td></tr>').join('') +
          '</tbody><tfoot><tr><td>Total</td><td>' + (rep.totals.total || 0) + '</td><td>' + (rep.totals.first || 0) + '</td><td>' + (rep.totals.adv || 0) + '</td><td>' + (rep.totals.resched || 0) + '</td><td>' + (rep.totals.cancelled || 0) + '</td><td>' + (rep.totals.noresp || 0) + '</td></tr></tfoot></table></div>' +
          '<div class="dt-note">' + rep.woi + ' WOI call' + (rep.woi === 1 ? '' : 's') + ' not counted.</div>' +
          '<div style="display:flex;gap:8px;margin-top:8px"><button class="lf-act primary" data-dt-copy="weekly">Copy as text</button><button class="lf-act" data-dt-csv>Download CSV</button></div>'
          : '<div class="dt-note">No calls recorded for that week.</div>');
    }
    if(dt.tab === 'eod'){
      const extra = {};
      if(state.closuresLoaded) extra.closures = (state.closures || []).filter(c => String(c.createdAt || '').slice(0, 10) === state.date).length;
      if(state.tomorrowPreview) extra.tomorrow = state.tomorrowPreview;
      const text = deskEodText(state.date, state.rows, tn, extra);
      return '<div class="dt-note">Ready to paste into WhatsApp. Edit it here if you like.</div><textarea id="dtEodText" class="sa-in" rows="14" style="width:100%;font-family:inherit">' + esc(text) + '</textarea><div style="margin-top:8px"><button class="lf-act primary" data-dt-copy="eod">Copy message</button></div>';
    }
    return '';
  }
  function paint(){
    const o = document.getElementById('deskToolsOverlay'); if(!o) return;
    const card = o.querySelector('.dt-card'); const sc = card ? card.scrollTop : 0;
    const q = document.getElementById('dtCandQuery'); const hadFocus = q && document.activeElement === q; const pos = q ? q.selectionStart : 0;
    o.innerHTML = '<div class="my-name-picker-card dt-card"><div class="dt-head"><strong>🧰 Desk Tools</strong><button class="lf-x" data-dt-close aria-label="Close">✕</button></div>' +
      '<div class="dt-tabs">' + TABS.map(t => '<button class="dt-tab' + (dt.tab === t[0] ? ' active' : '') + '" data-dt-tab="' + t[0] + '">' + t[1] + '</button>').join('') + '</div>' +
      '<div class="dt-body">' + body() + '</div></div>';
    const c2 = o.querySelector('.dt-card'); if(c2) c2.scrollTop = sc;
    if(hadFocus){ const q2 = document.getElementById('dtCandQuery'); if(q2){ q2.focus(); try{ q2.setSelectionRange(pos, pos); }catch(e){} } }
  }
  function open(tab){
    if(tab) dt.tab = tab;
    let o = document.getElementById('deskToolsOverlay');
    if(!o){ o = document.createElement('div'); o.id = 'deskToolsOverlay'; o.className = 'my-name-picker-overlay dt-overlay'; document.body.appendChild(o); }
    paint();
    if(!dt.loading) ensureData(false);
  }
  function close(){ const o = document.getElementById('deskToolsOverlay'); if(o) o.remove(); }
  window.openDeskTools = open;

  function copy(text, btn){
    const done = () => { if(btn){ const t = btn.textContent; btn.textContent = '✓ Copied'; setTimeout(() => { btn.textContent = t; }, 1500); } };
    if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(text).then(done).catch(() => fallback()); } else fallback();
    function fallback(){ const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); try{ document.execCommand('copy'); done(); }catch(e){} ta.remove(); }
  }
  function download(name, text){
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([text], { type: 'text/csv' })); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }
  async function gotoDate(d){
    if(state.dirty && CURRENT_ROLE === 'admin'){ try{ await saveAllChanges(); }catch(e){} if(state.dirty) { toast('<div class="lf-title">Save first</div><div class="lf-body">You have unsaved changes — save them before switching day.</div>', 8000); return; } }
    close(); closeAllPanels(); state.date = d; await loadDay(d); render(); window.scrollTo({ top: 0 });
  }

  document.addEventListener('click', function(e){
    const t = e.target;
    const op = t.closest('#openDeskTools'); if(op){ state.showMoreMenu = false; render(); open(); return; }
    const od = t.closest('[data-dt-open]'); if(od){ const tt = od.closest('.lf-toast'); if(tt) tt.remove(); open(od.getAttribute('data-dt-open')); return; }
    if(t.id === 'deskToolsOverlay' || t.closest('[data-dt-close]')){ close(); return; }
    const ov = t.closest('#deskToolsOverlay'); if(!ov) return;
    const tab = t.closest('[data-dt-tab]'); if(tab){ dt.tab = tab.getAttribute('data-dt-tab'); paint(); return; }
    if(t.closest('[data-dt-reload]')){ ensureData(true); return; }
    const acc = t.closest('[data-dt-accept]');
    if(acc && CURRENT_ROLE === 'admin'){ const row = state.rows.find(r => r.id === acc.getAttribute('data-dt-accept')); if(row && deskNeedsPerson(row, teamNames())){ row.assignee = acc.getAttribute('data-name'); markDirty(); render(); paint(); } return; }
    if(t.closest('[data-dt-acceptall]') && CURRENT_ROLE === 'admin'){
      const sug = deskSuggestAssignees(state.rows, allRows(), state.roster, state.absentIds, todayDateString(), teamNames(), resolver().keyOf);
      let n = 0; sug.forEach(s => { const row = state.rows.find(r => r.id === s.rowId); if(row && s.name && deskNeedsPerson(row, teamNames())){ row.assignee = s.name; n++; } });
      if(n){ markDirty(); render(); } paint(); return;
    }
    const gd = t.closest('[data-dt-gotodate]'); if(gd){ gotoDate(gd.getAttribute('data-dt-gotodate')); return; }
    const pk = t.closest('[data-dt-pick]'); if(pk){ dt.selKey = pk.getAttribute('data-dt-pick'); dt.extra = new Set(); paint(); return; }
    const ex = t.closest('[data-dt-extra]'); if(ex){ const k = ex.getAttribute('data-dt-extra'); if(dt.extra.has(k)) dt.extra.delete(k); else dt.extra.add(k); paint(); return; }
    const wk = t.closest('[data-dt-week]'); if(wk){ dt.weekStart = deskDateAdd(dt.weekStart || deskMonday(todayDateString()), 7 * Number(wk.getAttribute('data-dt-week'))); paint(); return; }
    const cp = t.closest('[data-dt-copy]');
    if(cp){ const k = cp.getAttribute('data-dt-copy'); const text = k === 'eod' ? document.getElementById('dtEodText').value : deskWeeklyText(deskWeeklyReport(allRows(), dt.weekStart || deskMonday(todayDateString()), teamNames())); copy(text, cp); return; }
    if(t.closest('[data-dt-csv]')){ const rep = deskWeeklyReport(allRows(), dt.weekStart || deskMonday(todayDateString()), teamNames()); download('weekly-report-' + rep.start + '.csv', deskWeeklyCsv(rep)); return; }
  });
  document.addEventListener('change', function(e){ if(e.target && e.target.matches && e.target.matches('[data-dt-showdone]')){ dt.showDone = e.target.checked; paint(); } });
  document.addEventListener('input', function(e){ if(e.target && e.target.id === 'dtCandQuery'){ dt.query = e.target.value; dt.selKey = ''; dt.extra = new Set(); paint(); } });
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && document.getElementById('deskToolsOverlay')){ close(); } });

  // Pre-save heads-up (never blocks the save): called at the start of saveAllChanges.
  window.deskPreSaveCheck = function(){
    if(CURRENT_ROLE !== 'admin' || state.date !== todayDateString()) return;
    const c = deskChecks(state.rows, state.roster, state.absentIds, teamNames());
    const hard = c.issues.filter(i => ['imbalance', 'absent', 'overlap', 'duplicate'].includes(i.type));
    if(!hard.length) return;
    const sig = state.date + '|' + hard.map(i => i.text).join('|');
    if(sig === dt.lastWarnSig) return; dt.lastWarnSig = sig;
    toast('<div class="lf-title">⚖️ Saving — but heads-up</div><div class="lf-body">' + hard.slice(0, 3).map(i => esc(i.text)).join('<br>') + (hard.length > 3 ? '<br>+' + (hard.length - 3) + ' more' : '') + '</div><div class="lf-actions"><button class="lf-act" data-dt-open="checks">Open checks</button></div>', 15000);
  };
  // Morning nudge: called by the Live Feed after it loads call history (no extra fetch).
  window.deskOnAllRows = function(all, today){
    dt.all = all;
    try{
      const key = 'cd_desk_morning_' + today; if(localStorage.getItem(key)) return;
      const n = deskLooseEnds(all, today, teamNames()).length;
      localStorage.setItem(key, '1');
      if(n) toast('<div class="lf-title">☀️ ' + n + ' loose end' + (n > 1 ? 's' : '') + ' from the last ' + DESK_LOOSE_END_LOOKBACK_DAYS + ' days</div><div class="lf-body">Calls that never got a named person or an outcome.</div><div class="lf-actions"><button class="lf-act" data-dt-open="loose">Review</button></div>', 20000);
    }catch(e){}
  };
})();

(async function init(){
  // Login temporarily disabled — app opens directly, no password gate.
  // To turn it back on later, restore: if(!CLIENT_AUTHED){ renderClientLoginScreen(); return; }
  // CURRENT_ROLE is no longer hardcoded here — startApp() calls
  // refreshRole() to fetch the real role for whatever credentials are
  // stored, so an account actually gets the permissions it was assigned.
  await startApp();
})();
