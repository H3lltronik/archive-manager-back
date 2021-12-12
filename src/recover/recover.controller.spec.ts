import { Test, TestingModule } from '@nestjs/testing';
import { RecoverController } from './recover.controller';
import { RecoverService } from './recover.service';

describe('RecoverController', () => {
  let controller: RecoverController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecoverController],
      providers: [RecoverService],
    }).compile();

    controller = module.get<RecoverController>(RecoverController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
