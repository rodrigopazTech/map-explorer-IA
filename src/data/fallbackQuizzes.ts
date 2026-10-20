/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuizCategory, QuizQuestion } from '../types/quiz';
import { Language } from '../i18n/translations';

interface PresetQuizStore {
  [cityKey: string]: {
    [category in QuizCategory]?: QuizQuestion[];
  };
}

export const FALLBACK_QUIZZES: PresetQuizStore = {
  'buenos aires': {
    'Local cuisine': [
      {
        id: 'ba-c-1',
        question: 'What iconic pastry filled with dulce de leche and often coated in chocolate is a staple sweet snack in Buenos Aires?',
        options: ['Alfajor', 'Medialuna', 'Churro con crema', 'Flan mixto'],
        correctIndex: 0,
        explanation: 'Alfajores are the beloved Argentine sweet treat, consisting of two delicate biscuits sandwiching luscious dulce de leche.',
      },
      {
        id: 'ba-c-2',
        question: 'Which cut of beef, famous in traditional Argentine asados, translates to "flank steak" or "short ribs"?',
        options: ['Bife de chorizo', 'Asado de tira', 'Ojo de bife', 'Vacio'],
        correctIndex: 1,
        explanation: 'Asado de tira consists of flanken-cut beef ribs, grilled over hardwood coals to juicy perfection.',
      },
      {
        id: 'ba-c-3',
        question: 'What herbal beverage is traditionally sipped through a metal straw called a "bombilla" among friends and family?',
        options: ['Submarino', 'Fernet con Coca', 'Mate', 'Horchata'],
        correctIndex: 2,
        explanation: 'Mate is deeply woven into Argentine daily social life, brewed from yerba mate leaves and shared as a ritual of friendship.',
      },
    ],
    'Art and culture': [
      {
        id: 'ba-a-1',
        question: 'Which colorful neighborhood in Buenos Aires is famous for its vibrant zinc houses and outdoor tango dancers on the street called Caminito?',
        options: ['San Telmo', 'La Boca', 'Palermo Soho', 'Recoleta'],
        correctIndex: 1,
        explanation: 'La Boca was settled by Genoese immigrants who built homes with leftover shipyard materials and painted them with vivid leftover boat paint.',
      },
      {
        id: 'ba-a-2',
        question: 'What globally renowned opera house in Buenos Aires is celebrated among acousticians as having one of the world’s top concert halls?',
        options: ['Teatro Colón', 'Teatro Cervantes', 'Gran Rex', 'Teatro San Martín'],
        correctIndex: 0,
        explanation: 'Inaugurated in 1908, Teatro Colón ranks consistently alongside La Scala in Milan and Vienna State Opera for acoustic perfection.',
      },
      {
        id: 'ba-a-3',
        question: 'Buenos Aires is famously recognized as having one of the highest numbers of what cultural venue per capita in the world?',
        options: ['Art Galleries', 'Movie Theaters', 'Bookstores', 'Botanical Gardens'],
        correctIndex: 2,
        explanation: 'Buenos Aires has more bookstores per person than nearly any city on Earth, famously epitomized by El Ateneo Grand Splendid.',
      },
    ],
    'Local history': [
      {
        id: 'ba-h-1',
        question: 'The historic May Revolution of 1810, which launched Argentina’s path to independence, took place in which central square?',
        options: ['Plaza Dorrego', 'Plaza San Martín', 'Plaza de Mayo', 'Plaza del Congreso'],
        correctIndex: 2,
        explanation: 'Plaza de Mayo has been the beating political heart of Buenos Aires since 1810, fronted by the Casa Rosada presidential palace.',
      },
      {
        id: 'ba-h-2',
        question: 'Which prominent cultural figure and first lady is buried in the historic Recoleta Cemetery?',
        options: ['Mercedes Sosa', 'Eva "Evita" Perón', 'Alfonsina Storni', 'Juana Azurduy'],
        correctIndex: 1,
        explanation: 'Eva Perón rests in the Duarte family crypt in Recoleta Cemetery, visited by thousands of admirers every week.',
      },
      {
        id: 'ba-h-3',
        question: 'Why is Avenida 9 de Julio in the center of Buenos Aires world-famous?',
        options: ['It is the longest continuous street in the world', 'It is one of the widest avenues in the world', 'It was the first paved road in South America', 'It crosses into two different countries'],
        correctIndex: 1,
        explanation: 'Avenida 9 de Julio spans up to 16 lanes across with central gardens, making it one of the widest urban boulevards on Earth.',
      },
    ],
  },
  'shibuya': {
    'Local cuisine': [
      {
        id: 'sh-c-1',
        question: 'What popular Tokyo street snack consists of spherical batter balls stuffed with minced octopus and topped with bonito flakes?',
        options: ['Yakitori', 'Takoyaki', 'Okonomiyaki', 'Gyoza'],
        correctIndex: 1,
        explanation: 'Takoyaki are savory crispy-soft batter balls cooked in molded cast-iron pans and slathered with savory sauce and kewpie mayo.',
      },
      {
        id: 'sh-c-2',
        question: 'In Shibuya’s hidden alleyway "Nonbei Yokocho" (Drunkard’s Alley), what is the most classic food served in the tiny lantern-lit izakayas?',
        options: ['Grilled Yakitori skewers', 'Ramen noodles', 'Sashimi boats', 'Matcha parfaits'],
        correctIndex: 0,
        explanation: 'Nonbei Yokocho features post-WWII micro-bars that seat only 4 to 6 patrons, grilling skewered chicken (yakitori) over charcoal.',
      },
      {
        id: 'sh-c-3',
        question: 'Which type of noodle broth, famously rich and creamy from simmering pork bones for hours, is a Tokyo favorite?',
        options: ['Miso', 'Shoyu', 'Tonkotsu', 'Shio'],
        correctIndex: 2,
        explanation: 'Tonkotsu broth achieves its opaque milky richness through long simmering of pork bones, popular in Shibuya’s ramen shops.',
      },
    ],
    'Art and culture': [
      {
        id: 'sh-a-1',
        question: 'The statue of which legendary, loyal Akita dog stands outside Shibuya Station as Tokyo’s most famous meeting point?',
        options: ['Hachiko', 'Maru', 'Taro', 'Jiro'],
        correctIndex: 0,
        explanation: 'Hachiko waited loyally at Shibuya Station every single day for nearly ten years after his owner had passed away.',
      },
      {
        id: 'sh-a-2',
        question: 'What makes the Shibuya Scramble Crossing famous around the globe?',
        options: ['It has under-street aquarium tunnels', 'All pedestrian traffic lights turn green simultaneously for thousands to cross', 'It was designed by an AI computer in 1964', 'It has magnetic moving walkways'],
        correctIndex: 1,
        explanation: 'During peak times, as many as 3,000 people cross the intersection in every single walk cycle when all vehicles stop.',
      },
      {
        id: 'sh-a-3',
        question: 'Which iconic department store in Shibuya served as the cradle of Japanese youth fashion and "Gyaru" subculture in the 1990s and 2000s?',
        options: ['Shibuya 109', 'Mitsukoshi', 'Isetan', 'Takashimaya'],
        correctIndex: 0,
        explanation: 'Shibuya 109 is a cylindrical fashion landmark that defined Tokyo street style and teen trends for decades.',
      },
    ],
    'Local history': [
      {
        id: 'sh-h-1',
        question: 'Before becoming a futuristic neon metropolis, what was Shibuya originally named for in ancient medieval Japan?',
        options: ['A samurai castle family name meaning "Quiet Valley"', 'A local nobleman clan with water that looked "astringent" or murky', 'A cherry blossom sanctuary', 'A sacred temple gateway'],
        correctIndex: 1,
        explanation: 'The name Shibuya historically derived from the Shibuya clan and literally translates to "astringent valley" (shibu-ya).',
      },
      {
        id: 'sh-h-2',
        question: 'Which major international sporting event in 1964 catalyzed the massive modernization of Shibuya and Tokyo’s transport grid?',
        options: ['The Tokyo Summer Olympics', 'The World Expo', 'The Asian Games', 'The FIFA World Cup'],
        correctIndex: 0,
        explanation: 'The 1964 Tokyo Olympics led to rapid urban transformation, including the building of the Shinkansen and elevated expressways.',
      },
      {
        id: 'sh-h-3',
        question: 'What nearby wooded Shinto shrine, dedicated to Emperor Meiji and Empress Shoken, was built in 1920 right on Shibuya’s border?',
        options: ['Senso-ji', 'Meiji Jingu', 'Kanda Myojin', 'Yasukuni Shrine'],
        correctIndex: 1,
        explanation: 'Meiji Jingu is surrounded by an evergreen forest of over 100,000 trees donated from across Japan, creating a tranquil oasis beside bustling Shibuya.',
      },
    ],
  },
  'copacabana': {
    'Local cuisine': [
      {
        id: 'cb-c-1',
        question: 'What national cocktail of Brazil, made with cachaça, sugar, and crushed fresh lime, is sipped all along Copacabana’s beach kiosks?',
        options: ['Mojito', 'Caipirinha', 'Batida', 'Pisco Sour'],
        correctIndex: 1,
        explanation: 'The Caipirinha is Brazil’s national cocktail, made with fermented sugarcane spirit (cachaça) and muddled lime with raw sugar.',
      },
      {
        id: 'cb-c-2',
        question: 'What is the name of Brazil’s national stew made of black beans, salted pork, beef, and sausages, traditionally eaten with farofa on Saturdays?',
        options: ['Moqueca', 'Feijoada', 'Vatapá', 'Acarajé'],
        correctIndex: 1,
        explanation: 'Feijoada is the quintessential Brazilian weekend comfort meal, served with white rice, collard greens, orange slices, and toasted cassava flour (farofa).',
      },
      {
        id: 'cb-c-3',
        question: 'What chewy, gluten-free baked cheese rolls made from tapioca flour are a beloved breakfast and beach snack across Rio?',
        options: ['Pastel de nata', 'Pão de queijo', 'Empada', 'Coxinha'],
        correctIndex: 1,
        explanation: 'Pão de queijo originates from Minas Gerais and is baked fresh in bakeries and beachside stands all across Copacabana.',
      },
    ],
    'Art and culture': [
      {
        id: 'cb-a-1',
        question: 'What world-famous music genre was born in Rio de Janeiro in the late 1950s, blending cool jazz with gentle samba rhythms?',
        options: ['Bossa Nova', 'Forró', 'Tango', 'Cumbia'],
        correctIndex: 0,
        explanation: 'Bossa Nova was pioneered along the beaches of Rio by João Gilberto, Antônio Carlos Jobim, and Vinicius de Moraes.',
      },
      {
        id: 'cb-a-2',
        question: 'What distinctive pattern is laid into the black and white Portuguese stone mosaic along Copacabana’s wide beach promenade?',
        options: ['Geometric diamonds', 'Undulating ocean waves', 'Sunburst rays', 'Tropical palm fronds'],
        correctIndex: 1,
        explanation: 'Designed by landscape architect Roberto Burle Marx, the wave pattern (ondas) is one of the most recognizable pavements in the world.',
      },
      {
        id: 'cb-a-3',
        question: 'Which legendary Art Deco luxury hotel, opened in 1923, has hosted royalty, rockstars, and presidents on Avenida Atlântica in Copacabana?',
        options: ['Copacabana Palace', 'Hotel Fasano', 'The Venetian', 'Hotel das Cataratas'],
        correctIndex: 0,
        explanation: 'The Belmond Copacabana Palace is an architectural icon that put Rio on the international glamour map.',
      },
    ],
    'Local history': [
      {
        id: 'cb-h-1',
        question: 'Before the beach was developed in the late 19th century, how was Copacabana originally connected to the rest of Rio de Janeiro?',
        options: ['By steamship ferries only', 'Through a dramatic tunnel blasted through granite hills called Túnel Velho', 'Via a coastal suspension bridge', 'By an aerial cable car'],
        correctIndex: 1,
        explanation: 'The opening of the Túnel Velho (Old Tunnel) in 1892 made Copacabana accessible by tram and sparked its explosion into an iconic seaside hub.',
      },
      {
        id: 'cb-h-2',
        question: 'Copacabana’s world-famous New Year’s Eve (Réveillon) celebration is known for attendees dressing in which color for good luck and peace?',
        options: ['Bright Red', 'Solid White', 'Golden Yellow', 'Deep Blue'],
        correctIndex: 1,
        explanation: 'Millions gather on the sands dressed in white to celebrate peace and offer flowers to Iemanjá, the Afro-Brazilian Queen of the Sea.',
      },
      {
        id: 'cb-h-3',
        question: 'What military stronghold built in 1914 at the southern end of the beach is now a historic museum and scenic brunch spot?',
        options: ['Forte de Copacabana', 'Fortaleza de Santa Cruz', 'Castelo de São Jorge', 'Forte Duque de Caxias'],
        correctIndex: 0,
        explanation: 'Forte de Copacabana housed massive coastal defense guns and was the site of the historic 1922 "18 of the Fort" revolt.',
      },
    ],
  },
  'cologne': {
    'Local cuisine': [
      {
        id: 'col-c-1',
        question: 'What top-fermented, crisp beer can legally only be brewed in Cologne and the surrounding region?',
        options: ['Pilsner', 'Kölsch', 'Weißbier', 'Dunkel'],
        correctIndex: 1,
        explanation: 'Kölsch is protected by European law and served in tall, slender 200ml glasses called "Stangen" by traditional waiters called Köbesse.',
      },
      {
        id: 'col-c-2',
        question: 'What savory Cologne specialty, humorously named "Halver Hahn" (Half a Rooster), actually consists of?',
        options: ['Half a roasted chicken', 'A rye bread roll with aged Gouda cheese and mustard', 'Pork sausage in curry sauce', 'Smoked trout with horseradish'],
        correctIndex: 1,
        explanation: 'Despite its fowl name, Halve Hahn is a traditional pub plate of a dense rye roll (Röggelchen) with Dutch cheese, butter, and mustard.',
      },
      {
        id: 'col-c-3',
        question: 'What potato dish, traditionally served with apple sauce and black bread, is a favorite in local Cologne brewhouses?',
        options: ['Kartoffelsalat', 'Reibekuchen (Rievkooche)', 'Knödel', 'Bratkartoffeln'],
        correctIndex: 1,
        explanation: 'Rievkooche are crispy grated potato pancakes fried golden and traditionally eaten on Fridays with applesauce or smoked salmon.',
      },
    ],
    'Art and culture': [
      {
        id: 'col-a-1',
        question: 'What massive UNESCO World Heritage Gothic landmark dominates Cologne’s skyline with its 157-meter-tall twin spires?',
        options: ['Cologne Cathedral (Kölner Dom)', 'Gross St. Martin', 'St. Gereon Basilica', 'Altenberger Dom'],
        correctIndex: 0,
        explanation: 'Construction of the Kölner Dom began in 1248 and took over 630 years to officially complete in 1880.',
      },
      {
        id: 'col-a-2',
        question: 'What fragrant cosmetic product was invented in Cologne in the early 18th century by Italian perfumer Johann Maria Farina?',
        options: ['Eau de Cologne (Kölnisch Wasser)', 'Rosewater extract', 'Lavender pomade', 'Bergamot hair oil'],
        correctIndex: 0,
        explanation: 'Farina crafted the citrus-based scent in 1709 and named it Eau de Cologne after his new home city.',
      },
      {
        id: 'col-a-3',
        question: 'What wild annual celebration starting on November 11th at 11:11 AM turns the entire city into costume street parties?',
        options: ['Oktoberfest', 'Cologne Carnival (Karneval)', 'Walpurgisnacht', 'St. Martin’s Parade'],
        correctIndex: 1,
        explanation: 'Known as the "Fifth Season", Cologne Carnival features the Three Stars (Prince, Farmer, and Maiden) and days of citywide festivities.',
      },
    ],
    'Local history': [
      {
        id: 'col-h-1',
        question: 'Who founded Cologne as a Roman colony in 50 AD, giving it its original name "Colonia Claudia Ara Agrippinensium"?',
        options: ['Julius Caesar', 'Empress Agrippina the Younger', 'Emperor Augustus', 'Marc Antony'],
        correctIndex: 1,
        explanation: 'Empress Agrippina was born on the Rhine and elevated her birthplace into a premier Roman provincial capital.',
      },
      {
        id: 'col-h-2',
        question: 'What sacred gilded relic brought to Cologne Cathedral in 1164 made the city one of the medieval world’s top pilgrimage sites?',
        options: ['The Holy Grail', 'The Shrine of the Three Holy Kings (Magi)', 'The True Cross', 'The Ark of the Covenant'],
        correctIndex: 1,
        explanation: 'The Reliquary of the Three Kings, crafted by goldsmith Nicholas of Verdun, drew pilgrims from all across Europe.',
      },
      {
        id: 'col-h-3',
        question: 'What famous love-lock bridge spanning the Rhine beside the Cathedral holds hundreds of thousands of engraved padlocks?',
        options: ['Hohenzollern Bridge', 'Deutzer Bridge', 'Severin Bridge', 'Mülheim Bridge'],
        correctIndex: 0,
        explanation: 'Couples attach engraved padlocks to the railings of the Hohenzollernbrücke and throw the key into the Rhine for everlasting love.',
      },
    ],
  },
  'lima': {
    'Local cuisine': [
      {
        id: 'lim-c-1',
        question: 'What world-famous raw fish dish cured in fresh lime juice, chili peppers, and red onions is Peru’s national culinary pride?',
        options: ['Tiradito', 'Ceviche', 'Lomo Saltado', 'Causa Rellena'],
        correctIndex: 1,
        explanation: 'Peruvian ceviche uses fresh sea bass or corvina quickly cured in citrus "leche de tigre" alongside sweet potato and choclo corn.',
      },
      {
        id: 'lim-c-2',
        question: 'What vibrant fusion cuisine in Lima blends indigenous Peruvian ingredients with culinary traditions brought by 19th-century Chinese immigrants?',
        options: ['Nikkei', 'Chifa', 'Creole', 'Amazonian'],
        correctIndex: 1,
        explanation: 'Chifa gave birth to dishes like Lomo Saltado and Arroz Chaufa, blending woks, soy sauce, and Peruvian aji amarillo peppers.',
      },
      {
        id: 'lim-c-3',
        question: 'What golden, layered potato terrine seasoned with yellow chili and filled with chicken, tuna, or crab is a classic Lima appetizer?',
        options: ['Papa a la Huancaína', 'Causa Limeña', 'Anticuchos', 'Pastel de Choclo'],
        correctIndex: 1,
        explanation: 'Causa Limeña is made from mashed yellow potatoes seasoned with lime and aji amarillo, layered with savory chilled fillings.',
      },
    ],
    'Art and culture': [
      {
        id: 'lim-a-1',
        question: 'Which bohemian arts district perched on Lima’s ocean cliffs is renowned for mural-lined streets and the historic "Bridge of Sighs"?',
        options: ['Miraflores', 'Barranco', 'San Isidro', 'Callao'],
        correctIndex: 1,
        explanation: 'Barranco has long been the creative refuge of Peruvian poets, writers, and painters, centered around the romantic Puente de los Suspiros.',
      },
      {
        id: 'lim-a-2',
        question: 'What pre-Inca adobe and clay pyramid stands right in the middle of modern residential Miraflores?',
        options: ['Huaca Pucllana', 'Pachacamac', 'Chan Chan', 'Huaca Huallamarca'],
        correctIndex: 0,
        explanation: 'Huaca Pucllana was constructed around 500 AD by the Lima culture using vertical "bookshelf" adobe brick architecture.',
      },
      {
        id: 'lim-a-3',
        question: 'What distinctive Peruvian cocktail is made by shaking Pisco brandy with lime juice, simple syrup, egg white, and Angostura bitters?',
        options: ['Chilcano', 'Pisco Sour', 'Algarrobina', 'Capitán'],
        correctIndex: 1,
        explanation: 'Invented in the historic Morris’ Bar and popularized at the Gran Hotel Bolívar in Lima, the Pisco Sour is Peru’s national drink.',
      },
    ],
    'Local history': [
      {
        id: 'lim-h-1',
        question: 'What noble title was given to Lima when Spanish conquistador Francisco Pizarro founded the city in 1535 on Three Kings’ Day?',
        options: ['The City of Kings (Ciudad de los Reyes)', 'The Pearl of the Pacific', 'The Golden City', 'The City of Palaces'],
        correctIndex: 0,
        explanation: 'Pizarro christened the city "Ciudad de los Reyes" because it was founded on Epiphany, January 6, 1535.',
      },
      {
        id: 'lim-h-2',
        question: 'Which colonial building complex in Lima’s UNESCO historic center is famous for its vast library and subterranean bone catacombs?',
        options: ['Monastery of San Francisco', 'Cathedral of Lima', 'Torre Tagle Palace', 'Iglesia de la Merced'],
        correctIndex: 0,
        explanation: 'The catacombs beneath the Monastery of San Francisco served as burial grounds until 1808 and hold an estimated 25,000 skeletons.',
      },
      {
        id: 'lim-h-3',
        question: 'What coastal walkway atop the coastal cliffs in Miraflores offers sweeping views of the Pacific Ocean and paragliders?',
        options: ['El Malecón', 'Paseo de la República', 'Avenida Larco', 'Costa Verde'],
        correctIndex: 0,
        explanation: 'El Malecón winds along green bluffs overlooking the ocean, featuring sculpture gardens including Parque del Amor.',
      },
    ],
  },
};

