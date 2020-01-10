
/**
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */
class RandomSeed {
  constructor(seed){
    this._seed = seed % 2147483647;
    if (this._seed <= 0) this._seed += 2147483646;
  }

  /**
  * Returns a pseudo-random value between 1 and 2^32 - 2.
  */  
  next(){
    return this._seed = this._seed * 16807 % 2147483647;  
  }
}

export default RandomSeed;