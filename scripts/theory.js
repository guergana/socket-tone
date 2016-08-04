    var MusEDTheory = function () {
        var self = this;

        this.noteNames = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];
        this.keyToNote        = {}; // C8  == 108
        this.noteToKey        = {}; // 108 ==  C8
        this.noteToPitchClass = {}; // 108 ==   C

        (function () {
            var A0 = 0x15; // first note
            var C8 = 0x6C; // last note

            for (var n = A0; n <= C8; n++) {
                var pitchClass = self.noteNames[n % 12];
                var octave     = (n - 12) / 12 >> 0;
                var noteName   = pitchClass + octave;

                self.keyToNote       [noteName] = n;
                self.noteToKey       [n]        = noteName;
                self.noteToPitchClass[n]        = pitchClass;
            }
        })();

        // TODO switch pitchSet / scale terminology?

        this.scaleGroups = [
            {
                slug      : 'major',
                name      : 'Major',
                defaultScaleIndex : 3, // Major scale
                pitchSets : [
                    { slug : 'harmonic-major', scaleSlug : 'harmonic-major', mode : 0,
                        roots    : [ 0, 2, 4, 5, 7, 8,11 ],
                        thirds   : [ 4, 5, 7, 8,11,12,14 ],
                        fifths   : [ 7, 8,11,12,14,16,17 ],
                        sevenths : [11,12,14,16,17,19,20 ]
                    },
                    { slug : 'lydian', scaleSlug : 'major', mode : 3,
                        roots:    [ 0, 2, 4, 6,7,  9,11 ],
                        thirds:   [ 4, 6, 7, 9,11,12,14 ],
                        fifths:   [ 7, 9,11,12,14,16,18 ],
                        sevenths: [11,12,14,16,18,19,21 ],
                    },
                    { slug : 'lydian-dominant', scaleSlug : 'melodic-minor', mode : 3,
                        roots    : [ 0, 2, 4, 6, 7, 9,10 ],
                        thirds   : [ 4, 6, 7, 9,10,12,14 ],
                        fifths   : [ 7, 9,10,12,14,16,18 ],
                        sevenths : [10,12,14,16,18,19,21 ]
                    },
                    { slug : 'major', scaleSlug : 'major', mode : 0, name: 'Major',
                        roots    : [ 0, 2, 4, 5, 7, 9,11 ],
                        thirds   : [ 4, 5, 7, 9,11,12,14 ],
                        fifths   : [ 7, 9,11,12,14,16,17 ],
                        sevenths : [11,12,14,16,17,19,21 ]
                    },
                    { slug : 'major-blues', scaleSlug : 'blues', mode : 5,
                        roots:    [ 0, 2, 3, 4, 7, 9 ],
                        thirds:	  [ 4, 5, 6, 7,11,12 ],
                        fifths:   [ 7, 9, 9,10,14,16 ],
                        sevenths: [10,12,12,12,17,19 ]
                    },
                    { slug : 'major-pentatonic', scaleSlug : 'major-pentatonic', mode : 0,
                        roots    : [ 0, 2, 4, 7, 9 ],
                        thirds   : [ 4, 7, 9,12,14 ],
                        fifths   : [ 9,12,14,16,19 ],
                        sevenths : [14,16,19,21,24 ],
                    },
                    { slug : 'mixolydian', scaleSlug : 'major', mode : 4,
                        roots:    [ 0, 2, 4, 5, 7, 9,10 ],
                        thirds:   [ 4, 5, 7, 9,10,12,14 ],
                        fifths:   [ 7, 9,10,12,14,16,17 ],
                        sevenths: [10,12,14,16,17,19,21 ]},
                    { slug : 'phrygian-dominant', scaleSlug : 'harmonic-minor', mode : 4,
                        roots:    [ 0, 1, 4, 5, 7, 8,10 ],
                        thirds:   [ 4, 5, 7, 8,10,12,13 ],
                        fifths:   [ 7, 8,10,12,13,16,17 ],
                        sevenths: [10,12,13,16,17,19,20 ],
                    }
                ]
            },
            {
                slug      : 'minor',
                name      : 'Minor',
                defaultScaleIndex : 5, // Natural Minor
                pitchSets : [
                    { slug : 'dorian', scaleSlug : 'major', mode : 1,
                        roots:    [ 0, 2, 3, 5, 7, 9,10 ],
                        thirds:   [ 3, 5, 7, 9,10,12,14 ],
                        fifths:   [ 7, 9,10,12,14,15,17 ],
                        sevenths: [10,12,14,15,17,19,21 ]},
                    { slug : 'harmonic-minor', scaleSlug : 'harmonic-minor', mode : 0,
                        roots   : [ 0, 2, 3, 5, 7, 8,11 ],
                        thirds  : [ 3, 5, 7, 8,11,12,14 ],
                        fifths  : [ 7, 8,11,12,14,15,17 ],
                        sevenths: [11,12,14,15,17,19,20 ]
                    },
                    { slug : 'locrian', scaleSlug : 'major', mode : 6,
                        roots:    [ 0, 1, 3, 5, 6, 8,10 ],
                        thirds:   [ 3, 5, 6, 8,10,12,13 ],
                        fifths:   [ 6, 8,10,12,13,15,17 ],
                        sevenths: [10,12,13,15,17,18,20 ]
                    },
                    { slug : 'melodic-minor', scaleSlug : 'melodic-minor', mode : 0,
                        roots:    [ 0, 2, 3, 5, 7, 9,11 ],
                        thirds:   [ 3, 5, 7, 9,11,12,14 ],
                        fifths:   [ 7, 9,11,12,14,15,17 ],
                        sevenths: [11,12,14,15,17,19,21 ]
                    },
                    { slug : 'minor-pentatonic', scaleSlug : 'major-pentatonic', mode : 4,
                        roots:    [ 0, 3, 5, 7,10 ],
                        thirds:   [ 5, 7,10,12,15 ],
                        fifths:   [10,12,15,17,19 ],
                        sevenths: [15,17,19,22,24 ]
                    },
                    { slug : 'natural-minor',  scaleSlug : 'major', mode : 5, name: 'Natural Minor',
                        roots:    [ 0, 2, 3, 5, 7, 8,10 ],
                        thirds:   [ 3, 5, 7, 8,10,12,14 ],
                        fifths:   [ 7, 8,10,12,14,15,17 ],
                        sevenths: [10,12,14,15,17,19,20 ]
                    },
                    { slug : 'phrygian', scaleSlug : 'major', mode : 2,
                        roots:    [ 0, 1, 3, 5, 7, 8,10 ],
                        thirds:   [ 3, 5, 7, 8,10,12,13 ],
                        fifths:   [ 7, 8,10,12,13,15,17 ],
                        sevenths: [10,12,13,15,17,19,20 ]
                    }
                ]
            },
            {
                slug      : 'other',
                name      : 'Other',
                defaultScaleIndex : 1, // Blues
                pitchSets : [
                    { slug : 'altered', scaleSlug : 'melodic-minor', mode : 6, name: 'Altered',
                        roots:    [ 0, 1, 3, 4, 6, 8,10 ],
                        thirds:   [ 3, 4, 6, 8,10,12,13 ],
                        fifths:	  [ 6, 8,10,12,13,15,16 ],
                        sevenths: [10,12,13,15,16,18,20 ]
                    },
                    { slug : 'blues', scaleSlug : 'blues', mode : 0,
                        roots    : [ 0, 3, 5, 6, 7,10 ],
                        thirds   : [ 4, 7, 9, 9,11,14 ],
                        fifths   : [ 7,10,12,12,14,17 ],
                        sevenths : [10,13,15,15,17,20 ]
                    },
                    { slug : 'blues-octaves', scaleSlug : 'blues-octaves', mode : 0,
                        roots    : [ 0, 3, 5, 6, 7,10 ],
                        thirds   : [ 12,15,17,18,19,22 ],
                        fifths   : [ 24,27,29,30,31,34 ],
                        sevenths : [ 36,39,41,42,43,46 ]
                    },
                    { slug : 'chromatic',  scaleSlug : 'chromatic', mode : 0,
                        roots    : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11],
                        thirds   : [ 4, 5, 6, 7, 8, 9,10,11,12,13,14,15],
                        fifths   : [ 7, 8, 9,10,11,12,13,14,15,16,17,18],
                        sevenths : [10,11,12,13,14,15,16,17,18,19,20,21]
                    },
                    { slug : 'diminished', scaleSlug : 'octatonic', mode : 1,
                        roots:    [ 0, 1, 3, 4, 6, 7, 9,10 ],
                        thirds:   [ 3, 4, 6, 7, 9,10,12,13 ],
                        fifths:   [ 6, 7, 9,10,12,13,15,16 ],
                        sevenths: [ 9,10,12,13,15,16,18,19 ]
                    },
                    { slug : 'octatonic', scaleSlug : 'octatonic', mode : 0,
                        roots    : [ 0, 2, 3, 5, 6, 8, 9,11],
                        thirds   : [ 3, 5, 6, 8, 9,11,12,14 ],
                        fifths   : [ 6, 8, 9,11,12,14,15,17 ],
                        sevenths : [ 9,11,12,14,15,17,18,20 ]
                    },
                    { slug : 'supermode', scaleSlug : 'supermode', mode : 0,
                        roots    : [ 0, 2, 3, 4, 5, 7, 8, 9,10,11],
                        thirds   : [ 4, 5, 7, 7, 9,11,12,12,14,14],
                        fifths   : [ 7, 9,10,11,12,14,15,16,17,17],
                        sevenths : [10,12,14,14,15,17,19,19,21,21]
                    },
                    { slug : 'whole-tone', scaleSlug : 'whole-tone', mode : 0,
                        roots     : [ 0, 2, 4, 6, 8,10 ],
                        thirds    : [ 4, 6, 8,10,12,14 ],
                        fifths    : [ 8,10,12,14,16,18 ],
                        sevenths  : [10,12,14,16,18,20 ],
                    },
                ]
            },
        ];

        this.scales = [
            {
                slug           : 'major',
                name           : 'Major',
                scaleDegrees   : [ 0,2,4,5,7,9,11 ],
                intervals      : [ 0,2,2,1,2,2, 2,1 ],
                modeNames      : ['Ionian','Dorian','Phrygian','Lydian','Mixolydian','Aeolian','Locrian']
            },
            {
                slug           : 'major-pentatonic',
                name           : 'Major Pentatonic',
                scaleDegrees   : [ 0, 2, 4, 7, 9 ],
                intervals      : [ 0, 3, 2, 2, 3, 2 ],
                modeNames      : ['Major Pentatonic','2','3','4','Minor Pentatonic']
            },
            {
                slug           : 'blues-octaves',
                name           : 'Blues (Scale)',
                scaleDegrees   : [ 0, 3, 5, 6, 7,10 ],
                intervals      : [ 0, 3, 2, 1, 1, 3, 2 ],
                modeNames      : ['Blues (Scale)','2','3','4','5','Major Blues']
            },
            {
                slug           : 'blues',
                name           : 'Blues (Chords)',
                scaleDegrees   : [ 0, 3, 5, 6, 7,10 ],
                intervals      : [ 0, 3, 2, 1, 1, 3, 2 ],
                modeNames      : ['Blues (Chords)','2','3','4','5','Major Blues']
            },
            {
                slug           : 'whole-tone',
                name           : 'Whole Tone',
                scaleDegrees   : [ 0, 2, 4, 6, 8,10 ],
                intervals      : [ 0, 2, 2, 2, 2, 2, 2 ],
                modeNames      : ['Whole Tone','2','3','4','5','6']
            },
            {
                slug           : 'melodic-minor',
                name           : 'Melodic Minor',
                scaleDegrees   : [ 0,2,3,5,7,9,11 ],
                intervals      : [ 2,1,2,2,2,2,1 ],
                modeNames      : ['Melodic Minor','Phrygian natural 6','Lydian Augmented','Lydian Dominant','Hindu','Locrian natural 2','Super Locrian']
            },
            {
                slug           : 'harmonic-major',
                name           : 'Harmonic Major',
                scaleDegrees   : [ 0,2,4,5,7,8,11 ],
                intervals      : [ 0,2,2,1,2,1, 3 ],
                modeNames      : ['Harmonic Major','2','3','4','5','6','7']
            },
            {
                slug           : 'harmonic-minor',
                name           : 'Harmonic Minor',
                scaleDegrees   : [ 0,2,3,5,7,8,11 ],
                intervals      : [ 0,2,1,2,2,1, 3 ],
                modeNames      : ['Harmonic Minor','Locrian natural 6','Harmonic Major','Romanian','Phrygian Dominant','Lydian sharp 2','Alt double flat 7'],
            },
            {
                slug           : 'octatonic',
                name           : 'Octatonic',
                scaleDegrees   : [ 0, 1, 3, 4, 6, 7, 9,10 ],
                intervals      : [ 1, 2, 1, 2, 1, 2, 1, 2 ],
                modeNames      : ['Octatonic','Diminished']
            },
            {
                slug           : 'supermode',
                name           : 'Supermode',
                scaleDegrees   : [ 0, 2, 3, 4, 5, 7, 8, 9,10,11 ],
                intervals      : [ 2, 1, 1, 1, 2, 1, 1, 1, 1, 1 ],
                modeNames      : ['Supermode','2','3','4','5','6','7','8','9','10']
            },
            {
                slug           : 'chromatic',
                name           : 'Chromatic',
                scaleDegrees   : [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11 ],
                intervals      : [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                modeNames      : ['Chromatic']
            }
        ];

        this.slugToScale = {};
        (function () {
            for (var i = 0; i < self.scales.length; i++) {
                self.slugToScale[self.scales[i].slug] = self.scales[i];
            }
        })();

        this.init();
    };

    MusEDTheory.prototype = {
        init : function() {
        }
    };

    var Theory = new MusEDTheory();

module.exports = Theory;