export const FALLBACK_QUIZZES_ES: PresetQuizStore = {
  'buenos aires': {
    'Local cuisine': [
      {
        id: 'ba-c-1-es',
        question: '¿Qué emblemático dulce argentino relleno de abundante dulce de leche y bañado en chocolate es el bocado dulce favorito en Buenos Aires?',
        options: ['Alfajor', 'Medialuna', 'Churro con crema', 'Flan mixto'],
        correctIndex: 0,
        explanation: 'Los alfajores son el dulce tradicional predilecto argentino, dos tapas suaves unidas por dulce de leche y cubiertas de chocolate.',
      },
      {
        id: 'ba-c-2-es',
        question: '¿Qué corte vacuno con hueso, rey de los asados porteños tradicionales, se asa lentamente sobre las brasas?',
        options: ['Bife de chorizo', 'Asado de tira', 'Ojo de bife', 'Vacío'],
        correctIndex: 1,
        explanation: 'El asado de tira es el corte transversal de las costillas vacunas, asado a las brasas de leña hasta quedar jugoso y crocante.',
      },
      {
        id: 'ba-c-3-es',
        question: '¿Qué infusión de yerba se comparte tradicionalmente mediante una bombilla metálica como ritual de amistad en Buenos Aires?',
        options: ['Submarino', 'Fernet con Coca', 'Mate', 'Horchata'],
        correctIndex: 2,
        explanation: 'El mate es el corazón de la vida cotidiana argentina, una bebida compartida que simboliza hospitalidad y compañerismo.',
      },
    ],
    'Art and culture': [
      {
        id: 'ba-a-1-es',
        question: '¿Qué pintoresco barrio porteño es famoso por sus casas de chapa multicolor y bailarines de tango al aire libre en el pasaje Caminito?',
        options: ['San Telmo', 'La Boca', 'Palermo Soho', 'Recoleta'],
        correctIndex: 1,
        explanation: 'La Boca fue fundada por inmigrantes genoveses que pintaron sus conventillos con los sobrantes de pintura de los barcos del puerto.',
      },
      {
        id: 'ba-a-2-es',
        question: '¿Qué majestuoso teatro de ópera de Buenos Aires es considerado internacionalmente como uno de los recintos con mejor acústica del mundo?',
        options: ['Teatro Colón', 'Teatro Cervantes', 'Gran Rex', 'Teatro San Martín'],
        correctIndex: 0,
        explanation: 'Inaugurado en 1908, el Teatro Colón rivaliza con la Scala de Milán y la Ópera de Viena en calidad acústica absoluta.',
      },
      {
        id: 'ba-a-3-es',
        question: '¿Por cuál de estos espacios culturales Buenos Aires ostenta uno de los récords mundiales con más locales por habitante?',
        options: ['Galerías de arte', 'Salas de cine', 'Librerías', 'Jardines botánicos'],
        correctIndex: 2,
        explanation: 'Buenos Aires cuenta con más librerías por habitante que casi cualquier otra urbe, como la deslumbrante El Ateneo Grand Splendid.',
      },
    ],
    'Local history': [
      {
        id: 'ba-h-1-es',
        question: '¿En qué histórica plaza céntrica se congregó el pueblo en la Revolución de Mayo de 1810 para iniciar el camino hacia la independencia argentina?',
        options: ['Plaza Dorrego', 'Plaza San Martín', 'Plaza de Mayo', 'Plaza del Congreso'],
        correctIndex: 2,
        explanation: 'La Plaza de Mayo ha sido el epicentro cívico y político de Buenos Aires desde 1810, custodiada por el Cabildo y la Casa Rosada.',
      },
      {
        id: 'ba-h-2-es',
        question: '¿Qué emblemática figura histórica y primera dama descansa en el célebre Cementerio de la Recoleta?',
        options: ['Mercedes Sosa', 'Eva "Evita" Perón', 'Alfonsina Storni', 'Juana Azurduy'],
        correctIndex: 1,
        explanation: 'Eva Perón reposa en la bóveda de la familia Duarte en el Cementerio de la Recoleta, visitada a diario por admiradores de todo el mundo.',
      },
      {
        id: 'ba-h-3-es',
        question: '¿Por qué es mundialmente célebre la Avenida 9 de Julio en el corazón de Buenos Aires?',
        options: ['Es la calle continua más larga', 'Es una de las avenidas más anchas del mundo', 'Fue la primera autopista de América del Sur', 'Atraviesa dos países'],
        correctIndex: 1,
        explanation: 'La Avenida 9 de Julio llega a tener hasta 16 carriles de ancho con plazoletas arboladas, custodiando en su centro el icónico Obelisco.',
      },
    ],
  },
  'shibuya': {
    'Local cuisine': [
      {
        id: 'sh-c-1-es',
        question: '¿Qué popular bocado callejero de Tokio consiste en bolitas crujientes de masa rellenas de pulpo picado y salsa especial?',
        options: ['Yakitori', 'Takoyaki', 'Okonomiyaki', 'Gyoza'],
        correctIndex: 1,
        explanation: 'El takoyaki son bolitas de masa cocidas en planchas semiesféricas de hierro, cubiertas con salsa dulce y virutas de bonito.',
      },
      {
        id: 'sh-c-2-es',
        question: 'En el estrecho y pintoresco callejón Nonbei Yokocho de Shibuya, ¿cuál es la comida más clásica en sus microbares?',
        options: ['Brochetas de pollo yakitori', 'Sopa de fideos ramen', 'Barcos de sushi variado', 'Helado de té verde'],
        correctIndex: 0,
        explanation: 'Nonbei Yokocho alberga pequeños bares tradicionales con capacidad para 4 a 6 comensales que asan brochetas de yakitori sobre carbón.',
      },
      {
        id: 'sh-c-3-es',
        question: '¿Qué tazón humeante de fideos japoneses con caldo concentrado de cerdo es el favorito nocturno en Shibuya?',
        options: ['Ramen', 'Soba fría', 'Udon claro', 'Somen'],
        correctIndex: 0,
        explanation: 'El ramen en sus variedades tonkotsu, miso y shoyu atrae a miles de personas en los locales subterráneos de Shibuya.',
      },
    ],
    'Art and culture': [
      {
        id: 'sh-a-1-es',
        question: '¿Frente a qué salida peatonal de la estación de Shibuya se erige la famosa estatua de bronce del perro Hachiko?',
        options: ['Salida Central', 'Salida Hachiko', 'Salida Sur', 'Salida Miyashita'],
        correctIndex: 1,
        explanation: 'La salida Hachiko y su plaza contigua son el punto de encuentro por excelencia de la juventud en Tokio.',
      },
      {
        id: 'sh-a-2-es',
        question: '¿Qué célebre centro comercial de múltiples plantas es considerado la meca de la moda juvenil de Shibuya desde los años 80?',
        options: ['Shibuya 109', 'Mori Tower', 'Roppongi Hills', 'Ginza Six'],
        correctIndex: 0,
        explanation: 'Shibuya 109 ha sido la incubadora de estilos y tendencias juveniles icónicas como la subcultura Gyaru.',
      },
      {
        id: 'sh-a-3-es',
        question: '¿Qué gigantesco mural sobre los horrores de la era nuclear del artista Taro Okamoto decora el interior de la estación de Shibuya?',
        options: ['El mito del mañana (Myth of Tomorrow)', 'Sol naciente', 'Tokio futurista', 'Guernica japonés'],
        correctIndex: 0,
        explanation: 'El monumental mural "El mito del mañana" mide 30 metros de largo y fue recuperado en México antes de instalarse en Shibuya.',
      },
    ],
    'Local history': [
      {
        id: 'sh-h-1-es',
        question: '¿Qué fiel perro de raza Akita esperó todos los días durante casi 10 años en la estación de Shibuya tras la muerte de su dueño?',
        options: ['Hachiko', 'Taro', 'Jiro', 'Shiro'],
        correctIndex: 0,
        explanation: 'Hachiko esperó al profesor Ueno todas las tardes hasta 1935, convirtiéndose en el símbolo nacional japonés de lealtad.',
      },
      {
        id: 'sh-h-2-es',
        question: '¿Qué hito deportivo de 1964 impulsó la gran modernización de infraestructuras y autopistas elevadas en Shibuya y Tokio?',
        options: ['Los Juegos Olímpicos de Tokio 1964', 'La Exposición Mundial', 'La Copa Mundial FIFA', 'Los Juegos Asiáticos'],
        correctIndex: 0,
        explanation: 'Los Juegos Olímpicos de 1964 canalizaron ríos bajo tierra y trajeron el primer tren bala (Shinkansen) y autopistas urbanas.',
      },
      {
        id: 'sh-h-3-es',
        question: '¿Qué solemne santuario sintoísta de 1920 rodeado por un bosque de 100.000 árboles limita con el norte de Shibuya?',
        options: ['Senso-ji', 'Meiji Jingu', 'Kanda Myojin', 'Santuario Yasukuni'],
        correctIndex: 1,
        explanation: 'El santuario Meiji Jingu está dedicado a las almas del emperador Meiji y la emperatriz Shoken en un bosque sagrado.',
      },
    ],
  },
  'copacabana': {
    'Local cuisine': [
      {
        id: 'cb-c-1-es',
        question: '¿Cuál es el cóctel nacional de Brasil elaborado con cachaça, azúcar y lima fresca que se disfruta en los quioscos de Copacabana?',
        options: ['Mojito', 'Caipirinha', 'Batida de coco', 'Pisco Sour'],
        correctIndex: 1,
        explanation: 'La caipirinha es el cóctel icónico de Brasil, preparado macerando limas frescas con azúcar de caña y cachaça artesanal.',
      },
      {
        id: 'cb-c-2-es',
        question: '¿Qué sabroso guiso tradicional de frijoles negros, carne de cerdo y embutidos se degusta los sábados en Río?',
        options: ['Moqueca', 'Feijoada', 'Vatapá', 'Acarajé'],
        correctIndex: 1,
        explanation: 'La feijoada es el banquete carioca por excelencia, servida con arroz blanco, hojas de col rizada, rodajas de naranja y farofa.',
      },
      {
        id: 'cb-c-3-es',
        question: '¿Qué esponjosos panecillos horneados a base de almidón de yuca y queso curado son el desayuno tradicional carioca?',
        options: ['Pastel de nata', 'Pão de queijo', 'Empadinha', 'Coxinha'],
        correctIndex: 1,
        explanation: 'El pão de queijo se sirve caliente y recién horneado, siendo el bocado favorito en las cafeterías y playas de Copacabana.',
      },
    ],
    'Art and culture': [
      {
        id: 'cb-a-1-es',
        question: '¿Qué género musical universal nació en Río de Janeiro a fines de los 50 fusionando samba suave y sofisticadas armonías de jazz?',
        options: ['Bossa Nova', 'Forró', 'Tango', 'Cumbia'],
        correctIndex: 0,
        explanation: 'La Bossa Nova fue gestada en los apartamentos de Copacabana por pioneros como Tom Jobim, João Gilberto y Vinicius de Moraes.',
      },
      {
        id: 'cb-a-2-es',
        question: '¿Qué emblemático dibujo geométrico en piedra portuguesa blanca y negra recorre la rambla de la Avenida Atlántica en Copacabana?',
        options: ['Rombos entrelazados', 'Ondas ondulantes del mar', 'Rayos solares', 'Palmeras tropicales'],
        correctIndex: 1,
        explanation: 'El diseño de olas (ondas) fue reinterpretado por el paisajista Roberto Burle Marx y es uno de los pavimentos más reconocidos del planeta.',
      },
      {
        id: 'cb-a-3-es',
        question: '¿Qué legendario hotel palaciego de estilo Art Déco abierto en 1923 es el epicentro del glamour de Copacabana?',
        options: ['Copacabana Palace', 'Hotel Fasano', 'The Venetian', 'Hotel das Cataratas'],
        correctIndex: 0,
        explanation: 'El Belmond Copacabana Palace ha hospedado a leyendas de la música, realeza y mandatarios internacionales durante más de un siglo.',
      },
    ],
    'Local history': [
      {
        id: 'cb-h-1-es',
        question: '¿A través de qué gran obra de ingeniería se conectó por primera vez Copacabana con el centro de Río en 1892?',
        options: ['Un puente colgante marítimo', 'El Túnel Velho excavado en el cerro de granito', 'Un sistema de ferris a vapor', 'Un tranvía aéreo'],
        correctIndex: 1,
        explanation: 'La apertura del Túnel Velho permitió el paso del tranvía eléctrico y desató el vertiginoso auge residencial de la playa.',
      },
      {
        id: 'cb-h-2-es',
        question: '¿De qué color viste rigurosamente la multitud que recibe el Año Nuevo (Réveillon) en las arenas de Copacabana?',
        options: ['Rojo carmesí', 'Blanco total', 'Dorado brillante', 'Azul marino'],
        correctIndex: 1,
        explanation: 'Más de dos millones de personas visten de blanco para atraer paz y pureza, arrojando flores al océano para la diosa Yemayá.',
      },
      {
        id: 'cb-h-3-es',
        question: '¿Qué histórica fortaleza militar de 1914 en el extremo sur de la playa alberga hoy un museo histórico y miradores costeros?',
        options: ['Forte de Copacabana', 'Fortaleza de Santa Cruz', 'Castelo de São Jorge', 'Forte Duque de Caxias'],
        correctIndex: 0,
        explanation: 'El Forte de Copacabana alojaba los cañones de defensa más potentes de Sudamérica y fue escenario de la histórica revuelta de 1922.',
      },
    ],
  },
  'cologne': {
    'Local cuisine': [
      {
        id: 'col-c-1-es',
        question: '¿Qué cerveza dorada de alta fermentación cuenta con denominación de origen protegida y solo puede elaborarse en Colonia?',
        options: ['Pilsner', 'Kölsch', 'Weißbier', 'Dunkel'],
        correctIndex: 1,
        explanation: 'La auténtica Kölsch está amparada por la Unión Europea y se sirve en vasos cilíndricos de 200 ml llamados Stangen.',
      },
      {
        id: 'col-c-2-es',
        question: '¿En qué consiste el tradicional plato de taberna de Colonia llamado con picardía "Halver Hahn" (Medio gallo)?',
        options: ['Medio pollo asado', 'Pan de centeno con queso Gouda curado y mostaza', 'Salchicha con salsa de curry', 'Trucha ahumada del Rin'],
        correctIndex: 1,
        explanation: 'Pese a su curioso nombre, el Halve Hahn es una porción de queso Gouda añejo en panecillo de centeno (Röggelchen) con mostaza picante.',
      },
      {
        id: 'col-c-3-es',
        question: '¿Qué tortitas de papa rallada frita dorada suelen disfrutarse los viernes acompañadas de puré de manzana en Colonia?',
        options: ['Kartoffelsalat', 'Reibekuchen (Rievkooche)', 'Knödel', 'Bratkartoffeln'],
        correctIndex: 1,
        explanation: 'Los Rievkooche son crujientes buñuelos de papa recién hechos que se venden en cervecerías tradicionales y puestos callejeros.',
      },
    ],
    'Art and culture': [
      {
        id: 'col-a-1-es',
        question: '¿Qué colosal catedral gótica declarada Patrimonio de la Humanidad domina Colonia con sus agujas gemelas de 157 metros?',
        options: ['Catedral de Colonia (Kölner Dom)', 'Gran San Martín', 'Basílica de San Gereón', 'Catedral de Altenberg'],
        correctIndex: 0,
        explanation: 'La construcción del Kölner Dom comenzó en 1248 y tardó 632 años en completarse formalmente en 1880.',
      },
      {
        id: 'col-a-2-es',
        question: '¿Qué famosa fragancia cítrica universal fue creada en Colonia en 1709 por el perfumista italiano Johann Maria Farina?',
        options: ['Agua de Colonia (Eau de Cologne)', 'Extracto de rosas', 'Pomada de lavanda', 'Esencia de bergamota'],
        correctIndex: 0,
        explanation: 'Farina bautizó su creación como Agua de Colonia en homenaje a su ciudad adoptiva, convirtiéndose en el perfume más célebre de Europa.',
      },
      {
        id: 'col-a-3-es',
        question: '¿Qué multitudinaria celebración anual que arranca el 11 de noviembre a las 11:11 AM transforma toda la ciudad en fiestas de disfraces?',
        options: ['Oktoberfest', 'Carnaval de Colonia (Karneval)', 'Noche de Walpurgis', 'Desfile de San Martín'],
        correctIndex: 1,
        explanation: 'Conocida como la "Quinta Estación del Año", el Carnaval de Colonia inunda las calles con millones de personas disfrazadas.',
      },
    ],
    'Local history': [
      {
        id: 'col-h-1-es',
        question: '¿Quién fundó Colonia en el año 50 d.C. como colonia romana elevando su estatus a Colonia Claudia Ara Agrippinensium?',
        options: ['Julio César', 'La emperatriz Agripina la Menor', 'El emperador Augusto', 'Marco Antonio'],
        correctIndex: 1,
        explanation: 'La emperatriz romana Agripina nació a orillas del Rin y concedió el estatuto de colonia imperial a su lugar natal.',
      },
      {
        id: 'col-h-2-es',
        question: '¿Qué valioso relicario de oro medieval trasladado a la catedral en 1164 convirtió a Colonia en uno de los grandes destinos de peregrinación de Europa?',
        options: ['El Santo Grial', 'El Relicario de los Reyes Magos', 'La Vera Cruz', 'El Arca de la Alianza'],
        correctIndex: 1,
        explanation: 'El orfebre Nicolás de Verdún confeccionó el Relicario de los Tres Reyes Magos, atrayendo a peregrinos de toda la cristiandad.',
      },
      {
        id: 'col-h-3-es',
        question: '¿Qué famoso puente ferroviario sobre el río Rin junto a la catedral está cubierto por cientos de miles de candados de amor?',
        options: ['Puente Hohenzollern', 'Puente Deutz', 'Puente Severin', 'Puente Mülheim'],
        correctIndex: 0,
        explanation: 'El Hohenzollernbrücke acumula candados grabados por parejas que arrojan la llave a las aguas del Rin como juramento eterno.',
      },
    ],
  },
  'lima': {
    'Local cuisine': [
      {
        id: 'lim-c-1-es',
        question: '¿Qué plato bandera del Perú consiste en pescado fresco cortado en dados marinado en jugo de limón, ají limo y cebolla morada?',
        options: ['Tiradito', 'Ceviche', 'Lomo Saltado', 'Causa Rellena'],
        correctIndex: 1,
        explanation: 'El ceviche peruano se cura al instante en cítrica leche de tigre y se sirve tradicionalmente con camote glaseado y choclo tierno.',
      },
      {
        id: 'lim-c-2-es',
        question: '¿Cómo se denomina la fascinante cocina de fusión limeña fruto de la inmigración china iniciada a mediados del siglo XIX?',
        options: ['Nikkei', 'Chifa', 'Criolla', 'Amazónica'],
        correctIndex: 1,
        explanation: 'La cocina Chifa dio origen a íconos peruanos como el Lomo Saltado y el Arroz Chaufa, fusionando woks cantoneses con ajíes andinos.',
      },
      {
        id: 'lim-c-3-es',
        question: '¿Qué pastel frío elaborado con capas de papa amarilla prensada con ají y limón y relleno de atún o pollo es un clásico limeño?',
        options: ['Papa a la Huancaína', 'Causa Limeña', 'Anticuchos', 'Pastel de Choclo'],
        correctIndex: 1,
        explanation: 'La Causa Limeña combina la suavidad de las papas nativas con el toque picante y fresco del ají amarillo y el limón sutil.',
      },
    ],
    'Art and culture': [
      {
        id: 'lim-a-1-es',
        question: '¿Qué bohemio barrio limeño sobre los acantilados marinos es hogar de casonas históricas, galerías y el romántico Puente de los Suspiros?',
        options: ['Miraflores', 'Barranco', 'San Isidro', 'Callao'],
        correctIndex: 1,
        explanation: 'Barranco ha sido históricamente el refugio creativo de poetas, compositores y pintores peruanos frente a la brisa del Pacífico.',
      },
      {
        id: 'lim-a-2-es',
        question: '¿Qué pirámide ceremonial preínca de adobe de más de 1.500 años se alza imponente en pleno corazón residencial de Miraflores?',
        options: ['Huaca Pucllana', 'Pachacamac', 'Chan Chan', 'Huaca Huallamarca'],
        correctIndex: 0,
        explanation: 'La Huaca Pucllana fue erigida por la cultura Lima usando la técnica antisísmica de ladrillos de adobe dispuestos como libros en estante.',
      },
      {
        id: 'lim-a-3-es',
        question: '¿Qué cóctel representativo del Perú se prepara batiendo pisco con jugo de limón, jarabe de goma, clara de huevo y gotas de amargo de angostura?',
        options: ['Chilcano', 'Pisco Sour', 'Algarrobina', 'Capitán'],
        correctIndex: 1,
        explanation: 'El Pisco Sour es el trago insignia de Lima, inmortalizado en bares históricos como el del Gran Hotel Bolívar.',
      },
    ],
    'Local history': [
      {
        id: 'lim-h-1-es',
        question: '¿Qué ilustre título oficial recibió Lima cuando fue fundada por el conquistador Francisco Pizarro en 1535 el día de los Reyes Magos?',
        options: ['La Ciudad de los Reyes', 'La Perla del Pacífico', 'La Ciudad Dorada', 'La Ciudad de los Palacios'],
        correctIndex: 0,
        explanation: 'Pizarro bautizó la urbe como Ciudad de los Reyes porque su acta de fundación coincidió con la festividad de la Epifanía.',
      },
      {
        id: 'lim-h-2-es',
        question: '¿Qué convento colonial en el Centro Histórico de Lima es célebre por su fastuosa biblioteca virreinal y sus catacumbas subterráneas?',
        options: ['Monasterio de San Francisco', 'Catedral de Lima', 'Palacio de Torre Tagle', 'Iglesia de la Merced'],
        correctIndex: 0,
        explanation: 'Las catacumbas bajo la iglesia de San Francisco funcionaron como camposanto virreinal y albergan miles de osamentas históricas.',
      },
      {
        id: 'lim-h-3-es',
        question: '¿Qué célebre paseo costero sobre los altos barrancos de Miraflores ofrece vistas al océano y reúne al Parque del Amor?',
        options: ['El Malecón de Miraflores', 'Paseo de la República', 'Avenida Larco', 'Costa Verde'],
        correctIndex: 0,
        explanation: 'El Malecón recorre los acantilados marinos bordeados de jardines floridos y esculturas dedicadas al romance frente al Pacífico.',
      },
    ],
  },
};

