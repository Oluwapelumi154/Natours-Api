const { randomUUID: uuidv4 } = require('crypto');
const { serviceResponse } = require('../../../utils');
const { bookingRepository } = require('../../booking/repository');
const { guideRepository } = require('../../guide/repository');
const { tourRepository } = require('../repository');

class tourService {
  static async create(body) {
    try {
      const tour = await tourRepository.findByName(body.name);
      if (tour) {
        return serviceResponse(
          'fail',
          400,
          'A Tour already exist with this name'
        );
      }
      const tourId = uuidv4();
      const tourObj = {
        tourId,
        ...body
      };
      const fields = Object.keys(body);
      if (fields.includes('tourId')) {
        delete body.tourId;
      }
      const newTour = await tourRepository.create(tourObj);
      return serviceResponse(
        'success',
        201,
        'Succesfully created a tour',
        newTour
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async find(query) {
    try {
      const pageNo = parseInt(query.pageNo, 10) || 1;
      const perPage = parseInt(query.perPage, 10) || 10;
      const offset = (pageNo - 1) * perPage;
      const tour = await tourRepository.find(offset, perPage);
      const count = await tourRepository.count();
      return serviceResponse('success', 200, 'Successfully fetched all Tours', {
        count,
        perPage,
        pageNo,
        tour
      });
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async findById(tourId) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tour Id');
      }
      return serviceResponse('success', 200, 'Successfully fetched tour', tour);
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async delete(tourId) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid Id');
      }
      return serviceResponse('success', 200, 'Successfully deleted tour');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async update(tourId, body) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tourId');
      }
      tour.update({
        name: body.name,
        maxGroupSize: body.maxGroupSize,
        difficulty: body.difficulty,
        price: body.price,
        durations: body.durations,
        priceDiscount: body.priceDiscount,
        summary: body.summary,
        description: body.description,
        imageCover: body.imageCover
      });
      return serviceResponse('success', 200, 'Successfully updated tour');
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async tourStat() {
    try {
      const tour = await tourRepository.stats();
      return serviceResponse('success', 200, 'Successfully Statistics', tour);
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async addGuide(tourId, body) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tourId');
      }
      const guideId = uuidv4();

      const guideData = {
        guideId,
        ...body
      };
      const guide = await guideRepository.create(guideData);
      guide.update({
        tourId: tour.dataValues.id
      });
      return serviceResponse(
        'success',
        201,
        'Successfully added guide to a tour',
        guide
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }

  static async bookTour(tourId, userId) {
    try {
      const tour = await tourRepository.findById(tourId);
      if (!tour) {
        return serviceResponse('fail', 400, 'Invalid tourId');
      }
      const bookingId = uuidv4();
      const bookingData = {
        bookingId,
        userId
      };
      const booking = await bookingRepository.create(bookingData);
      booking.update({
        tourId: tour.dataValues.id
      });
      return serviceResponse(
        'success',
        201,
        'Successfully booked a tour',
        booking
      );
    } catch (err) {
      return serviceResponse('fail', 500, 'Internal Server Error');
    }
  }
}
module.exports = tourService;
