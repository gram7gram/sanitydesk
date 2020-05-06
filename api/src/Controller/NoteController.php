<?php

namespace App\Controller;

use App\Entity\Note;
use App\Service\LoginService;
use App\Service\NoteService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

class NoteController extends AbstractController
{
    /**
     * @Route("/v1/notes", methods={"GET"})
     */
    public function getAll(LoginService $loginService, NoteService $service): JsonResponse
    {
        $user = $loginService->denyAccessUnlessHasUser();

        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository(Note::class)->findBy([
            'createdBy' => $user->getId()
        ], [
            'createdAt' => 'DESC'
        ]);

        $result = $service->serialize($entities);

        return new JsonResponse([
            'total' => count($result),
            'items' => $result
        ], JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/v1/notes/{id}", methods={"GET"}, requirements={"id": "\d+"})
     */
    public function getOne(LoginService $loginService, $id, NoteService $service): JsonResponse
    {
        $user = $loginService->denyAccessUnlessHasUser();

        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository(Note::class)->findOneBy([
            'id' => $id,
            'createdBy' => $user->getId()
        ]);
        if (!$entity) {
            throw new NotFoundHttpException();
        }

        $result = $service->serialize($entity);

        return new JsonResponse($result, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/v1/notes/{id}", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function updateOne(LoginService $loginService, Request $request, $id, NoteService $service): JsonResponse
    {
        $user = $loginService->denyAccessUnlessHasUser();

        $em = $this->getDoctrine()->getManager();

        $content = json_decode($request->getContent(), true);

        $entity = $em->getRepository(Note::class)->findOneBy([
            'id' => $id,
            'createdBy' => $user->getId()
        ]);
        if (!$entity) {
            throw new NotFoundHttpException();
        }

        $entity = $service->update($entity, $content);

        $result = $service->serialize($entity);

        return new JsonResponse($result, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/v1/notes", methods={"POST"})
     */
    public function createOne(LoginService $loginService, Request $request, NoteService $service): JsonResponse
    {
        $user = $loginService->denyAccessUnlessHasUser();

        $content = json_decode($request->getContent(), true);

        $entity = $service->create($content);

        $result = $service->serialize($entity);

        return new JsonResponse($result, JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/v1/notes/{id}", methods={"DELETE"}, requirements={"id": "\d+"})
     */
    public function removeOne(LoginService $loginService, $id, NoteService $service): JsonResponse
    {
        $user = $loginService->denyAccessUnlessHasUser();

        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository(Note::class)->findOneBy([
            'id' => $id,
            'createdBy' => $user->getId()
        ]);
        if (!$entity) {
            throw new NotFoundHttpException();
        }

        $service->remove($entity);

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}