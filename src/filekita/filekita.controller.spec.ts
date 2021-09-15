import { Test, TestingModule } from '@nestjs/testing';
import { FilekitaController } from './filekita.controller';
import { FileKita } from './filekita.entity';
import { FilekitaService } from './filekita.service';


describe('FilekitaController', () => {
  let controller: FilekitaController;
  let service: FilekitaService;

  const mockFilekitaService = {
    create: jest.fn((dto) => {
      return {
        id: 7,
        ...dto
      }
    }),
    showbyid: jest.fn((id) => {
      return {
        id,
        nama: "Diaz Adha",
        deskripsi: "Hai tes",
        isPublic: true
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [FilekitaController],
      providers: [FilekitaService]
    }).overrideProvider(FilekitaService)
      .useValue(mockFilekitaService)
      .compile();

    controller = module.get<FilekitaController>(FilekitaController);
    service = module.get<FilekitaService>(FilekitaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create a new data', () => {
    const data = { nama: 'Maris', deskripsi: 'tes2222', isPublic: true }
    expect(controller.createrecord(data)).toEqual({
      id: expect.any(Number),
      nama: data.nama,
      deskripsi: data.deskripsi,
      isPublic: data.isPublic
    })

    expect(mockFilekitaService.create).toHaveBeenCalledWith(data);
  })

  it('find data by id', () => {
    const result = {
      id: 1,
      nama: "Diaz Adha",
      deskripsi: "Hai tes",
      isPublic: true
    };
    expect(controller.hasil_detail('1')).toEqual(result);

    expect(mockFilekitaService.showbyid).toHaveBeenCalledWith(1);
  })

  // describe('getdatabyid', () => {
  //   describe('should return an data by id', () => {
  //     let data: FileKita;

  //     const result = {
  //       id: 1,
  //       nama: "Diaz Adha",
  //       deskripsi: "Hai tes",
  //       isPublic: true
  //     };
  //     // jest.spyOn(service, 'showAll').mockImplementation(() => push);
  //     // jest.spyOn(service, 'showbyid');
  //     // const data = await service.showbyid(1);

  //     beforeEach(async () => {
  //       data = await controller.hasil_detail('1')
  //     })

  //     test('asdasd', () => {
  //       expect(service.showbyid).toBeCalledWith('1')
  //     })
  //     // expect(data).toBe(result);
  //   });

  // });
});
