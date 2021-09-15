import { Test, TestingModule } from '@nestjs/testing';
import { FilekitaController } from './filekita.controller';
import { FilekitaService } from './filekita.service';

describe('FilekitaController', () => {
  let controller: FilekitaController;

  const mockFilekitaService = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilekitaController],
      providers: [FilekitaService]
    }).overrideProvider(FilekitaService)
      .useValue(mockFilekitaService)
      .compile();

    controller = module.get<FilekitaController>(FilekitaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