/**
 * Procedural generator for locations not pre-cached in FALLBACK_QUIZZES.
 */
export function generateDynamicFallbackQuiz(
  location: string,
  category: QuizCategory,
  isHyperlocal: boolean = false,
  language: Language = 'en'
): QuizQuestion[] {
  const cleanLoc = location.split(',')[0].trim();

  if (language === 'es') {
    if (isHyperlocal) {
      if (category === 'Local cuisine') {
        return [
          {
            id: `hl-c-1-es-${Date.now()}`,
            question: `En los comercios y cocinas familiares de ${cleanLoc}, ¿qué práctica tradicional distingue a las fondas auténticas del barrio?`,
            options: [
              `Elaborar el menú del día según la pesca y los productos frescos recolectados esa misma mañana en los mercados locales`,
              `Utilizar exclusivamente comidas ultraprocesadas congeladas`,
              `Evitar el uso de condimentos o especias regionales`,
              `Ofrecer menús homogéneos de cadenas multinacionales`,
            ],
            correctIndex: 0,
            explanation: `La identidad culinaria de ${cleanLoc} se basa en las recetas transmitidas de generación en generación y en el uso de ingredientes frescos de cercanía.`,
          },
          {
            id: `hl-c-2-es-${Date.now()}`,
            question: `Al ordenar en un bodegón tradicional de ${cleanLoc}, ¿qué gesto denota un auténtico conocimiento de las costumbres locales?`,
            options: [
              `Pedir la especialidad sugerida de la casa del día y la bebida o vino tradicional de la comarca`,
              `Exigir almorzar fuera del horario habitual de la comunidad`,
              `Solicitar salsas artificiales para cubrir los platos típicos`,
              `Reclamar un menú turístico traducido a múltiples idiomas`,
            ],
            correctIndex: 0,
            explanation: `Los vecinos y conocedores de ${cleanLoc} confían plenamente en las sugerencias del cocinero elaboradas con productos de estación.`,
          },
          {
            id: `hl-c-3-es-${Date.now()}`,
            question: `¿Qué técnica artesanal de conservación o cocción autóctona es valorada por los historiadores gastronómicos de ${cleanLoc}?`,
            options: [
              `La técnica ancestral de cocción a fuego lento de leña o maduración tradicional típica de este valle o costa`,
              `La cocción instantánea exclusiva en hornos de microondas`,
              `Sustituir las hierbas frescas por aditivos químicos sintéticos`,
              `Eliminar todo tipo de método de cocción tradicional`,
            ],
            correctIndex: 0,
            explanation: `El recetario clásico de ${cleanLoc} preserva técnicas de curado, ahumado o guisado adaptadas a la geografía y clima del lugar.`,
          },
        ];
      }

      if (category === 'Art and culture') {
        return [
          {
            id: `hl-a-1-es-${Date.now()}`,
            question: `Al recorrer a pie las calles históricas de ${cleanLoc}, ¿qué detalle artesanal en las fachadas evidencia su patrimonio arquitectónico?`,
            options: [
              `Rejas de hierro forjado a mano, molduras decorativas en piedra y azulejos conmemorativos antiguos`,
              `Paredes lisas de vinilo sintético sin puertas ni ventanas`,
              `Letreros luminosos genéricos de plástico`,
              `Almacenes industriales de chapa sin ningún relieve`,
            ],
            correctIndex: 0,
            explanation: `Las construcciones patrimoniales de ${cleanLoc} exhiben el trabajo minucioso de antiguos maestros canteros, carpinteros y herreros del lugar.`,
          },
          {
            id: `hl-a-2-es-${Date.now()}`,
            question: `¿Qué manifestación artística comunitaria suele congregar a los vecinos veteranos del distrito de ${cleanLoc}?`,
            options: [
              `Encuentros de música acústica, peñas folclóricas o procesiones festivas barriales en las plazas públicas`,
              `Subastas virtuales cerradas sin presencia comunitaria`,
              `Jornadas de silencio absoluto en espacios públicos`,
              `Promociones comerciales masivas en supermercados`,
            ],
            correctIndex: 0,
            explanation: `La memoria colectiva en ${cleanLoc} se preserva gracias a las fiestas vecinales, festivales populares y tertulias en clubes barriales.`,
          },
          {
            id: `hl-a-3-es-${Date.now()}`,
            question: `¿Qué espacio cultural independiente cercano a ${cleanLoc} suele actuar como semillero de creadores locales?`,
            options: [
              `Talleres comunitarios autogestionados, atelieres de artistas y pequeños teatros independientes`,
              `Depósitos aduaneros cerrados al público`,
              `Centros de procesamiento de servidores informáticos`,
              `Peajes de autopistas interestatales`,
            ],
            correctIndex: 0,
            explanation: `Los colectivos culturales de base en ${cleanLoc} fomentan la experimentación artística fuera de los circuitos comerciales convencionales.`,
          },
        ];
      }

      // Local history Hyperlocal Spanish
      return [
        {
          id: `hl-h-1-es-${Date.now()}`,
          question: `Antes del trazado urbanístico moderno, ¿qué rasgo geográfico determinó el serpenteante recorrido de las calles antiguas de ${cleanLoc}?`,
          options: [
            `Antiguos senderos naturales, antiguos arroyos canalizados o rutas históricas de carretas`,
            `Líneas rectas trazadas por satélite en el año 2015`,
            `Túneles artificiales construidos para trenes de alta velocidad`,
            `Loterías al azar sin considerar las colinas o fuentes de agua`,
          ],
          correctIndex: 0,
          explanation: `El entramado urbano fundacional de ${cleanLoc} sigue la topografía original del terreno y los cauces de agua que abastecían a los primeros colonos.`,
        },
        {
          id: `hl-h-2-es-${Date.now()}`,
          question: `¿Qué acontecimiento ciudadano en los archivos históricos de ${cleanLoc} evitó la demolición de su casco antiguo?`,
          options: [
            `Movilizaciones y peticiones vecinales que lograron la declaración de zona de protección histórica y patrimonial`,
            `La orden obligatoria de demoler todas las viviendas anteriores a 1950`,
            `El abandono total del municipio durante décadas`,
            `La pérdida fortuita de las escrituras notariales`,
          ],
          correctIndex: 0,
          explanation: `El esfuerzo comprometido de historiadores y vecinos de ${cleanLoc} salvaguardó el encanto de sus edificios y pasajes tradicionales.`,
        },
        {
          id: `hl-h-3-es-${Date.now()}`,
          question: `¿Qué hito vecinal en ${cleanLoc} conmemora el origen fundacional de este distrito?`,
          options: [
            `Placas conmemorativas de bronce, un monolito cívico o el nombre de su plaza central más representativa`,
            `La prohibición formal de investigar los antecedentes de la ciudad`,
            `El cambio de nombre de todas las calles cada semana`,
            `La demolición de archivos históricos municipales`,
          ],
          correctIndex: 0,
          explanation: `Los monolitos y placas cívicas recuerdan con orgullo a los pioneros y acontecimientos fundacionales de ${cleanLoc}.`,
        },
      ];
    }

    // Standard Spanish dynamic questions
    if (category === 'Local cuisine') {
      return [
        {
          id: `gen-c-1-es-${Date.now()}`,
          question: `¿Qué plato o ingrediente emblemático representa el sabor tradicional de ${cleanLoc}?`,
          options: [
            `Recetas tradicionales basadas en ingredientes autóctonos de la región y técnicas artesanales`,
            `Alimentos procesados genéricos idénticos en cualquier país`,
            `Comidas elaboradas exclusivamente sin sal ni condimentos`,
            `Platos importados sin relación con la historia del lugar`,
          ],
          correctIndex: 0,
          explanation: `La cocina de ${cleanLoc} se distingue por la riqueza de los frutos de su tierra y la influencia de sus tradiciones culturales.`,
        },
        {
          id: `gen-c-2-es-${Date.now()}`,
          question: `¿Dónde se experimenta con mayor autenticidad la cultura culinaria popular en ${cleanLoc}?`,
          options: [
            `En los mercados municipales de abastos, fondas tradicionales y bodegones de barrio`,
            `En las gasolineras de las autopistas de tránsito rápido`,
            `En comedores corporativos cerrados a los viajeros`,
            `En máquinas expendedoras automáticas`,
          ],
          correctIndex: 0,
          explanation: `Los mercados locales de ${cleanLoc} reúnen a productores locales, cocineros veteranos y recetas caseras inigualables.`,
        },
        {
          id: `gen-c-3-es-${Date.now()}`,
          question: `¿Qué bebida tradicional suele acompañar los encuentros sociales entre amigos en ${cleanLoc}?`,
          options: [
            `La bebida tradicional típica, vino regional o infusión aromática consagrada por la costumbre local`,
            `Agua destilada de uso industrial exclusivamente`,
            `Jarabes farmacéuticos no bebibles`,
            `Refrescos sintéticos idénticos en cualquier lugar`,
          ],
          correctIndex: 0,
          explanation: `Las bebidas emblemáticas de ${cleanLoc} forman parte indispensable del brindis y las sobremesas comunitarias.`,
        },
      ];
    }

    if (category === 'Art and culture') {
      return [
        {
          id: `gen-a-1-es-${Date.now()}`,
          question: `¿Qué espacios públicos son el centro neurálgico del arte callejero y la vida cultural en ${cleanLoc}?`,
          options: [
            `Las plazas centrales, paseos peatonales arbolados y explanadas cívicas`,
            `Estacionamientos privados subterráneos`,
            `Zonas francas industriales restringidas`,
            `Complejos de bodegas de almacenamiento suburbano`,
          ],
          correctIndex: 0,
          explanation: `Las plazas públicas de ${cleanLoc} funcionan como teatros a cielo abierto para músicos, artistas plásticos y festividades populares.`,
        },
        {
          id: `gen-a-2-es-${Date.now()}`,
          question: `¿De qué manera los museos y casas de cultura de ${cleanLoc} protegen su legado cultural?`,
          options: [
            `Conservando objetos históricos, tradiciones orales y obras de destacados maestros locales`,
            `Sustituyendo las obras patrimoniales por réplicas descartables`,
            `Negando el acceso al público e investigadores`,
            `Destruyendo los archivos históricos cada diez años`,
          ],
          correctIndex: 0,
          explanation: `Los recintos culturales de ${cleanLoc} custodian testimonios materiales y memorias orales de gran valor patrimonial.`,
        },
        {
          id: `gen-a-3-es-${Date.now()}`,
          question: `¿Qué elemento arquitectónico distingue a los barrios tradicionales de ${cleanLoc}?`,
          options: [
            `Fachadas históricas que emplean piedra, madera y ornamentaciones características de la zona`,
            `Contenedores de chapa idénticos sin puertas`,
            `Estructuras pintadas únicamente en color verde fluorescente`,
            `Bloques de cemento sin ventanas ni detalles`,
          ],
          correctIndex: 0,
          explanation: `La arquitectura vernácula de ${cleanLoc} armoniza materiales autóctonos con estilos heredados a través de los siglos.`,
        },
      ];
    }

    // Local history Spanish
    return [
      {
        id: `gen-h-1-es-${Date.now()}`,
        question: `¿Por qué motivo estratégico o geográfico se fundó originalmente ${cleanLoc} en su emplazamiento actual?`,
        options: [
          `Por su cercanía a rutas naturales de comercio, cursos fluviales, tierras fértiles o relieve defensivo`,
          `Por un sorteo al azar en un terreno sin acceso a agua ni alimentos`,
          `Para ubicarse lo más lejos posible de cualquier vía de comunicación`,
          `Porque era una zona totalmente inhabitable e inaccesible`,
        ],
        correctIndex: 0,
        explanation: `Los asentamientos prósperos como ${cleanLoc} nacieron alrededor de valles fértiles, puertos de abrigo o cruces de caminos mercantiles.`,
      },
      {
        id: `gen-h-2-es-${Date.now()}`,
        question: `¿Qué gran acontecimiento impulsó la expansión urbana y el transporte en ${cleanLoc}?`,
        options: [
          `El desarrollo de las redes ferroviarias, el comercio fluvial/marítimo y el crecimiento cívico de los siglos XIX y XX`,
          `La invención de herramientas rudimentarias de piedra exclusivamente`,
          `Un único mes del año 2020`,
          `La construcción de una antena de radio`,
        ],
        correctIndex: 0,
        explanation: `La llegada del ferrocarril y las rutas comerciales catalizaron la pujanza económica y demográfica de ${cleanLoc}.`,
      },
      {
        id: `gen-h-3-es-${Date.now()}`,
        question: `¿Cómo mantiene viva ${cleanLoc} la memoria de sus acontecimientos históricos más trascendentes?`,
        options: [
          `A través de monumentos conservados, festividades cívicas y la protección de su casco histórico`,
          `Demoliendo de inmediato cualquier construcción de más de cincuenta años`,
          `Prohibiendo que los ciudadanos comenten el pasado`,
          `Renombrando el municipio cada semana`,
        ],
        correctIndex: 0,
        explanation: `Los monumentos y fechas cívicas de ${cleanLoc} rinden homenaje al esfuerzo de las generaciones que forjaron su identidad.`,
      },
    ];
  }

  if (isHyperlocal) {
    if (category === 'Local cuisine') {
      return [
        {
          id: `hl-c-1-${Date.now()}`,
          question: `In the immediate neighborhood around ${cleanLoc}, which hyper-local culinary tradition distinguishes multi-generational family kitchens from commercial restaurants?`,
          options: [
            `Sourcing specific heirloom varietals and small-batch fermentations prepared according to micro-regional family recipes`,
            `Using pre-packaged microwave sauces imported from international wholesalers`,
            `Refusing to season food with any indigenous spices`,
            `Serving only standardized chain fast-food meals`,
          ],
          correctIndex: 0,
          explanation: `Hyperlocal culinary heritage in ${cleanLoc} relies on deep knowledge of micro-seasons, heirloom produce, and neighborhood butcher or bakery traditions.`,
        },
        {
          id: `hl-c-2-${Date.now()}`,
          question: `When ordering at an authentic corner establishment near ${cleanLoc}, what insider signal demonstrates genuine familiarity with local customs?`,
          options: [
            `Ordering the daily off-menu special ("plato del día" or chef's harvest) pairing it with the traditional local beverage`,
            `Asking for the tourist menu printed in ten languages`,
            `Demanding dinner at 4:30 PM regardless of local dining hours`,
            `Requesting ketchup on traditional heritage dishes`,
          ],
          correctIndex: 0,
          explanation: `True local patrons in ${cleanLoc} follow customary eating hours and trust the market-fresh daily specials created from that morning's arrivals.`,
        },
        {
          id: `hl-c-3-${Date.now()}`,
          question: `Which specific micro-regional ingredient or preparation technique is uniquely prized by culinary historians studying the ${cleanLoc} district?`,
          options: [
            `A heritage technique of slow-cooking or open-fire curing indigenous to the immediate provincial riverbank or valley`,
            `Freeze-drying all vegetables in vacuum plastic`,
            `Replacing fresh herbs with synthetic food colorings`,
            `Cooking exclusively in electric microwaves`,
          ],
          correctIndex: 0,
          explanation: `Traditional cooking in ${cleanLoc} retains distinct ancestral fire, brine, or fermentation methods rooted in local micro-climates.`,
        },
      ];
    }

    if (category === 'Art and culture') {
      return [
        {
          id: `hl-a-1-${Date.now()}`,
          question: `Within the immediate street blocks of ${cleanLoc}, what obscure architectural detail often marks 19th- or early 20th-century artisan buildings?`,
          options: [
            `Hand-carved mason marks, ornate wrought-iron fanlights, or bespoke ceramic tile street plates`,
            `Modern vinyl siding with no windows`,
            `Pre-fabricated aluminum warehouse siding`,
            `Universal neon plastic signs`,
          ],
          correctIndex: 0,
          explanation: `Historic buildings in ${cleanLoc} feature craftsman-signed masonry, custom lintels, and decorative ironwork commissioned by original guild builders.`,
        },
        {
          id: `hl-a-2-${Date.now()}`,
          question: `Which neighborhood folklore legend or patron milestone is quietly celebrated by longtime residents of the ${cleanLoc} district?`,
          options: [
            `An annual neighborhood block procession or acoustic music gathering preserved in local alleyways`,
            `A corporate discount day at big-box chain stores`,
            `An online virtual raffle with no physical gathering`,
            `A mandate to never play acoustic instruments`,
          ],
          correctIndex: 0,
          explanation: `Hyperlocal community identity thrives through intimate street festivals, neighborhood club halls, and shared oral histories.`,
        },
        {
          id: `hl-a-3-${Date.now()}`,
          question: `What hidden independent cultural institution near ${cleanLoc} often serves as the grassroots incubator for underground artists?`,
          options: [
            `Community-run workshop collectives, historic printing presses, or independent neighborhood art ateliers`,
            `Commercial customs impound yards`,
            `Restricted server data centers`,
            `Highway toll inspection booths`,
          ],
          correctIndex: 0,
          explanation: `Grassroots artist collectives and independent printmakers in ${cleanLoc} sustain creative countercultures outside mainstream commercial galleries.`,
        },
      ];
    }

    // Local history Hyperlocal
    return [
      {
        id: `hl-h-1-${Date.now()}`,
        question: `Before modern road zoning, what specific historical natural landmark or trail determined the original street layout of ${cleanLoc}?`,
        options: [
          `An ancient indigenous footpath or stream bed that later became the principal winding neighborhood thoroughfare`,
          `A laser satellite grid drawn in 2012`,
          `An artificial canal built for nuclear submarines`,
          `A perfectly straight ruler line drawn across swamps with no regard to hills`,
        ],
        correctIndex: 0,
        explanation: `The charmingly irregular streets of ${cleanLoc} trace natural topography, historical pack mule trails, and former freshwater springs.`,
      },
      {
        id: `hl-h-2-${Date.now()}`,
        question: `What pivotal neighborhood event in the municipal archives of ${cleanLoc} preserved its historic core from mid-century urban demolition?`,
        options: [
          `A passionate grassroots citizens' preservation campaign that successfully petitioned for historic district conservation`,
          `An executive order to replace all historic homes with an asphalt parking lot`,
          `A total abandonment of the district for 50 years`,
          `The complete loss of all municipal records in an archive move`,
        ],
        correctIndex: 0,
        explanation: `Dedicated neighborhood preservationists and community leaders fought to maintain the character and architectural heritage of ${cleanLoc}.`,
      },
      {
        id: `hl-h-3-${Date.now()}`,
        question: `What subtle municipal boundary marker or historical plaque can still be spotted on street corners around ${cleanLoc}?`,
        options: [
          `Carved granite boundary stones or bronze commemorative medallions embedded directly in the sidewalk stones`,
          `Disposable paper stickers updated every morning`,
          `Temporary orange traffic cones from 1950`,
          `Plastic toy flags attached to gutters`,
        ],
        correctIndex: 0,
        explanation: `Historical municipal boundary stones and historic district markers in ${cleanLoc} commemorate original parish and borough borders.`,
      },
    ];
  }

  // Standard non-hyperlocal fallback
  if (category === 'Local cuisine') {
    return [
      {
        id: `gen-c-1-${Date.now()}`,
        question: `When exploring the traditional food scene in ${cleanLoc}, which dining experience best reflects authentic everyday life?`,
        options: [
          `Visiting lively local neighborhood markets and street stalls frequented by residents`,
          `Only eating in airport food courts`,
          `Ordering packaged snacks from souvenir gift stands`,
          `Sticking strictly to international chain drive-throughs`,
        ],
        correctIndex: 0,
        explanation: `In ${cleanLoc} and across the world, fresh municipal markets and neighborhood eateries showcase genuine culinary heritage.`,
      },
      {
        id: `gen-c-2-${Date.now()}`,
        question: `Traditional recipes in the region surrounding ${cleanLoc} are historically shaped primarily by:`,
        options: [
          `Local geography, indigenous crops, and centuries of cultural migrations`,
          `Imported processed instant meals`,
          `Fast-food commercial television commercials`,
          `Random modern internet trends only`,
        ],
        correctIndex: 0,
        explanation: `Regional culinary identities reflect local climate, native ingredients, and centuries of cross-cultural heritage.`,
      },
      {
        id: `gen-c-3-${Date.now()}`,
        question: `What is considered the most respectful customary etiquette when dining at traditional eateries in ${cleanLoc}?`,
        options: [
          `Greeting the host or staff politely and enjoying seasonal specialties with appreciation`,
          `Demanding foods not in season or refusing to taste local flavors`,
          `Leaving without acknowledging the staff`,
          `Asking to change every ingredient in traditional dishes`,
        ],
        correctIndex: 0,
        explanation: `Polite greetings and genuine curiosity for seasonal regional dishes make dining in ${cleanLoc} rewarding for both traveler and host.`,
      },
    ];
  }

  if (category === 'Art and culture') {
    return [
      {
        id: `gen-a-1-${Date.now()}`,
        question: `What public gathering spaces are central to experiencing the community art and street life of ${cleanLoc}?`,
        options: [
          `Central public squares, civic parks, and historic pedestrian boulevards`,
          `Private commercial parking garages`,
          `Restricted industrial logistics centers`,
          `Suburban storage facilities`,
        ],
        correctIndex: 0,
        explanation: `Civic squares and historic promenades in ${cleanLoc} are the stage for street musicians, festivals, and public sculptures.`,
      },
      {
        id: `gen-a-2-${Date.now()}`,
        question: `How do regional museums and galleries in ${cleanLoc} preserve its distinctive heritage?`,
        options: [
          `By safeguarding artifacts, folk traditions, and works of prominent local artisans`,
          `By replacing all original collections with plastic copies`,
          `By refusing entry to students and researchers`,
          `By discarding historical archives every ten years`,
        ],
        correctIndex: 0,
        explanation: `Cultural institutions preserve regional storytelling, craftsmanship, and historic artistic movements.`,
      },
      {
        id: `gen-a-3-${Date.now()}`,
        question: `Which architectural characteristic often distinguishes historic districts in ${cleanLoc}?`,
        options: [
          `Preserved building facades using indigenous stone, timber, or regional decorative motifs`,
          `Identical corrugated shipping containers only`,
          `Complete absence of doors or windows`,
          `Structures painted solely in safety neon green`,
        ],
        correctIndex: 0,
        explanation: `Traditional architecture in ${cleanLoc} reflects local materials and cultural craft passed down through generations.`,
      },
    ];
  }

  // Local history
  return [
    {
      id: `gen-h-1-${Date.now()}`,
      question: `Why was ${cleanLoc} originally settled at its specific geographic site?`,
      options: [
        `Proximity to natural trade routes, waterways, defensive topography, or fertile land`,
        `Random lottery drawing with no natural resources`,
        `To be as far as possible from any water or food sources`,
        `Because it was completely uninhabitable`,
      ],
      correctIndex: 0,
      explanation: `Nearly all great historic settlements formed around natural harbors, river bends, trading junctions, or defensive vantage points.`,
    },
    {
      id: `gen-h-2-${Date.now()}`,
      question: `What major era typically catalyzed the urban expansion and transit networks of ${cleanLoc}?`,
      options: [
        `The Industrial Revolution and 19th–20th century railway/maritime expansion`,
        `The Bronze Age invention of stone wheels only`,
        `A single month in the year 2018`,
        `The construction of the first television tower`,
      ],
      correctIndex: 0,
      explanation: `The expansion of railroads, industrial manufacturing, and shipping routes fueled rapid modern city development.`,
    },
    {
      id: `gen-h-3-${Date.now()}`,
      question: `How does ${cleanLoc} maintain a tangible link to its historical foundations today?`,
      options: [
        `Through conserved monuments, heritage districts, and civic commemorative celebrations`,
        `By demolishing all older structures immediately`,
        `By forbidding residents from discussing the past`,
        `By renaming the city every single month`,
      ],
      correctIndex: 0,
      explanation: `Historical landmarks and community commemorations celebrate the resilient heritage of ${cleanLoc}.`,
    },
  ];
}
