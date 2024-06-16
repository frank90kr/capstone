<?php

namespace Database\Seeders;

use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Course::create([
            'title' => 'Html',
            'description' => "HTML, acronimo di HyperText Markup Language, è il linguaggio di markup standard utilizzato per la creazione e la strutturazione dei contenuti delle pagine web. È uno dei componenti fondamentali del World Wide Web insieme al CSS (Cascading Style Sheets) e al JavaScript. ",
            'price' => null,
            'creator_id' => 1,
            'video_url' => 'https://www.youtube.com/watch?v=JRJNvxoh844',
            'image' => '/storage/corsi/html.png',
            ]);
            
            Course::create([
                'title' => 'Css',
            'description' => 'CSS, o Cascading Style Sheets, è un linguaggio usato per programmare la resa grafica di documenti scritti in un linguaggio di markup',
            'price' => null,
            'creator_id' => 1,
            'video_url' => "",
            'image' => '/storage/corsi/css.png'
            ]);
            

            Course::create([
                'title' => 'Javascript',
                'description' => 'JavaScript è un linguaggio di programmazione multi paradigma orientato agli eventi',
                'price' => null,
                'creator_id' => 1,
                'image' => '/storage/corsi/javascript.jpg'
            ]);
       
            Course::create([
                'title' => 'Sass',
                'description' => ' preprocessore CSS che semplifica e potenzia la creazione di fogli di stile e si integra bene con i componenti tipici di uno stack HTML moderno',
                'price' => 49.99,
                'creator_id' => 1,
                'image' => '/storage/corsi/javascript.jpg'
            ]);

        Course::create([
            'title' => 'TypeScript',
            'description' => ' linguaggio di programmazione open source sviluppato da Microsoft, Si tratta di un/estensione di JavaScript che basa le sue caratteristiche su ECMAScript',
            'price' => null,
            'creator_id' => 1,
            'image' => '/storage/corsi/javascript.jpg'
        ]);

        Course::create([
            'title' => 'C++',
            'description' => 'utilizzato per programmare parti importanti di sistemi operativi come Windows e Linux, grazie alla sua efficienza e controllo sulle risorse di sistema',
            'price' => 99.99,
            'creator_id' => 2,
            'image' => '/storage/corsi/javascript.jpg'
        ]);


    }
}
