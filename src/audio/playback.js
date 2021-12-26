const Speaker = require('speaker');

module.exports = {
    create: () => {
        // Create the Speaker instance
        let speaker = new Speaker({
            channels: 2, // 2 channels
            bitDepth: 16, // 16-bit samples
            sampleRate: 48000 // 44,100 Hz sample rate
        });

        return speaker;
    }
}