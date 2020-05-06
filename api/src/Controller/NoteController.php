<?php

namespace App\Controller;

use App\Entity\Note;
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
    public function getAll(NoteService $service): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository(Note::class)->findBy([], [
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
    public function getOne($id, NoteService $service): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository(Note::class)->find($id);
        if (!$entity) {
            throw new NotFoundHttpException();
        }

        $result = $service->serialize($entity);

        return new JsonResponse($result, JsonResponse::HTTP_OK);
    }

    /**
     * @Route("/v1/notes/{id}", methods={"PUT"}, requirements={"id": "\d+"})
     */
    public function updateOne(Request $request, $id, NoteService $service): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        $content = json_decode($request->getContent(), true);

        $entity = $em->getRepository(Note::class)->find($id);
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
    public function createOne(Request $request, NoteService $service): JsonResponse
    {
        $content = json_decode($request->getContent(), true);

        $entity = $service->create($content);

        $result = $service->serialize($entity);

        return new JsonResponse($result, JsonResponse::HTTP_CREATED);
    }

    /**
     * @Route("/v1/notes/{id}", methods={"DELETE"}, requirements={"id": "\d+"})
     */
    public function removeOne($id, NoteService $service): JsonResponse
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository(Note::class)->find($id);
        if (!$entity) {
            throw new NotFoundHttpException();
        }

        $service->remove($entity);

        return new JsonResponse(null, JsonResponse::HTTP_NO_CONTENT);
    }
}